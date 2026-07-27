import React, { useState, useEffect, useRef } from "react";

import "./styles/app.css";

import { analyzeDecision } from "./services/groq";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import DecisionBox from "./components/DecisionBox";
import ResultCard from "./components/ResultCard";
import Features from "./components/Features";
import HowItWorks from "./components/HowItWorks";
import Footer from "./components/Footer";
import FollowUpQuestions from "./components/FollowUpQuestions";
import RiskMeter from "./components/RiskMeter";
import ConfidenceMeter from "./components/ConfidenceMeter";
import Roadmap from "./components/Roadmap";
import DecisionHistory from "./components/DecisionHistory";
import PDFDownload from "./components/PDFDownload";
import Testimonials from "./components/Testimonials";
import FAQ from "./components/FAQ";
import Contact from "./components/Contact";

function App() {

  const [decision, setDecision] = useState("");

  const [loading, setLoading] = useState(false);

  const [result, setResult] = useState(null);
  const [showQuestions, setShowQuestions] = useState(false);
  const questionsRef = useRef(null);

 const [history, setHistory] = useState(() => {

  const savedHistory = localStorage.getItem("clarifyHistory");

  return savedHistory ? JSON.parse(savedHistory) : [];

});

  const [answers, setAnswers] = useState({
    education: "",
    level: "",
    hours: "",
    goal: "",
    path: ""
  });
useEffect(() => {

  localStorage.setItem(
    "clarifyHistory",
    JSON.stringify(history)
  );

}, [history]);

const clearHistory = () => {

  localStorage.removeItem("clarifyHistory");

  setHistory([]);

};
const showFollowUpQuestions = () => {
  if (!decision.trim()) {
    alert("Please enter your decision.");
    return;
  }

  setResult(null);
  setShowQuestions(true);

  setTimeout(() => {
  questionsRef.current?.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
}, 100);
};
  const handleAnalyze = async () => {


  setLoading(true);

  try {

      const finalDecision = `
Decision:
${decision}

Education:
${answers.education}

Previous Experience:
${answers.level}

Daily Study Hours:
${answers.hours}

Main Goal:
${answers.goal}

Preferred Path:
${answers.path}
`;

      const data = await analyzeDecision(finalDecision);

      console.log("AI DATA:", data);

      setResult(data);

      setHistory((previous) => [

        {
          question: decision,
          recommendation: data.recommendation,
          confidence: data.confidence,
          riskLevel: data.riskLevel
        },

        ...previous

      ]);

    } catch (error) {

      console.error(error);

      alert("Something went wrong.");

    } finally {

      setLoading(false);

    }

  };
  useEffect(() => {

  localStorage.setItem(

    "clarifyHistory",

    JSON.stringify(history)

  );

}, [history]);
  return (

    <div className="app">

      <Navbar />

      <Hero />

    <DecisionBox
  decision={decision}
  setDecision={setDecision}
  handleAnalyze={showFollowUpQuestions}
  loading={loading}
/>

{showQuestions && (
  <div ref={questionsRef}>
    <FollowUpQuestions
      answers={answers}
      setAnswers={setAnswers}
      handleSubmit={handleAnalyze}
      loading={loading}
    />
  </div>
)}
      {result && (

        <>

          <ConfidenceMeter
            confidence={result.confidence}
          />

          <RiskMeter
            riskScore={result.riskScore}
            riskLevel={result.riskLevel}
            riskReason={result.riskReason}
          />

          <ResultCard
            result={result}
          />
<PDFDownload
  result={result}
/>
          <Roadmap
            result={result}
          />

        </>

      )}

      <DecisionHistory
        history={history}
        clearHistory={clearHistory}
      />

      <Features />

<Testimonials />
<FAQ />
      <HowItWorks />
<Contact />

      <Footer />

    </div>

  );
  }

export default App;