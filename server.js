import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import Groq from "groq-sdk";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const groq = new Groq({
  apiKey: process.env.VITE_GROQ_API_KEY,
});

app.get("/", (req, res) => {
  res.send("✅ Clarify AI Backend Running");
});

app.post("/analyze", async (req, res) => {

  try {

    const { decision } = req.body;

    const completion = await groq.chat.completions.create({

      model: "llama-3.3-70b-versatile",

      temperature: 0.3,

      response_format: {
        type: "json_object"
      },

      messages: [

        {
          role: "system",

          content: `
You are Clarify AI.

You are a professional AI Decision Coach.

Analyze the user's decision carefully.

Return ONLY valid JSON.

Never use markdown.
Never return explanations outside JSON.
Never create a field called "reply".

Return EXACTLY this structure:

{
  "confidence": 88,
  "recommendation": "One clear recommendation.",
  "pros": [
    "Pro 1",
    "Pro 2",
    "Pro 3"
  ],
  "cons": [
    "Con 1",
    "Con 2"
  ],
  "nextStep": "One practical next step.",
  "riskScore": 42,
  "riskLevel": "Medium Risk",
  "riskReason": "Short reason."
}

Rules:

- confidence must be between 50 and 100.
- recommendation must contain one sentence.
- pros must contain exactly 3 items.
- cons must contain exactly 2 items.
- nextStep must contain one sentence.
- riskScore must always be between 0 and 100.
- riskLevel must only be:
  Low Risk
  Medium Risk
  High Risk
- riskReason must always explain the score.
- Never skip any field.
- Return ONLY JSON.
`
        },

        {
          role: "user",
          content: decision
        }

      ]

    });

    const data = JSON.parse(
      completion.choices[0].message.content
    );

    console.log("AI RESPONSE:", data);
    if (!data.confidence) {
      data.confidence = 80;
    }

    if (!data.recommendation) {
      data.recommendation = "No recommendation available.";
    }

    if (!Array.isArray(data.pros)) {
      data.pros = [];
    }

    if (!Array.isArray(data.cons)) {
      data.cons = [];
    }

    if (!data.nextStep) {
      data.nextStep = "Start with the first practical step.";
    }

    if (
      data.riskScore === undefined ||
      data.riskScore === null
    ) {

      const confidence = data.confidence || 80;

      if (confidence >= 85) {
        data.riskScore = 25;
        data.riskLevel = "Low Risk";
        data.riskReason =
          "The recommendation has high confidence.";
      }
      else if (confidence >= 70) {
        data.riskScore = 50;
        data.riskLevel = "Medium Risk";
        data.riskReason =
          "The decision has moderate uncertainty.";
      }
      else {
        data.riskScore = 80;
        data.riskLevel = "High Risk";
        data.riskReason =
          "The recommendation has lower confidence.";
      }

    }

    res.json({

      confidence: data.confidence,

      recommendation: data.recommendation,

      pros: data.pros,

      cons: data.cons,

      nextStep: data.nextStep,

      riskScore: data.riskScore,

      riskLevel: data.riskLevel,

      riskReason: data.riskReason

    });

  }
  catch (error) {

    console.error(error);

    res.status(500).json({

      confidence: 0,

      recommendation: "Unable to analyze your decision.",

      pros: [],

      cons: [],

      nextStep: "Please try again.",

      riskScore: 100,

      riskLevel: "High Risk",

      riskReason: "Server error occurred."

    });

  }

});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {

  console.log(
    "✅ Server running on http://localhost:" + PORT
  );

});