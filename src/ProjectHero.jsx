import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useIsPresent, useReducedMotion } from 'framer-motion';
import { FaPause, FaPlay } from 'react-icons/fa';
import { projects } from './homeProjects';
import './ProjectHero.css';



function ProjectPreview({ project, visible, pageVisible, mediaPaused, reducedMotion, controlsProject, setControlsProject, setPaused }) {
  const video = useRef(null);
  const [failed, setFailed] = useState(false);
  const isPresent = useIsPresent();
  const isLaptop = project.video && !project.phone && !project.film;

  useEffect(() => {
    const node = video.current;
    if (!node) return;
    if (isPresent && visible && pageVisible && !mediaPaused && !reducedMotion) node.play().catch(() => {});
    else node.pause();
    return () => node.pause();
  }, [isPresent, visible, pageVisible, mediaPaused, reducedMotion]);

  return (
    <motion.div className={`project-hero-media ${project.video && !project.phone ? 'project-hero-wide' : 'project-hero-phone'} ${isLaptop ? 'project-hero-laptop' : ''}`} data-motion-paused={!visible || !pageVisible || !isPresent}
      initial={{ opacity: 0, scale: .98 }} animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: .98 }} transition={{ duration: reducedMotion ? 0 : .48, ease: [.22, 1, .36, 1] }}
      aria-hidden={!isPresent || undefined} inert={!isPresent ? '' : undefined}>
      <div className="project-hero-device">
      <div className="project-hero-screen">
      {/* Pointer movement reveals controls; a project swap alone must not. */}
      {project.video ? <video key={project.name} ref={video} src={project.video} poster={project.image} controls={controlsProject === project.name} tabIndex={0} muted loop={!project.film} playsInline preload="metadata" crossOrigin={project.film ? 'anonymous' : undefined} aria-label={project.name} onError={() => setFailed(true)}
        onPointerMove={() => setControlsProject(project.name)}
        onPointerLeave={event => { if (!event.currentTarget.matches(':focus-visible')) setControlsProject(null); }}
        onFocus={event => { if (event.currentTarget.matches(':focus-visible')) { setControlsProject(project.name); setPaused(true); } }}
        onBlur={() => setControlsProject(null)}
        onPointerDown={() => { setControlsProject(project.name); setPaused(true); }}
        onKeyDown={() => setPaused(true)}>
        {project.captions && <track kind="captions" src={project.captions} srcLang="en" label="English" />}
      </video> : <img src={project.image} alt={project.alt} />}
      </div>
      {isLaptop && <div className="project-hero-laptop-base" aria-hidden="true" />}
      </div>
      {failed && <p role="status">Video unavailable. <a href={project.href}>View {project.name}</a></p>}
    </motion.div>
  );
}

