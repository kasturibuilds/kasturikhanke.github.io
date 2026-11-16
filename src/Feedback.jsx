import SiteHeader from './SiteHeader';
import SiteFooter from './SiteFooter';
import React from 'react';
import BottomNav from './BottomNav';
import FrameworkSection from './FrameworkSection';

const Feedback = () => {
  

  const [activePage, setActivePage] = React.useState('ic');

  
  React.useEffect(() => {
    window.scrollTo(0, 0);

    // Add intersection observer for scroll animations
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('opacity-100', 'translate-y-0');
            entry.target.classList.remove('opacity-0', 'translate-y-10');
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('.scroll-reveal').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const handleNavClick = (page) => {
    if (page === 'home') {
      window.location.href = '/';
      window.scrollTo(0, 0);
    } else {
      setActivePage(page);
    }
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans">
      <SiteHeader />

      <main className="container mx-auto px-4 max-w-4xl">
        {/* Hero Section */}
        <section className="mb-16">
          <h1 className="text-3xl md:text-4xl font-normal mb-4 leading-tight max-w-3xl text-gray-900">
            Feedback updates
          </h1>
          <p className="text-lg md:text-xl font-normal leading mb-8 max-w-2xl text-gray-600">
            Redesigning how users can interact with the AI responses.
          </p>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-8 text-sm text-gray-500 mb-6 md:mb-8">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
              Visual Design
            </div>
            {/* <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              Increased usage by 4%
            </div> */}
          </div>
        </section>
        <h2 className="text-2xl font-medium md:mb-12 mb-6 text-gray-900">🚧 Under Construction</h2>

        </main>

      {/* Next Project Section */}
      <section className="py-24">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="flex justify-end">
            <a 
              href="/aia"
              className="inline-block px-8 py-2 rounded-full border-2 border-black text-lg font-medium hover:bg-black hover:text-white transition-colors duration-300"
            >
              Next Project →
            </a>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <SiteFooter />

      <div className="w-full bg-gray-950">
        <BottomNav 
          activePage={activePage} 
          onNavClick={handleNavClick}
          isCaseStudy={true} 
        />
      </div>
    </div>
  );
};

export default Feedback;
