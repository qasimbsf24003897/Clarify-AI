import React, { useRef } from "react";

function DecisionBox({
  decision,
  setDecision,
  handleAnalyze,
  loading,
})
{
    const recognitionRef = useRef(null);

const startVoiceInput = () => {

  const SpeechRecognition =
    window.SpeechRecognition ||
    window.webkitSpeechRecognition;

  if (!SpeechRecognition) {
    alert("Voice recognition is not supported in this browser.");
    return;
  }

  const recognition = new SpeechRecognition();

  recognition.lang = "en-US";

  recognition.interimResults = false;

  recognition.maxAlternatives = 1;

  recognition.onresult = (event) => {

    const text = event.results[0][0].transcript;

    setDecision(text);

  };

recognition.onerror = (event) => {

  console.log("VOICE ERROR:", event.error);

  alert("Voice Error: " + event.error);

};

  recognitionRef.current = recognition;

  recognition.start();

};

  return (
    <section className="decision-section">

      <div className="decision-card">

        <h2>🤖 AI Decision Assistant</h2>

        <p>
          Enter your question and let Clarify AI analyze your decision.
        </p>

        <textarea
          rows="5"
          placeholder="Example: Should I learn Artificial Intelligence or Cloud Computing?"
          value={decision}
          onChange={(e) => setDecision(e.target.value)}
        />
<button
  className="voice-btn"
  onClick={startVoiceInput}
>
  🎤 Speak Your Decision
</button>
        <button
          className="analyze-btn"
          onClick={handleAnalyze}
          disabled={loading}
        >

          {loading ? (

            <span className="loading-content">

              <span className="spinner"></span>

              Analyzing...

            </span>

          ) : (

            "Analyze My Decision"

          )}

        </button>

      </div>

    </section>
  );

}

export default DecisionBox;