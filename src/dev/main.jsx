import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App';
import '../tokens/index.css';
import './dev.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
