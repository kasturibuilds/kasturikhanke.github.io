import { useCallback, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useReducedMotion } from 'framer-motion';
import './ProjectGallery.css';
import VideoGallery from './VideoGallery';
import ProjectVideoPreview from './ProjectVideoPreview';
import { contactEmail } from './PortfolioSections';

import { slides } from './portfolioProjects';

const clamp = (value, min, max) => Math.max(min, Math.min(max, value));

export default function ProjectGallery() {
  const scroller = useRef(null);
  const drag = useRef(null);
  const details = useRef(null);
  const animation = useRef(0);
  const snapTimer = useRef(0);
  const targetStation = useRef(0);
  const [panel, setPanel] = useState(null);
  const [aboutOpen, setAboutOpen] = useState(false);
  const aboutHeading = useRef(null);
  const aboutButton = useRef(null);
  const resumeFilm = useRef(false);
  const closeAbout = () => { setAboutOpen(false); aboutButton.current?.focus(); };
  const reducedMotion = useReducedMotion();
  const [previewsPaused, setPreviewsPaused] = useState(false);
  const [size, setSize] = useState({ width: 1200, height: 650 });
  const [progress, setProgress] = useState(0);
  const step = size.width;
  const position = useRef(0);
  const active = Math.round(progress);
  const current = slides[active];
  const selectedProject = slides.find(slide => slide.theme === panel);
  const tuning = reducedMotion ? 0 : Math.pow(Math.sin(Math.PI * (progress % 1)), 0.9);

  const updatePosition = useCallback(value => {
    position.current = clamp(value, 0, slides.length - 1);
    setProgress(position.current);
  }, []);

  const goTo = useCallback((index, smooth = true) => {
    setAboutOpen(false);
    clearTimeout(snapTimer.current);
    cancelAnimationFrame(animation.current);
    const target = clamp(index, 0, slides.length - 1);
    targetStation.current = target;
    const origin = position.current;
    if (!smooth || reducedMotion || Math.abs(target - origin) < .001) {
      updatePosition(target);
      return;
    }
    const start = performance.now();
    const frame = now => {
      const t = Math.min((now - start) / 280, 1);
      updatePosition(origin + (target - origin) * (1 - (1 - t) ** 3));
      if (t < 1) animation.current = requestAnimationFrame(frame);
    };
    animation.current = requestAnimationFrame(frame);
  }, [reducedMotion, updatePosition]);

  useEffect(() => () => { cancelAnimationFrame(animation.current); clearTimeout(snapTimer.current); }, []);

  useEffect(() => {
    if (panel) {
      details.current.showModal();
      scroller.current.querySelectorAll('video').forEach(video => video.pause());
    }
  }, [panel]);

  useEffect(() => {
    const film = scroller.current.querySelector('.slide-film video');
    if (aboutOpen) {
      clearTimeout(snapTimer.current);
      cancelAnimationFrame(animation.current);
      updatePosition(Math.round(position.current));
      drag.current = null;
      resumeFilm.current = !!film && !film.paused;
      scroller.current.querySelectorAll('video').forEach(video => video.pause());
      aboutHeading.current?.focus({ preventScroll: true });
    } else if (resumeFilm.current) {
      if (Math.round(position.current) === 0) film?.play().catch(() => {});
      resumeFilm.current = false;
    }
  }, [aboutOpen, updatePosition]);

  useEffect(() => {
    const node = scroller.current;
    const observer = new ResizeObserver(([entry]) => setSize({ width: entry.contentRect.width, height: entry.contentRect.height }));
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const node = scroller.current;
    const handleWheel = event => {
      if (aboutOpen || event.ctrlKey || details.current?.open || drag.current && !drag.current.released) return;
      event.preventDefault();
      const unit = event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? node.clientWidth : 1;
      cancelAnimationFrame(animation.current);
      const delta = Math.abs(event.deltaX) > Math.abs(event.deltaY) ? event.deltaX : event.deltaY;
      const next = clamp(position.current + delta * unit / Math.max(240, node.clientWidth * .55), 0, slides.length - 1);
      targetStation.current = next;
      updatePosition(next);
      clearTimeout(snapTimer.current);
      snapTimer.current = setTimeout(() => goTo(Math.round(position.current)), 160);
    };
    window.addEventListener('wheel', handleWheel, { passive: false });
    return () => { window.removeEventListener('wheel', handleWheel); clearTimeout(snapTimer.current); };
  }, [updatePosition, goTo, aboutOpen]);

  useEffect(() => {
    scroller.current.querySelectorAll('.slide-film video').forEach(video => { if (current.theme !== 'film') video.pause(); });
  }, [current.theme]);

  const handleKeys = event => {
    if (event.target.closest('video, .case-video-controls')) return;
    if (!['ArrowRight', 'ArrowLeft', 'Home', 'End'].includes(event.key)) return;
    event.preventDefault();
    goTo(event.key === 'Home' ? 0 : event.key === 'End' ? slides.length - 1 : Math.round(targetStation.current) + (event.key === 'ArrowRight' ? 1 : -1));
  };

  return <div className="portfolio-concept site-player horizontal-player corner-player" data-previews-paused={reducedMotion} onKeyDown={event => { if (aboutOpen && event.key === 'Escape') { event.preventDefault(); closeAbout(); } }}>
    <button className="page-corner corner-name" onClick={() => goTo(0)}><strong>Kasturi Khanke</strong><span className="corner-role">Product designer + builder</span><span className="corner-positioning">I design and build AI products from first idea to millions of users.</span></button>
    <button className="page-corner corner-about" ref={aboutButton} onClick={() => aboutOpen ? closeAbout() : setAboutOpen(true)} aria-expanded={aboutOpen} aria-controls="receiver-about"><strong>About</strong><span>Designer & builder, SF</span></button>
    <Link className="page-corner corner-pricing" to="/work-with-me"><strong>2–4 week product sprints →</strong><span>Product design · Prototyping · Design engineering</span><span>From $15k</span></Link>
    <button className="page-corner corner-contact" onClick={() => setPanel('contact')} aria-haspopup="dialog"><strong>Start a project →</strong><span><i /> Available for select projects</span></button>
    <div className="receiver-group"><section className="gallery-radio radio-gallery" aria-label="Kasturi Khanke portfolio player">
      <div className="radio-display">
        {aboutOpen && <section id="receiver-about" className="receiver-about" aria-labelledby="receiver-about-title">
          <div className="receiver-about-top"><p>ABOUT / KASTURI KHANKE</p><button type="button" onClick={closeAbout}>Back to work</button></div>
          <div className="receiver-about-copy"><p className="receiver-about-location">San Francisco, CA</p>
            <h1 id="receiver-about-title" ref={aboutHeading} tabIndex={-1}>Hi, I’m Kasturi.</h1>
            <p>I design and build AI products. At Adobe and independently, I work across product strategy, design, and code.</p>
          </div>
          <dl className="receiver-about-facts"><div><dt>900M+</dt><dd>Users reached</dd></div><div><dt>74k+</dt><dd>Library installs</dd></div><div><dt>2</dt><dd>0→1 products</dd></div></dl>
          <a className="receiver-about-archive" href="/2025/">Archive / 2025</a>
        </section>}

        <main className="player-deck" ref={scroller} inert={aboutOpen ? '' : undefined} aria-hidden={aboutOpen || undefined} style={{ opacity: aboutOpen ? 0 : 1, visibility: aboutOpen ? 'hidden' : undefined }} aria-label="Portfolio slides. Scroll horizontally or use arrow keys to explore." tabIndex={0}
          onKeyDown={handleKeys}
          onPointerDown={event => {
            if (!event.isPrimary || event.button !== 0 || event.target.closest('a, input, button, .case-video-controls')) return;
            cancelAnimationFrame(animation.current);
            clearTimeout(snapTimer.current);
            drag.current = { id: event.pointerId, x: event.clientX, y: event.clientY, origin: position.current, start: Math.round(position.current), axis: null, moved: false };
          }}
          onPointerMove={event => {
            const gesture = drag.current;
            if (!gesture || gesture.released || event.pointerId !== gesture.id) return;
            const dx = gesture.x - event.clientX;
            const dy = gesture.y - event.clientY;
            if (!gesture.axis && Math.max(Math.abs(dx), Math.abs(dy)) > 4) gesture.axis = Math.abs(dx) >= Math.abs(dy) ? 'x' : 'y';
            const delta = gesture.axis === 'y' ? dy : dx;
            if (Math.abs(delta) > 4 || gesture.moved) {
              gesture.moved = true;
              event.currentTarget.setPointerCapture(event.pointerId);
              updatePosition(gesture.origin + delta / Math.max(240, step * .55));
            }
          }}
          onPointerUp={event => {
            const gesture = drag.current;
            if (!gesture || event.pointerId !== gesture.id) return;
            gesture.released = true;
            if (gesture.moved) {
              goTo(Math.round(position.current));
            } else goTo(gesture.start);
          }}
          onPointerCancel={() => {
            if (drag.current) goTo(drag.current.start);
            drag.current = null;
          }}
          onClickCapture={event => {
            if (drag.current?.moved) { event.preventDefault(); event.stopPropagation(); }
            drag.current = null;
          }}>
          <div className="player-deck-track" style={{ width: size.width }}>
            {slides.map((slide, index) => {
              const videoName = slide.video || slide.theme;
              const poster = slide.demo ? `/previews/${videoName}.jpg${slide.mediaVersion ? `?v=${slide.mediaVersion}` : ''}` : `/thumbnails/photographic-${slide.theme}.png`;
              const preview = slide.demo
                ? <ProjectVideoPreview name={videoName} version={slide.mediaVersion} poster={poster} active={index === active && !panel && !aboutOpen} paused={previewsPaused || reducedMotion} />
                : <span className="project-video-preview"><img src={poster} alt="" draggable="false" loading={index === active ? 'eager' : 'lazy'} /></span>;
              const distance = index - progress;
              const separation = Math.min(Math.abs(distance), 1);
              return <section key={slide.theme} className={`player-slide slide-${slide.theme}`} aria-label={`${index + 1} of ${slides.length}: ${slide.title}`} aria-roledescription="slide" inert={index !== active ? '' : undefined} style={{ width: size.width, height: size.height, left: 0,
                transform: `translate3d(${(reducedMotion ? 0 : distance * step * .012 + tuning * Math.sin(progress * 93) * 1)}px, 0, 0)`,
                opacity: reducedMotion ? Number(index === active) : 1 - separation,
                filter: reducedMotion || separation < .002 ? 'none' : `blur(${separation}px)`,
                visibility: Math.abs(distance) >= 1 ? 'hidden' : 'visible',
                zIndex: index === active ? 2 : 1,
              }}>
                {slide.theme === 'film' ? <VideoGallery /> : slide.theme === 'studio' ? <div className="studio-preview"><p>Independent studio · San Francisco</p><h1>First idea.<br />Next big thing.</h1><Link to="/work-with-me">Work with me</Link></div> :
                  slide.external ? <a className={`project-image project-${slide.theme}`} href={slide.path} target="_blank" rel="noopener noreferrer" aria-label={`Explore ${slide.title} (opens in a new tab)`}>
                    {preview}
                  </a> : <button type="button" className={`project-image project-${slide.theme}`} aria-label={`View ${slide.title} summary`} aria-haspopup="dialog" onClick={() => setPanel(slide.theme)}>
                    {preview}
                  </button>}
              </section>;
            })}
          </div>
        </main>
        <div className="signal-interference" aria-hidden="true" data-tuning={tuning > .01} style={{ opacity: tuning * .38 }}>
          <svg className="signal-grain" width="100%" height="100%">
            <filter id="receiver-grain" x="0" y="0" width="100%" height="100%">
              <feTurbulence type="fractalNoise" baseFrequency=".72" numOctaves="1" seed={Math.floor(progress * 120) % 97} stitchTiles="stitch" />
              <feColorMatrix type="saturate" values="0" />
              <feComponentTransfer>
                <feFuncR type="linear" slope="1.6" intercept="-.3" />
                <feFuncG type="linear" slope="1.6" intercept="-.3" />
                <feFuncB type="linear" slope="1.6" intercept="-.3" />
              </feComponentTransfer>
            </filter>
            <rect width="100%" height="100%" filter="url(#receiver-grain)" />
          </svg>
          <span className="signal-scanlines" />
          <span className="signal-tracking" />
        </div>
      </div>
      <footer className="radio-gallery-controls">
        <div className="radio-now-playing">{aboutOpen ? <><span>About me</span><p className="radio-project-detail">Designer & builder · San Francisco</p></> : <>{current.path ? <Link to={current.path} target={current.external ? '_blank' : undefined} rel={current.external ? 'noopener noreferrer' : undefined}>{current.title}</Link> : <button type="button" className="project-summary-trigger" aria-haspopup="dialog" onClick={() => setPanel(current.theme)}>{current.title} <span aria-hidden="true">+</span></button>}<p className="radio-project-detail">{current.detail}</p></>}</div>
        <div className="gallery-scrubber">
          <div className="radio-scale-window" aria-hidden="true"><div className="radio-scale" style={{ transform: `translateX(${-progress * 100}px)` }}>{Array.from({ length: slides.length * 10 + 40 }, (_, i) => {
            const mark = i - 20;
            return <span key={i} className={`radio-tick${mark % 10 === 0 ? ' radio-tick-major' : ''}`} style={{ left: mark * 10 }}>{mark % 10 === 0 && <span>{101 + mark / 10}</span>}</span>;
          })}</div></div>
          <span className="radio-needle" aria-hidden="true" />
          <input type="range" min="0" max={slides.length - 1} step="0.01" value={progress} aria-label="Browse portfolio slides" aria-valuetext={`${current.title}, slide ${active + 1} of ${slides.length}`} onKeyDown={handleKeys} onChange={event => goTo(Number(event.target.value), false)} onPointerUp={event => goTo(Math.round(Number(event.currentTarget.value)))} />
        </div>
        <div className="player-status"><span className="player-position" aria-hidden="true">{aboutOpen ? 'ABOUT' : `${String(active + 1).padStart(2, '0')} / ${String(slides.length).padStart(2, '0')}`}</span>
          {!aboutOpen && current.demo && !reducedMotion && <button className="preview-pause" type="button" aria-label={previewsPaused ? 'Play thumbnail videos' : 'Pause thumbnail videos'} aria-pressed={previewsPaused} onClick={() => setPreviewsPaused(value => !value)}>{previewsPaused ? 'Play' : 'Pause'}</button>}
        </div>
      </footer>
      <p className="gallery-sr-only" aria-live="polite">{aboutOpen ? 'About Kasturi. Press Escape or Back to work to return to the portfolio.' : `${current.title}. ${current.detail}. Slide ${active + 1} of ${slides.length}`}</p>
    </section>
      <div className="receiver-balance-space" aria-hidden="true" />
    </div>
    <dialog ref={details} className="corner-dialog" aria-labelledby="corner-dialog-title" onClose={() => setPanel(null)} onClick={event => { if (event.target === event.currentTarget) details.current.close(); }}>
      <div className="corner-dialog-content">
        <button className="corner-dialog-close" aria-label="Close details" onClick={() => details.current.close()}>×</button>
        {selectedProject ? <>
          <p className="corner-eyebrow">Project snapshot</p>
          <h2 id="corner-dialog-title">{selectedProject.title}</h2>
          <p>{selectedProject.detail}</p>
          <dl className="project-summary-facts">
            {selectedProject.facts.map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}
          </dl>
        </> : <>
          <p className="corner-eyebrow">Taking on select client projects</p><h2 id="corner-dialog-title">Let’s make something.</h2><a className="corner-email" href={`mailto:${contactEmail}`}>{contactEmail}</a>
          <div className="corner-socials"><a href="https://www.linkedin.com/in/kasturikhanke/" target="_blank" rel="noopener noreferrer">LinkedIn</a><a href="https://github.com/kasturibuilds" target="_blank" rel="noopener noreferrer">GitHub</a></div>
        </>}
      </div>
    </dialog>
  </div>;
}
