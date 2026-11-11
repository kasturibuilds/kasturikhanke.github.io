import { useEffect, useState } from 'react';
import './PortfolioSections.css';

export const contactEmail = 'kasturi.khanke@gmail.com';
const projectInquiry = `mailto:${contactEmail}?subject=Let%E2%80%99s%20build%20something`;


export function PortfolioHero() {
  return <>
    <header className="portfolio-nav page-gutter">
      <a className="portfolio-wordmark" href="#top">Kasturi Khanke</a>
      <nav aria-label="Main navigation"><a href="#work">Work</a><a href="#contact">Let’s talk</a></nav>
    </header>
    <section className="portfolio-hero page-gutter" aria-labelledby="hero-heading">
      <h1 id="hero-heading">I design and build <br />products for the <span>AI era.</span></h1>
      <div className="hero-status"><p className="availability"><span aria-hidden="true" />Taking on select client projects</p></div>
    </section>
  </>;
}

export function PortfolioProof() {
  return <section className="portfolio-proof page-gutter" aria-label="Selected impact">
    <dl className="proof-grid">
      <div><dt>900M+</dt><dd>Users reached</dd></div>
      <div><dt>74k+</dt><dd>Library installs</dd></div>
      <div><dt>2</dt><dd>0→1 products</dd></div>
    </dl>
  </section>;
}

export function PortfolioPricing() {
  return <section className="portfolio-pricing page-gutter" id="pricing" aria-labelledby="pricing-heading">
    <header className="pricing-heading"><h2 id="pricing-heading">Work with me.</h2><p>From idea to something people can use.</p></header>
    <div className="pricing-offer">
      <div className="pricing-description"><h3>Product Sprint</h3><p>Shape the product, design the experience, and build a working prototype.</p><ul><li>Product strategy & core UX</li><li>Visual design & AI interactions</li><li>Prototyping & design engineering</li></ul></div>
      <div className="pricing-details"><p className="pricing-duration">2–4 weeks</p><p className="pricing-amount"><span>From</span> $15k</p><p className="pricing-scope">Final scope and fee agreed before we start.</p><a className="pricing-cta" href={projectInquiry}>Start a project</a></div>
    </div>
    <p className="pricing-other">Need something smaller or ongoing? <a href={projectInquiry}>Let’s talk</a></p>
  </section>;
}

export function PortfolioFooter() {
  const formatTime = () => new Intl.DateTimeFormat('en-US', {
    timeZone: 'America/Los_Angeles', hour: 'numeric', minute: '2-digit',
  }).format(new Date());
  const [sfTime, setSfTime] = useState(formatTime);
  useEffect(() => {
    const timer = setInterval(() => setSfTime(formatTime()), 60000);
    return () => clearInterval(timer);
  }, []);

  return <footer className="signature-footer" id="contact" aria-label="Contact and social links">
    <div className="signature-footer-content page-gutter">
      <div className="signature-footer-columns">
        <div><h2>About</h2><p>Product designer and builder. Adobe + independent.</p></div>
        <div><h2>Contact</h2><a href={`mailto:${contactEmail}`}>{contactEmail}</a><a className="footer-project-link" href={projectInquiry}>Start a project</a></div>
        <nav aria-label="Social links"><h2>Social</h2><a href="https://www.linkedin.com/in/kasturikhanke/" target="_blank" rel="noopener noreferrer">LinkedIn</a><a href="https://github.com/kasturibuilds" target="_blank" rel="noopener noreferrer">GitHub</a></nav>
      </div>
      <div className="signature-footer-meta"><p>© {new Date().getFullYear()} Kasturi Khanke</p><p>San Francisco, CA · <time>{sfTime}</time></p><p>Made with ♥ using Claude + Cursor</p></div>
    </div>
    <div className="signature-footer-name" aria-hidden="true"><p>KASTURI KHANKE</p></div>
  </footer>;
}
