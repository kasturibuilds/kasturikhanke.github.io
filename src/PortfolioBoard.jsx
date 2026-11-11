import RollingText from './RollingText';
import SoftLiftText from './SoftLiftText';
/* eslint-disable react/prop-types */
import { lazy, Suspense, useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useReducedMotion } from 'framer-motion';
import { projectModules, preloadProject } from './projectModules';
import { slides, chartsDownloads } from './portfolioProjects';
import ProjectVideoPreview from './ProjectVideoPreview';
import CaseStudyVideo from './CaseStudyVideo';
import CaseStudyLayout from './CaseStudyLayout';
import feature from './openai-feature.json';
import { contactEmail } from './PortfolioSections';
import GenerativeHero from './GenerativeHero';
import HomeEntrance from './HomeEntrance';
import useProjectTransition from './useProjectTransition';
import './ProjectTransition.css';
import './PortfolioBoard.css';
import ChartsBento from './ChartsBento';
import LoadersBento from './LoadersBento';

const caseStudies = Object.fromEntries(Object.entries(projectModules).map(([key, load]) => [key, lazy(load)]));

const resume = 'https://drive.google.com/file/d/1jHe89QZl4kRFyzGxPmNQcpglLIhGq8y0/view?usp=sharing';
// Lowstakes, Clicky, and Word Generator are parked; their data and assets remain available.
const order = ['assistant', 'spaces', 'loaders', 'charts', 'sezzle', 'film'];
const projects = order.map(theme => slides.find(project => project.theme === theme));
const titles = { film: 'With OpenAI Developers', charts: 'Generative Charts' };
const mediaNames = { loaders: 'loaders-film', charts: 'charts-film', assistant: 'assistant-prompts', spaces: 'spaces-agents', 'word-generator': 'word-generator-shelf' };
const notes = {
  film: 'From design to a working product with Codex.',
  loaders: 'I wanted to explore more interesting ways to show loading in AI products. I built Generative Loaders for streaming text, small activity indicators, and images, then packaged the components so other developers could use them.',
  charts: 'I started Generative Charts to explore how charts could look and feel. I turned those experiments into a React library so other developers could use them in their own products.',
  assistant: 'Helping people discover AI, understand its value, and make it part of everyday work in Adobe Acrobat.',
  spaces: 'Bringing documents, people, and AI together in a shared mobile workspace.',
  sezzle: 'A simpler path to building credit through everyday purchases. Bank connections increased 70%.',
  lowstakes: 'Plans, scorecards, and a little friendly competition. An exploration of making it easier to get together.',
  clicky: 'A frosted keyboard exploring the feel of typing, from the keycaps to the smallest interaction.',
  'word-generator': 'Turning a few words into a visual collage. An experiment in generative text and playful interaction.',
};
const roles = { film: 'Featured by OpenAI', loaders: 'Independent · Design & engineering', charts: 'Independent · Design & engineering', assistant: 'Adobe · Lead product designer', spaces: 'Adobe · Mobile design lead', sezzle: 'Sezzle · Product design', lowstakes: 'Independent · Design & engineering', clicky: 'Independent · Interaction design', 'word-generator': 'Independent · Interaction study' };
const logos = { film: 'openai.svg', assistant: 'adobe.svg', spaces: 'adobe.svg', loaders: 'loaders.svg', charts: 'charts.svg', sezzle: 'sezzle.png', lowstakes: 'lowstakes.png', clicky: 'clicky.png' };
const companyNames = { film: 'OpenAI', assistant: 'Adobe', spaces: 'Adobe' };
const titleOf = project => titles[project.theme] || project.title;

