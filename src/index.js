import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';
import App from './App';
import ListaPessoas from './ListaPessoas';
import reportWebVitals from './reportWebVitals';
import EditarPessoa from './EditarPessoa';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/lista" element={<ListaPessoas />} />
        <Route path="/editar/:id" element={<EditarPessoa />} />
        <Route path="/" element={<ListaPessoas />} />
        <Route path="/editar/:id" element={<EditarPessoa />} />
      </Routes>
    </Router>
  </React.StrictMode>
);

reportWebVitals();
