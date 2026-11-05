
import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import clientPromise from "@/lib/mongodb";
import { callGeminiCascade } from "@/lib/gemini";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

const SYSTEM_PROMPT = `
You are an expert personal trainer for SVORA Wellness.

You will receive the user's latest saved workout routine
and their conversation history.

RULES:
1. Answer questions using the actual saved workout routine.
2. Explain exercise selection, reps, and sets.
3. Suggest reasonable exercise substitutions when requested.
4. If information is not present, say so clearly.
5. Never invent exercises or routine details.
6. Provide practical fitness guidance.
7. Do not claim that suggested modifications have been saved.
8. Use conversation history to maintain context.
9. Return valid JSON only, with no Markdown code fences.
`;

export async function POST(request: NextRequest) {
  try {
    // 1. Authenticate user
    const session = await getSession();

    if (!session) {
      return NextResponse.json(
        { error: "Unauthorized access detected." },
        { status: 401 }
      );
    }

    // Make sure this matches the property returned by getSession()
    const userId = session.user?.id;

if (!userId) {
  return NextResponse.json(
    { error: "Invalid user session." },
    { status: 401 }
  );
}

  

    // 2. Validate request body
    const body = await request.json();

    const question =
      typeof body.question === "string"
        ? body.question.trim()
        : "";

    const conversationId = body.conversationId;

    if (!question || question.length > 1000) {
      return NextResponse.json(
        {
          error:
            "Please enter a valid question (maximum 1000 characters).",
        },
        { status: 400 }
      );
    }

    // 3. Connect to MongoDB
    const client = await clientPromise;
    const db = client.db("svora_db");

    // 4. Fetch latest saved workout routine
    const routine = await db
      .collection("routines")
      .find({ userId })
      .sort({ createdAt: -1 })
      .limit(1)
      .next();

    if (!routine) {
      return NextResponse.json(
        { error: "No saved workout routine found." },
        { status: 404 }
      );
    }

    // 5. Get conversation collection
    const conversations = db.collection("workout_conversations");

    let conversation = null;

    // 6. Fetch existing conversation if conversationId exists
    if (conversationId) {
      if (typeof conversationId !== "string") {
        return NextResponse.json(
          { error: "Invalid conversation ID." },
          { status: 400 }
        );
      }

      conversation = await conversations.findOne({
        conversationId,
        userId,
        routineId: routine._id.toString(),
      });

      if (!conversation) {
        return NextResponse.json(
          { error: "Conversation not found." },
          { status: 404 }
        );
      }
    }

    // 7. Get previous conversation history
    const previousMessages = conversation?.messages ?? [];

    const updatedMessages = [
      ...previousMessages,
      {
        role: "user",
        content: question,
        timestamp: new Date(),
      },
    ];

    // 8. Build Gemini prompt
    const prompt = `
${SYSTEM_PROMPT}

LATEST SAVED WORKOUT ROUTINE:
${JSON.stringify(routine, null, 2)}

CONVERSATION HISTORY:
${JSON.stringify(previousMessages, null, 2)}

CURRENT USER QUESTION:
${question}

Return your answer as valid JSON:
{
  "answer": "Your contextual response"
}
`;

    // 9. Call Gemini
    const aiResult = await callGeminiCascade({
      prompt,
      timeoutsMs: 20000,
    });

    // 10. Parse AI response
    let parsed;

    try {
      parsed = JSON.parse(aiResult.text);
    } catch {
      throw new Error("AI returned an invalid JSON response.");
    }

    const answer = parsed.answer;

    if (
      typeof answer !== "string" ||
      !answer.trim()
    ) {
      throw new Error("AI returned an empty response.");
    }

    // 11. Save assistant response
    updatedMessages.push({
      role: "assistant",
      content: answer,
      timestamp: new Date(),
    });

    let currentConversationId = conversationId;

    if (conversation) {
      await conversations.updateOne(
        {
          conversationId,
          userId,
          routineId: routine._id.toString(),
        },
        {
          $set: {
            messages: updatedMessages,
            updatedAt: new Date(),
          },
        }
      );
    } else {
      currentConversationId = crypto.randomUUID();

      await conversations.insertOne({
        conversationId: currentConversationId,
        userId,
        routineId: routine._id.toString(),
        messages: updatedMessages,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }

    // 12. Return response
    return NextResponse.json({
      success: true,
      conversationId: currentConversationId,
      answer,
      model: aiResult.model,
    });

  } catch (error) {
    console.error("Workout Chat Error:", error);

    return NextResponse.json(
      {
        error:
          "Unable to process your question. Please try again later.",
      },
      { status: 500 }
    );
  }
}
