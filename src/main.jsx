import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import { initSync } from './sync';
import './styles.css';
import './v2.css';
import './revise.css';
import './pages.css';
import './theme.css';
import './brutal.css';
import './polish.css';
import './mobile.css';
import './meme-img.css';

import './features.css';
import './ink.css';
import './rework.css';
import './ascii.css';
import './portal.js';
import './decrypt.js';
import './fx.js';
import './dissolve.js';
import './inkshader.js';
import './mathhand.js';

initSync();
createRoot(document.getElementById('root')).render(<App />);

// Offline / installable app (website only; the Android app bundles its files already)
if ('serviceWorker' in navigator && import.meta.env.PROD && location.protocol === 'https:' && !window.Capacitor) {
  window.addEventListener('load', () => navigator.serviceWorker.register('./sw.js').catch(() => {}));
}
