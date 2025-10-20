import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">

        <div className="footer-brand">
          <div className="dot" />
          <span className="footer-logo">Muse</span>
          <p className="tagline">
            Where ideas charge at the world.<br />
            Thought threads, late-night takes, and everything in between.
          </p>
        </div>

        <nav className="footer-nav">
          <Link to="/">Home</Link>
          <a href="#about">About</a>
          <a href="#features">Features</a>
          <a href="#contact">Contact</a>
        </nav>

        <div className="footer-info">
          <p>&copy; {new Date().getFullYear()} Muse. All rights reserved.</p>
        </div>

      </div>
    </footer>
  );
}
