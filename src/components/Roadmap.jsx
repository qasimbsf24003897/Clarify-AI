import React from "react";

function Roadmap({ result }) {

  if (!result) return null;

  return (

    <section className="roadmap-section">

      <div className="roadmap-card">

        <h2>🛣️ AI Success Roadmap</h2>

        <div className="roadmap-step">

          <h3>📅 Month 1</h3>

          <p>
            Learn the basics related to your chosen decision and build a strong foundation.
          </p>

        </div>

        <div className="roadmap-step">

          <h3>📅 Month 3</h3>

          <p>
            Complete practical projects and improve your skills through regular practice.
          </p>

        </div>

        <div className="roadmap-step">

          <h3>📅 Month 6</h3>

          <p>
            Build an impressive portfolio and start applying for internships, jobs or freelancing.
          </p>

        </div>

        <div className="roadmap-step">

          <h3>📅 Month 12</h3>

          <p>
            Become job-ready, continue learning advanced concepts and grow your professional career.
          </p>

        </div>

      </div>

    </section>

  );

}

export default Roadmap;