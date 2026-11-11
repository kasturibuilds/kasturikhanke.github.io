import RollingText from './RollingText';
import SoftLiftText from './SoftLiftText';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useReducedMotion } from 'framer-motion';
import GenerativeHero from './GenerativeHero';
import { contactEmail } from './PortfolioSections';
import './About.css';

const resumeUrl = 'https://drive.google.com/file/d/1jHe89QZl4kRFyzGxPmNQcpglLIhGq8y0/view?usp=sharing';

export default function About() {
  const reducedMotion = useReducedMotion();
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return <div className="about-page">
    <a className="about-skip" href="#main-content">Skip to content</a>
    <header className="about-nav">
      <Link to="/" className="about-name"><RollingText>Kasturi Khanke</RollingText></Link>
      <nav aria-label="Portfolio navigation">
        <Link to="/"><SoftLiftText>Work</SoftLiftText></Link>
        <Link to="/about" aria-current="page"><SoftLiftText>About</SoftLiftText></Link>
        <a href={`mailto:${contactEmail}`}><SoftLiftText>Contact</SoftLiftText></a>
      </nav>
    </header>

    <main id="main-content" className="about-main">
      <p className="about-location">San Francisco, CA</p>
      <h1>About</h1>
      <div className="about-copy">
        <p>I started in industrial design because I wanted to make things people could use. Moving into UX brought me closer to the people using them. Now, AI-assisted coding lets me take an idea from design to a working product myself. Generative Loaders and Generative Charts grew out of that curiosity.</p>
        <p>My work at Adobe has included AI Assistant on mobile and leading mobile design for PDF Spaces. At Sezzle, I designed experiences that helped people connect their bank accounts and build credit through everyday purchases. I care about how people discover a product’s value, feel confident trying it, and find a reason to return.</p>
        <p>I also founded Women Who Design, mentor designers through ADPList, and have contributed to design education through advisory work at my alma mater. Writing and community are part of how I learn and share what I’m making.</p>
      </div>
      <nav className="about-community-links" aria-label="Writing and community">
        <a href="https://www.instagram.com/womenwhodesign.isu/" target="_blank" rel="noopener noreferrer"><SoftLiftText>Women Who Design</SoftLiftText></a>
        <a href="https://beyondthefold.substack.com" target="_blank" rel="noopener noreferrer"><SoftLiftText>Writing</SoftLiftText></a>
        <a href="https://adplist.org/mentors/kasturi-khanke" target="_blank" rel="noopener noreferrer"><SoftLiftText>Mentorship</SoftLiftText></a>
      </nav>
      <div className="about-availability">
        <p>Open to product design roles.</p>
        <a href={`mailto:${contactEmail}`}><SoftLiftText>{contactEmail}</SoftLiftText></a>
      </div>
    </main>

    <GenerativeHero reducedMotion={!!reducedMotion} visible />

    <footer className="about-footer">
      <nav aria-label="Resume and social links">
        <a href={resumeUrl} target="_blank" rel="noopener noreferrer"><SoftLiftText>Résumé</SoftLiftText></a>
        <a href="https://www.linkedin.com/in/kasturikhanke/" target="_blank" rel="noopener noreferrer"><SoftLiftText>LinkedIn</SoftLiftText></a>
        <a href="https://github.com/kasturibuilds" target="_blank" rel="noopener noreferrer"><SoftLiftText>GitHub</SoftLiftText></a>
      </nav>
      <a href="/2025/"><SoftLiftText>2025 archive</SoftLiftText></a>
    </footer>
  </div>;
}