export default function ProjectHero() {
  const [index, setIndex] = useState(0);
  const [erasing, setErasing] = useState(false);
  const [typing, setTyping] = useState(false);
  const [revealKey, setRevealKey] = useState(0);
  const pauseAfterTransition = useRef(false);
  const completedCycle = useRef(false);
  const [progressEpoch, setProgressEpoch] = useState(0);
  const [progressStarted, setProgressStarted] = useState(false);
  const [paused, setPaused] = useState(false);
  const [mediaPaused, setMediaPaused] = useState(false);
  const [visible, setVisible] = useState(false);
  const [pageVisible, setPageVisible] = useState(!document.hidden);
  const [controlsProject, setControlsProject] = useState(null);
  const reducedMotion = useReducedMotion();
  const mediaHost = useRef(null);
  const project = projects[index];

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: .1 });
    observer.observe(mediaHost.current);
    const update = () => setPageVisible(!document.hidden);
    document.addEventListener('visibilitychange', update);
    return () => { observer.disconnect(); document.removeEventListener('visibilitychange', update); };
  }, []);

  useEffect(() => {
    setErasing(false);
    if (paused || reducedMotion || !visible || !pageVisible) return;
    setProgressEpoch(value => value + 1);
    setProgressStarted(true);
    const eraseTimer = setTimeout(() => setErasing(true), 4000);
    const swapTimer = setTimeout(() => {
      if (index === projects.length - 1 && !completedCycle.current) {
        pauseAfterTransition.current = true;
        completedCycle.current = true;
      }
      setTyping(true);
      setControlsProject(null);
      setIndex(value => (value + 1) % projects.length);
      setErasing(false);
    }, 4000 + project.purpose.length * 50);
    return () => { clearTimeout(eraseTimer); clearTimeout(swapTimer); };
  }, [index, paused, reducedMotion, visible, pageVisible, project.purpose]);

  useEffect(() => {
    if (!typing) return;
    const timer = setTimeout(() => {
      setTyping(false);
      if (pauseAfterTransition.current) {
        pauseAfterTransition.current = false;
        setPaused(true);
      }
    }, reducedMotion ? 0 : 200 + project.purpose.length * 50);
    return () => clearTimeout(timer);
  }, [typing, project.purpose, reducedMotion]);

  const select = next => {
    setControlsProject(null);
    setPaused(true);
    setMediaPaused(false);
    setTyping(false);
    pauseAfterTransition.current = false;
    setRevealKey(value => value + 1);
    setProgressStarted(false);
    setErasing(false);
    setIndex(next);
  };

  return <section id="home" className="site-container project-hero" aria-label="Selected work" aria-roledescription="carousel">
    <motion.div className="project-hero-copy" initial={reducedMotion ? false : { opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: .8 }}>
      <h1><motion.span className="project-hero-kicker" initial={reducedMotion ? false : { opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: .8 }}>Kasturi is</motion.span><motion.span initial={reducedMotion ? false : { opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: .8, delay: .4 }}>designing for{' '}<span key={project.name} className="project-hero-purpose" data-erasing={erasing && !reducedMotion} data-typing={typing && !reducedMotion} data-motion-paused={!visible || !pageVisible}>
        <span className="sr-only">{project.purpose}</span>
        <span aria-hidden="true">{Array.from(project.purpose).map((character, position) => <span key={position} className="project-hero-letter" style={{ animationDelay: `${(erasing ? project.purpose.length - 1 - position : position) * 50 + (typing ? 200 : 0)}ms` }}>{character}</span>)}</span>
      </span></motion.span></h1>
      <div className="project-hero-description" data-settled={!erasing && !typing || reducedMotion} aria-live={paused ? 'polite' : 'off'}>
        <p key={`${project.name}-${revealKey}`} className="project-hero-text-enter">{project.description}</p>
      </div>
      <a key={`${project.href}-${revealKey}`} data-settled={!erasing && !typing || reducedMotion} className="project-hero-link" href={project.href}>{project.cta || 'Read case study'}</a>

    </motion.div>
    <figure className="project-hero-figure" data-format={project.phone ? "phone" : "wide"}>
    <motion.div ref={mediaHost} className="project-hero-stage" initial={reducedMotion ? false : { opacity: 0, scale: .95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: .3, delay: .2 }}>
    <AnimatePresence initial={false}>
      <ProjectPreview key={project.name} project={project} visible={visible} pageVisible={pageVisible}
        mediaPaused={mediaPaused} reducedMotion={reducedMotion} controlsProject={controlsProject}
        setControlsProject={setControlsProject} setPaused={setPaused} />
    </AnimatePresence>
    </motion.div>
    <motion.figcaption initial={reducedMotion ? false : { opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: .8, delay: .6 }}>
      <div className="project-hero-controls" aria-label="Project navigation" data-progress-running={!paused && !reducedMotion && visible && pageVisible}>
        <div className="project-hero-projects">
        {projects.map((item, position) => <button
          key={item.name}
          type="button"
          className="project-hero-segment"
          aria-label={`Show ${item.name}`}
          aria-pressed={index === position}
          title={item.name}
          onClick={() => select(position)}
        ><span className="project-hero-project-name">{item.name}<span aria-hidden="true" key={`${index}-${progressEpoch}`} className={`project-hero-progress ${index === position && progressStarted && !reducedMotion ? 'is-timed' : ''}`}>{item.name}</span></span></button>)}
        </div>
        <span className="project-hero-playback-slot">{!reducedMotion && <button className="project-hero-playback" type="button" onClick={() => { setPaused(!paused); setMediaPaused(!paused); }} aria-label={paused ? 'Resume rotation' : 'Pause rotation'} title={paused ? 'Resume rotation' : 'Pause rotation'}>{paused ? <FaPlay size={12} aria-hidden="true" /> : <FaPause size={12} aria-hidden="true" />}</button>}</span>
      </div>
    </motion.figcaption>
    </figure>
  </section>;
}
