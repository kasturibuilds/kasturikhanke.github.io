import ProjectNavigation from './ProjectNavigation';
import SiteHeader from './SiteHeader';
import SiteFooter from './SiteFooter';
import React, { useEffect, useLayoutEffect } from 'react';
import BottomNav from './BottomNav';
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
      <SiteHeader />

      <main className="case-study-main container mx-auto px-8 sm:px-6 max-w-4xl">
        {/* Hero Section */}
        <section className="case-study-intro mb-12 md:mb-16">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-medium mb-3 md:mb-4 leading-tight text-gray-900">Making AI Discoverable: Adobe Acrobat AI</h1>
          <p className="text-base sm:text-lg md:text-xl font-normal leading mb-6 md:mb-8 text-gray-600">
            How I helped mobile users discover and understand Acrobat AI Assistant at the right moment, increasing adoption while reducing notification fatigue.
          </p>
          {/* Role Details */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 text-sm mb-8 md:mb-12">
            <div>
              <p className="text-gray-400 text-xs uppercase tracking-wide mb-1">Role</p>
              <p className="text-gray-900">Lead Product Designer</p>
            </div>
            <div>
              <p className="text-gray-400 text-xs uppercase tracking-wide mb-1">Timeline</p>
              <p className="text-gray-900">Launch discovery sprint</p>
            </div>
            <div>
              <p className="text-gray-400 text-xs uppercase tracking-wide mb-1">Award</p>
              <p className="text-gray-900">Industry-recognized launch</p>
            </div>
            <div>
              <p className="text-gray-400 text-xs uppercase tracking-wide mb-1">Platform</p>
              <p className="text-gray-900">iOS & Android</p>
            </div>
          </div>
         </section>



        {/* Impact Section */}
        <section id="impact" className="relative py-6 md:py-8" aria-labelledby="impact-heading">
          <div className="w-full">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-12 mb-6 md:mb-8">
              <h2 id="impact-heading" className="text-lg sm:text-xl md:text-2xl font-medium text-gray-900">Impact</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 items-start gap-6 sm:gap-8">
                <div className="min-w-0">
                  <h3 className="text-xl font-medium text-gray-900 mb-2">Higher engagement</h3>
                  <p className="text-base text-gray-600">Increase in AI feature engagement</p>
                </div>
                <div className="min-w-0">
                  <h3 className="text-xl font-medium text-gray-900 mb-2">Subscription lift</h3>
                  <p className="text-base text-gray-600">Lift in AI subscriptions after scaled onboarding</p>
                </div>
              </div>
            </div>
          </div>
        </section>

         <ChallengesGoalsSection />
         <section className="mb-6 md:mb-8">
          {/* Outer container with dots */}
          <div
            className="scroll-reveal transform transition-all duration-700 ease-out relative rounded-2xl md:rounded-3xl p-6 sm:p-8 md:p-10"
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
            src="/FrameworkBeforeAIA.png"
            alt="Framework Before"
            className="w-full h-auto"
          />
        </div>
        <h2 className="text-2xl font-medium text-center text-gray-900">Framework After</h2>
        <div className="relative w-screen -mx-[50vw] left-[50%] right-[50%]">
          <img
            src="/FrameworkAfterAIA.png"
            alt="Framework After"
            className="w-full h-auto"
          />
        </div>
         </section> */}

        <section className="relative pt-10 pb-20 md:pt-14 md:pb-24">
          <div className="scroll-reveal transform transition-all duration-700 ease-out space-y-5">
            <h2 className="max-w-3xl text-base sm:text-lg font-medium leading-relaxed text-gray-950">What I learned</h2>
            <p className="max-w-3xl text-base md:text-lg leading-relaxed text-gray-600">
              This work changed how I think about launching AI in mature products. The right discovery model was less about announcing a feature and more about meeting people at the moment the feature could actually help.
            </p>
          </div>

          <div className="scroll-reveal transform transition-all duration-700 ease-out mt-8 md:mt-10 border-t border-gray-200">
            {[
              {
                label: 'System',
                title: 'Discovery is a system, not a feature',
                body: 'Each touchpoint worked because it was part of a connected journey from awareness to understanding to activation, not an isolated promotional surface.'
              },
              {
                label: 'Timing',
                title: 'AI needs different discovery patterns',
                body: 'Traditional new-feature announcements were not enough. People needed concrete use cases, clear timing, and a fast path to experience value.'
              },
              {
                label: 'Input',
                title: 'Mobile AI asks for lower-friction inputs',
                body: 'Suggested prompts, text selection, and contextual entry points mattered because tapping is easier than composing a perfect question on a small screen.'
              },
              {
                label: 'Habit',
                title: 'Activation should lead toward habit',
                body: 'The framework helped people try AI Assistant, but the next layer would be designing repeat value: the moments that bring someone back because the tool keeps helping.'
              }
            ].map((learning) => (
              <motion.div
                key={learning.label}
                className="grid grid-cols-1 gap-3 border-b border-gray-200 py-6 md:grid-cols-[96px_1fr] md:gap-8 md:py-8"
                initial={false}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true, amount: 0.16 }}
              >
                <span className="text-sm font-medium leading-relaxed text-gray-400">{learning.label}</span>
                <div className="max-w-3xl space-y-3">
                  <h3 className="text-xl md:text-2xl font-medium text-gray-900">{learning.title}</h3>
                  <p className="text-base md:text-lg leading-relaxed text-gray-600">{learning.body}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

         <section className="mb-16 md:mb-32">
          <div className="scroll-reveal transform transition-all duration-700 ease-out mb-8 md:mb-12">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3">Reflection</p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-gray-900">Concluding thoughts</h2>
          </div>

          <p className="scroll-reveal transform transition-all duration-700 ease-out text-base sm:text-lg text-gray-600 mb-6 md:mb-8">
            This project reinforced that AI features need contextual discovery. People don't open Acrobat because they want to "use AI." They open it to read a contract, understand a research paper, or find something important in a document. The framework I designed met users in those moments instead of asking them to learn a new feature before seeing value.
          </p>

          <p className="scroll-reveal transform transition-all duration-700 ease-out text-base sm:text-lg text-gray-600">
            The framework not only addressed immediate challenges but also established a foundation for future feature launches, enabling the team to iterate and innovate rapidly within tight timelines.
          </p>
        </section>

       </main>

        {/* Project navigation */}
      <div className="container mx-auto px-4 max-w-4xl">
          <ProjectNavigation currentPath="/aia" />
        </div>


       {/* Contact Section */}
       <SiteFooter />
       <div className="w-full bg-gray-950">
         <BottomNav activePage={activePage} onNavClick={handleNavClick}
         isCaseStudy={true} />
       </div>
     </div>
   );
 };
 export default AIA;
