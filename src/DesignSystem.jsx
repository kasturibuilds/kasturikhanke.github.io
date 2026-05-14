import React from 'react';
import SpinningLogo from './SpinningLogo';
import BottomNav from './BottomNav';

const DesignSystem = () => {
  const [activePage, setActivePage] = React.useState('design-system');
  const [sfTime, setSfTime] = React.useState('');

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Update San Francisco time
  React.useEffect(() => {
    const updateSfTime = () => {
      const time = new Date().toLocaleTimeString('en-US', {
        timeZone: 'America/Los_Angeles',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
      });
      setSfTime(time);
    };
    updateSfTime();
    const interval = setInterval(updateSfTime, 60000);
    return () => clearInterval(interval);
  }, []);

  const handleNavClick = (page) => {
    if (page === 'home') {
      window.location.href = '/';
    } else {
      setActivePage(page);
    }
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans">
      <header className="w-full bg-transparent pt-8 pb-16">
        <SpinningLogo />
      </header>

      <main className="container mx-auto px-4 max-w-4xl">
        {/* Hero Section */}
        <section className="mb-16">
        <h1 className="text-3xl md:text-4xl font-normal mb-4 leading-tight max-w-3xl text-gray-900 ">Adobe Acrobat Design System</h1>
        <p className="text-lg md:text-xl font-normal leading mb-8 max-w-2xl text-gray-600">
            Self initiated project. Creating a comprehensive and flexible mobile design system to improve consistency, and streamline development.
          </p>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-8 text-sm text-gray-500 mb-6 md:mb-8">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
              Lead Designer
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              Ongoing project
            </div>
          </div>
        </section>

        {/* Impact Section */}
        <section className="mb-24">
        <h2 className="text-xl md:text-2xl font-medium mb-6 md:mb-8 text-gray-900">📈 Impact</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="relative bg-white border-2 border-gray-100 p-12 rounded-3xl shadow-sm overflow-hidden">
              <div className="relative">
              <h3 className="text-3xl md:text-4xl font-semibold mb-4 md:mb-6 text-gray-900">2x</h3>
                <p className="text-lg text-gray-600">Faster design time</p>
              </div>
            </div>
            <div className="relative bg-white border-2 border-gray-100 p-12 rounded-3xl shadow-sm overflow-hidden">
              <div className="relative">
              <h3 className="text-3xl md:text-4xl font-semibold mb-4 md:mb-6 text-gray-900">75%</h3>
                <p className="text-lg text-gray-600">Daily adoption rate</p>
              </div>
            </div>
            <div className="relative bg-white border-2 border-gray-100 p-12 rounded-3xl shadow-sm overflow-hidden">
              <div className="relative">
              <h3 className="text-3xl md:text-4xl font-semibold mb-4 md:mb-6 text-gray-900">~40%</h3>
                <p className="text-lg text-gray-600">Reduction in design-to-dev handoff time</p>
              </div>
            </div>
            <div className="relative bg-white border-2 border-gray-100 p-12 rounded-3xl shadow-sm overflow-hidden">
              <div className="relative">
              <h3 className="text-3xl md:text-4xl font-semibold mb-4 md:mb-6 text-gray-900">75%</h3>
                <p className="text-lg text-gray-600">Component utilization without detaching instances</p>
              </div>
            </div>
          </div>
        </section>

        {/* Full bleed image */}
        <div className="relative w-screen -mx-[50vw] left-[50%] right-[50%] mb-16 bg-gray-50">
          <img 
            src="DScover.png" 
            alt="Design System Components" 
            className="w-full h-auto"
          />
        </div>

        <section className="relative py-8">
          {/* Context Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 md:gap-12 md:mb-12 mb-8">
          <div className="lg:sticky lg:top-24" style={{ height: 'min-content' }}>
            <div className="max-w-md">
              <h2 className="text-xl md:text-2xl font-medium mb-6 md:mb-8 text-gray-900">📝 Context</h2>
              </div>
            </div>
            <div className="space-y-8">
              <p className="text-lg text-gray-600">
                With the introduction of a new updated company-wide design system, <a href="https://s2.spectrum.adobe.com/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center underline decoration-1 underline-offset-2 text-blue-600 hover:text-blue-800 transition-colors duration-300">
                Spectrum 2.0
                <svg className="w-4 h-4 ml-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                  <polyline points="15 3 21 3 21 9"></polyline>
                  <line x1="10" y1="14" x2="21" y2="3"></line>
                </svg>
                </a>, the first task I identified was creating a list of all the components that the mobile team needed.
              </p>
            </div>
          </div>

          {/* Discovery Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 md:gap-12 md:mb-12 mb-8">
          <div className="lg:sticky lg:top-24" style={{ height: 'min-content' }}>
            <div className="max-w-md">
              <h2 className="text-xl md:text-2xl font-medium mb-6 md:mb-8 text-gray-900">🔍 Discovery</h2>
              </div>
            </div>
            <div className="space-y-8">
              <p className="text-lg text-gray-600">
                It became clear after interviewing all the members on the team that a design system built out exclusively for 
                Acrobat mobile elements was needed to remove redundancy.
              </p>
              <img src="Hwww.png" alt="Discovery Process" className="w-full rounded-xl mb-8" />
              <p className="text-lg text-gray-600">
                In order to scale faster, we prioritized building the most essential components like navigation menus, toolbars, and sheets.
                By prioritizing the most important components first, we could create a timeline for when larger components could be added to the library.
              </p>
            </div>
          </div>

          {/* Challenges Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 md:gap-12 md:mb-12 mb-12">
          <div className="lg:sticky lg:top-24" style={{ height: 'min-content' }}>
            <div className="max-w-md">
              <h2 className="text-xl md:text-2xl font-medium mb-6 md:mb-8 text-gray-900">🚩 Challenges</h2>
              </div>
            </div>
            <div className="space-y-8">
              <ol className="list-decimal pl-6 space-y-4 text-lg text-gray-600">
                <li>This project was not a part of the assigned tasks, so I had to find the time to work on it.</li>
                <li>The mobile team had no centralized design system, so I had to create one from scratch.</li>
                <li>Only 1/7 designers knew how to use Figma, so creating component documentation and how to use them was a challenge.</li>
              </ol>
            </div>
          </div>

          {/* Solution Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 md:gap-12 md:mb-12 mb-8">
            <div className="lg:sticky lg:top-24" style={{ height: 'min-content' }}>
              <div className="max-w-md">
              <h2 className="text-xl md:text-2xl font-medium mb-6 md:mb-8 text-gray-900">🛠️ What I Did</h2>
              </div>
            </div>
            <div className="space-y-8">
              <div className="space-y-6">
                <h3 className="text-xl font-medium text-gray-900">Migration</h3>
                <p className="text-lg text-gray-600">
                  Transitioned design components from Adobe XD to Figma, added auto layout, and optimized components for
                  mobile specific use cases.
                </p>
                <img src="Migration.png" alt="Migration" className="w-full rounded-xl mb-8" />
              </div>
              <div className="space-y-6">
                <h3 className="text-xl font-medium text-gray-900">Library Creation</h3>
                <p className="text-lg text-gray-600">
                  Developed a comprehensive Figma library with a wide range of components,
                  templates, and interaction patterns.
                </p>
                <img src="LibraryCreation.png" alt="Migration" className="w-full rounded-xl mb-8" />
              </div>
              <div className="space-y-6">
                <h3 className="text-xl font-medium text-gray-900">Continuous Improvement</h3>
                <p className="text-lg text-gray-600">
                  Regularly updated the library based on team feedback and evolving project
                  requirements, ensuring it remained relevant and useful.
                </p>
                <img src="Iteration.png" alt="Migration" className="w-full rounded-xl mb-8" />
              </div>
            </div>
          </div>
        </section>

        {/* Next Project Section */}
        <section className="py-24">
          <div className="flex justify-end">
            <a 
              href="/aia"
              className="inline-block px-8 py-2 rounded-full border-2 border-black text-lg font-medium hover:bg-black hover:text-white transition-colors duration-300"
            >
              Next Project →
            </a>
          </div>
        </section>
      </main>

      {/* Contact Section */}
      <section className="bg-gray-950 text-white pt-16 sm:pt-24 md:pt-32 pb-0 overflow-hidden">
        {/* Top Content Area */}
        <div className="container mx-auto px-6 sm:px-8 md:px-12 max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-16">
            
            {/* About Column */}
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-widest mb-4">about</p>
              <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
                Kasturi is a product designer<br />
                crafting AI-powered experiences<br />
                that drive measurable impact<br />
                and delight users.
              </p>
            </div>

            {/* Contact Column */}
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-widest mb-4">contact</p>
              <a 
                href="mailto:kasturi.khanke@gmail.com"
                className="text-sm sm:text-base text-gray-300 hover:text-white transition-colors duration-300 block"
              >
                kasturi.khanke@gmail.com
              </a>
            </div>

            {/* Social Column */}
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-widest mb-4">social</p>
              <a 
                href="https://www.linkedin.com/in/kasturikhanke/"
                className="text-sm sm:text-base text-gray-300 hover:text-white transition-colors duration-300 block"
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn
              </a>
            </div>
          </div>
        </div>
        
        {/* Large Name - Full Width, Clipped at Bottom */}
        {/* Copyright Bar - Above Name */}
        <div className="container mx-auto px-6 sm:px-8 md:px-12 max-w-6xl mt-16 sm:mt-24 md:mt-32">
          <div className="scroll-reveal opacity-0 translate-y-10 transform transition-all duration-700 ease-out py-6 flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-6">
            <p className="text-sm text-gray-400">
              © 2026 Kasturi Khanke
            </p>
            <p className="text-sm text-gray-400">
              San Francisco, CA · {sfTime}
            </p>
            <p className="text-sm text-gray-400">
              Made with ♥ using Claude + Cursor
            </p>
          </div>
        </div>

        {/* Large Name - Full Width, Clipped at Bottom */}
        <div className="scroll-reveal opacity-0 translate-y-10 transform transition-all duration-700 ease-out overflow-hidden">
          <h3 
            className="text-[12vw] sm:text-[14vw] md:text-[12vw] font-bold tracking-tighter leading-none whitespace-nowrap text-center select-none translate-y-[25%]"
            style={{ color: 'white' }}
          >
            KASTURI KHANKE
          </h3>
        </div>
      </section>
      <footer className="w-full bg-gray-950">
        <BottomNav activePage={activePage} onNavClick={handleNavClick}
        isCaseStudy={true} />
      </footer>
     </div>
  );
};

export default DesignSystem;
