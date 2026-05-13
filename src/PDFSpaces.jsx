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
const imageClass = 'block w-full rounded-lg';
const featureVideoFrameClass = 'relative h-[400px] overflow-hidden rounded-lg bg-white md:h-[600px]';
const featureVideoClass = 'h-full w-full rounded-lg object-cover scale-[1.04]';
const croppedFeatureVideoClass = 'h-full w-full rounded-lg object-cover scale-[1.08]';
const assistantFeatureVideoClass = 'h-full w-full rounded-lg object-cover scale-[1.2]';

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
            Building a collaborative AI workspace that brought files, people, context, and custom agents into one shared experience across Acrobat.
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

          <figure className={`scroll-reveal opacity-0 translate-y-10 transform transition-all duration-700 ease-out delay-300 ${figureClass}`}>
            <img
              src="/Spaces_hero.png"
              alt="PDF Spaces interface showing collaborative AI workspace across desktop and mobile"
              className={imageClass}
            />
            <figcaption className={mediaCaptionClass}>
              The shipped PDF Spaces experience across collaboration, context, and AI-powered work.
            </figcaption>
          </figure>
        </section>

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
                src="/Shippedagent.png"
                alt="Shipped layered agent system across PDF Spaces mobile surfaces"
                className={imageClass}
              />
              <figcaption className={mediaCaptionClass}>
                The shipped system made agents visible at the moment of use.
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
        </VideoCaseSection>

        <VideoCaseSection
          label="Overview"
          title="Letting senders craft a narrative with an Overview page for their recipients"
          videoSrc="/Spaces_recipient_landing.mov"
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

        <CaseSection title="Getting stakeholder buy in: building the vision for large screens">
          <CopyBlock>
            <p className={bodyClass}>
              Mobile was the narrowest constraint, but the product vision had to work across desktop and web too. To align PMs, engineers, and leadership, I used large-screen concepts to show how Spaces could become more than a mobile share flow.
            </p>
            <p className={bodyClass}>
              Those larger views made the system easier to discuss: a Space could hold source files, context, AI outputs, notes, and people in one coherent workspace.
            </p>
          </CopyBlock>
          <figure className={figureClass}>
            <img
              src="/HeroSpaces.png"
              alt="Large screen PDF Spaces vision"
              className={imageClass}
            />
            <figcaption className={mediaCaptionClass}>
              Large-screen vision work helped stakeholders see the full workspace model.
            </figcaption>
          </figure>
        </CaseSection>

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
          <figure className={figureClass}>
            <img
              src="/Personality.png"
              alt="Mobile custom assistant personality settings"
              className={imageClass}
            />
            <figcaption className={mediaCaptionClass}>
              Mobile constraints forced each assistant setting to earn its place.
            </figcaption>
          </figure>
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
