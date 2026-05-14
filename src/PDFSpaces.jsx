/* eslint-disable react/prop-types */
import { useState, useEffect, useLayoutEffect } from 'react';
import SpinningLogo from './SpinningLogo';
import BottomNav from './BottomNav';
import StandardNavbar from './StandardNavbar';
import { motion } from 'framer-motion';

if (typeof window !== 'undefined' && 'scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}

const titleClass = 'text-2xl sm:text-3xl md:text-4xl font-medium leading-tight text-gray-900';
const sectionTitleClass = 'text-base sm:text-lg font-medium leading-relaxed text-gray-950';
const bodyClass = 'text-base md:text-lg leading-relaxed text-gray-600';
const featureLabelClass = 'text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3 inline-block border-b border-gray-300 pb-1';
const featureTitleClass = 'text-xl md:text-2xl font-medium mb-4 text-gray-900';
const mediaCaptionClass = 'w-full text-center text-sm leading-relaxed text-gray-500';
const figureClass = 'w-full space-y-4 my-10 md:my-12';
const heroFigureClass = 'w-full space-y-4 my-10 md:my-12';
const imageClass = 'block w-full rounded-lg';
const heroImageClass = 'block w-full h-auto';
const featureVideoFrameClass = 'relative h-[400px] overflow-hidden rounded-lg bg-white md:h-[600px]';
const featureVideoClass = 'h-full w-full rounded-lg object-cover scale-[1.04]';
const croppedFeatureVideoClass = 'h-full w-full rounded-lg object-cover scale-[1.08]';
const assistantFeatureVideoClass = 'h-full w-full rounded-lg object-cover scale-[1.2]';
const wideFeatureVideoClass = 'h-full w-full rounded-lg bg-gray-950 object-contain';

const CaseSection = ({ title, children }) => (
  <motion.section
    className="relative py-10 md:py-14"
    initial={{ opacity: 0, y: 36 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.7 }}
    viewport={{ once: true, amount: 0.12 }}
  >
    <div className="scroll-reveal opacity-0 translate-y-10 transform transition-all duration-700 ease-out space-y-5">
      <h2 className={`${sectionTitleClass} max-w-3xl`}>{title}</h2>
      {children}
    </div>
  </motion.section>
);

const VideoCaseSection = ({ label, title, children, videoSrc, videoClass = featureVideoClass, caption, ariaLabel, after }) => (
  <motion.section
    className="relative py-10 md:py-14"
    initial={{ opacity: 0, y: 36 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.7 }}
    viewport={{ once: true, amount: 0.12 }}
  >
    <div className="scroll-reveal opacity-0 translate-y-10 transform transition-all duration-700 ease-out grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-12 items-start">
      <div className="pt-4 md:pt-16">
        {label && <span className={featureLabelClass}>{label}</span>}
        <h3 className={featureTitleClass}>{title}</h3>
        <div className="space-y-4">
          {children}
        </div>
      </div>
      <figure className="w-full space-y-4">
        <div className={featureVideoFrameClass}>
          <video
            src={videoSrc}
            className={videoClass}
            aria-label={ariaLabel}
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
          >
            Your browser does not support the video tag.
          </video>
        </div>
        <figcaption className={mediaCaptionClass}>{caption}</figcaption>
      </figure>
    </div>
    {after}
  </motion.section>
);

const CopyBlock = ({ children }) => (
  <div className="space-y-5 max-w-3xl">{children}</div>
);

const ImpactSection = () => (
  <section className="relative py-6 md:py-8">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-12">
      <div className="lg:sticky lg:top-24" style={{ height: 'min-content' }}>
        <h2 className="scroll-reveal opacity-0 translate-y-10 transform transition-all duration-700 ease-out text-lg sm:text-xl md:text-2xl font-medium text-gray-900">
          Impact
        </h2>
      </div>

      <div className="scroll-reveal opacity-0 translate-y-10 transform transition-all duration-700 ease-out delay-100 grid grid-cols-1 gap-8 sm:grid-cols-[minmax(0,1fr)_1px_minmax(0,1fr)] md:gap-16">
        <div className="min-w-0">
          <h3 className="text-2xl sm:text-3xl md:text-4xl font-normal text-gray-900 mb-2">Most shares</h3>
          <p className="text-base sm:text-lg text-gray-600">
            happened on mobile, making access, permissions, and handoff critical to the v1 experience
          </p>
        </div>
        <div className="hidden w-px bg-gray-200 self-stretch min-h-[80px] sm:block" />
        <div className="min-w-0">
          <h3 className="text-2xl sm:text-3xl md:text-4xl font-normal text-gray-900 mb-2">5+ comments</h3>
          <p className="text-base sm:text-lg text-gray-600">
            per Space, showing that shared Spaces were becoming collaborative work surfaces
          </p>
        </div>
      </div>
    </div>
  </section>
);

const ChallengeList = () => (
  <div className="scroll-reveal opacity-0 translate-y-10 transform transition-all duration-700 ease-out mt-8 md:mt-10 border-t border-gray-200">
    {[
      {
        number: '01',
        title: 'Make the product legible',
        body: 'PDF Spaces could not feel like “chat with a PDF” with more files attached. People needed to understand that a Space was a shared workspace with source material, generated context, collaborators, and AI behavior.'
      },
      {
        number: '02',
        title: 'Protect trust and control',
        body: 'Collaboration changed the stakes. Access, roles, and recipient context had to feel explicit so people knew who could enter a Space and what each person could do there.'
      },
      {
        number: '03',
        title: 'Keep AI useful, not abstract',
        body: 'Custom agents were powerful, but they needed to appear where people were already thinking about the work the AI should support, not as configuration hidden inside a sharing flow.'
      }
    ].map((challenge) => (
      <motion.div
        key={challenge.number}
        className="grid grid-cols-1 gap-3 border-b border-gray-200 py-6 md:grid-cols-[96px_1fr] md:gap-8 md:py-8"
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true, amount: 0.16 }}
      >
        <span className="text-sm font-medium leading-relaxed text-gray-400">{challenge.number}</span>
        <div className="max-w-3xl space-y-3">
          <h3 className="text-xl md:text-2xl font-medium text-gray-900">{challenge.title}</h3>
          <p className="text-base md:text-lg leading-relaxed text-gray-600">{challenge.body}</p>
        </div>
      </motion.div>
    ))}
  </div>
);

