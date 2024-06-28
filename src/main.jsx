import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, HashRouter } from 'react-router-dom';
import App from './components/App/App.jsx';
import './css/main.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HashRouter basename="/Countries-API-Implementation">
      <App />
    </HashRouter>
  </React.StrictMode>,
);
