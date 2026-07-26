import React from "react";

function Navbar() {
  return (
    <nav className="navbar">

      <div className="logo">
        <h2>Clarify AI</h2>
      </div>

      <ul className="nav-links">
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

      <div className="nav-buttons">
        <button className="login-btn">
          Login
        </button>

        <button className="signup-btn">
          Get Started
        </button>
      </div>

    </nav>
  );
}

export default Navbar;