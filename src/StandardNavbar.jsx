import React, { useRef, useState } from 'react';

const StandardNavbar = ({ variant } = {}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuButtonRef = useRef(null);
  
  // Shared portfolio links
  const links = variant === 'live-home' ? [
    { label: 'About Me', url: '/about' },
    { label: 'Resume', url: 'https://drive.google.com/file/d/1jHe89QZl4kRFyzGxPmNQcpglLIhGq8y0/view?usp=sharing' },
    { label: 'Blog', url: 'https://beyondthefold.substack.com/' },
    { label: 'LinkedIn', url: 'https://www.linkedin.com/in/kasturikhanke/' }
  ] : [
    { label: 'About', url: '/about' },
    { label: 'Work with me', url: 'mailto:kasturikhanke@gmail.com' }
  ];

  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav aria-label="Portfolio navigation" className={`w-full py-4 flex justify-between items-center relative ${variant === 'live-home' ? 'px-4 md:px-6' : ''}`}>
      {/* Desktop links */}
      <div className="hidden md:flex items-center space-x-6">
        {links.map((link, index) => (
          <React.Fragment key={link.label}>
            <a
              href={link.url}
              target={link.url.startsWith('http') ? "_blank" : undefined}
              rel={link.url.startsWith('http') ? "noopener noreferrer" : undefined}
              className="text-sm font-medium text-gray-900 hover:text-indigo-500 transition-colors duration-200"
            >
              {link.label}
            </a>
            {index < links.length - 1 && (
              <span className="text-gray-300">•</span>
            )}
          </React.Fragment>
        ))}
      </div>
      
      {/* Mobile menu button */}
      <button
        ref={menuButtonRef}
        className="md:hidden text-gray-900 z-50"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        aria-expanded={isMenuOpen}
        aria-controls="portfolio-menu"
        onKeyDown={(event) => { if (event.key === "Escape") setIsMenuOpen(false); }}
      >
        {isMenuOpen ? (
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        )}
      </button>

      {/* Mobile menu dropdown */}
      {isMenuOpen && (
        <div id="portfolio-menu" onKeyDown={(event) => { if (event.key === "Escape") { setIsMenuOpen(false); menuButtonRef.current?.focus(); } }} className="absolute top-full right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg py-2 min-w-[200px] z-40 md:hidden">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.url}
              target={link.url.startsWith('http') ? "_blank" : undefined}
              rel={link.url.startsWith('http') ? "noopener noreferrer" : undefined}
              className="block px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-50 hover:text-indigo-500 transition-colors duration-200"
              onClick={handleLinkClick}
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
};

export default StandardNavbar;
