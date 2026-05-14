import React, { useState, useEffect, useLayoutEffect } from 'react';
import SpinningLogo from './SpinningLogo';
import BottomNav from './BottomNav';
import StandardNavbar from './StandardNavbar';
import { motion } from 'framer-motion';

// Disable browser scroll restoration immediately
if (typeof window !== 'undefined' && 'scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}

const SezzleUp = () => {
  const [activePage, setActivePage] = React.useState('sezzle-up');
  const [isScrolled, setIsScrolled] = useState(false);
  const [showNav, setShowNav] = useState(true);
  const [sfTime, setSfTime] = useState('');

  // Scroll to top before browser paints
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
    } else {
      setActivePage(page);
    }
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
          <h1 className="scroll-reveal opacity-0 translate-y-10 transform transition-all duration-700 ease-out text-2xl sm:text-3xl md:text-4xl font-normal mb-3 md:mb-4 leading-tight text-gray-900">Sezzle Up</h1>
          <p className="scroll-reveal opacity-0 translate-y-10 transform transition-all duration-700 ease-out delay-100 text-base sm:text-lg md:text-xl font-normal mb-6 md:mb-8 text-gray-600">
            Designing the first BNPL credit-building program from 0→1, helping millions of underserved users establish credit history through their everyday purchases.
          </p>
          
          {/* Role Details */}
          <div className="scroll-reveal opacity-0 translate-y-10 transform transition-all duration-700 ease-out delay-200 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 text-sm mb-8 md:mb-12">
            <div>
              <p className="text-gray-400 text-xs uppercase tracking-wide mb-1">Role</p>
              <p className="text-gray-900">Lead Product Designer</p>
            </div>
            <div>
              <p className="text-gray-400 text-xs uppercase tracking-wide mb-1">Timeline</p>
              <p className="text-gray-900">6 months</p>
            </div>
            <div>
              <p className="text-gray-400 text-xs uppercase tracking-wide mb-1">Team</p>
              <p className="text-gray-900">VP Product, 2 Engineers</p>
            </div>
            <div>
              <p className="text-gray-400 text-xs uppercase tracking-wide mb-1">Platform</p>
              <p className="text-gray-900">iOS</p>
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

              <div className="scroll-reveal opacity-0 translate-y-10 transform transition-all duration-700 ease-out delay-100 flex flex-wrap items-start gap-8 md:gap-12">
                <div className="flex items-start gap-8 md:gap-12">
                  <div>
                    <h3 className="text-2xl sm:text-3xl md:text-4xl font-normal text-gray-900 mb-2">70%</h3>
                    <p className="text-base sm:text-lg text-gray-600 max-w-[180px]">Increase in bank account connections</p>
                  </div>
                  <div className="w-px bg-gray-200 self-stretch min-h-[80px]"></div>
                  <div>
                    <h3 className="text-2xl sm:text-3xl md:text-4xl font-normal text-gray-900 mb-2">22%</h3>
                    <p className="text-base sm:text-lg text-gray-600 max-w-[180px]">Increase in enrollment completion</p>
                  </div>
                </div>
                <div className="flex items-start gap-8 md:gap-12 mt-6 md:mt-8">
                  <div>
                    <h3 className="text-2xl sm:text-3xl md:text-4xl font-normal text-gray-900 mb-2">4.8</h3>
                    <p className="text-base sm:text-lg text-gray-600 max-w-[180px]">App Store rating post-launch</p>
                  </div>
                  <div className="w-px bg-gray-200 self-stretch min-h-[80px]"></div>
                  <div>
                    <h3 className="text-2xl sm:text-3xl md:text-4xl font-normal text-gray-900 mb-2">80</h3>
                    <p className="text-base sm:text-lg text-gray-600 max-w-[180px]">NPS score (up from 70)</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Full bleed hero image */}
        <div className="scroll-reveal opacity-0 translate-y-10 transform transition-all duration-700 ease-out relative w-screen left-1/2 -translate-x-1/2 mb-8 md:mb-16">
          <img
            src="/SezzleUpMock0.jpg"
            alt="Sezzle Up final designs"
            className="w-full h-auto"
          />
        </div>

        {/* Context & Problem Section */}
        <section className="relative py-6 md:py-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-12 mb-12 md:mb-16">
            <div className="lg:sticky lg:top-24" style={{ height: 'min-content' }}>
              <h2 className="scroll-reveal opacity-0 translate-y-10 transform transition-all duration-700 ease-out text-lg sm:text-xl md:text-2xl font-medium mb-3 md:mb-8 text-gray-900">The Problem</h2>
            </div>
            <div className="scroll-reveal opacity-0 translate-y-10 transform transition-all duration-700 ease-out delay-100 space-y-4 md:space-y-6">
              <p className="text-base sm:text-lg text-gray-600">
                Nearly 28 million Americans have no credit score, and 36% lack basic financial literacy. These users were already using Sezzle's Buy Now, Pay Later service, making on-time payments, but getting zero credit benefit from it.
              </p>
              <p className="text-base sm:text-lg text-gray-600">
                Sezzle saw an opportunity: <span className="text-gray-900 font-medium">what if we could report these payments to credit bureaus and help users build credit through purchases they were already making?</span>
              </p>
            </div>
          </div>

          {/* My Role Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-12 mb-12 md:mb-16">
            <div className="lg:sticky lg:top-24" style={{ height: 'min-content' }}>
              <h2 className="scroll-reveal opacity-0 translate-y-10 transform transition-all duration-700 ease-out text-lg sm:text-xl md:text-2xl font-medium mb-3 md:mb-8 text-gray-900">My Role</h2>
            </div>
            <div className="scroll-reveal opacity-0 translate-y-10 transform transition-all duration-700 ease-out delay-100 space-y-4 md:space-y-6">
              <p className="text-base sm:text-lg text-gray-600">
                As the sole designer on this 0→1 initiative, I owned the end-to-end design process:
              </p>
              <ul className="space-y-3 text-base sm:text-lg text-gray-600">
                <li className="flex items-start gap-3">
                  <span className="text-gray-400 mt-1">•</span>
                  <span>Led discovery research with 12 user interviews to understand mental models around credit building and trust with financial apps</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-gray-400 mt-1">•</span>
                  <span>Defined the enrollment flow architecture and created all UX/UI deliverables</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-gray-400 mt-1">•</span>
                  <span>Ran 3 rounds of usability testing, iterating based on findings</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-gray-400 mt-1">•</span>
                  <span>Partnered closely with engineering to ship within a tight timeline ahead of a major retail partnership</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Design Goals Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-12 mb-12 md:mb-16">
            <div className="lg:sticky lg:top-24" style={{ height: 'min-content' }}>
              <h2 className="scroll-reveal opacity-0 translate-y-10 transform transition-all duration-700 ease-out text-lg sm:text-xl md:text-2xl font-medium mb-3 md:mb-8 text-gray-900">Design Goals</h2>
            </div>
            <div className="scroll-reveal opacity-0 translate-y-10 transform transition-all duration-700 ease-out delay-100">
              <div className="space-y-6">
                <div>
                  <p className="text-base sm:text-lg font-medium text-gray-900 mb-1">Maximize enrollment completion</p>
                  <p className="text-sm sm:text-base text-gray-600">Reduce drop-off at each step of the 3-part enrollment flow</p>
                </div>
                <div>
                  <p className="text-base sm:text-lg font-medium text-gray-900 mb-1">Build trust during sensitive data collection</p>
                  <p className="text-sm sm:text-base text-gray-600">Users need to share SSN and bank details. Make them feel secure, not surveilled</p>
                </div>
                <div>
                  <p className="text-base sm:text-lg font-medium text-gray-900 mb-1">Educate without overwhelming</p>
                  <p className="text-sm sm:text-base text-gray-600">Many users don't understand how credit building works. Explain value without jargon</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* HMW Section */}
        <section className="mb-6 md:mb-8">
          <div 
            className="scroll-reveal opacity-0 translate-y-10 transform transition-all duration-700 ease-out relative rounded-2xl md:rounded-3xl p-6 sm:p-8 md:p-10"
            style={{
              backgroundColor: '#0f0f0f',
              backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.15) 1px, transparent 1px)',
              backgroundSize: '24px 24px'
            }}
          >
            <div 
              className="rounded-xl md:rounded-2xl p-8 sm:p-12 md:p-16"
              style={{
                border: '1px solid rgba(255,255,255,0.12)',
                backgroundColor: 'transparent'
              }}
            >
              <h2 className="text-base sm:text-lg md:text-2xl font-medium text-white">How might we help users build credit through purchases they're already making?</h2>
            </div>
          </div>
        </section>

        <section className="relative py-6 md:py-8">
          {/* Solution Overview */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-12 mb-8">
            <div className="lg:sticky lg:top-24" style={{ height: 'min-content' }}>
              <h2 className="scroll-reveal opacity-0 translate-y-10 transform transition-all duration-700 ease-out text-lg sm:text-xl md:text-2xl font-medium mb-3 md:mb-8 text-gray-900">Solution Overview</h2>
            </div>
            <div className="scroll-reveal opacity-0 translate-y-10 transform transition-all duration-700 ease-out delay-100 space-y-4 md:space-y-8">
              <p className="text-base sm:text-lg text-gray-600">
                I designed a 3-step enrollment flow that progressively built user confidence while collecting the necessary information for credit reporting:
              </p>
              <ol className="list-decimal pl-5 sm:pl-6 space-y-3 md:space-y-4 text-base sm:text-lg text-gray-600">
                <li>
                  <a 
                    href="#educational-onboarding" 
                    className="hover:text-gray-900 cursor-pointer transition-colors"
                    onClick={(e) => {
                      e.preventDefault();
                      document.getElementById('educational-onboarding')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                  >
                    Enrollment checklist redesign
                  </a>
                </li>
                <li>
                  <a 
                    href="#secure-information" 
                    className="hover:text-gray-900 cursor-pointer transition-colors"
                    onClick={(e) => {
                      e.preventDefault();
                      document.getElementById('secure-information')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                  >
                    Secure identity verification
                  </a>
                </li>
                <li>
                  <a 
                    href="#link-bank" 
                    className="hover:text-gray-900 cursor-pointer transition-colors"
                    onClick={(e) => {
                      e.preventDefault();
                      document.getElementById('link-bank')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                  >
                    Bank connection with transparent benefits
                  </a>
                </li>
              </ol>
            </div>
          </div>
        </section>

        {/* Deep Dive Solutions Section */}
        <section className="relative py-12"> 
          <div className="space-y-24">
            {/* Solution 1: Enrollment Checklist Redesign */}
            <motion.div 
              id="educational-onboarding" 
              className="border-b border-gray-200 pb-12 md:pb-20"
              style={{ scrollMarginTop: '8vh'}}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true, amount: 0.1 }}
            >
              <div className="mb-8 md:mb-12">
                <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3 inline-block border-b border-gray-300 pb-1">Solution 1</span>
                <h3 className="text-xl md:text-2xl font-medium mb-4 text-gray-900">Enrollment Checklist Redesign</h3>
                <p className="text-base sm:text-lg text-gray-600">
                  Sezzle Up enrollment required three steps: verify on-time payment history, enter SSN, and link a bank account. The existing "How to Join" screen was causing significant user confusion and drop-off.
                </p>
              </div>

              {/* Research Insight */}
              <div className="mb-8 md:mb-12 pl-5 border-l-2 border-gray-200">
                <p className="text-xs font-semibold uppercase tracking-wide text-gray-400 mb-3">The problem</p>
                <blockquote className="text-base sm:text-lg text-gray-900 leading-relaxed mb-3">
                  The original checklist used colorful, button-like styling for each step. Users couldn't tell what was clickable, what was completed, or where they were in the process.
                </blockquote>
                <cite className="text-sm text-gray-500 not-italic">
                  Google Analytics showed rage clicks on checklist labels. Usability testing confirmed the confusion.
                </cite>
              </div>

              {/* Before/After - Main Visual */}
              <div className="mb-8 md:mb-12">
                {/*<h4 className="text-lg font-medium mb-4 md:mb-6 text-gray-900">Before & After</h4> */}
                <img 
                  src="/SezzleUpMock3.png" 
                  alt="Before: colorful checklist with unclear interaction states. After: clean checklist with clear progress indicators." 
                  className="w-full rounded-xl"
                />
              </div>

              {/* Design Decisions */}
              <div className="mb-8 md:mb-12">
                <h4 className="flex items-center gap-2 text-lg md:text-xl font-bold">
                  <span className="text-lg md:text-xl font-medium mb-2 text-gray-900">Key Design Decisions</span>
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="group">
                    <div className="pt-4">
                      <span className="text-xs uppercase tracking-widest text-gray-400 mb-3 block">01</span>
                      <p className="font-medium text-gray-900 mb-2">Removed button-like styling</p>
                      <p className="text-sm text-gray-600">Checklist items now read as status indicators, not interactive elements. Single CTA at the bottom.</p>
                    </div>
                  </div>
                  <div className="group">
                    <div className="pt-4">
                      <span className="text-xs uppercase tracking-widest text-gray-400 mb-3 block">02</span>
                      <p className="font-medium text-gray-900 mb-2">Clear completion states</p>
                      <p className="text-sm text-gray-600">Green checkmarks for done, empty circles for pending. Users instantly see progress.</p>
                    </div>
                  </div>
                  <div className="group">
                    <div className="pt-4">
                      <span className="text-xs uppercase tracking-widest text-gray-400 mb-3 block">03</span>
                      <p className="font-medium text-gray-900 mb-2">Contextual help</p>
                      <p className="text-sm text-gray-600">Added (?) icon next to SSN field to proactively address "why do you need this?" concerns.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Result */}
              <div className="rounded-xl p-5 md:p-6 border border-gray-200">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wide mb-1 font-medium">Result</p>
                    <p className="text-lg font-semibold text-gray-900">22% increase in enrollment completion</p>
                  </div>
                  <div className="text-sm text-gray-500 md:text-right">
                    Rage clicks on checklist labels dropped to near zero
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Solution 2: Secure Identity Verification */}
            <motion.div 
              id="secure-information" 
              className="border-b border-gray-200 pb-12 md:pb-20"
              style={{ scrollMarginTop: '8vh'}}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true, amount: 0.1 }}
            >
              <div className="mb-8 md:mb-12">
                <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3 inline-block border-b border-gray-300 pb-1">Solution 2</span>
                <h3 className="text-xl md:text-2xl font-medium mb-4 text-gray-900">Secure Identity Verification</h3>
                <p className="text-base sm:text-lg text-gray-600">
                  Credit bureau reporting requires collecting sensitive data: Social Security Number, date of birth, and legal name. This was the highest-stakes moment in the flow. Users who'd been burned by financial institutions before were especially wary.
                </p>
              </div>

              {/* Research Insight */}
              <div className="mb-8 md:mb-12 pl-5 border-l-2 border-gray-200">
                <p className="text-xs font-semibold uppercase tracking-wide text-gray-400 mb-3">Research Insight</p>
                <blockquote className="text-base sm:text-lg text-gray-900 leading-relaxed mb-3 italic">
                  "Why do you need my SSN? Is this a scam?"
                </blockquote>
                <cite className="text-sm text-gray-500 not-italic">
                  4 of 12 interview participants expressed similar concerns
                </cite>
              </div>

              {/* Design Principles */}
              <div className="mb-8 md:mb-12">
                <h4 className="flex items-center gap-2 text-lg md:text-xl font-bold">
                  <span className="text-lg md:text-xl font-medium mb-2 text-gray-900">Design Principles for This Step</span>
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="group">
                    <div className="pt-4">
                      <span className="text-xs uppercase tracking-widest text-gray-400 mb-3 block">01</span>
                      <p className="font-medium text-gray-900 mb-2">Explain before asking</p>
                      <p className="text-sm text-gray-600">Tell users exactly why we need each piece of information and how it's protected</p>
                    </div>
                  </div>
                  <div className="group">
                    <div className="pt-4">
                      <span className="text-xs uppercase tracking-widest text-gray-400 mb-3 block">02</span>
                      <p className="font-medium text-gray-900 mb-2">Give users control</p>
                      <p className="text-sm text-gray-600">Let them verify what they entered with show/hide toggles</p>
                    </div>
                  </div>
                  <div className="group">
                    <div className="pt-4">
                      <span className="text-xs uppercase tracking-widest text-gray-400 mb-3 block">03</span>
                      <p className="font-medium text-gray-900 mb-2">Confirm at every step</p>
                      <p className="text-sm text-gray-600">Real-time validation so users know they're on track</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Exploration - NEW ARTIFACT NEEDED */}
              <div className="mb-8 md:mb-12">
                <h4 className="flex items-center gap-2 text-lg md:text-xl font-bold">
                  <span className="text-lg md:text-xl font-medium mb-2 text-gray-900">Concepts Explored</span>
                </h4>
                <img 
                  src="/Showhideexploration.png" 
                  alt="Two SSN input concepts explored: Enter SSN twice vs. Single field with show/hide toggle" 
                  className="w-full rounded-xl mb-6"
                />
                <p className="text-base text-gray-600">
                  I explored two approaches: the industry-standard "enter SSN twice" pattern, and a single field with show/hide toggle. Testing revealed that re-entering caused frequent errors and frustration. The show/hide approach let users verify their input directly, reducing errors while giving them more control over their sensitive data.
                </p>
              </div>

              {/* Final Design */}
              <img src="SezzleUpMock4.jpg" alt="Final SSN input design with trust elements" className="w-full rounded-xl" />
            </motion.div>

            {/* Solution 3: Bank Connection */}
            <motion.div 
              id="link-bank" 
              className="border-b border-gray-200 pb-12 md:pb-20"
              style={{ scrollMarginTop: '8vh'}}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true, amount: 0.1 }}
            >
              <div className="mb-8 md:mb-12">
                <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3 inline-block border-b border-gray-300 pb-1">Solution 3</span>
                <h3 className="text-xl md:text-2xl font-medium mb-4 text-gray-900">Bank Connection with Transparent Benefits</h3>
                <p className="text-base sm:text-lg text-gray-600">
                  The final step, connecting a bank account, had the lowest conversion rate in our existing flow. Users who'd just shared their SSN were being asked to also give bank access, with little explanation of why.
                </p>
              </div>

              {/* Research Insight */}
              <div className="mb-8 md:mb-12 pl-5 border-l-2 border-gray-200">
                <p className="text-xs font-semibold uppercase tracking-wide text-gray-400 mb-3">Research Insight</p>
                <blockquote className="text-base sm:text-lg text-gray-900 leading-relaxed mb-3 italic">
                  "I already gave you my SSN, now you want my bank too? What are you actually doing with all this?"
                </blockquote>
                <cite className="text-sm text-gray-500 not-italic">
                  When asked why they abandoned at this step
                </cite>
              </div>

              {/* The Real Problem */}
              <div className="mb-8 md:mb-12">
                <h4 className="flex items-center gap-2 text-lg md:text-xl font-bold">
                  <span className="text-lg md:text-xl font-medium mb-2 text-gray-900">Reframing the Problem</span>
                </h4>
                <p className="text-base text-gray-600 mb-4">
                  The original flow asked users to connect their bank with minimal context. But the real issue wasn't the mechanics of bank connection. It was that users didn't understand the value exchange:
                </p>
                <div className="relative pl-5 border-l-2 border-gray-200">
                  <div className="py-1">
                    <p className="text-base md:text-lg font-semibold mb-2 text-gray-900">The insight that changed my approach:</p>
                    <p className="text-gray-600 leading-relaxed">
                      Users weren't uncomfortable with bank connection itself. They use Venmo, Cash App, and similar apps regularly. They were uncomfortable because we hadn't earned enough trust or explained the specific benefit. The problem was <em className="text-gray-900 font-medium">timing and context</em>, not the action.
                    </p>
                  </div>
                </div>
              </div>

              {/* Solution Approach */}
              <div className="mb-8 md:mb-12">
                <h4 className="flex items-center gap-2 text-lg md:text-xl font-bold">
                  <span className="text-lg md:text-xl font-medium mb-2 text-gray-900">My Approach</span>
                </h4>
                <p className="text-base text-gray-600 mb-6">
                  I couldn't change Plaid's bank connection UI (technical constraint), but I could change everything around it:
                </p>
                <img 
                  src="/Bankconnection.png" 
                  alt="Bank connection flow with pre-connection education and post-connection confirmation" 
                  className="w-full rounded-xl mb-6"
                />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="group">
                    <div className="pt-4">
                      <span className="text-xs uppercase tracking-widest text-gray-400 mb-3 block">01</span>
                      <p className="font-medium text-gray-900 mb-2">Pre-connection screen</p>
                      <p className="text-sm text-gray-600">Explains exactly why bank connection helps: "Pay directly from your bank = lower fees = we pass savings to you"</p>
                    </div>
                  </div>
                  <div className="group">
                    <div className="pt-4">
                      <span className="text-xs uppercase tracking-widest text-gray-400 mb-3 block">02</span>
                      <p className="font-medium text-gray-900 mb-2">Plaid SDK</p>
                      <p className="text-sm text-gray-600">Standard Plaid flow (couldn't modify, but added "Secured by Plaid" badge before entering)</p>
                    </div>
                  </div>
                  <div className="group">
                    <div className="pt-4">
                      <span className="text-xs uppercase tracking-widest text-gray-400 mb-3 block">03</span>
                      <p className="font-medium text-gray-900 mb-2">Success + What's Next</p>
                      <p className="text-sm text-gray-600">Celebrates completion and immediately shows their credit-building dashboard</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Before/After */}
              <div className="rounded-2xl p-6 md:p-8 border border-gray-200">
                <h4 className="text-base font-semibold mb-6 text-gray-900">Before & After</h4>
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 items-start">
                  <div className="col-span-1 md:col-span-7">
                    <img 
                      src="/Beforeafterbank.png" 
                      alt="Before and after comparison of bank connection screens" 
                      className="w-full rounded-lg"
                    />
                  </div>
                  <div className="col-span-1 md:col-span-5 space-y-5">
                    <div>
                      <h3 className="font-medium mb-2 text-gray-900">Before</h3>
                      <p className="text-sm md:text-base text-gray-600">
                        Two connection options presented with equal weight. Users didn't know which to choose, and there was no explanation of why signing in with their bank was faster and more reliable.
                      </p>
                    </div>
                    <div>
                      <h3 className="font-medium mb-2 text-gray-900">After</h3>
                      <p className="text-sm md:text-base text-gray-600">
                        Clear "Recommended" badge on the sign-in option with benefits explained: instant verification, no manual entry errors, and faster checkout. Manual entry positioned as a fallback.
                      </p>
                    </div>
                    <div>
                      <h3 className="font-medium mb-2 text-gray-900">Result</h3>
                      <p className="text-sm md:text-base text-gray-600">
                        70% increase in bank connection rate. Also reduced processing costs for Sezzle (credit card fees vs. ACH).
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

          </div>
        </section>

        {/* Results Section */}
        <section className="mb-12 md:mb-16 mt-2">
          <div className="scroll-reveal opacity-0 translate-y-10 transform transition-all duration-700 ease-out mb-8 md:mb-12">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3">Impact</p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-gray-900">Results</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
            {/* Result 1 - Dark */}
            <motion.div 
              className="relative bg-gray-950 p-6 md:p-8 rounded-2xl md:rounded-3xl min-h-[280px] md:min-h-[320px] flex flex-col justify-between"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true, amount: 0.1 }}
            >
              <div>
                <span className="text-2xl md:text-3xl font-light text-white/80 mb-3 block">70%</span>
                <h3 className="text-xl md:text-2xl font-semibold text-white leading-tight">Increase in bank account connections</h3>
              </div>
              <p className="text-sm md:text-base text-white/70 leading-relaxed">
                Users opted for direct bank payments, reducing Sezzle's processing costs. Credit card fees ~3% vs. ACH ~0.5%.
              </p>
            </motion.div>

            {/* Result 2 - Light */}
            <motion.div 
              className="relative bg-white p-6 md:p-8 rounded-2xl md:rounded-3xl border border-gray-200 min-h-[280px] md:min-h-[320px] flex flex-col justify-between"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              viewport={{ once: true, amount: 0.1 }}
            >
              <div>
                <span className="text-2xl md:text-3xl font-light text-gray-400 mb-3 block">22%</span>
                <h3 className="text-xl md:text-2xl font-semibold text-gray-900 leading-tight">Increase in enrollment completion</h3>
              </div>
              <p className="text-sm md:text-base text-gray-500 leading-relaxed">
                Progressive disclosure reduced perceived complexity. Rage clicks on checklist labels dropped to near zero, and post-launch satisfaction scores increased by 22%.
              </p>
            </motion.div>

            {/* Result 3 - Dark */}
            <motion.div 
              className="relative bg-gray-950 p-6 md:p-8 rounded-2xl md:rounded-3xl min-h-[280px] md:min-h-[320px] flex flex-col justify-between"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              viewport={{ once: true, amount: 0.1 }}
            >
              <div>
                <span className="text-2xl md:text-3xl font-light text-white/80 mb-3 block">4.8</span>
                <h3 className="text-xl md:text-2xl font-semibold text-white leading-tight">App Store rating post-launch</h3>
              </div>
              <p className="text-sm md:text-base text-white/70 leading-relaxed">
                Users praised the clarity of the enrollment flow and transparency around credit reporting.
              </p>
            </motion.div>

            {/* Result 4 - Light */}
            <motion.div 
              className="relative bg-white p-6 md:p-8 rounded-2xl md:rounded-3xl border border-gray-200 min-h-[280px] md:min-h-[320px] flex flex-col justify-between"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              viewport={{ once: true, amount: 0.1 }}
            >
              <div>
                <span className="text-2xl md:text-3xl font-light text-gray-400 mb-3 block">70 → 80</span>
                <h3 className="text-xl md:text-2xl font-semibold text-gray-900 leading-tight">NPS score improvement</h3>
              </div>
              <p className="text-sm md:text-base text-gray-500 leading-relaxed">
                10-point increase in Net Promoter Score after Sezzle Up launch. Measured via in-app survey 30 days post-enrollment.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Additional Sezzle Growth Work */}
        <section className="mb-16 md:mb-24">
          <div className="scroll-reveal opacity-0 translate-y-10 transform transition-all duration-700 ease-out mb-8 md:mb-10">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3">Additional impact</p>
            <h2 className="text-xl sm:text-2xl font-medium text-gray-900">Growth work beyond Sezzle Up</h2>
          </div>

          <div className="scroll-reveal opacity-0 translate-y-10 transform transition-all duration-700 ease-out grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border-t border-gray-200 pt-6">
              <span className="text-2xl md:text-3xl font-light text-gray-400 mb-3 block">#143 → #64</span>
              <h3 className="text-lg md:text-xl font-medium text-gray-900 mb-3">App Store Optimization</h3>
              <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                Identified critical UX issues through usability testing and NPS analysis. Design improvements contributed to an App Store ranking jump from #143 to #64 in Finance within 3 weeks.
              </p>
            </div>

            <div className="border-t border-gray-200 pt-6">
              <span className="text-2xl md:text-3xl font-light text-gray-400 mb-3 block">40+</span>
              <h3 className="text-lg md:text-xl font-medium text-gray-900 mb-3">0→1 Affiliate Program</h3>
              <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                Designed the growth strategy for a new affiliate platform, aligned requirements across VPs, Engineering, and Customer Support, and delivered an MVP that launched with 40+ affiliates and increased revenue.
              </p>
            </div>
          </div>
        </section>

        {/* User Testimonials */}
        <section className="scroll-reveal opacity-0 translate-y-10 transform transition-all duration-700 ease-out mb-16 md:mb-24 mt-8 md:mt-12">
          <h2 className="text-xl sm:text-2xl font-medium mb-4 md:mb-6 text-gray-900">What Users Said</h2>
          <p className="text-base sm:text-lg text-gray-600 mb-6 md:mb-8">
            App Store reviews and support ticket sentiment after launch:
          </p>
          <img src="SezzleUpMock2.jpg" alt="User testimonials from App Store reviews" className="w-full rounded-lg" />
        </section>

        {/* Reflection & Learnings */}
        <section className="mb-16 md:mb-32">
          <div className="scroll-reveal opacity-0 translate-y-10 transform transition-all duration-700 ease-out mb-8 md:mb-10">
            <h2 className="text-xl sm:text-2xl font-medium mb-4 md:mb-6 text-gray-900">Reflection</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            {/* What Worked */}
            <div className="scroll-reveal opacity-0 translate-y-10 transform transition-all duration-700 ease-out">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">What worked well</h3>
              <div className="space-y-5">
                <div className="pl-5 border-l-2 border-gray-200">
                  <p className="text-base text-gray-900 font-medium mb-1">Early user research paid off</p>
                  <p className="text-sm text-gray-600 leading-relaxed">Interviewing users before designing saved us from building the wrong thing. The "trust gap" insight shaped every decision.</p>
                </div>
                <div className="pl-5 border-l-2 border-gray-200">
                  <p className="text-base text-gray-900 font-medium mb-1">Progressive disclosure reduced cognitive load</p>
                  <p className="text-sm text-gray-600 leading-relaxed">Showing users the full journey upfront, then revealing details step-by-step, dramatically improved completion.</p>
                </div>
                <div className="pl-5 border-l-2 border-gray-200">
                  <p className="text-base text-gray-900 font-medium mb-1">Close engineering collaboration</p>
                  <p className="text-sm text-gray-600 leading-relaxed">Weekly syncs with devs meant we caught technical constraints early and designed within realistic bounds.</p>
                </div>
              </div>
            </div>

            {/* What I'd Do Differently */}
            <div className="scroll-reveal opacity-0 translate-y-10 transform transition-all duration-700 ease-out delay-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">What I'd do differently</h3>
              <div className="space-y-5">
                <div className="pl-5 border-l-2 border-gray-200">
                  <p className="text-base text-gray-900 font-medium mb-1">More longitudinal research</p>
                  <p className="text-sm text-gray-600 leading-relaxed">We optimized for enrollment completion, but I wish we'd tracked credit score improvements over 6+ months to validate the full value proposition.</p>
                </div>
                <div className="pl-5 border-l-2 border-gray-200">
                  <p className="text-base text-gray-900 font-medium mb-1">Accessibility audit earlier</p>
                  <p className="text-sm text-gray-600 leading-relaxed">We did accessibility QA late in the process. Starting earlier would have prevented some rework.</p>
                </div>
                <div className="pl-5 border-l-2 border-gray-200">
                  <p className="text-base text-gray-900 font-medium mb-1">More A/B testing</p>
                  <p className="text-sm text-gray-600 leading-relaxed">Timeline pressure meant some decisions were based on qualitative testing alone. I'd push for quantitative validation on key screens.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Key Takeaway */}
          <div className="scroll-reveal opacity-0 translate-y-10 transform transition-all duration-700 ease-out mt-10 md:mt-12">
            <div className="p-6 md:p-8 border border-gray-200 rounded-2xl">
              <h3 className="text-lg font-semibold mb-3 text-gray-900">The biggest lesson</h3>
              <p className="text-base md:text-lg text-gray-600 leading-relaxed">
                In financial products, <span className="text-gray-900 font-semibold">trust is earned in micro-moments</span>. Every screen, every word, every interaction either builds or erodes it. The winning strategy wasn't clever UI. It was relentlessly asking "does this make users feel more confident or more anxious?" at every step.
              </p>
            </div>
          </div>
        </section>


        {/* Next Project Section */}
        <section className="py-12 md:py-24">
          <div className="scroll-reveal opacity-0 translate-y-10 transform transition-all duration-700 ease-out max-w-4xl mx-auto flex justify-end">
            <a 
              href="/pdf-spaces"
              className="inline-block px-6 sm:px-8 py-2 rounded-full border-2 border-black text-base sm:text-lg font-medium hover:bg-black hover:text-white transition-colors duration-300"
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

export default SezzleUp;