const PDFSpaces = () => {
  const [activePage, setActivePage] = useState('pdf-spaces');
  const [isScrolled, setIsScrolled] = useState(false);
  const [showNav] = useState(true);
  const [sfTime, setSfTime] = useState('');

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
            transition={{ duration: 0.5, ease: 'easeOut' }}
          >
            <StandardNavbar />
          </motion.div>
        </div>
      </header>

      <main className="container mx-auto px-8 sm:px-6 max-w-4xl">
        <section className="mb-12 md:mb-16">
          <h1 className={`scroll-reveal opacity-0 translate-y-10 transform transition-all duration-700 ease-out ${titleClass} mb-3 md:mb-4`}>
            Acrobat PDF Spaces
          </h1>
          <p className="scroll-reveal opacity-0 translate-y-10 transform transition-all duration-700 ease-out delay-100 max-w-4xl text-base sm:text-lg md:text-xl font-normal mb-6 md:mb-8 text-gray-600">
            Building a collaborative AI workspace that brings files, people, context, and custom agents into one shared experience across Acrobat.
          </p>

          <div className="scroll-reveal opacity-0 translate-y-10 transform transition-all duration-700 ease-out delay-200 grid max-w-4xl grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 text-sm mb-8 md:mb-12">
            <div>
              <p className="text-gray-400 text-xs uppercase tracking-wide mb-1">Role</p>
              <p className="text-gray-900">Design Lead, Mobile</p>
            </div>
            <div>
              <p className="text-gray-400 text-xs uppercase tracking-wide mb-1">Timeline</p>
              <p className="text-gray-900">9 months</p>
            </div>
            <div>
              <p className="text-gray-400 text-xs uppercase tracking-wide mb-1">Team</p>
              <p className="text-gray-900">4 PMs, 39 Engineers</p>
            </div>
            <div>
              <p className="text-gray-400 text-xs uppercase tracking-wide mb-1">Platform</p>
              <p className="text-gray-900">iOS, Android, Web</p>
            </div>
          </div>

          <figure className={`scroll-reveal opacity-0 translate-y-10 transform transition-all duration-700 ease-out delay-300 ${heroFigureClass}`}>
            <img
              src="/Spaces_cover.png"
              alt="PDF Spaces interface showing collaborative AI workspace across desktop and mobile"
              className={heroImageClass}
            />
          </figure>
        </section>

        <ImpactSection />

        <CaseSection title="Project context">
          <CopyBlock>
            <p className={bodyClass}>
              Acrobat has always been where people open important documents, but AI Assistant shifted the expectation from reading files to understanding and acting on them. PDF Spaces was the next step: a shared work surface where multiple PDFs, generated answers, notes, collaborators, and custom agents could live together.
            </p>
            <p className={bodyClass}>
              The project started as a broad workspace vision and quickly became a launch problem. We needed to ship a v1 that felt ambitious enough to change how people worked with documents, but grounded enough to fit inside Acrobat’s existing mental models for files, sharing, and trust.
            </p>
          </CopyBlock>
        </CaseSection>

        <CaseSection title="The core challenge">
          <CopyBlock>
            <p className={bodyClass}>
              The hard part was not only designing new surfaces. It was helping people understand a new product category inside a familiar tool. A Space had to feel more capable than a folder, more structured than a chat, and safer than an open-ended AI playground.
            </p>
            <p className={bodyClass}>
              My role focused on the mobile experience, collaboration model, recipient landing experience, custom agent entry points, and the detailed specs needed to keep the product coherent across iOS, Android, and web.
            </p>
          </CopyBlock>
          <ChallengeList />
        </CaseSection>

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
              <h2 className="text-base sm:text-lg md:text-2xl font-medium text-white">
                How might we help people move from static PDFs to a shared AI workspace without losing context, control, or trust?
              </h2>
            </div>
          </div>
        </section>

        <CaseSection title="Starting with the vision">
          <CopyBlock>
            <p className={bodyClass}>
              Before the team could commit to individual features, we needed alignment on what a Space was. I helped shape early vision work and workshop discussions that made the product tangible for PMs, engineers, and leadership.
            </p>
            <p className={bodyClass}>
              Mobile was the narrowest constraint, but the product vision had to work across desktop and web too. Large-screen concepts helped stakeholders see the full workspace model: source files, context, AI outputs, notes, and people in one coherent place.
            </p>
          </CopyBlock>
          <figure className={figureClass}>
            <div className={featureVideoFrameClass}>
              <video
                src="/Spaces_Vision.mov"
                className={wideFeatureVideoClass}
                aria-label="Large screen PDF Spaces vision"
                autoPlay
                loop
                muted
                playsInline
                preload="auto"
              >
                Your browser does not support the video tag.
              </video>
            </div>
            <figcaption className={mediaCaptionClass}>
              Vision work helped stakeholders align on PDF Spaces as a shared AI workspace, not another file-sharing surface.
            </figcaption>
          </figure>
        </CaseSection>

        <CaseSection title="From vision to shipped v1">
          <CopyBlock>
            <p className={bodyClass}>
              Once the direction was aligned, the work became translating that broad vision into shippable mobile flows. The v1 experience had to make access, sharing, AI behavior, and recipient context feel like one connected system.
            </p>
          </CopyBlock>
        </CaseSection>

        <VideoCaseSection
          label="Access"
          title="Enabling different roles of access"
          videoSrc="/Spaces_roles.mov"
          ariaLabel="Role based sharing in PDF Spaces"
          caption="Roles made sharing feel like inviting someone into a workspace, not exposing a file."
        >
          <p className={bodyClass}>
            The first collaboration problem was access. Sharing a Space was not the same as sharing a static PDF. People could review, edit, comment, ask AI questions, or simply read. The permission model had to make those relationships clear without making the sender think like an admin.
          </p>
          <p className={bodyClass}>
            We moved from binary view access to roles that matched what collaborators were there to do: contributor, reviewer, and viewer.
          </p>
        </VideoCaseSection>

        <VideoCaseSection
          label="Share flow"
          title="Ensuring we don’t reinvent the wheel"
          videoSrc="/Spaces_copylink.mov"
          videoClass={croppedFeatureVideoClass}
          ariaLabel="Two-tap PDF Spaces sharing flow"
          caption="Reusing known sharing mechanics kept the new product easier to learn."
        >
          <p className={bodyClass}>
            Acrobat already had mature sharing patterns, and PDF Spaces needed to feel native to that system. The goal was not to invent a new share model for every surface. It was to reuse the parts people already understood, then add the smallest layer needed for Spaces.
          </p>
          <p className={bodyClass}>
            The final flow kept the familiar invite path: choose people, set the right access, send. The new behavior lived where it mattered, but the interaction still felt like Acrobat.
          </p>
        </VideoCaseSection>

        <VideoCaseSection
          label="AI behavior"
          title="Customizing the PDF Space with custom agents"
          videoSrc="/Spaces_customassistant.mov"
          videoClass={assistantFeatureVideoClass}
          ariaLabel="Creating a custom assistant in PDF Spaces"
          caption="Creating a custom assistant starts from the work someone wants the Space to support."
          after={(
            <figure className={`${figureClass} mt-10 md:mt-12`}>
              <img
                src="/Spaces_CAcustomization.png"
                alt="Custom agent customization options for PDF Spaces"
                className={imageClass}
              />
              <figcaption className={mediaCaptionClass}>
                Customization stayed focused on the choices that shaped how the assistant should behave.
              </figcaption>
            </figure>
          )}
        >
          <p className={bodyClass}>
            Custom agents started as a separate project. PMs originally wanted the entry point inside the share sheet, because the agent affected the Space being shared.
          </p>
          <p className={bodyClass}>
            I pushed to move it into the input container instead. Sharing is about access. The agent is about behavior. People should customize AI when they are about to use AI, not when they are deciding who can enter the Space.
          </p>
          <p className={bodyClass}>
            Across the custom agent track, I partnered with PMs, researchers, and AI/ML engineers to evaluate 15+ concepts and prioritize 5 for the v1 experience.
          </p>
        </VideoCaseSection>

        <VideoCaseSection
          label="Overview"
          title="Letting senders craft a narrative with an Overview page for their recipients"
          videoSrc="/Spaces_edit.mov"
          ariaLabel="Recipient landing experience for PDF Spaces"
          caption="Overview helped recipients understand the Space before they had to ask a question."
        >
          <p className={bodyClass}>
            Recipients were often opening a Space cold. The sender knew why the files mattered, what had changed, and what they needed someone else to do. The recipient usually got none of that context.
          </p>
          <p className={bodyClass}>
            Overview became the sender’s way to shape the first read. It gave the Space a front door: files, generated summaries, audio, and a clear sense of what the recipient was walking into.
          </p>
        </VideoCaseSection>

        <VideoCaseSection
          label="Recipient experience"
          title="Designing the recipient experience"
          videoSrc="/Spaces_recipient_landing.mov"
          ariaLabel="Recipient landing experience in PDF Spaces"
          caption="Recipient surfaces clarified why someone had been invited and what they could do next."
        >
          <p className={bodyClass}>
            The recipient experience had to answer three questions quickly: what is this Space, what is inside it, and what can I do next?
          </p>
          <p className={bodyClass}>
            That meant the first moments could not feel like a blank chat. The product had to orient people before asking them to interact.
          </p>
        </VideoCaseSection>

        <CaseSection title="Shipping on mobile and QA’ing the product">
          <CopyBlock>
            <p className={bodyClass}>
              Shipping PDF Spaces on mobile meant translating a broad workspace vision into a constrained surface, then staying close to engineering through implementation.
            </p>
            <p className={bodyClass}>
              I created detailed specs, reviewed builds, tracked edge cases across iOS and Android, and QA’d the flows so the product held together in someone’s hand.
            </p>
          </CopyBlock>
        </CaseSection>

        <CaseSection title="Reflection">
          <CopyBlock>
            <p className={bodyClass}>
              This project was messy in the way real product work is messy: multiple PMs, 39 engineers, platform constraints, leadership reviews, and a lot of cross-functional trust.
            </p>
            <p className={bodyClass}>
              The shipped product looked simple, but the work was in making access, context, and AI behavior feel like one system.
            </p>
            <p className={sectionTitleClass}>
              PDFs preserve information. Spaces asked what it would take to preserve understanding.
            </p>
          </CopyBlock>
        </CaseSection>

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

      <section className="bg-gray-950 text-white pt-16 sm:pt-24 md:pt-32 pb-0 overflow-hidden">
        <div className="container mx-auto px-6 sm:px-8 md:px-12 max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-16">
            <div className="scroll-reveal opacity-0 translate-y-10 transform transition-all duration-700 ease-out">
              <p className="text-xs text-gray-500 uppercase tracking-widest mb-4">about</p>
              <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
                Kasturi is a product designer<br />
                crafting AI-powered experiences<br />
                that drive measurable impact<br />
                and delight users.
              </p>
            </div>

            <div className="scroll-reveal opacity-0 translate-y-10 transform transition-all duration-700 ease-out delay-100">
              <p className="text-xs text-gray-500 uppercase tracking-widest mb-4">contact</p>
              <a
                href="mailto:kasturi.khanke@gmail.com"
                className="text-sm sm:text-base text-gray-300 hover:text-white transition-colors duration-300 block"
              >
                kasturi.khanke@gmail.com
              </a>
            </div>

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
