// Safeguard to prevent "Cannot set property fetch of #<Window> which has only a getter" error in secure iframe environments
try {
  let currentFetch = window.fetch;
  Object.defineProperty(window, 'fetch', {
    configurable: true,
    enumerable: true,
    get() {
      return currentFetch;
    },
    set(val) {
      currentFetch = val;
    }
  });
} catch (e) {
  console.warn("Could not redeclare window.fetch setter helper:", e);
}

import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
