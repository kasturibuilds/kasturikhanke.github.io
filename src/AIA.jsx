import React, { useState, useEffect, useLayoutEffect } from 'react';
import SpinningLogo from './SpinningLogo';
import BottomNav from './BottomNav';
import StandardNavbar from './StandardNavbar';
import { IoLockClosedOutline } from "react-icons/io5";
import ChallengesGoalsSection from './ChallengesGoalsSection';
import FrameworkSection from './FrameworkSection';
import { motion } from 'framer-motion';

// Disable browser scroll restoration immediately
if (typeof window !== 'undefined' && 'scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
} 
 const AIA = () => {
    const sections = [
    { id: 'overview', label: 'Overview' },
    { id: 'impact', label: 'Impact' },
    { id: 'challenges', label: 'Challenges & Goals' },
    { id: 'framework', label: 'Framework' },
    { id: 'conclusion', label: 'Conclusion' }
    ];

   const [activePage, setActivePage] = React.useState('aia');
  const [isScrolled, setIsScrolled] = useState(false);
  const [showNav, setShowNav] = useState(true);
  const [sfTime, setSfTime] = useState('');

  // Update San Francisco time
  useEffect(() => {
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
   const videoRef = React.useRef(null);
   // Scroll to top before browser paints
   useLayoutEffect(() => {
     window.scrollTo(0, 0);
   }, []);

   React.useEffect(() => {
     if (videoRef.current) {
       videoRef.current.play().catch(error => {
         console.log("Video autoplay failed:", error);
       });
     }
   }, []);

   useEffect(() => {
     const handleScroll = () => {
       setIsScrolled(window.scrollY > 0);
     };

     window.addEventListener('scroll', handleScroll);
     return () => window.removeEventListener('scroll', handleScroll);
   }, []);

   // Scroll reveal animation observer
   useEffect(() => {
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
       window.location.href = '/?fromCaseStudy=true';
       window.scrollTo(0, 0);
     } else {
       setActivePage(page);
     }
   };

   // Updated navigation handler
  const handleNextProject = () => {
    navigate('/sezzle'); // Update this to your next project's route
  };


   return (
    
     <div className="min-h-screen bg-white text-gray-900 font-sans">
       <header className={`sticky top-0 z-50 transition-all duration-300 ${
         isScrolled ? 'bg-white/70 backdrop-blur-md border-b border-white/20' : 'bg-white'
       }`}>
         <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl py-4 flex justify-between items-center">
           <SpinningLogo />
           <motion.div
             initial={{ y: 20, opacity: 0 }}
             animate={{ y: showNav ? 0 : 20, opacity: showNav ? 1 : 0 }}
             transition={{ duration: 0.5, ease: "easeOut" }}
           >
             <StandardNavbar />
           </motion.div>
         </div>
       </header>
    
      <main className="container mx-auto px-8 sm:px-6 max-w-4xl">
        {/* Hero Section */}
        <section className="mb-12 md:mb-16">
          <h1 className="scroll-reveal opacity-0 translate-y-10 transform transition-all duration-700 ease-out text-2xl sm:text-3xl md:text-4xl font-medium mb-3 md:mb-4 leading-tight text-gray-900">Making AI Discoverable: Adobe Acrobat AI</h1>
          <p className="scroll-reveal opacity-0 translate-y-10 transform transition-all duration-700 ease-out delay-100 text-base sm:text-lg md:text-xl font-normal leading mb-6 md:mb-8 text-gray-600">
            How I designed a contextual discovery system that increased AI Assistant adoption by 38% while reducing notification fatigue.
          </p>
          {/* Role Details */}
          <div className="scroll-reveal opacity-0 translate-y-10 transform transition-all duration-700 ease-out delay-200 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 text-sm mb-8 md:mb-12">
            <div>
              <p className="text-gray-400 text-xs uppercase tracking-wide mb-1">Role</p>
              <p className="text-gray-900">Lead Product Designer</p>
            </div>
            <div>
              <p className="text-gray-400 text-xs uppercase tracking-wide mb-1">Timeline</p>
              <p className="text-gray-900">March '24 to May '24</p>
            </div>
            <div>
              <p className="text-gray-400 text-xs uppercase tracking-wide mb-1">Award</p>
              <p className="text-gray-900">Time Best Innovation 2024</p>
            </div>
            <div>
              <p className="text-gray-400 text-xs uppercase tracking-wide mb-1">Platform</p>
              <p className="text-gray-900">iOS & Android</p>
            </div>
          </div>
         </section>

     
      
        {/* Impact Section */}
        <section id="impact" className="relative py-6 md:py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-12 mb-6 md:mb-8">
              <div className="lg:sticky lg:top-24" style={{ height: 'min-content' }}>
                <div className="max-w-md">
                  <h2 className="scroll-reveal opacity-0 translate-y-10 transform transition-all duration-700 ease-out text-lg sm:text-xl md:text-2xl font-medium md:mb-12 mb-3 md:mb-6 text-gray-900">Impact</h2>
                </div>
              </div>

              <div className="scroll-reveal opacity-0 translate-y-10 transform transition-all duration-700 ease-out delay-100 flex items-start gap-8 md:gap-16">
                <div>
                  <h3 className="text-2xl sm:text-3xl md:text-4xl font-normal text-gray-900 mb-2">38%</h3>
                  <p className="text-base sm:text-lg text-gray-600">Increase in AI feature engagement</p>
                </div>
                <div className="w-px bg-gray-200 self-stretch min-h-[80px]"></div>
                <div>
                  <h3 className="text-2xl sm:text-3xl md:text-4xl font-normal text-gray-900 mb-2">34%</h3>
                  <p className="text-base sm:text-lg text-gray-600">Lift in AI subscriptions after scaled onboarding</p>
                </div>
              </div>
            </div>
          </div>
        </section>
         
         <ChallengesGoalsSection />
         <section className="mb-6 md:mb-8">
          {/* Outer container with dots */}
          <div 
            className="scroll-reveal opacity-0 translate-y-10 transform transition-all duration-700 ease-out relative rounded-2xl md:rounded-3xl p-6 sm:p-8 md:p-10"
            style={{
              backgroundColor: '#0f0f0f',
              backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.15) 1px, transparent 1px)',
              backgroundSize: '24px 24px'
            }}
          >
            {/* Inner bordered container - transparent so dots show through */}
            <div 
              className="rounded-xl md:rounded-2xl p-8 sm:p-12 md:p-16"
              style={{
                border: '1px solid rgba(255,255,255,0.12)',
                backgroundColor: 'transparent'
              }}
            >
              <h2 className="text-base sm:text-lg md:text-2xl font-medium text-white">How might we increase AI awareness without increasing notification fatigue?</h2>
            </div>
          </div>
         </section>
         {/* Solution Section */}
         <FrameworkSection />
         {/* <section className="">
          <h2 className="text-2xl text-center font-medium mt-16 text-gray-900">Framework Before</h2>

         <div className="relative w-screen -mx-[50vw] left-[50%] right-[50%]">
          <img 
            src="FrameworkBeforeAIA.png" 
            alt="Framework Before" 
            className="w-full h-auto"
          />
        </div>
        <h2 className="text-2xl font-medium text-center text-gray-900">Framework After</h2>
        <div className="relative w-screen -mx-[50vw] left-[50%] right-[50%]">
          <img 
            src="FrameworkAfterAIA.png" 
            alt="Framework After" 
            className="w-full h-auto"
          />
        </div>
         </section> */}

        <section className="relative pt-10 pb-20 md:pt-14 md:pb-24">
          <div className="scroll-reveal opacity-0 translate-y-10 transform transition-all duration-700 ease-out space-y-5">
            <h2 className="max-w-3xl text-base sm:text-lg font-medium leading-relaxed text-gray-950">What I learned</h2>
            <p className="max-w-3xl text-base md:text-lg leading-relaxed text-gray-600">
              This work changed how I think about launching AI in mature products. The right discovery model was less about announcing a feature and more about meeting people at the moment the feature could actually help.
            </p>
          </div>

          <div className="scroll-reveal opacity-0 translate-y-10 transform transition-all duration-700 ease-out mt-8 md:mt-10 border-t border-gray-200">
            {[
              {
                number: '01',
                title: 'Discovery is a system, not a feature',
                body: 'Each touchpoint worked because it was part of a connected journey from awareness to understanding to activation, not an isolated promotional surface.'
              },
              {
                number: '02',
                title: 'AI needs different discovery patterns',
                body: 'Traditional new-feature announcements were not enough. People needed concrete use cases, clear timing, and a fast path to experience value.'
              },
              {
                number: '03',
                title: 'Mobile AI asks for lower-friction inputs',
                body: 'Suggested prompts, text selection, and contextual entry points mattered because tapping is easier than composing a perfect question on a small screen.'
              },
              {
                number: '04',
                title: 'Activation should lead toward habit',
                body: 'The framework helped people try AI Assistant, but the next layer would be designing repeat value: the moments that bring someone back because the tool keeps helping.'
              }
            ].map((learning) => (
              <motion.div
                key={learning.number}
                className="grid grid-cols-1 gap-3 border-b border-gray-200 py-6 md:grid-cols-[96px_1fr] md:gap-8 md:py-8"
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true, amount: 0.16 }}
              >
                <span className="text-sm font-medium leading-relaxed text-gray-400">{learning.number}</span>
                <div className="max-w-3xl space-y-3">
                  <h3 className="text-xl md:text-2xl font-medium text-gray-900">{learning.title}</h3>
                  <p className="text-base md:text-lg leading-relaxed text-gray-600">{learning.body}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
         
         <section className="mb-16 md:mb-32">
          <div className="scroll-reveal opacity-0 translate-y-10 transform transition-all duration-700 ease-out mb-8 md:mb-12">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3">Reflection</p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-gray-900">Concluding thoughts</h2>
          </div>

          <p className="scroll-reveal opacity-0 translate-y-10 transform transition-all duration-700 ease-out text-base sm:text-lg text-gray-600 mb-6 md:mb-8">
            This project reinforced that AI products need fundamentally different discovery patterns than traditional features. Users don't wake up wanting to "use AI" especially back in 2024. Acrobat users use the tool to read a contract or understand a research paper. The framework I designed solved the discovery challenge by meeting users in their moment of need and not a moment of wanting to promote a feature. 
          </p>

          <p className="scroll-reveal opacity-0 translate-y-10 transform transition-all duration-700 ease-out text-base sm:text-lg text-gray-600">
            The framework not only addressed immediate challenges but also established a foundation for future feature launches, enabling the team to iterate and innovate rapidly within tight timelines.
          </p>
        </section>
         
         {/* Key Learnings Section
         <section className="mb-24">
           <h2 className="text-3xl font-semibold mb-12">Key Learnings</h2>
           <div className="text-xl space-y-12">
             <p>
               This framework saw a 32% increase in conversion rate when users interacted with the at least 2 promotions, signalling positive results. Some key takeaways:
             </p>
          
             <div>
               <strong>User Awareness is Critical for New Features:</strong>
               <p className="mt-4">Even the most sophisticated tools can go unnoticed without clear entry points. 
               I learned that designing features is only half the battle. Effective promotion and discovery mechanisms are equally essential to maximize impact.</p>
             </div>
             <div>
               <strong>Importance of Contextual, Non-intrusive Prompts:</strong>
               <p className="mt-4">The in-app nudges needed to be informative but not disruptive. Balancing user education with workflow 
               sensitivity was a fine line, teaching me to consider timing, placement, and frequency in design.</p>
             </div>
             <div>
               <strong>Iterative Testing with Real-Time Data:</strong>
               <p className="mt-4">Although user testing was initially limited, leveraging post-launch data 
               gave me insights for rapid adjustments. This experience highlighted the value of being adaptable and responsive to metrics as a form of continuous user feedback.</p>
             </div>
             <div>
               <strong>Collaboration with Cross-functional Teams:</strong>
               <p className="mt-4">Partnering with marketing, product, and engineering allowed us to align on 
               strategies for raising awareness. This project reinforced the impact of multidisciplinary collaboration to address complex challenges.</p>
             </div>
           </div>
         </section> */}
         
        
       </main>

        {/* Next Project Section */}
      <section className="py-12 md:py-24">
        <div className="container mx-auto px-4">
          <div className="scroll-reveal opacity-0 translate-y-10 transform transition-all duration-700 ease-out max-w-4xl mx-auto flex justify-end">
            <a
              href="/sezzle-up"
              className="inline-block px-6 sm:px-8 py-2 rounded-full border-2 border-black text-base sm:text-lg font-medium hover:bg-black hover:text-white transition-colors duration-300"
            >
              Next Project →
            </a>
          </div>
        </div>
      </section>


       {/* Contact Section */}
       <section className="bg-gray-950 text-white pt-16 sm:pt-24 md:pt-32 pb-0 overflow-hidden">
          {/* Top Content Area */}
          <div className="container mx-auto px-6 sm:px-8 md:px-12 max-w-6xl">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-16">
              
              {/* About Column */}
              <div className="scroll-reveal opacity-0 translate-y-10 transform transition-all duration-700 ease-out">
                <p className="text-xs text-gray-500 uppercase tracking-widest mb-4">about</p>
                <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
                  Kasturi is a product designer<br />
                  crafting AI-powered experiences<br />
                  that drive measurable impact<br />
                  and delight users.
                </p>
              </div>

              {/* Contact Column */}
              <div className="scroll-reveal opacity-0 translate-y-10 transform transition-all duration-700 ease-out delay-100">
                <p className="text-xs text-gray-500 uppercase tracking-widest mb-4">contact</p>
                <a 
                  href="mailto:kasturi.khanke@gmail.com"
                  className="text-sm sm:text-base text-gray-300 hover:text-white transition-colors duration-300 block"
                >
                  kasturi.khanke@gmail.com
                </a>
              </div>

              {/* Social Column */}
              <div className="scroll-reveal opacity-0 translate-y-10 transform transition-all duration-700 ease-out delay-200">
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
              style={{
                color: 'white',
              }}
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
 export default AIA;
