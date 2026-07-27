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

      temperature: 0.6,

      response_format: {
        type: "json_object"
      },

      messages: [

        {
          role: "system",

          content: `
You are Clarify AI.

You are a professional AI Decision Coach.

Your job is to analyze the user's decision using all the information provided.

The user will provide:
- Decision
- Education
- Previous Experience
- Daily Study Hours
- Career Goal
- Preferred Path

Return ONLY valid JSON.

Never use markdown.
Never explain outside JSON.
Never create any extra fields.

Return EXACTLY this structure:

{
  "confidence": 85,
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
  "riskScore": 35,
  "riskLevel": "Low Risk",
  "riskReason": "Reason based on the user's information."
}

Rules:

- Confidence must be between 50 and 100.
- Confidence should increase when the user's background and goal are well aligned.
- Recommendation must be one clear sentence.
- Pros must contain exactly 3 items.
- Cons must contain exactly 2 items.
- NextStep must contain one practical action.

Calculate Risk Score dynamically.

Use these factors:
- Previous Experience
- Education
- Daily Study Hours
- Career Goal
- Preferred Path
- Complexity of the user's decision

Risk Score Rules:
0–30 = Low Risk
31–70 = Medium Risk
71–100 = High Risk

Never use a fixed value like 50.

Every different user should receive a different risk score based on their answers.

RiskReason must explain why that score was given.

Return ONLY valid JSON.
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