import RollingText from './RollingText';
import SoftLiftText from './SoftLiftText';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { contactEmail } from './PortfolioSections';
import './WorkWithMe.css';

const resumeUrl = 'https://drive.google.com/file/d/1jHe89QZl4kRFyzGxPmNQcpglLIhGq8y0/view?usp=sharing';

export default function WorkWithMe() {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return <div className="studio-page">
    <a className="studio-skip" href="#main-content">Skip to content</a>
    <header className="studio-nav">
      <Link to="/" className="studio-name"><RollingText>Kasturi Khanke</RollingText></Link>
      <nav aria-label="Portfolio navigation">
        <Link to="/"><SoftLiftText>Work</SoftLiftText></Link>
        <Link to="/about"><SoftLiftText>About</SoftLiftText></Link>
        <a href={`mailto:${contactEmail}`}><SoftLiftText>Contact</SoftLiftText></a>
      </nav>
    </header>

    <main id="main-content" className="studio-main">
      
      <h1>Contact</h1>
      <p className="studio-intro">Open to product design roles and freelance projects.</p>
      <a className="studio-email" href={`mailto:${contactEmail}`}><SoftLiftText>{contactEmail}</SoftLiftText></a>
      <nav className="studio-links" aria-label="Resume and social links">
        <a href={resumeUrl} target="_blank" rel="noopener noreferrer"><SoftLiftText>Résumé</SoftLiftText></a>
        <a href="https://www.linkedin.com/in/kasturikhanke/" target="_blank" rel="noopener noreferrer"><SoftLiftText>LinkedIn</SoftLiftText></a>
        <a href="https://github.com/kasturibuilds" target="_blank" rel="noopener noreferrer"><SoftLiftText>GitHub</SoftLiftText></a>
      </nav>
    </main>

    <footer className="studio-footer"><p>San Francisco, CA</p><Link to="/"><SoftLiftText>Selected work →</SoftLiftText></Link></footer>
  </div>;
}
