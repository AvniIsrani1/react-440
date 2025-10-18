import React from 'react';
import { Link } from 'react-router-dom';
import '../../styles/variables.css';
import './Home.css';

export default function Home(){
  return (
    <div className="home-shell">
      <div className="home-topbar">
        <div className="logo">
          <div className="dot" />
          <span>Matador App</span>
        </div>
        <div className="top-cta">
          <Link to="/login" className="btn-solid">Sign In</Link>
          <Link to="/signup" className="btn-outline">Create Account</Link>
        </div>
      </div>

      <section className="home-hero">
        <div className="hero-nav">
          <nav>
            <a href="#about">ABOUT</a>
            <a href="#features">FEATURES</a>
            <a href="#pricing">PRICING</a>
            <a href="#contact">CONTACT</a>
          </nav>
          <div className="hero-cta">
            <Link to="/login" className="btn-ghost">SIGN IN</Link>
            <button className="burger" aria-label="Menu"><span/><span/><span/></button>
          </div>
        </div>

        <div className="hero-pane">
          <h1>Welcome.</h1>
          <p>Sign up to personalize your experience and access protected content. Already have an account? Sign in to continue.</p>
          <div className="cta-row">
            <Link to="/signup" className="btn-solid">Get Started</Link>
            <Link to="/login" className="btn-outline">I have an account</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
