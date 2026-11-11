import RollingText from './RollingText';
import SoftLiftText from './SoftLiftText';
/* eslint-disable react/prop-types */
import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import CaseStudyVideo from './CaseStudyVideo';
import './CaseStudyLayout.css';

export function CaseStudySection({ id, title, children, image, video, poster, alt, demo, evidence, stacked = false, demoFirst = false }) {
  return <section className={`case-section${image || video || demo ? ' case-section-media' : ''}${stacked ? ' case-section-stacked' : ''}`} id={id} aria-labelledby={`${id}-title`}>
    {demo && demoFirst && <div className="case-demo">{demo}</div>}
    <div className="case-copy">
      <h2 id={`${id}-title`}>{title}</h2>
      {children}
    </div>
    {demo && !demoFirst && <div className="case-demo">{demo}</div>}
    {(image || video) && <figure className="case-media">
      {video ? <CaseStudyVideo src={video} poster={poster} aria-label={alt} loop muted playsInline />
        : <a href={image} target="_blank" rel="noopener noreferrer" aria-label={`${alt}. Open full-size image`}><img src={image} alt={alt} loading="lazy" /></a>}
    </figure>}
    {evidence && <div className="case-evidence">{evidence}</div>}
  </section>;
}

export default function CaseStudyLayout({ title, role, intro, outcome, details, action, headingRef, nextPath, nextTitle, embedded = false, className = '', children }) {
  const { hash } = useLocation();
  useEffect(() => {
    // Wait for the lazy-loaded story and its parent layout to finish mounting.
    const frame = requestAnimationFrame(() => {
      let id;
      try { id = decodeURIComponent(hash.slice(1)); } catch { id = ''; }
      const target = id && document.getElementById(id);
      if (target) target.scrollIntoView({ block: 'start', behavior: 'instant' });
      else if (!embedded) window.scrollTo(0, 0);
    });
    return () => cancelAnimationFrame(frame);
  }, [title, embedded, hash]);

  const content = <article className="case-content" aria-label={`${title} case study`}>
    <header className="case-intro">
      {embedded ? <h2 ref={headingRef} tabIndex={-1}>{title}</h2> : <h1>{title}</h1>}
      <p className="case-intro-description">{intro}</p>
      <p className="case-role">{role}</p>
      {(outcome || details || action) && <div className="case-intro-details">
        {outcome && <p className="case-outcome" id="impact">{outcome}</p>}
        {details}
        {action && <a className="case-intro-action" href={action.href} target="_blank" rel="noopener noreferrer"><SoftLiftText>{action.label}</SoftLiftText></a>}
      </div>}
    </header>
    {children}
  </article>;

  return <div className={`case-page${embedded ? ' case-page-embedded' : ''}${className ? ` ${className}` : ''}`}>
    {!embedded && <>
      <a className="case-skip" href="#case-story">Skip to case study</a>
      <header className="case-header"><Link to="/"><RollingText>Kasturi Khanke</RollingText></Link><Link to="/"><SoftLiftText>All work</SoftLiftText></Link></header>
    </>}
    {embedded ? content : <main id="case-story" tabIndex={-1}>{content}</main>}
    {!embedded && <footer className="case-footer">
      <Link className="case-next" to={nextPath} aria-label={`Next project: ${nextTitle}`}><SoftLiftText>{nextTitle}</SoftLiftText></Link>
      <Link to="/?view=contact"><SoftLiftText>Contact</SoftLiftText></Link>
    </footer>}
  </div>;
}
