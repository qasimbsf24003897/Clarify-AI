export async function analyzeDecision(decision) {

  const response = await fetch("/api/analyze"), {

    method: "POST",

    headers: {
      "Content-Type": "application/json"
    },

    body: JSON.stringify({
      decision: decision
    })

  });

  if (!response.ok) {

    throw new Error("Server Error");

  }

  const data = await response.json();

  console.log("Frontend Response:", data);

  return {

    confidence: data.confidence || 0,

    recommendation: data.recommendation || "No recommendation available.",

    pros: Array.isArray(data.pros) ? data.pros : [],

    cons: Array.isArray(data.cons) ? data.cons : [],

    nextStep: data.nextStep || "No next step available.",

   riskScore: data.riskScore ?? 50,

riskLevel: data.riskLevel ?? "Medium Risk",

riskReason:
  data.riskReason ??
  "Risk analysis is based on available information."

  };

}