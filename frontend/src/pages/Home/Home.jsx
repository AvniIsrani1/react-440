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
            {/*{user
              ? 'View blog posts'
              : 'Where ideas take shape and voices find space.'}*/}
            {/*KV: replaced above with clickable hyperlinks*/}
            {user ? (
              <>
                <Link to="/blogPost" className="btn-link">Post a blog</Link><br />
                <Link to="/blogSearch" className="btn-link">View blog posts</Link><br />
                <Link to="/followOthers" className="btn-link">Follow Others</Link><br />
                <Link to="/phase3step1" className="btn-link">Phase 3 step #1</Link><br />
                <Link to="/phase3step2" className="btn-link">Phase 3 step #2</Link><br />
                <Link to="/phase3step3" className="btn-link">Phase 3 step #3</Link><br />
                <Link to="/phase3step4" className="btn-link">Phase 3 step #4</Link><br />
                <Link to="/phase3step5" className="btn-link">Phase 3 step #5</Link><br />
                <Link to="/phase3step6" className="btn-link">Phase 3 step #6</Link><br />
                <Link to="/phase3step7" className="btn-link">Phase 3 step #7</Link>
              </>
            ) : (
              'Where ideas take shape and voices find space.'
            )}
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
