import React from 'react';
import './Welcome.css';
import notepad from "../../assets/Notepad_icon.svg.png";

export default function Welcome() {
  return (
    <>
      <section className="auth-hero">
        <div className="hero-pane">
          <h1>Welcome to Muse</h1>
          <p>
            A space to share your thoughts and discover new perspectives.
          </p>

          {/* Image container */}
          <div className="hero-image-container">
            <img src={notepad} alt="Muse Welcome Background" className="hero-image" />
          </div>
        </div>
      </section>
    </>
  );
}
