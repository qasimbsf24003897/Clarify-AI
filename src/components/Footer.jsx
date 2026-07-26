import React from "react";

function Footer() {

  return (

    <footer id="contact" className="footer">

      <div className="footer-container">

        <div className="footer-about">

          <h2>Clarify AI</h2>

          <p>
            From Confusion to Clarity.
            Make smarter decisions using Artificial Intelligence.
          </p>

        </div>

        <div className="footer-links">

          <h3>Quick Links</h3>

          <ul>

            <li>
              <a href="#home">Home</a>
            </li>

            <li>
              <a href="#features">Features</a>
            </li>

            <li>
              <a href="#how">How It Works</a>
            </li>

            <li>
              <a href="#contact">Contact</a>
            </li>

          </ul>

        </div>

        <div className="footer-contact">

          <h3>Contact</h3>

          <p>Email: support@clarifyai.com</p>

          <p>AI Decision Coach</p>

          <p>Available 24/7</p>

        </div>

      </div>

      <hr />

      <div className="footer-bottom">

        <p>
          © 2026 Clarify AI. All Rights Reserved.
        </p>

        <p>
          Developed by Hafiz Muhammad Qasim Aziz
        </p>

      </div>

    </footer>

  );

}

export default Footer;