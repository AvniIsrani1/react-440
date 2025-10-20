import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import { AuthContext } from "../../context/AuthContext";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons'; 

export default function Header() {
  const { user, logout } = useContext(AuthContext);

  return (
    <header className="header">
      <Link to="/" className="logo">
        <FontAwesomeIcon icon={faPencilAlt} className="pencil-icon" />
        <span>Muse</span>
      </Link>

      <div className="top-cta">
        {user ? (
          <>
            {/* <span className="welcome-text">Welcome, {user.username}</span> */}
            <button onClick={logout} className="btn-solid">
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="btn-solid">
              Sign In
            </Link>
            <Link to="/signup" className="btn-outline">
              Create Account
            </Link>
          </>
        )}
      </div>
    </header>
  );
}
