import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import {migrateLegacyStorage} from './utils/storage';

// Upgrade legacy storage keys before any component reads them
migrateLegacyStorage();

createRoot(document.getElementById('root')!).render(<App />);

// PWA: register service worker after first paint (only where it can run).
if ('serviceWorker' in navigator && import.meta.env.PROD) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').catch((err) => {
      console.warn('Service worker registration failed:', err);
    });
  });
}