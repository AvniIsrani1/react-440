import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../api';
import '../../styles/variables.css';
import './SignUp.css';
import Welcome from '../../common/Welcome/Welcome';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons'; 

export default function SignUp() {
  const [form, setForm] = useState({
    username: '', password: '', confirmPassword: '',
    firstName: '', lastName: '', email: '', phone: ''
  });
  const [msg, setMsg] = useState('');
  const [busy, setBusy] = useState(false);

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setMsg('');
    if (form.password !== form.confirmPassword) {
      setMsg('Passwords do not match');
      return;
    }
    setBusy(true);
    try {
      await api.post('/auth/register', form);
      setMsg('Registered! You can now sign in.');
      setForm({
        username: '', password: '', confirmPassword: '',
        firstName: '', lastName: '', email: '', phone: ''
      });
    } catch (err) {
      const s = err?.response?.data;
      setMsg(s?.message || s?.error || 'Error registering');
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="auth-shell">
      <section className="auth-card">
        <div className="brand">
          <FontAwesomeIcon icon={faPencilAlt} className="pencil-icon" />
          <span>Sign Up</span>
        </div>

        <form onSubmit={submit} className="form">
          <input name="username" placeholder="Username" value={form.username} onChange={onChange} maxLength={50} required />
          <div className="row">
            <input name="firstName" placeholder="First name" value={form.firstName} onChange={onChange} maxLength={50} required />
            <input name="lastName" placeholder="Last name" value={form.lastName} onChange={onChange} maxLength={50} required />
          </div>
          <input type="email" name="email" placeholder="Email" value={form.email} onChange={onChange} maxLength={255} required />
          <input name="phone" placeholder="Phone" value={form.phone} onChange={onChange} maxLength={15} required />
          <input type="password" name="password" placeholder="Password" value={form.password} maxLength={255} onChange={onChange} required />
          <input type="password" name="confirmPassword" placeholder="Confirm password" value={form.confirmPassword}  maxLength={255} onChange={onChange} required />

          <button className="btn-primary" type="submit" disabled={busy}>
            {busy ? 'Creating…' : 'Create account'}
          </button>

          {msg && <p className={`note ${msg.startsWith('Registered!') ? 'ok' : 'err'}`}>{msg}</p>}
          <p className="small">Already have an account? <Link to="/login">Sign in</Link></p>
        </form>
      </section>
      
      <Welcome />
    </div>
  );
}
