import React from "react";

function DecisionHistory({ history, clearHistory }) {

  if (!history || history.length === 0) {
    return (
      <section className="history-section">

        <div className="history-card">

          <div className="history-header">

            <h2>📜 Decision History</h2>

          </div>

          <p>No previous decisions found.</p>

        </div>

      </section>
    );
  }

  return (

    <section className="history-section">

      <div className="history-card">

        <div className="history-header">

          <h2>📜 Decision History</h2>

          <button
            className="clear-history-btn"
            onClick={clearHistory}
          >
            Clear History
          </button>

        </div>

        {history.map((item, index) => (

          <div className="history-item" key={index}>

            <h3>
              Decision {index + 1}
            </h3>

            <p>
              <strong>Question:</strong> {item.question}
            </p>

            <p>
              <strong>Recommendation:</strong> {item.recommendation}
            </p>

            <p>
              <strong>Confidence:</strong> {item.confidence}%
            </p>

            <p>
              <strong>Risk Level:</strong> {item.riskLevel}
            </p>

          </div>

        ))}

      </div>

    </section>

  );

}

export default DecisionHistory