import React from "react";

function ConfidenceMeter({ confidence }) {

  const score = confidence || 0;

  let meterColor = "#22c55e";

  if (score < 50) {
    meterColor = "#ef4444";
  } else if (score < 75) {
    meterColor = "#f59e0b";
  }

  return (
    <section className="confidence-section">

      <div className="confidence-card">

        <h2>🎯 AI Confidence Meter</h2>

        <div className="confidence-progress">

          <div
            className="confidence-progress-fill"
            style={{
              width: score + "%",
              backgroundColor: meterColor
            }}
          ></div>

        </div>

        <h3>{score}%</h3>

        <p>
          {score >= 85
            ? "Excellent confidence in this recommendation."
            : score >= 70
            ? "Good confidence based on your information."
            : score >= 50
            ? "Moderate confidence. More information may improve the result."
            : "Low confidence. More details are required."}
        </p>

      </div>

    </section>
  );
}

export default ConfidenceMeter;