import React from 'react'; // Ensure React is imported
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';

import 'bootstrap/dist/css/bootstrap.min.css'; // Corrected bootstrap import
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; // Ensure JS is bundled correctly

// Check if the root element is properly found
const rootElement = document.getElementById('root');
if (rootElement) {
  createRoot(rootElement).render(
    <StrictMode>
      <App />
    </StrictMode>
  );
} else {
  console.error("Root element not found! Check your index.html for <div id='root'>.");
}
