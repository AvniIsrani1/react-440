import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import '../../styles/variables.css';
import './Home.css';
import { AuthContext } from '../../context/AuthContext';

export default function Home() {
  const { user } = useContext(AuthContext);

  return (
    <div className="home-shell">
      <section className="home-hero">
        <div className="hero-pane">
          <h1>
            {user ? `Welcome, ${user.username}!` : 'Welcome to Muse'}
          </h1>

          <p>
            {user
              ? 'View blog posts'
              : 'Where ideas take shape and voices find space.'}
          </p>

          <div className="cta-row">
            {user ? (
              <Link to="/user/cur" className="btn-solid">View Profile</Link>
            ) : (
              <>
                <Link to="/signup" className="btn-solid">Get Started</Link>
                <Link to="/login" className="btn-outline">I have an account</Link>
              </>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
