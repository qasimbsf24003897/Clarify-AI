import React from "react";

function ResultCard({ result }) {
console.log("RESULT CARD DATA:", result);
console.log("RISK VALUES:", result.riskScore, result.riskLevel, result.riskReason);
  if (!result) return null;

  return (

    <section className="result-section">
        

      <div className="result-card">

        <h2>🤖 AI Decision Analysis</h2>

        <div className="result-item">

          <h3>📊 Confidence Score</h3>

          <div className="progress-bar">

            <div
              className="progress-fill"
              style={{
                width: (result.confidence || 0) + "%"
              }}
            ></div>

          </div>

          <strong>{result.confidence || 0}%</strong>

        </div>

        <div className="result-item">

          <h3>📌 Recommendation</h3>

<p>{result.recommendation}</p>

        </div>

        <div className="result-item">

          <h3>✅ Pros</h3>

          <ul>

            {(result.pros || []).map((item, index) => (

            <li key={index} style={{color:"white"}}>
  {item}
</li>

            ))}

          </ul>

        </div>

        <div className="result-item">

          <h3>❌ Cons</h3>

          <ul>

            {(result.cons || []).map((item, index) => (

            <li key={index} style={{color:"white"}}>
  {item}
</li>
            ))}

          </ul>

        </div>

        <div className="result-item">

          <h3>🚀 Next Step</h3>

    <p>{result.nextStep}</p>

        </div>

        <div className="result-item">

          <h3>⚠️ Risk Score</h3>

          <div className="progress-bar">

            <div
              className="progress-fill risk-fill"
              style={{
                width: (result.riskScore || 0) + "%"
              }}
            ></div>

          </div>

          <strong>{result.riskScore || 0}%</strong>

        </div>

        <div className="result-item">

          <h3>🚦 Risk Level</h3>

          <p>{result.riskLevel || "Not Available"}</p>

        </div>

        <div className="result-item">

          <h3>📝 Risk Reason</h3>

          <p>{result.riskReason || "Not Available"}</p>

        </div>

      </div>

    </section>

  );

}

export default ResultCard;