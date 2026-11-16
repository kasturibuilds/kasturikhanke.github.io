import { useEffect, useRef } from 'react';
import { useReducedMotion } from 'framer-motion';

// Native controls are the default; silent autoplay demos can opt out.
export default function PortfolioVideo({ autoPlay, controls = true, ...props }) {
  const ref = useRef(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const video = ref.current;
    let visible = false;
    let userPaused = false;
    let systemPaused = true;
    const update = () => {
      if (!visible || document.hidden || (autoPlay && reducedMotion)) {
        systemPaused = true;
        video.pause();
      } else if (autoPlay && !reducedMotion && !userPaused) {
        systemPaused = false;
        video.play().catch(() => {});
      }
    };
    const onPause = () => { if (!systemPaused) userPaused = true; };
    const onPlay = () => { userPaused = false; systemPaused = false; };
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      update();
    });
    observer.observe(video);
    video.addEventListener('pause', onPause);
    video.addEventListener('play', onPlay);
    document.addEventListener('visibilitychange', update);
    return () => {
      observer.disconnect();
      video.removeEventListener('pause', onPause);
      video.removeEventListener('play', onPlay);
      document.removeEventListener('visibilitychange', update);
    };
  }, [autoPlay, reducedMotion]);

  return <video {...props} ref={ref} controls={controls} preload="metadata" />;
}
