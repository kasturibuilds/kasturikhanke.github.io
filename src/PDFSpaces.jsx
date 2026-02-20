import React, { useState, useEffect, useLayoutEffect } from 'react';
import SpinningLogo from './SpinningLogo';
import BottomNav from './BottomNav';
import StandardNavbar from './StandardNavbar';
import { motion } from 'framer-motion';

// Disable browser scroll restoration immediately
if (typeof window !== 'undefined' && 'scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}

const PDFSpaces = () => {
  const [activePage, setActivePage] = useState('pdf-spaces');
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
      window.scrollTo(0, 0);
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
          <h1 className="scroll-reveal opacity-0 translate-y-10 transform transition-all duration-700 ease-out text-2xl sm:text-3xl md:text-4xl font-normal mb-3 md:mb-4 leading-tight text-gray-900">
            PDF Spaces
          </h1>
          <p className="scroll-reveal opacity-0 translate-y-10 transform transition-all duration-700 ease-out delay-100 text-base sm:text-lg md:text-xl font-normal mb-6 md:mb-8 text-gray-600">
            Designing collaborative AI for knowledge workers—permission systems and custom AI agents for Adobe's NotebookLM competitor, shipped in 9 months.
          </p>
          
          {/* Role Details */}
          <div className="scroll-reveal opacity-0 translate-y-10 transform transition-all duration-700 ease-out delay-200 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 text-sm mb-8 md:mb-12">
            <div>
              <p className="text-gray-400 text-xs uppercase tracking-wide mb-1">Role</p>
              <p className="text-gray-900">Mobile Design Lead</p>
            </div>
            <div>
              <p className="text-gray-400 text-xs uppercase tracking-wide mb-1">Timeline</p>
              <p className="text-gray-900">9 months</p>
            </div>
            <div>
              <p className="text-gray-400 text-xs uppercase tracking-wide mb-1">Team</p>
              <p className="text-gray-900">4 PMs, 12 Engineers</p>
            </div>
            <div>
              <p className="text-gray-400 text-xs uppercase tracking-wide mb-1">Platform</p>
              <p className="text-gray-900">iOS, Android & Web</p>
            </div>
          </div>

          {/* Hero Image */}
          <div className="scroll-reveal opacity-0 translate-y-10 transform transition-all duration-700 ease-out delay-300">
            <img 
              src="/HeroSpaces.png" 
              alt="PDF Spaces interface showing collaborative AI workspace with multiple PDFs and AI chat"
              className="w-full rounded-2xl"
            />
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

              <div className="scroll-reveal opacity-0 translate-y-10 transform transition-all duration-700 ease-out delay-100">
                <div className="flex items-start gap-8 md:gap-12 mb-8">
                  <div>
                    <h3 className="text-2xl sm:text-3xl md:text-4xl font-normal text-gray-900 mb-2">0→1</h3>
                    <p className="text-base sm:text-lg text-gray-600 max-w-[180px]">Shipped to production in 9 months</p>
                  </div>
                  <div className="w-px bg-gray-200 self-stretch min-h-[80px]"></div>
                  <div>
                    <h3 className="text-2xl sm:text-3xl md:text-4xl font-normal text-gray-900 mb-2">↑</h3>
                    <p className="text-base sm:text-lg text-gray-600 max-w-[180px]">Increase in sharing on mobile</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Context & Problem Section */}
        <section className="relative py-6 md:py-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-12 mb-12 md:mb-16">
            <div className="lg:sticky lg:top-24" style={{ height: 'min-content' }}>
              <h2 className="scroll-reveal opacity-0 translate-y-10 transform transition-all duration-700 ease-out text-lg sm:text-xl md:text-2xl font-medium mb-3 md:mb-8 text-gray-900">The Problem</h2>
            </div>
            <div className="scroll-reveal opacity-0 translate-y-10 transform transition-all duration-700 ease-out delay-100 space-y-4 md:space-y-6">
              <p className="text-base sm:text-lg text-gray-600">
                Adobe Acrobat is synonymous with PDFs, but it's a single-document tool. Knowledge workers juggle dozens of files—lawyers with case files, researchers with studies, teams with project documents.
              </p>
              <p className="text-base sm:text-lg text-gray-600">
                We built PDF Spaces as Acrobat's answer to NotebookLM, with two key differentiators: <span className="text-gray-900 font-medium">multi-user collaboration with granular permissions, and customizable AI agents that adapt to different working styles.</span>
              </p>
            </div>
          </div>

          {/* My Contribution Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-12 mb-12 md:mb-16">
            <div className="lg:sticky lg:top-24" style={{ height: 'min-content' }}>
              <h2 className="scroll-reveal opacity-0 translate-y-10 transform transition-all duration-700 ease-out text-lg sm:text-xl md:text-2xl font-medium mb-3 md:mb-8 text-gray-900">My Contribution</h2>
            </div>
            <div className="scroll-reveal opacity-0 translate-y-10 transform transition-all duration-700 ease-out delay-100 space-y-4 md:space-y-6">
              <p className="text-base sm:text-lg text-gray-600">
                I led mobile design for the two features that differentiated PDF Spaces from competitors: the sharing and permission system, and the custom AI agent framework. Both shipped across iOS, Android, and web.
              </p>
            </div>
          </div>
        </section>

        {/* What Shipped Section */}
        <section className="relative py-12">
          <div className="space-y-20">
            {/* Mobile Sharing Framework */}
            <motion.div 
              id="sharing" 
              className="border-b border-gray-200 pb-12 md:pb-20"
              style={{ scrollMarginTop: '8vh'}}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true, amount: 0.1 }}
            >
              <div className="mb-8 md:mb-12">
                <h3 className="text-xl md:text-2xl font-medium mb-4 text-gray-900">Mobile Sharing Framework</h3>
                <p className="text-base sm:text-lg text-gray-600">
                  Acrobat's existing share patterns were binary—view or no view. For a collaborative workspace, we needed permissions that matched how teams actually work together.
                </p>
              </div>

              {/* Before/After Comparison */}
              <div className="mb-8 md:mb-12">
                <h4 className="text-lg md:text-xl font-medium mb-4 text-gray-900">Before & After</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <img 
                    src="/BeforeSS.png" 
                    alt="Before: Old Acrobat share sheet with binary view/edit options"
                    className="w-full rounded-xl"
                  />
                  <img 
                    src="/AfterSS.png" 
                    alt="After: New PDF Spaces share sheet with Contributor/Reviewer/Viewer roles"
                    className="w-full rounded-xl"
                  />
                </div>
              </div>

              {/* The Reframe */}
              <div className="mb-8 md:mb-12 pl-5 border-l-2 border-gray-200">
                <p className="text-xs font-semibold uppercase tracking-wide text-gray-400 mb-3">Key Insight</p>
                <blockquote className="text-base sm:text-lg text-gray-900 leading-relaxed mb-3">
                  People think in relationships, not permissions. "She's reviewing this" is clearer than "she has comment access."
                </blockquote>
              </div>

              {/* The Three Roles */}
              <div className="mb-8 md:mb-12">
                <h4 className="text-lg md:text-xl font-medium mb-4 text-gray-900">Three Roles That Shipped</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="group">
                    <div className="pt-4">
                      <span className="text-xs uppercase tracking-widest text-gray-400 mb-3 block">Contributor</span>
                      <p className="font-medium text-gray-900 mb-2">"We're working together"</p>
                      <p className="text-sm text-gray-600">Full edit access. Default for teammates.</p>
                    </div>
                  </div>
                  <div className="group">
                    <div className="pt-4">
                      <span className="text-xs uppercase tracking-widest text-gray-400 mb-3 block">Reviewer</span>
                      <p className="font-medium text-gray-900 mb-2">"I'm giving feedback"</p>
                      <p className="text-sm text-gray-600">Comment and annotate. Default for external domains.</p>
                    </div>
                  </div>
                  <div className="group">
                    <div className="pt-4">
                      <span className="text-xs uppercase tracking-widest text-gray-400 mb-3 block">Viewer</span>
                      <p className="font-medium text-gray-900 mb-2">"I'm learning from this"</p>
                      <p className="text-sm text-gray-600">Read and chat only. Default for large groups.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Two-Tap Share Flow */}
              <div className="mb-8 md:mb-12">
                <h4 className="text-lg md:text-xl font-medium mb-4 text-gray-900">Two-Tap Share Flow</h4>
                <p className="text-base text-gray-600 mb-6">
                  Select recipient, confirm. Advanced options available but never blocking the primary path.
                </p>
                <img 
                  src="/Sharingflow.png" 
                  alt="Two-tap share flow: Select recipient, smart defaults applied, confirm and send"
                  className="w-full rounded-xl"
                />
              </div>

              {/* Default Role */}
              <div className="mb-8 md:mb-12">
                <h4 className="text-lg md:text-xl font-medium mb-4 text-gray-900">Default to Reviewer</h4>
                <p className="text-base text-gray-600 mb-6">
                  We set Reviewer as the default role for all invites. This encouraged collaboration through commenting—the core behavior we wanted to drive in Spaces.
                </p>
              </div>
            </motion.div>

            {/* Custom AI Agents */}
            <motion.div 
              id="agents" 
              className="border-b border-gray-200 pb-12 md:pb-20"
              style={{ scrollMarginTop: '8vh'}}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true, amount: 0.1 }}
            >
              <div className="mb-8 md:mb-12">
                <h3 className="text-xl md:text-2xl font-medium mb-4 text-gray-900">Custom AI Agents</h3>
                <p className="text-base sm:text-lg text-gray-600">
                  Generic AI doesn't work for specialized domains. A legal researcher needs different responses than a creative brainstormer. We shipped customizable agents that adapt to how users want to work.
                </p>
              </div>

              {/* Design Pushback */}
              <div className="mb-8 md:mb-12 pl-5 border-l-2 border-gray-200">
                <p className="text-xs font-semibold uppercase tracking-wide text-gray-400 mb-3">The Friction Point</p>
                <blockquote className="text-base sm:text-lg text-gray-900 leading-relaxed mb-3">
                  PMs initially defined custom agents as a sharing feature—something that belonged in the share sheet alongside permissions. I pushed back in multiple conversations with leadership: customization is valuable, but it shouldn't be the primary entry point. Users need to understand agents as interaction modes first, then optionally customize.
                </blockquote>
                <cite className="text-sm text-gray-500 not-italic">
                  The result: agents live in the prompt bar where users interact with them. Customization is accessible, not mandatory.
                </cite>
              </div>

              {/* Placement Exploration */}
              <div className="mb-8 md:mb-12">
                <h4 className="text-lg md:text-xl font-medium mb-4 text-gray-900">Placement Exploration</h4>
                <p className="text-base text-gray-600 mb-6">
                  Where should agent customization live? I explored three entry points, evaluating each against user intent and interaction cost.
                </p>
                <img 
                  src="/Entrypoints.png" 
                  alt="Wireframe exploration showing three entry point options: Share sheet (rejected - conflates sharing with AI behavior), Home (considered - discoverable but not contextual), and Prompt bar (shipped - just-in-time access)"
                  className="w-full rounded-xl"
                />
              </div>

              {/* What Shipped: Combined Approach */}
              <div className="mb-8 md:mb-12">
                <h4 className="text-lg md:text-xl font-medium mb-4 text-gray-900">What Shipped: A Layered Approach</h4>
                <p className="text-base text-gray-600 mb-6">
                  Rather than picking one entry point, we designed a system where each touchpoint serves a distinct purpose.
                </p>
                <img 
                  src="/Shippedagent.png" 
                  alt="What shipped: Four screens showing Home with AI Assistant indicator, Choose assistant sheet with outcome-focused descriptions, AI Chat with agent in prompt bar, and Share sheet with read-only agent indicator"
                  className="w-full rounded-xl mb-6"
                />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <span className="text-xs uppercase tracking-widest text-gray-400 mb-2 block">① Awareness</span>
                    <p className="font-medium text-gray-900 mb-1">Share sheet indicator</p>
                    <p className="text-sm text-gray-600">Read-only. Users see which agent is active when sharing, but can't change it here.</p>
                  </div>
                  <div>
                    <span className="text-xs uppercase tracking-widest text-gray-400 mb-2 block">② Visibility</span>
                    <p className="font-medium text-gray-900 mb-1">Prompt bar on Home</p>
                    <p className="text-sm text-gray-600">The current agent is visible before users start a conversation.</p>
                  </div>
                  <div>
                    <span className="text-xs uppercase tracking-widest text-gray-400 mb-2 block">③ Control</span>
                    <p className="font-medium text-gray-900 mb-1">Prompt bar interaction</p>
                    <p className="text-sm text-gray-600">Tap to switch or customize. This is where behavior change happens.</p>
                  </div>
                </div>
              </div>

              {/* Personality Spectrum */}
              <div className="mb-8 md:mb-12">
                <h4 className="text-lg md:text-xl font-medium mb-4 text-gray-900">The Personality Spectrum</h4>
                <p className="text-base text-gray-600 mb-6">
                  Freeform customization created decision paralysis. We shipped a constrained spectrum that gives users meaningful control without overwhelming them:
                </p>
                <div className="flex flex-wrap gap-3 mb-6">
                  <span className="px-4 py-2 bg-gray-100 rounded-full text-sm font-medium text-gray-600">Formal</span>
                  <span className="px-4 py-2 bg-gray-200 rounded-full text-sm font-medium text-gray-600">Professional</span>
                  <span className="px-4 py-2 bg-gray-300 rounded-full text-sm font-medium text-gray-600">Casual</span>
                  <span className="px-4 py-2 bg-gray-400 rounded-full text-sm font-medium text-white">Creative</span>
                  <span className="px-4 py-2 bg-gray-500 rounded-full text-sm font-medium text-white">Educator</span>
                </div>
                <img 
                  src="/Personality.png" 
                  alt="Personality spectrum selector showing five agent types with outcome-focused descriptions: Formal, Professional, Casual, Creative, and Educator"
                  className="w-full rounded-xl"
                />
              </div>

              {/* Agent Creation Flow */}
              <div className="mb-8 md:mb-12">
                <h4 className="text-lg md:text-xl font-medium mb-4 text-gray-900">Three-Field Agent Creation</h4>
                <p className="text-base text-gray-600 mb-6">
                  Mobile constraints forced clarity. We stripped agent creation down to three fields: name, personality type, optional focus area.
                </p>
                <video 
                  src="/customagent.mov" 
                  className="w-full max-w-[500px] mx-auto"
                  autoPlay
                  loop
                  muted
                  playsInline
                >
                  Your browser does not support the video tag.
                </video>
              </div>

              {/* Design Decisions */}
              <div className="mb-8 md:mb-12">
                <h4 className="text-lg md:text-xl font-medium mb-4 text-gray-900">Design Decisions</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <p className="font-medium text-gray-900 mb-2">Visual icons for quick switching</p>
                    <p className="text-sm text-gray-600">Users switch agents mid-conversation. Icons let them do this at a glance without reading labels.</p>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 mb-2">Outcome-focused descriptions</p>
                    <p className="text-sm text-gray-600">"Clear, patient explanations" instead of "Educator personality." Users care about what they get.</p>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 mb-2">Three-field creation</p>
                    <p className="text-sm text-gray-600">Name, personality type, optional focus area. Mobile constraints forced this clarity.</p>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 mb-2">Persistent agent indicator</p>
                    <p className="text-sm text-gray-600">Small avatar integrated into the prompt bar. Always visible, minimal space.</p>
                  </div>
                </div>
              </div>

              {/* Iteration: Freeform vs Constrained */}
              <div className="mb-8 md:mb-12">
                <h4 className="text-lg md:text-xl font-medium mb-4 text-gray-900">Exploration: Freeform vs. Constrained</h4>
                <p className="text-base text-gray-600 mb-6">
                  We iterated from blank canvas to structured options, testing four approaches to find the optimal balance between guidance and flexibility.
                </p>
                <img 
                  src="/Freeformconstrained.png" 
                  alt="Four iterations of agent customization: Screen 1 (freeform text fields - rejected for decision paralysis), Screen 2 (hybrid with pills and text - explored), Screen 3 (guided defaults with AI-generated instructions - shipped), Screen 4 (multiple choice sections - rejected for choice overload)"
                  className="w-full rounded-xl mb-6"
                />
                <div className="mb-8 md:mb-12 pl-5 border-l-2 border-gray-200">
                  <p className="text-xs font-semibold uppercase tracking-wide text-gray-400 mb-3">Design Insight</p>
                  <blockquote className="text-base sm:text-lg text-gray-900 leading-relaxed mb-3">
                    Screen 3 shipped because it balanced guidance and flexibility. Users got smart defaults without facing overwhelming choices. Screen 4's multiple choice sections created cognitive overload—proving that structure alone isn't the answer.
                  </blockquote>
                </div>
              </div>

            </motion.div>
          </div>
        </section>

        {/* Reflection */}
        <section className="mb-16 md:mb-32">
          <div className="scroll-reveal opacity-0 translate-y-10 transform transition-all duration-700 ease-out">
            <h2 className="text-xl sm:text-2xl font-medium mb-6 md:mb-8 text-gray-900">Reflection</h2>
            <div className="space-y-6">
              <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
                The hardest challenge wasn't the design—it was pushing back on stakeholder assumptions about where features belonged. PMs wanted agent customization in the share sheet because it felt like a "space setting." I had to make the case, repeatedly, that interaction context matters more than feature categorization.
              </p>
              <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
                Mobile-first design was a forcing function. The 320px constraint stripped away everything non-essential from both the sharing flow and agent UI—clarity that made the desktop experience better too.
              </p>
              <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
                If I did this again, I'd prototype the layered approach (awareness → visibility → control) earlier to show stakeholders the system thinking. It would have saved weeks of debate about "where should this live."
              </p>
            </div>
          </div>
        </section>

        {/* Next Project Section */}
        <section className="py-12 md:py-24">
          <div className="scroll-reveal opacity-0 translate-y-10 transform transition-all duration-700 ease-out max-w-4xl mx-auto flex justify-end">
            <a 
              href="/aia"
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
        <BottomNav activePage={activePage} onNavClick={handleNavClick} isCaseStudy={true} />
      </footer>
    </div>
  );
};

export default PDFSpaces;