function ProjectMedia({ project, paused, expanded = false }) {
  const host = useRef(null);
  const film = useRef(null);
  const [visible, setVisible] = useState(false);
  const [failed, setFailed] = useState(false);
  const name = expanded && ['loaders', 'charts'].includes(project.theme) ? project.video : mediaNames[project.theme] || project.video || project.theme;
  const isFilm = project.theme === 'film';
  const isPhone = ['assistant', 'spaces'].includes(project.theme);
  const mediaVersion = ['loaders', 'charts'].includes(project.theme) ? project.mediaVersion : 'quality-v2';
  const poster = isFilm ? feature.poster : project.demo ? `/previews/${name}.jpg?v=${mediaVersion}` : `/previews/${project.theme}-cover.webp`;
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: .1 });
    observer.observe(host.current);
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    if (!film.current) return;
    if (visible && !paused) film.current.play().catch(() => {});
    else film.current.pause();
  }, [visible, paused]);
  return <div ref={host} className={`work-media work-media-${project.theme}${isPhone ? ' work-media-phone' : ''}${expanded ? ' work-media-expanded' : ''}`}>
    {isFilm ? failed ? <div className="work-film-error">OpenAI Developers<br />{expanded && <a href={feature.post} target="_blank" rel="noopener noreferrer"><SoftLiftText>Watch on LinkedIn</SoftLiftText></a>}</div> : expanded ? <CaseStudyVideo src={feature.src} poster={poster} muted loop playsInline crossOrigin="anonymous" aria-label="OpenAI Developers film" captions={feature.captions} onError={() => setFailed(true)} /> : <video ref={film} src={visible ? feature.src : undefined} poster={poster} muted loop playsInline preload="none" crossOrigin="anonymous" aria-hidden="true" tabIndex={-1} onError={() => setFailed(true)}><track kind="captions" src={feature.captions} srcLang="en" label="English" /></video> : project.demo ? <ProjectVideoPreview name={name} version={mediaVersion} poster={poster} active={visible} paused={paused} /> : <img src={poster} alt={expanded ? `${titleOf(project)} project preview` : ''} loading="lazy" />}
    {logos[project.theme] && !(isFilm && expanded) && <span className={`work-logo${companyNames[project.theme] ? ' work-logo-named' : ''}`} aria-hidden="true"><img className={['film','assistant','spaces'].includes(project.theme) ? 'work-logo-mono' : ''} src={`/brands/${logos[project.theme]}`} alt="" />{companyNames[project.theme] && <span>{companyNames[project.theme]}</span>}</span>}
  </div>;
}

