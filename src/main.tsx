import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import ErrorBoundary from './components/ErrorBoundary.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </StrictMode>,
)

// Réinitialisation unique : vider caches + localStorage
const RESET_KEY = 'wave_reset_v3';
if (!localStorage.getItem(RESET_KEY)) {
  // Supprimer toutes les clés wave_*
  Object.keys(localStorage)
    .filter(k => k.startsWith('wave_') || k.startsWith('now_'))
    .forEach(k => localStorage.removeItem(k));
  localStorage.setItem(RESET_KEY, '1');
  // Désenregistrer les anciens SW + vider les caches
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.getRegistrations().then(regs =>
      regs.forEach(r => r.unregister())
    );
  }
  caches.keys().then(keys => keys.forEach(k => caches.delete(k)));
}

// Enregistrement du service worker (PWA)
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').catch(() => {});
  });
}
