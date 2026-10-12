import React from 'react';
import ReactDOM from 'react-dom/client';
import axios from 'axios';
import App from './App.jsx';
import './index.css';

const backendUrl = import.meta.env.VITE_BACKEND_URL;
if (backendUrl) {
  axios.defaults.baseURL = backendUrl.replace(/\/$/, '');
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
