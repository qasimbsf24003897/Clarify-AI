import React from "react";

function RiskMeter({ riskScore, riskLevel, riskReason }) {

  const score = riskScore || 0;

  let meterColor = "#22c55e";

  if (score >= 70) {
    meterColor = "#ef4444";
  } else if (score >= 40) {
    meterColor = "#f59e0b";
  }

  return (

    <section className="risk-section">

      <div className="risk-card">

        <h2>⚠️ AI Risk Analysis</h2>

        <div className="risk-progress">

          <div
            className="risk-progress-fill"
            style={{
              width: score + "%",
              backgroundColor: meterColor
            }}
          ></div>

        </div>

        <h3>{score}%</h3>

        <h4>{riskLevel || "Risk Not Available"}</h4>

        <p>{riskReason || "No risk analysis available."}</p>

      </div>

    </section>

  );

}

export default RiskMeter;