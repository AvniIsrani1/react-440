import React, { useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import api from '../../api';
import './BlogPost.css'; 
import notepad from "../../assets/Notepad_icon.svg.png";

export default function BlogPost() {
  const { user } = useContext(AuthContext);
  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    try {
      const res = await api.post('/blog', { subject, description, tags });
      setMessage('Blog posted successfully!');
      setSubject('');
      setDescription('');
      setTags('');
    } catch (err) {
      const msg = err.response?.data?.message;
      if (msg?.includes('Max 2 blogs')) {
        setMessage('You have reached your daily limit of 2 blog posts.');
      } else {
        setMessage(msg || 'Error posting blog.');
      }
    }
  };

  return (
    <div class="main-content">
      <section className="blogpost-hero">
        <div className="blogpost-pane">
            <h1>Share Your Thoughts</h1>

          <div className="hero-image-container">
            <img src={notepad} alt="Muse Notepad Icon" className="blog-hero-image" />
          </div>

          <form onSubmit={handleSubmit} className="blogpost-form">
            <input
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Subject"
              required
            />
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Description"
              required
            />
            <input
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder="Tags (comma-separated)"
              required
            />
            <button type="submit" className="btn-primary">Post Blog</button>
          </form>

          {message && <p className={`note ${message.includes('successfully') ? 'ok' : 'err'}`}>{message}</p>}
        </div>
      </section>
    </div>
  );
}
