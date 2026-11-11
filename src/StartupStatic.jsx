import { useEffect, useState } from 'react';
import './StartupStatic.css';

export default function StartupStatic() {
  const [visible, setVisible] = useState(() => !window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  const [resolving, setResolving] = useState(false);

  useEffect(() => {
    if (!visible) return;
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const onPreferenceChange = () => {
      if (preference.matches) setVisible(false);
    };
    let cancelled = false;
    let finish;
    let minimum;
    let maximum;
    // Let typography settle, but never hold the page for a slow font request.
    const briefHold = new Promise(resolve => { minimum = window.setTimeout(resolve, 160); });
    const fontBudget = new Promise(resolve => { maximum = window.setTimeout(resolve, 600); });
    Promise.all([briefHold, Promise.race([document.fonts.ready, fontBudget])]).then(() => {
      if (cancelled) return;
      setResolving(true);
      finish = window.setTimeout(() => setVisible(false), 1800);
    });
    preference.addEventListener('change', onPreferenceChange);
    return () => {
      cancelled = true;
      window.clearTimeout(minimum);
      window.clearTimeout(maximum);
      window.clearTimeout(finish);
      preference.removeEventListener('change', onPreferenceChange);
    };
  }, [visible]);

  if (!visible) return null;

  return <div className="startup-static" data-resolving={resolving} aria-hidden="true">
    <div className="startup-static-veil" />
    <svg className="startup-static-grain" width="100%" height="100%" focusable="false">
      <filter id="startup-static-grain" x="0" y="0" width="100%" height="100%">
        <feTurbulence type="fractalNoise" baseFrequency=".72" numOctaves="1" seed="17" stitchTiles="stitch" />
        <feColorMatrix type="saturate" values="0" />
        <feComponentTransfer>
          <feFuncR type="linear" slope="1.6" intercept="-.3" />
          <feFuncG type="linear" slope="1.6" intercept="-.3" />
          <feFuncB type="linear" slope="1.6" intercept="-.3" />
        </feComponentTransfer>
      </filter>
      <rect width="100%" height="100%" filter="url(#startup-static-grain)" />
    </svg>
  </div>;
}