export default function PortfolioBoard() {
  const [params, setParams] = useSearchParams();
  const reducedMotion = useReducedMotion();
  const [hidden, setHidden] = useState(document.hidden);
  const [navigationRequest, setNavigationRequest] = useState(0);
  const heading = useRef(null);
  const focusOnOpen = useRef(false);
  const origin = useRef(null);
  const scrollPosition = useRef(0);
  const returnToGrid = useRef(false);
  const requestedProject = projects.find(item => item.theme === params.get('project'));
  const requestedView = requestedProject?.theme || (['about', 'contact'].includes(params.get('view')) ? params.get('view') : 'work');
  const transition = useProjectTransition(requestedView, !!reducedMotion, navigationRequest);
  const project = projects.find(item => item.theme === transition.displayed);
  const CaseStudy = project && caseStudies[project.theme];
  const section = project ? 'work' : transition.displayed;
  const active = project?.theme || section;
  const motionPaused = !!reducedMotion || hidden;
  const setProjectHeading = useCallback(node => {
    heading.current = node;
    if (node && focusOnOpen.current) {
      node.focus({ preventScroll: true });
      focusOnOpen.current = false;
    }
  }, []);
  const open = (key, fromCard = false) => {
    if (project && transition.panel.current?.contains(document.activeElement)) focusOnOpen.current = true;
    if (fromCard) { scrollPosition.current = window.scrollY; origin.current = key; focusOnOpen.current = true; }
    setParams(key === 'work' ? {} : ['about','contact'].includes(key) ? { view: key } : { project: key });
  };
  useLayoutEffect(() => {
    if (project || section !== 'work') window.scrollTo(0, 0);
    else if (returnToGrid.current) { window.scrollTo(0, scrollPosition.current); returnToGrid.current = false; }
    if (focusOnOpen.current) {
      if (!project && section === 'work') (document.querySelector(`[data-project-card="${origin.current}"]`) || document.getElementById('main-nav-work'))?.focus({ preventScroll: true });
      else heading.current?.focus({ preventScroll: true });
      if (!project || heading.current) focusOnOpen.current = false;
    }
    const tab = document.querySelector('.project-tabs [aria-selected="true"]');
    if (tab) {
      const strip = tab.parentElement;
      const bounds = strip.getBoundingClientRect();
      const selected = tab.getBoundingClientRect();
      if (selected.left < bounds.left) strip.scrollLeft += selected.left - bounds.left;
      else if (selected.right > bounds.right) strip.scrollLeft += selected.right - bounds.right;
    }
  }, [active, project, section]);
  useEffect(() => {
    const onVisibility = () => setHidden(document.hidden);
    document.addEventListener('visibilitychange', onVisibility);
    return () => document.removeEventListener('visibilitychange', onVisibility);
  }, []);
  useEffect(() => {
    const onEscape = event => { if (event.key === 'Escape' && (project || section !== 'work')) { focusOnOpen.current = true; returnToGrid.current = true; setParams({}); } };
    window.addEventListener('keydown', onEscape);
    return () => window.removeEventListener('keydown', onEscape);
  }, [project, section, setParams]);
  const moveTab = event => {
    if (!['ArrowRight','ArrowLeft','Home','End'].includes(event.key)) return;
    event.preventDefault();
    const tabs = [...event.currentTarget.querySelectorAll('[role="tab"]')];
    const index = tabs.indexOf(document.activeElement);
    const next = event.key === 'Home' ? 0 : event.key === 'End' ? tabs.length - 1 : (index + (event.key === 'ArrowRight' ? 1 : -1) + tabs.length) % tabs.length;
    tabs[next].focus();
  };
  return <div className="workbench">
    <HomeEntrance />
    <a className="work-skip" href="#work-panel">Skip to content</a>
    <div className="work-chrome" ref={transition.chrome}>
      <header className="work-topbar">
        <h1><button onClick={() => { open('work'); window.scrollTo(0, 0); setNavigationRequest(count => count + 1); }}><RollingText>Kasturi Khanke</RollingText></button></h1>
        <nav aria-label="Main navigation" data-section={section}><span className="main-nav-indicator" aria-hidden="true" />{['work','about','contact'].map(item => <button key={item} id={`main-nav-${item}`} aria-current={section === item ? 'page' : undefined} onClick={() => { open(item); window.scrollTo(0, 0); setNavigationRequest(count => count + 1); }}><SoftLiftText>{item}</SoftLiftText></button>)}</nav>
      </header>
      {project && <div className="project-tabbar category-tabbar"><div className="project-tabs" role="tablist" aria-label="Projects" onKeyDown={moveTab}>{projects.map(item => <button key={item.theme} id={`project-tab-${item.theme}`} role="tab" aria-selected={project.theme === item.theme} aria-controls="work-panel" tabIndex={project.theme === item.theme ? 0 : -1} onPointerEnter={() => preloadProject(item.theme)} onFocus={() => preloadProject(item.theme)} onClick={() => open(item.theme)}><span className="project-tab-label"><SoftLiftText>{titleOf(item)}</SoftLiftText></span></button>)}</div></div>}
    </div>
    <div className="project-transition" ref={transition.curtain} hidden aria-hidden="true"><div /></div>
    <main ref={transition.surface} id="work-panel" className={`work-sheet work-sheet-${active}${CaseStudy || ['film', 'loaders', 'charts'].includes(project?.theme) ? ' work-sheet-study' : ''}`} role={project ? 'tabpanel' : undefined} aria-labelledby={project ? `project-tab-${project.theme}` : section === 'work' ? 'main-nav-work' : 'sheet-title'} tabIndex={-1}>
      <div className="work-sheet-content" ref={transition.panel} key={active}>
      {!project && section === 'work' ? <>
        <p className="work-positioning">AI designer &amp; builder. Open-source enthusiast.</p>
        <div className="work-grid work-grid-work">
          {projects.map(item => <button key={item.theme} className="work-card" data-project-card={item.theme} onPointerEnter={() => preloadProject(item.theme)} onFocus={() => preloadProject(item.theme)} onClick={() => open(item.theme, true)} aria-label={`Open ${titleOf(item)}`} aria-describedby={`project-tags-${item.theme}`}>
            <ProjectMedia project={item} paused={motionPaused} />
            <div className="work-card-caption">
              <div className="work-card-summary">
              <h2>{titleOf(item)}</h2>
              <span className="work-card-tags" id={`project-tags-${item.theme}`}>{item.tags.map(tag => <span className="work-card-tag" key={tag}>{tag}</span>)}</span>
              </div>
            </div>
          </button>)}
        </div>
      </> : project ? <>
        {CaseStudy ? <Suspense fallback={<p role="status" className="project-case-loading">Loading case study…</p>}><CaseStudy embedded headingRef={setProjectHeading} /></Suspense> : <CaseStudyLayout
          embedded title={titleOf(project)} intro={notes[project.theme]} role={roles[project.theme]} headingRef={setProjectHeading}
          details={project.theme === 'charts' ? <p className="case-project-fact">18 chart families · 3 themes · {chartsDownloads.count} npm downloads</p>
            : project.theme === 'loaders' ? <p className="case-project-fact">46 loading variants · 165k+ npm downloads</p> : undefined}
          action={project.path ? { href: project.path, label: project.theme === 'film' ? 'Watch on LinkedIn' : `Visit ${titleOf(project)}` } : undefined}>
          {project.theme === 'loaders' ? <LoadersBento paused={motionPaused} /> : project.theme === 'charts' ? <ChartsBento /> : <ProjectMedia project={project} paused={motionPaused} expanded />}
        </CaseStudyLayout>}
        <div className="project-sheet-actions"><div><button onClick={() => open(projects[(projects.indexOf(project) + 1) % projects.length].theme)}><SoftLiftText>Next project</SoftLiftText></button></div></div>
      </> : section === 'contact' ? (
        <GenerativeHero reducedMotion={!!reducedMotion} visible headingId="sheet-title" headingRef={heading}>
          <a className="hero-contact" href={`mailto:${contactEmail}`}><SoftLiftText>{contactEmail}</SoftLiftText></a>
          <nav className="hero-contact-links" aria-label="Contact links">
            <a href="https://www.linkedin.com/in/kasturikhanke/" target="_blank" rel="noopener noreferrer"><SoftLiftText>LinkedIn</SoftLiftText></a>
            <a href={resume} target="_blank" rel="noopener noreferrer"><SoftLiftText>Résumé</SoftLiftText></a>
          </nav>
        </GenerativeHero>
      ) : <section className="work-personal">
        <div><h2 id="sheet-title" ref={heading} tabIndex={-1}>About</h2></div>
        <div className="work-personal-copy">
          <p>I’m Kasturi, a product designer and builder in San Francisco.</p>
          <p>I started in industrial design because I wanted to make things people could use. Moving into UX brought me closer to the people using them. Now, AI-assisted coding lets me take an idea from design to a working product myself. Generative Loaders and Generative Charts grew out of that curiosity. I’m interested in what happens when design, engineering, and growth work together.</p>
          <p>My work at Adobe has included AI Assistant on mobile and leading mobile design for PDF Spaces. At Sezzle, I designed experiences that helped people connect their bank accounts and build credit through everyday purchases. I care about how people discover a product’s value, feel confident trying it, and find a reason to return.</p>
          <p>I also founded Women Who Design, mentor designers through ADPList, and have contributed to design education through advisory work at my alma mater. Writing and community are part of how I learn and share what I’m making.</p>
          <p>Open to product design roles. <a href={`mailto:${contactEmail}`}><SoftLiftText>{contactEmail}</SoftLiftText></a></p>
          <nav className="work-personal-links" aria-label="About links">
            <a href={resume} target="_blank" rel="noopener noreferrer"><SoftLiftText>Résumé</SoftLiftText></a>
            <a href="https://beyondthefold.substack.com" target="_blank" rel="noopener noreferrer"><SoftLiftText>Writing</SoftLiftText></a>
            <a href="https://www.instagram.com/womenwhodesign.isu/" target="_blank" rel="noopener noreferrer"><SoftLiftText>Women Who Design</SoftLiftText></a>
            <a href="https://adplist.org/mentors/kasturi-khanke" target="_blank" rel="noopener noreferrer"><SoftLiftText>Mentorship</SoftLiftText></a>
            <a href="https://www.linkedin.com/in/kasturikhanke/" target="_blank" rel="noopener noreferrer"><SoftLiftText>LinkedIn</SoftLiftText></a>
            <a href="https://github.com/kasturibuilds" target="_blank" rel="noopener noreferrer"><SoftLiftText>GitHub</SoftLiftText></a>
            <a href="/2025/"><SoftLiftText>2025 archive</SoftLiftText></a>
          </nav>
        </div>
      </section>}
      </div>
    </main>
    {section !== 'contact' && <GenerativeHero reducedMotion={!!reducedMotion} visible={!project} />}
  </div>;
}
