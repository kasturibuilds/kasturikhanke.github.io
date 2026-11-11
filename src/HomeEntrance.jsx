import { useEffect, useState } from 'react';
import './HomeEntrance.css';

// Play at most once on the initial homepage entry, never on logo taps or return navigation.
const entry = new URL(window.location.href);
const isHomeEntry = entry.pathname === '/' && !entry.search && !entry.hash;
let hasEntered = false;

export default function HomeEntrance() {
  const [visible, setVisible] = useState(() => isHomeEntry && !hasEntered
    && window.scrollY === 0 && !window.matchMedia('(prefers-reduced-motion: reduce)').matches);

  useEffect(() => {
    hasEntered = true;
    if (!visible) return;
    const dismiss = () => setVisible(false);
    // Interaction takes priority over the introduction. Nothing underneath is locked.
    window.addEventListener('pointerdown', dismiss, { passive: true });
    window.addEventListener('keydown', dismiss);
    window.addEventListener('wheel', dismiss, { passive: true });
    window.addEventListener('touchmove', dismiss, { passive: true });
    const fallback = window.setTimeout(dismiss, 1500);
    return () => {
      window.removeEventListener('pointerdown', dismiss);
      window.removeEventListener('keydown', dismiss);
      window.removeEventListener('wheel', dismiss);
      window.removeEventListener('touchmove', dismiss);
      window.clearTimeout(fallback);
    };
  }, [visible]);

  if (!visible) return null;
  return <div className="home-entrance" aria-hidden="true" onAnimationEnd={() => setVisible(false)}>
    <div className="home-entrance-identity"><span>Kasturi Khanke</span><span className="home-entrance-role">AI designer</span></div>
  </div>;
}
