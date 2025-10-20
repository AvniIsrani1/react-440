import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../../api';
import { AuthContext } from '../../context/AuthContext';
import '../../styles/variables.css';
import './Login.css';
import Welcome from '../../common/Welcome/Welcome';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons'; 

export default function Login() {
  const [form, setForm] = useState({ username: '', password: '' });
  const [msg, setMsg] = useState('');
  const [busy, setBusy] = useState(false);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setMsg('');
    setBusy(true);
    try {
      const res = await api.post('/auth/login', form);
      const token = res.data?.accessToken;
      const userData = res.data?.user;
      if (token && userData) login(userData, token);
      navigate('/');
    } catch (err) {
      const s = err?.response?.data;
      setMsg(s?.message || s?.error || 'Invalid credentials');
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="login-shell">
      <section className="login-card">
        <div className="brand">
          <FontAwesomeIcon icon={faPencilAlt} className="pencil-icon" />
          <span>Login</span>
        </div>

        <form onSubmit={submit} className="form">
            <input
              name="username"
              placeholder="Username"
              value={form.username}
              onChange={onChange}
              required
              autoComplete="username"
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={onChange}
              required
              autoComplete="current-password"
            />

          <button className="btn-primary" type="submit" disabled={busy}>
            {busy ? 'Signing in…' : 'Sign In'}
          </button>

          {msg && <p className={`note ${msg.includes('Invalid') ? 'err' : 'ok'}`}>{msg}</p>}
          <p className="small">New here? <Link to="/signup">Create an account</Link></p>
        </form>
      </section>

      <Welcome />
    </div>
  );
}
