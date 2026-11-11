/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'framer-motion';
import './CaseStudyVideo.css';

const timeLabel = value => `${Math.floor(value / 60)}:${String(Math.floor(value % 60)).padStart(2, '0')}`;

export default function CaseStudyVideo({ children, captions, onPlay, onPause, onError, ...props }) {
  const video = useRef(null);
  const player = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(props.muted ?? false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [fullscreen, setFullscreen] = useState(false);
  const [error, setError] = useState('');
  const [captionsVisible, setCaptionsVisible] = useState(false);
  const label = props['aria-label'] || 'Product interaction demo';

  useEffect(() => {
    const updateFullscreen = () => setFullscreen(document.fullscreenElement === player.current);
    document.addEventListener('fullscreenchange', updateFullscreen);
    return () => document.removeEventListener('fullscreenchange', updateFullscreen);
  }, []);

  useEffect(() => {
    const tracks = video.current.textTracks;
    const updateCaptions = () => setCaptionsVisible(Array.from(tracks).some(track => track.mode === 'showing'));
    tracks.addEventListener('change', updateCaptions);
    return () => tracks.removeEventListener('change', updateCaptions);
  }, []);

  const toggleCaptions = () => {
    const track = video.current.textTracks[0];
    if (track) {
      track.mode = captionsVisible ? 'disabled' : 'showing';
      setCaptionsVisible(track.mode === 'showing');
    }
  };

  const togglePlayback = async () => {
    const node = video.current;
    if (!node.paused) {
      userPaused.current = true;
      node.pause();
      return;
    }
    try {
      await node.play();
      setError('');
    } catch {
      setError('Unable to play this video. Try again.');
    }
  };

  const toggleFullscreen = async () => {
    try {
      if (document.fullscreenElement === player.current) await document.exitFullscreen();
      else if (player.current.requestFullscreen) await player.current.requestFullscreen();
      else if (video.current.webkitEnterFullscreen) video.current.webkitEnterFullscreen();
    } catch {
      setError('Fullscreen is unavailable in this browser.');
    }
  };
  const systemPaused = useRef(true);
  const userPaused = useRef(false);
  const reducedMotion = useReducedMotion();
  const [inView, setInView] = useState(false);
  const [pageVisible, setPageVisible] = useState(() => !document.hidden);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setInView(entry.isIntersecting && entry.intersectionRatio >= 0.1);
    }, { threshold: [0, 0.1] });
    observer.observe(video.current);
    const updateVisibility = () => setPageVisible(!document.hidden);
    document.addEventListener('visibilitychange', updateVisibility);
    return () => {
      observer.disconnect();
      document.removeEventListener('visibilitychange', updateVisibility);
    };
  }, []);

  useEffect(() => {
    const node = video.current;
    if (!inView || !pageVisible || reducedMotion) {
      systemPaused.current = true;
      node.pause();
    } else if (!userPaused.current) {
      systemPaused.current = false;
      node.play().catch(() => {});
    }
  }, [inView, pageVisible, reducedMotion]);

  return <div className="case-video-player" ref={player} role="group" aria-label={label}>
    <video
    {...props}
    ref={video}
    aria-label={label}
    controls={false}
    autoPlay={false}
    preload="none"
    onTimeUpdate={event => setCurrentTime(event.currentTarget.currentTime)}
    onDurationChange={event => setDuration(Number.isFinite(event.currentTarget.duration) ? event.currentTarget.duration : 0)}
    onVolumeChange={event => setMuted(event.currentTarget.muted)}
    onError={event => {
      setError('This video could not be loaded.');
      onError?.(event);
    }}
    onEnded={() => setPlaying(false)}
    onPlay={event => {
      setPlaying(true);
      systemPaused.current = false;
      userPaused.current = false;
      onPlay?.(event);
    }}
    onPause={event => {
      setPlaying(false);
      if (!systemPaused.current) userPaused.current = true;
      onPause?.(event);
    }}
  >{children}
    {captions && <track kind="captions" src={captions} srcLang="en" label="English" />}
  </video>
    <div className="case-video-controls">
      <button type="button" onClick={togglePlayback} aria-label={playing ? 'Pause video' : 'Play video'} title={playing ? 'Pause' : 'Play'}>
        <svg viewBox="0 0 24 24" aria-hidden="true">{playing ? <path d="M7 5h3v14H7zm7 0h3v14h-3z" /> : <path d="m8 5 11 7-11 7z" />}</svg>
      </button>
      <input className="case-video-seek" style={{ '--video-progress': `${duration ? Math.min(currentTime / duration, 1) * 100 : 0}%` }} type="range" min="0" max={duration || 0} step="0.1" value={Math.min(currentTime, duration)} disabled={!duration} aria-label="Seek video" aria-valuetext={`${timeLabel(currentTime)} of ${timeLabel(duration)}`} onChange={event => {
        video.current.currentTime = Number(event.target.value);
        setCurrentTime(Number(event.target.value));
      }} />
      <span className="case-video-time" aria-hidden="true">−{timeLabel(Math.max(0, duration - currentTime))}</span>
      <button type="button" onClick={() => { video.current.muted = !video.current.muted; }} aria-label={muted ? 'Unmute video' : 'Mute video'} title={muted ? 'Unmute' : 'Mute'}>
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 9h4l5-4v14l-5-4H3z" />{muted ? <path d="m16 9 6 6m0-6-6 6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /> : <path d="M16 8a6 6 0 0 1 0 8m3-11a10 10 0 0 1 0 14" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />}</svg>
      </button>
      {captions && <button type="button" onClick={toggleCaptions} aria-label="English captions" aria-pressed={captionsVisible} title={captionsVisible ? 'Hide captions' : 'Show captions'}>
        <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="2" y="5" width="20" height="14" rx="3" fill="none" stroke="currentColor" strokeWidth="1.6" /><path d="M10 9.5a3 3 0 1 0 0 5m8-5a3 3 0 1 0 0 5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /></svg>
      </button>}
      <button type="button" onClick={toggleFullscreen} aria-label={fullscreen ? 'Exit fullscreen' : 'Enter fullscreen'} title={fullscreen ? 'Exit fullscreen' : 'Fullscreen'}>
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d={fullscreen ? 'M9 3v6H3m12-6v6h6M9 21v-6H3m12 6v-6h6' : 'M9 3H3v6m12-6h6v6M3 15v6h6m12-6v6h-6'} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
      </button>
    </div>
    {error && <p className="case-video-error" role="status">{error} <a href={props.src}>Open video</a></p>}
  </div>;
}
