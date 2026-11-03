import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import clientPromise from "@/lib/mongodb";
import { validateWorkoutPlan, extractJson, withAIRetry } from "@/lib/ai-validator";
import { callGeminiCascade, generatePersonalizedFallbackPlan } from "@/lib/gemini";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

export async function POST(req: Request) {
  try {
    const session = (await getSession()) as any;
    if (!session) {
      return NextResponse.json({ error: "Unauthorized access detected." }, { status: 401 });
    }

    const { age, height, weight, bodyType, goal, trainingLocation, fasting, image } = await req.json();

    const isAIGeneratedBodyType = bodyType === "AI_ANALYSIS_REQUESTED";

    const basePrompt = `
      You are an expert personal trainer for SVORA Wellness.

      ${isAIGeneratedBodyType && image ? "I have provided an image of my body. Please first analyze my body type (Ectomorph, Mesomorph, Endomorph, Skinny-Fat, or Athletic Lean) based on the visual evidence." : ""}
      Create a simple, encouraging workout plan and nutritional guide for:
      - Age: ${age}
      - Height: ${height}
      - Weight: ${weight}
      - Body Profile: ${isAIGeneratedBodyType ? "Analyze from image" : bodyType}
      - Goal: ${goal}
      - Training Space: ${trainingLocation}
      - Routine: ${fasting ? "Intermittent Fasting (16:8)" : "Standard eating schedule"}

      Use layman terms. Avoid technical jargon.
      Output the plan in STRICT JSON format (no markdown, no extra text):
      {
        "planTitle": "string",
        "summary": "string",
        "detectedBodyType": "string or null",
        "biometricProjections": {
          "muscleMassDelta": "string",
          "bodyFatDelta": "string",
          "timeline": "12 Weeks"
        },
        "weeklyStructure": [
          {
            "day": "string",
            "focus": "string",
            "exercises": [
              {
                "name": "string",
                "sets": number,
                "reps": "string",
                "rpe": number,
                "notes": "string",
                "videoQuery": "string"
              }
            ]
          }
        ],
        "nutrition": {
          "calories": "string",
          "protein": "string",
          "carbs": "string",
          "fats": "string",
          "advice": "string"
        }
      }

      Generate 4 distinct training days. Each day MUST include a minimum of 5-6 exercises. sets must be an integer 1-20. rpe must be 1-10.
    `;

    let planData: any = null;
    let validated = false;
    let attempts = 1;
    let validationErrors: string[] = [];

    try {
      const retryResult = await withAIRetry({
        callAI: async (correctionHint) => {
          const promptWithHint = basePrompt + correctionHint;
          const result = await callGeminiCascade({
            prompt: promptWithHint,
            image: image || undefined,
            timeoutMs: 25000
          });
          return result.text;
        },
        parse: (text) => extractJson(text) as Record<string, unknown>,
        validate: validateWorkoutPlan,
        maxRetries: 1
      });

      planData = retryResult.data;
      validated = retryResult.validated;
      attempts = retryResult.attempts;
      validationErrors = retryResult.validationErrors;
    } catch (aiErr: any) {
      console.warn("[generate] Gemini remote generation failed or timed out. Activating personalized fallback plan:", aiErr.message);
      planData = generatePersonalizedFallbackPlan({
        age,
        height,
        weight,
        bodyType,
        goal,
        trainingLocation,
        fasting
      });
      validated = true;
      attempts = 1;
      validationErrors = [];
    }

    if (!validated && !planData) {
      planData = generatePersonalizedFallbackPlan({
        age,
        height,
        weight,
        bodyType,
        goal,
        trainingLocation,
        fasting
      });
      validated = true;
    }

    // Persist to database
    try {
      const client = await clientPromise;
      const db = client.db("svora_db");
      await db.collection("routines").insertOne({
        userId: session.user.id,
        ...(planData as Record<string, unknown>),
        _aiValidated: validated,
        _aiAttempts: attempts,
        createdAt: new Date()
      });
    } catch (dbErr) {
      console.error("[generate] Failed to persist routine to database:", dbErr);
    }

    return NextResponse.json(planData);
  } catch (e: unknown) {
    const errorMessage = e instanceof Error ? e.message : String(e);
    console.error("GENERATE_API_ERROR:", errorMessage);
    // Never crash with 502/500 if we can provide a personalized fallback
    const fallback = generatePersonalizedFallbackPlan({});
    return NextResponse.json(fallback);
  }
}
