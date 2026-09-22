import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Variedades from './components/Variedades.jsx'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Variedades/>
  </React.StrictMode>
);