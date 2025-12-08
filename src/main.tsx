import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Fix viewport height for older mobile browsers
const setVH = () => {
  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
};

// Set on load
setVH();

// Update on resize/orientation change
window.addEventListener('resize', setVH);
window.addEventListener('orientationchange', setVH);

createRoot(document.getElementById("root")!).render(<App />);
