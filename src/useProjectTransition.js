import { useLayoutEffect, useRef, useState } from 'react';
import { flushSync } from 'react-dom';
import { projectModules } from './projectModules';

// Keep one live view mounted; swap it only while the curtain covers the page.
export default function useProjectTransition(target, reducedMotion, navigationRequest = 0) {
  const [displayed, setDisplayed] = useState(target);
  const shown = useRef(target);
  const lastNavigationRequest = useRef(navigationRequest);
  const panel = useRef(null);
  const surface = useRef(null);
  const chrome = useRef(null);
  const curtain = useRef(null);

  useLayoutEffect(() => {
    const fromNavigation = navigationRequest !== lastNavigationRequest.current;
    lastNavigationRequest.current = navigationRequest;
    if (target === shown.current && !fromNavigation) return;
    let cancelled = false;
    let frame;
    let fallback;
    const animations = [];
    const overlay = curtain.current;
    const sheet = overlay.firstElementChild;
    const commit = () => {
      if (cancelled || shown.current === target) return;
      shown.current = target;
      flushSync(() => setDisplayed(target));
    };
    const clear = () => {
      cancelAnimationFrame(frame);
      clearTimeout(fallback);
      animations.forEach(animation => animation.cancel());
      overlay.hidden = true;
    };
    const finish = () => { commit(); cancelled = true; clear(); };
    const onVisibility = () => { if (document.hidden) finish(); };
    const animate = (node, frames, options) => {
      const animation = node.animate(frames, { ...options, fill: 'both' });
      animations.push(animation);
      return animation;
    };

    // Animate every view change, whether it came from a control or browser history.
    if (reducedMotion || document.hidden || !panel.current?.animate) {
      shown.current = target;
      setDisplayed(target);
      return;
    }

    async function run() {
      // Intent preloading usually makes this immediate. Slow imports leave the
      // current project usable instead of revealing a loading flash mid-swipe.
      try { await projectModules[target]?.(); } catch { /* Let the route render its normal error. */ }
      if (cancelled || (shown.current === target && !fromNavigation)) return;
      const bounds = surface.current.getBoundingClientRect();
      const top = Math.max(0, chrome.current.getBoundingClientRect().bottom + 4);
      Object.assign(overlay.style, { top: `${top}px`, left: `${bounds.left}px`, width: `${bounds.width}px` });
      overlay.hidden = false;
      const duration = 620;
      const travel = animate(sheet, [{ transform: 'translateY(101%)' }, { transform: 'translateY(-101%)' }],
        { duration, easing: 'cubic-bezier(.55,0,.25,1)' });
      animate(panel.current, [{ transform: 'translateY(0)' }, { transform: 'translateY(-24px)' }],
        { duration: duration * .75, easing: 'cubic-bezier(.42,0,.7,.6)' });
      let swapped = false;
      let arrival;
      const watch = () => {
        if (cancelled) return;
        // Read animation timing, not computed styles on every frame.
        const progress = travel.effect.getComputedTiming().progress;
        if (!swapped && progress >= .47) {
          swapped = true;
          commit();
          // Main navigation removes the project tabs above the curtain.
          overlay.style.top = `${Math.max(0, chrome.current.getBoundingClientRect().bottom + 4)}px`;
          arrival = animate(panel.current, [{ transform: 'translateY(24px)' }, { transform: 'translateY(0)' }],
            { duration: Math.max(1, duration - Number(travel.currentTime || 0)), easing: 'cubic-bezier(.16,1,.3,1)' });
        }
        if (!swapped) frame = requestAnimationFrame(watch);
      };
      frame = requestAnimationFrame(watch);
      fallback = window.setTimeout(finish, 900);
      try {
        await travel.finished;
        if (arrival) await arrival.finished;
        if (!cancelled) finish();
      } catch { /* Interrupted navigation cancels the old transition. */ }
    }
    // User input and viewport changes always take priority over the animation.
    window.addEventListener('pointerdown', finish, { passive: true });
    window.addEventListener('wheel', finish, { passive: true });
    window.addEventListener('touchmove', finish, { passive: true });
    window.addEventListener('keydown', finish);
    window.addEventListener('resize', finish);
    document.addEventListener('visibilitychange', onVisibility);
    run();
    return () => {
      cancelled = true;
      clear();
      window.removeEventListener('pointerdown', finish);
      window.removeEventListener('wheel', finish);
      window.removeEventListener('touchmove', finish);
      window.removeEventListener('keydown', finish);
      window.removeEventListener('resize', finish);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, [target, reducedMotion, navigationRequest]);

  return { displayed, panel, surface, chrome, curtain };
}
