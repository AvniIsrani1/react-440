import React, { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';
import api from '../../api';

export default function BlogPost() {//define variables for post fields
  const { user } = useContext(AuthContext);
  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {//user pressed submit
    e.preventDefault();
    try {
      const res = await api.post('http://localhost:3000/blog', {//make request to server
        subject,
        description,
        tags
      });
      setMessage('Blog posted successfully!');//successful post
    } catch (err) {
      const msg = err.response?.data?.message;//post failed
      if (msg?.includes('limit')) {
        setMessage('You have reached your daily limit of 2 blog posts.');//limit reached
      } else {
        setMessage(msg || 'Error posting blog.');//set user message about error
      }
    }
  };

  return (
    <div>
      <h2>Post a Blog</h2>
      <form onSubmit={handleSubmit}>
        <input /*subject field*/
          value={subject}
          onChange={e => setSubject(e.target.value)}
          placeholder="Subject"
          required
        />
        <textarea /*description field*/
          value={description}
          onChange={e => setDescription(e.target.value)}
          placeholder="Description"
          required
        />
        <input /*tags field*/
          value={tags}
          onChange={e => setTags(e.target.value)}
          placeholder="Tags (comma-separated)"
          required
        />
        <button type="submit">Submit</button>{/*submit button*/}
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}
