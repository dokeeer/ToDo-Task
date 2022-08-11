import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';


const root = ReactDOM.createRoot(document.getElementById('root'));
document.addEventListener("dragstart", function( event ) {
    event.dataTransfer.setDragImage(event.target, window.outerWidth, window.outerHeight);
}, false);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

