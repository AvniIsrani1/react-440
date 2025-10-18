import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api, { setAuthToken } from '../../api';
import '../../styles/variables.css';
import './Login.css';

export default function Login(){
  const [form, setForm] = useState({ username:'', password:'' });
  const [msg, setMsg] = useState('');
  const [busy, setBusy] = useState(false);
  const navigate = useNavigate();

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setMsg(''); setBusy(true);
    try {
      const res = await api.post('/auth/login', form);
      const token = res.data?.access_token;
      if (token) { localStorage.setItem('token', token); setAuthToken(token); }
      setMsg('✅ Signed in!');
      navigate('/');
    } catch (err) {
      const s = err?.response?.data;
      setMsg(s?.message || s?.error || 'Invalid credentials');
    } finally { setBusy(false); }
  };

  return (
    <div className="login-shell">
      <section className="login-card">
        <div className="brand">
          <div className="brand-mark" />
          <span>Template<br/>Design</span>
        </div>

        <form onSubmit={submit} className="form">
          <div className="field with-icon">
            <span className="icon" aria-hidden="true">
              <svg viewBox="0 0 24 24"><path d="M4 12a8 8 0 1 1 16 0v6H4z"/><circle cx="12" cy="10" r="3"/></svg>
            </span>
            <input name="username" placeholder="Username" value={form.username} onChange={onChange} required autoComplete="username"/>
          </div>

          <div className="field with-icon">
            <span className="icon" aria-hidden="true">
              <svg viewBox="0 0 24 24"><path d="M6 10V7a6 6 0 1 1 12 0v3"/><rect x="4" y="10" width="16" height="10" rx="2"/></svg>
            </span>
            <input type="password" name="password" placeholder="Password" value={form.password} onChange={onChange} required autoComplete="current-password"/>
          </div>

          <div className="actions">
            <label className="remember"><input type="checkbox" /> Remember me</label>
            <button className="btn-primary" type="submit" disabled={busy}>{busy?'Signing in…':'Sign In'}</button>
          </div>

          {msg && <p className={`note ${msg.startsWith('✅') ? 'ok' : 'err'}`}>{msg}</p>}
          <p className="small">New here? <Link to="/signup">Create an account</Link></p>
        </form>
      </section>

      <section className="login-hero">
        <div className="hero-nav">
          <nav>
            <a href="#about">ABOUT</a><a href="#download">DOWNLOAD</a>
            <a href="#pricing">PRICING</a><a href="#contact">CONTACT</a>
          </nav>
          <div className="hero-cta">
            <Link to="/signup" className="btn-ghost">SIGN UP</Link>
            <Link to="/home" className="btn-ghost">Home</Link>
            <button className="burger" aria-label="Menu"><span/><span/><span/></button>
          </div>
        </div>
        <div className="hero-pane">
          <h1>Welcome back.</h1>
          <p>Enter your username and password to continue.</p>
          <p className="tiny">Your session will be active on this device.</p>
        </div>
      </section>
    </div>
  );
}
