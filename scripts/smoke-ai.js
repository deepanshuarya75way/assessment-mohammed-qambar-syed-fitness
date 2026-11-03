// Integration smoke test — run with `npm run smoke:ai` before every git push.
// Tests Gemini 3.8 Flash (and fallback cascade) directly with the real API key.

const fs = require("fs");
const path = require("path");

// Load .env.local so the key is available outside Next.js runtime
const envFile = path.join(__dirname, "..", ".env.local");
if (fs.existsSync(envFile)) {
  const content = fs.readFileSync(envFile, "utf8");
  for (const line of content.split("\n")) {
    const eq = line.indexOf("=");
    if (eq > 0) {
      const k = line.slice(0, eq).trim();
      const v = line.slice(eq + 1).trim();
      if (k) {
        process.env[k] = v;
      }
    }
  }
}

const API_KEY = process.env.GEMINI_API_KEY || process.env.NEXT_PUBLIC_GEMINI_API_KEY;

if (!API_KEY) {
  console.error("ERROR: Real GEMINI_API_KEY required — set it in .env.local");
  process.exit(1);
}

const MODELS = ["gemini-3.8-flash", "gemini-3-flash-preview", "gemini-2.5-flash"];

async function run() {
  console.log(`Smoke test — Primary Target: gemini-3.8-flash (with multi-tier fallback cascade)`);
  console.log(`  Key starts with: ${API_KEY.substring(0, 10)}...`);

  const PROMPT = `You are an expert fitness coach. Return ONLY valid JSON, no markdown fences.
Create a minimal workout plan:
{
  "planTitle": "string",
  "summary": "string",
  "detectedBodyType": null,
  "biometricProjections": { "muscleMassDelta": "string", "bodyFatDelta": "string", "timeline": "12 Weeks" },
  "weeklyStructure": [
    { "day": "Monday", "focus": "string", "exercises": [{ "name": "string", "sets": 3, "reps": "8-10", "rpe": 7, "notes": "string", "videoQuery": "string" }] }
  ],
  "nutrition": { "calories": "string", "protein": "string", "carbs": "string", "fats": "string", "advice": "string" }
}`;

  let successModel = null;
  let rawContent = "";

  for (const model of MODELS) {
    const t0 = Date.now();
    console.log(`  Calling ${model}...`);
    try {
      const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${API_KEY}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: PROMPT }] }],
          generationConfig: {
            responseMimeType: "application/json",
            temperature: 0.7
          }
        }),
        signal: AbortSignal.timeout(model === "gemini-3.8-flash" ? 12000 : 25000)
      });

      const body = await res.json();
      if (!res.ok) {
        console.warn(`  [${model}] HTTP ${res.status}: ${body.error?.message || "Unavailable"}`);
        continue;
      }

      const text = body.candidates?.[0]?.content?.parts?.[0]?.text ?? "";
      if (text) {
        successModel = model;
        rawContent = text;
        console.log(`  [${model}] Responded in ${(Date.now() - t0) / 1000}s`);
        break;
      }
    } catch (e) {
      console.warn(`  [${model}] Failed: ${e.message}`);
      continue;
    }
  }

  if (!successModel) {
    console.error("  FAILED: All Gemini models failed to respond.");
    process.exit(1);
  }

  let plan;
  try {
    plan = JSON.parse(rawContent);
  } catch (e) {
    console.error("  FAILED: JSON parse error —", e.message);
    process.exit(1);
  }

  // Validate required fields
  const errors = [];
  if (!plan.planTitle) errors.push("missing planTitle");
  if (!plan.summary) errors.push("missing summary");
  if (!Array.isArray(plan.weeklyStructure) || plan.weeklyStructure.length === 0) errors.push("weeklyStructure empty");
  if (!plan.nutrition?.calories) errors.push("missing nutrition.calories");

  if (errors.length) {
    console.error("  FAILED: Schema validation —", errors.join(", "));
    console.error("  Full plan:", JSON.stringify(plan, null, 2));
    process.exit(1);
  }

  console.log(`  planTitle: "${plan.planTitle}"`);
  console.log(`  Days: ${plan.weeklyStructure.length}`);
  console.log(`  PASSED: AI engine is live via ${successModel} and schema-valid`);
}

run().catch((e) => {
  console.error("  FAILED:", e.message);
  process.exit(1);
});
