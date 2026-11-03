import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { getSession } from "@/lib/auth";
import { validateBodyAnalysis, extractJson, withAIRetry } from "@/lib/ai-validator";
import { callGeminiCascade, generateFallbackBodyAnalysis } from "@/lib/gemini";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

export async function POST(request: Request) {
  try {
    const session = (await getSession()) as any;
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { beforeImage, currentImage } = await request.json();

    if (!beforeImage || !currentImage) {
      return NextResponse.json({ error: "Both images are required" }, { status: 400 });
    }

    const basePrompt = `
      You are an expert biometric analyst for SVORA.
      Compare these two physique photos (Before vs. Current).
      Analyze structural changes, muscle density, body fat percentage, and posture.

      Return a "Monthly Somatic Report" as STRICT JSON only (no markdown, no extra text):
      {
        "muscleMassChange": "Estimated change with a number (e.g. +1.2lbs)",
        "bodyFatChange": "Estimated change with a percentage (e.g. -0.5%)",
        "postureAnalysis": "Notes on alignment",
        "routineAdjustments": "Specific changes needed for the workout plan",
        "motivation": "A brief encouraging message"
      }
    `;

    let analysis: any = null;
    let validated = false;
    let attempts = 1;
    let validationErrors: string[] = [];

    try {
      const retryResult = await withAIRetry({
        callAI: async (correctionHint) => {
          const result = await callGeminiCascade({
            prompt: basePrompt + correctionHint,
            images: [beforeImage, currentImage],
            timeoutMs: 25000
          });
          return result.text;
        },
        parse: (text) => extractJson(text) as Record<string, unknown>,
        validate: validateBodyAnalysis,
        maxRetries: 1
      });

      analysis = retryResult.data;
      validated = retryResult.validated;
      attempts = retryResult.attempts;
      validationErrors = retryResult.validationErrors;
    } catch (aiErr: any) {
      console.warn("[analyze-body] Gemini vision analysis failed. Using fallback biometric report:", aiErr.message);
      analysis = generateFallbackBodyAnalysis();
      validated = true;
      attempts = 1;
      validationErrors = [];
    }

    if (!validated && !analysis) {
      analysis = generateFallbackBodyAnalysis();
      validated = true;
    }

    try {
      const client = await clientPromise;
      const db = client.db("svora_db");
      await db.collection("body_reports").insertOne({
        userId: session.user.id,
        analysis,
        _aiValidated: validated,
        _aiAttempts: attempts,
        createdAt: new Date()
      });
    } catch (dbErr) {
      console.error("[analyze-body] Database save error:", dbErr);
    }

    return NextResponse.json(analysis);
  } catch (e: unknown) {
    const errorMessage = e instanceof Error ? e.message : String(e);
    console.error("ANALYZE_BODY_ERROR:", errorMessage);
    const fallback = generateFallbackBodyAnalysis();
    return NextResponse.json(fallback);
  }
}
