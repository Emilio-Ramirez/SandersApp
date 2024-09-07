// src/utils/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:4000',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');

    if (token && userId) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${token}`,
        'X-User-ID': userId,
      };
    }
    return config;
  },
  error => Promise.reject(error)
);

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Emit a custom event for unauthorized errors
      window.dispatchEvent(new CustomEvent('authError'));
    }
    return Promise.reject(error);
  }
);

export default api;
