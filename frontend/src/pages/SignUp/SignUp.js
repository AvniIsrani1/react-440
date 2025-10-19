import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../api';
import '../../styles/variables.css';
import './SignUp.css';

export default function SignUp() {
  const [form, setForm] = useState({
    username:'', password:'', confirmPassword:'',
    firstName:'', lastName:'', email:'', phone:''
  });
  const [msg, setMsg] = useState('');
  const [busy, setBusy] = useState(false);

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setMsg('');
    if (form.password !== form.confirmPassword) { setMsg('Passwords do not match'); return; }
    setBusy(true);
    try {
      await api.post('/auth/register', {
        username: form.username.trim(),
        password: form.password,
        confirmPassword: form.confirmPassword,
        firstName: form.firstName.trim(),
        lastName: form.lastName.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
      });
      setMsg('✅ Registered! You can now sign in.');
      setForm({ username:'', password:'', confirmPassword:'', firstName:'', lastName:'', email:'', phone:'' });
    } catch (err) {
      const s = err?.response?.data;
      setMsg(Array.isArray(s?.message) ? s.message.join(', ') : s?.message || s?.error || err.message);
    } finally { setBusy(false); }
  };

  return (
    <div className="auth-shell">
      <section className="auth-card">
        <div className="brand">
          <div className="brand-mark" />
        </div>

        <form onSubmit={submit} className="form">
          <div className="field with-icon">
            <span className="icon" aria-hidden="true">
              <svg viewBox="0 0 24 24"><path d="M4 12a8 8 0 1 1 16 0v6H4z"/><circle cx="12" cy="10" r="3"/></svg>
            </span>
            <input name="username" placeholder="Username" value={form.username} onChange={onChange} required autoComplete="username"/>
          </div>

          <div className="row">
            <div className="field"><input name="firstName" placeholder="First name" value={form.firstName} onChange={onChange} required/></div>
            <div className="field"><input name="lastName" placeholder="Last name" value={form.lastName} onChange={onChange} required/></div>
          </div>

          <div className="field"><input type="email" name="email" placeholder="Email" value={form.email} onChange={onChange} required/></div>
          <div className="field"><input name="phone" placeholder="Phone" value={form.phone} onChange={onChange} required/></div>

          <div className="field with-icon">
            <span className="icon" aria-hidden="true">
              <svg viewBox="0 0 24 24"><path d="M6 10V7a6 6 0 1 1 12 0v3"/><rect x="4" y="10" width="16" height="10" rx="2"/></svg>
            </span>
            <input type="password" name="password" placeholder="Password" value={form.password} onChange={onChange} required autoComplete="new-password"/>
          </div>

          <div className="field"><input type="password" name="confirmPassword" placeholder="Confirm password" value={form.confirmPassword} onChange={onChange} required autoComplete="new-password"/></div>

          <div className="actions">
            <label className="remember"><input type="checkbox" /> Remember me</label>
            <button className="btn-primary" type="submit" disabled={busy}>{busy?'Creating…':'Create account'}</button>
          </div>

          {msg && <p className={`note ${msg.startsWith('✅') ? 'ok' : 'err'}`}>{msg}</p>}
          <p className="small">Already a member? <Link to="/login">Sign in</Link></p>
        </form>
      </section>

      <section className="auth-hero">
        <div className="hero-nav">
          <nav>
            <a href="#about">ABOUT</a><a href="#download">DOWNLOAD</a>
            <a href="#pricing">PRICING</a><a href="#contact">CONTACT</a>
          </nav>
          <div className="hero-cta">
            <Link to="/login" className="btn-ghost">SIGN IN</Link>
            <Link to="/home" className="btn-ghost">Home</Link>
            <button className="burger" aria-label="Menu"><span/><span/><span/></button>
          </div>
        </div>
        <div className="hero-pane">
          <h1>Welcome.</h1>
          <p>Create an account to access the platform. Your profile helps personalize your experience.</p>
          <p className="tiny">New here? You’re in the right place.</p>
        </div>
      </section>
    </div>
  );
}
