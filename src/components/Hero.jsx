import React from "react";

function Hero() {
  return (
    <section id="home" className="hero">

      <div className="hero-content">

        <span className="hero-badge">
          🚀 AI Powered Decision Coach
        </span>

        <h1>
          From <span className="gradient-text">Confusion</span> to{" "}
          <span className="gradient-text">Clarity</span>
        </h1>

        <p>
          Clarify AI helps you make smarter decisions about your career,
          education, business, and personal growth using AI-powered analysis,
          risk evaluation, and personalized action plans.
        </p>

        <div className="hero-buttons">

          <button className="primary-btn">
            Start Free
          </button>

          <button className="secondary-btn">
            Learn More
          </button>

        </div>

        <div className="hero-stats">

          <div className="stat-card">
            <h2>10K+</h2>
            <p>AI Decisions</p>
          </div>

          <div className="stat-card">
            <h2>95%</h2>
            <p>Accuracy</p>
          </div>

          <div className="stat-card">
            <h2>24/7</h2>
            <p>AI Support</p>
          </div>

        </div>

      </div>

    </section>
  );
}

export default Hero;