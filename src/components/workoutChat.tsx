
"use client";

import { useState } from "react";

type Message = {
  role: "user" | "assistant";
  content: string;
};


export default function WorkoutChat() {
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [conversationId, setConversationId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!question.trim() || loading) return;

    const q = question.trim();

    // Clear input and display user message
    setQuestion("");

    setMessages((prev) => [
      ...prev,
      {
        role: "user",
        content: q,
      },
    ]);

    setLoading(true);

    try {
      const res = await fetch("/api/follow-up", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          question: q,
          conversationId,
        }),
      });

      const responseText = await res.text();

let data;

try {
  data = JSON.parse(responseText);
} catch {
  console.error("API returned HTML instead of JSON:", responseText);

  throw new Error(
    `Invalid API response. Status: ${res.status}. Check your API route.`
  );
}

if (!res.ok) {
  throw new Error(data.error || "Something went wrong.");
}

      if (!res.ok) {
        throw new Error(data.error || "Something went wrong.");
      }

      // Save conversation ID for follow-up questions
      setConversationId(data.conversationId);

      // Display AI response
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: data.answer,
        },
      ]);

    } catch (error) {
      console.error("Workout Chat Error:", error);

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            error instanceof Error
              ? error.message
              : "Something went wrong. Please try again.",
        },
      ]);

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full">

      {/* Chat Messages */}
      <div className="h-64 overflow-y-auto space-y-3 mb-4">

        {messages.map((msg, i) => (
          <div
            key={i}
            className={
              msg.role === "user"
                ? "text-right"
                : "text-left"
            }
          >
            <p
              className={`inline-block p-3 rounded-lg max-w-[85%] ${
                msg.role === "user"
                  ? "bg-yellow-500 text-black"
                  : "bg-zinc-800 text-white"
              }`}
            >
              {msg.content}
            </p>
          </div>
        ))}

        {loading && (
          <p className="text-gray-400 text-sm">
            SVORA Trainer is thinking...
          </p>
        )}

      </div>

      {/* Message Input */}
      <div className="flex gap-2">

        <input
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              sendMessage();
            }
          }}
          placeholder="Ask a follow-up question..."
          disabled={loading}
          className="flex-1 min-w-0 p-3 rounded-lg bg-black border border-gray-700 text-white outline-none focus:border-yellow-500"
        />

        <button
          onClick={sendMessage}
          disabled={loading || !question.trim()}
          className="px-4 rounded-lg bg-yellow-500 text-black font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Sending..." : "Send"}
        </button>

      </div>

    </div>
  );
}
