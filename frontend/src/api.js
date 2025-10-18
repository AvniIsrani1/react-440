// src/api.js
import axios from 'axios';

// Point this to your backend (NestJS). Change port if needed.
const API_BASE = process.env.REACT_APP_API_BASE || 'http://localhost:3000';

const api = axios.create({
  baseURL: API_BASE,
  headers: { 'Content-Type': 'application/json' },
});

// ✅ named export so Login can import it
export const setAuthToken = (token) => {
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common['Authorization'];
  }
};

export default api;
