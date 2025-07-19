import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import "../src/utils/socket.js"; 
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom';
import { store } from './redux/store.js'
import { Provider } from 'react-redux'
import React from 'react';

const rootElement = document.getElementById('root');
if (rootElement) {
  createRoot(rootElement).render(
    <StrictMode>
      <BrowserRouter>
        <Provider store={store}>
          <App />
        </Provider>
      </BrowserRouter>
    </StrictMode>,
  );
} else {
  throw new Error("Root element not found");
}
