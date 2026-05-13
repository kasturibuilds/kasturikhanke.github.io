/* eslint-disable react/prop-types */
import { useState, useEffect, useLayoutEffect } from 'react';
import SpinningLogo from './SpinningLogo';
import BottomNav from './BottomNav';
import StandardNavbar from './StandardNavbar';
import { motion } from 'framer-motion';

if (typeof window !== 'undefined' && 'scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}

const spaceValues = [
  {
    label: 'Context',
    text: 'A Space had to carry more than access. It needed to preserve the source files, generated outputs, notes, summaries, and the reason those materials belonged together.'
  },
  {
    label: 'Orientation',
    text: 'A recipient should not have to interrogate a blank chat box to understand what they received. The Space needed to explain itself first.'
  },
  {
    label: 'Agency',
    text: 'Once someone understood the Space, AI needed to help them act in a way that matched the work: review, synthesize, explain, edit, or decide.'
  }
];

const roles = [
  {
    label: 'Contributor',
    intent: "We're working together.",
    detail: 'Full edit access for teammates shaping the Space together.'
  },
  {
    label: 'Reviewer',
    intent: "I'm giving feedback.",
    detail: 'Comment and annotate access for people brought in to validate or respond.'
  },
  {
    label: 'Viewer',
    intent: "I'm learning from this.",
    detail: 'Read and chat access for people who need context without changing the Space.'
  }
];

const overviewAnatomy = [
  'Files card',
  'Audio summary',
  'Generated summary',
  'Chat entry point',
  'Create entry point',
  'Edit affordance'
];

const agentLayers = [
  {
    label: 'Awareness',
    text: 'The active agent is visible when someone shares the Space.'
  },
  {
    label: 'Visibility',
    text: 'The active agent appears in the prompt bar before a conversation begins.'
  },
  {
    label: 'Control',
    text: 'Switching and customization happen where users interact with AI.'
  }
];

const eyebrowClass = 'text-xs font-semibold uppercase tracking-[0.14em] text-gray-600';
const bodyClass = 'text-base sm:text-lg leading-relaxed text-gray-800';
const smallBodyClass = 'text-sm sm:text-base leading-relaxed text-gray-700';
const captionClass = 'text-sm leading-relaxed text-gray-600';
const mediaCaptionClass = `${captionClass} w-full text-center`;
const figureClass = 'w-full space-y-3';
const imageClass = 'block w-full rounded-lg';
const mediaStageClass = 'w-full overflow-hidden rounded-lg bg-white';
const stagedVideoClass = 'block w-[108%] max-w-none -translate-x-[4%] scale-[1.04]';
const phoneVideoStageClass = 'flex w-full justify-center overflow-hidden rounded-lg bg-white py-4 sm:py-6';
const phoneVideoClass = 'block w-full max-w-[500px] rounded-lg';
const assistantVideoStageClass = 'flex h-[420px] w-full items-center justify-center overflow-hidden rounded-lg bg-white sm:h-[560px] md:h-[640px]';
const assistantVideoClass = 'block w-[160%] max-w-none sm:w-[135%]';

const PlaceholderShell = ({ label, children }) => (
  <div className="rounded-lg border border-gray-200 bg-white p-4 sm:p-6">
    <p className={`${eyebrowClass} mb-5`}>{label}</p>
    {children}
  </div>
);

const MentalModelPlaceholder = () => (
  <PlaceholderShell label="Sender vs. recipient mental model">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="rounded-lg border border-gray-200 bg-white p-4">
        <p className="text-sm font-medium text-gray-900 mb-3">Sender</p>
        {['Knows the goal', 'Knows the files', 'Knows the context', 'Knows the desired action'].map((item) => (
          <div key={item} className="mb-2 rounded-md bg-gray-100 px-3 py-2 text-sm text-gray-700">
            {item}
          </div>
        ))}
      </div>
      <div className="rounded-lg border border-gray-200 bg-white p-4">
        <p className="text-sm font-medium text-gray-900 mb-3">Recipient</p>
        {['Opens cold', 'Needs orientation', 'Needs confidence', 'Needs a next step'].map((item) => (
          <div key={item} className="mb-2 rounded-md bg-gray-100 px-3 py-2 text-sm text-gray-700">
            {item}
          </div>
        ))}
      </div>
    </div>
  </PlaceholderShell>
);

const ChatVsOverviewPlaceholder = () => (
  <PlaceholderShell label="Chat-first vs. Overview-first comparison">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="rounded-lg border border-gray-200 bg-white p-4">
        <p className="text-sm font-medium text-gray-900 mb-4">Chat first</p>
        <div className="h-28 rounded-lg border border-gray-200 bg-gray-50 p-4 flex items-end">
          <div className="w-full rounded-full border border-gray-300 bg-white px-4 py-3 text-sm text-gray-600">
            Ask me anything...
          </div>
        </div>
        <p className="text-xs text-gray-600 mt-3">Powerful, but only after the recipient knows what to ask.</p>
      </div>
      <div className="rounded-lg border border-gray-200 bg-white p-4">
        <p className="text-sm font-medium text-gray-900 mb-4">Overview first</p>
        <div className="grid gap-2">
          {['Files', 'Summary', 'Audio overview', 'Next actions'].map((item, index) => (
            <div key={item} className={`rounded-md px-3 py-2 text-sm ${index === 0 ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-700'}`}>
              {item}
            </div>
          ))}
        </div>
        <p className="text-xs text-gray-600 mt-3">Readable before it asks someone to become interactive.</p>
      </div>
    </div>
  </PlaceholderShell>
);

const OverviewAnatomyPlaceholder = () => (
  <PlaceholderShell label="Annotated Overview anatomy">
    <div className="grid grid-cols-1 lg:grid-cols-[0.8fr_1fr] gap-6 items-center">
      <div className="mx-auto w-full max-w-[260px] rounded-[28px] border border-gray-300 bg-white p-3 shadow-sm">
        <div className="rounded-[20px] bg-gray-100 p-3 space-y-3">
          <div className="h-5 w-24 rounded bg-gray-300" />
          <div className="rounded-lg bg-white p-3 space-y-2">
            <div className="h-3 w-20 rounded bg-gray-300" />
            <div className="h-3 w-full rounded bg-gray-200" />
            <div className="h-3 w-4/5 rounded bg-gray-200" />
          </div>
          <div className="rounded-lg bg-white p-3">
            <div className="h-10 rounded-full bg-gray-900" />
          </div>
          <div className="rounded-lg bg-white p-3 space-y-2">
            <div className="h-3 w-full rounded bg-gray-200" />
            <div className="h-3 w-3/4 rounded bg-gray-200" />
          </div>
          <div className="flex gap-2">
            <div className="h-10 flex-1 rounded-full bg-white" />
            <div className="h-10 flex-1 rounded-full bg-white" />
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {overviewAnatomy.map((item) => (
          <div key={item} className="rounded-lg border border-gray-200 bg-white p-3 text-sm text-gray-700">
            {item}
          </div>
        ))}
      </div>
    </div>
  </PlaceholderShell>
);

const SharedContentPlaceholder = () => (
  <PlaceholderShell label="Shared content transparency">
    <div className="rounded-lg border border-gray-200 bg-white p-4">
      <p className="text-sm font-medium text-gray-900 mb-4">Included in this Space</p>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {['3 source PDFs', '2 generated summaries', 'Notes and outputs'].map((item) => (
          <div key={item} className="rounded-lg bg-gray-100 p-4">
            <div className="h-8 w-8 rounded bg-gray-300 mb-4" />
            <p className="text-sm text-gray-700">{item}</p>
          </div>
        ))}
      </div>
    </div>
  </PlaceholderShell>
);

const OverviewAgentFlowPlaceholder = () => (
  <PlaceholderShell label="Overview gives context, agents give behavior">
    <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
      {['Receive Space', 'Read Overview', 'See active agent', 'Act on content'].map((item, index) => (
        <div key={item} className="rounded-lg border border-gray-200 bg-white p-4">
          <p className="text-xs font-semibold text-gray-600 mb-6">0{index + 1}</p>
          <p className="text-sm font-medium text-gray-900">{item}</p>
        </div>
      ))}
    </div>
  </PlaceholderShell>
);

const Principle = ({ children }) => (
  <div className="my-8 border-l-2 border-gray-200 pl-5">
    <p className={`${eyebrowClass} mb-3`}>Design principle</p>
    <p className="text-lg sm:text-xl leading-relaxed text-gray-950">{children}</p>
  </div>
);

const Chapter = ({ number, label, title, children }) => (
  <motion.section
    className="relative border-t border-gray-200 py-10 md:py-14"
    initial={{ opacity: 0, y: 36 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.7 }}
    viewport={{ once: true, amount: 0.12 }}
  >
    <div className="mb-12 md:mb-16">
      <div className="scroll-reveal opacity-0 translate-y-10 transform transition-all duration-700 ease-out mb-8 md:mb-12 max-w-3xl">
        <p className={`${eyebrowClass} mb-4`}>{number} / {label}</p>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-medium leading-tight text-gray-950">
          {title}
        </h2>
      </div>
      <div className="scroll-reveal opacity-0 translate-y-10 transform transition-all duration-700 ease-out delay-100 space-y-8 md:space-y-10">
        {children}
      </div>
    </div>
  </motion.section>
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

      <main className="container mx-auto px-5 sm:px-6 max-w-5xl">
        <section className="mb-16 md:mb-20 pt-4 md:pt-8">
          <p className={`scroll-reveal opacity-0 translate-y-10 transform transition-all duration-700 ease-out ${eyebrowClass} mb-4`}>
            PDF Spaces
          </p>
          <h1 className="scroll-reveal opacity-0 translate-y-10 transform transition-all duration-700 ease-out delay-100 text-4xl sm:text-5xl md:text-6xl font-medium mb-5 md:mb-7 leading-[1.05] text-gray-950 max-w-4xl">
            Making documents feel less lonely
          </h1>
          <div className="scroll-reveal opacity-0 translate-y-10 transform transition-all duration-700 ease-out delay-200 space-y-4 md:space-y-5 mb-10 md:mb-14 max-w-3xl">
            <p className="text-xl sm:text-2xl md:text-3xl font-normal text-gray-800 leading-snug">
              PDF Spaces turned scattered files into a shared workspace for understanding.
            </p>
          </div>

          <div className="scroll-reveal opacity-0 translate-y-10 transform transition-all duration-700 ease-out delay-300 grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-5 border-y border-gray-200 py-5 text-sm mb-8 md:mb-12">
            <div>
              <p className={`${eyebrowClass} mb-1`}>Role</p>
              <p className="font-medium text-gray-950">Mobile Design Lead</p>
            </div>
            <div>
              <p className={`${eyebrowClass} mb-1`}>Timeline</p>
              <p className="font-medium text-gray-950">9 months</p>
            </div>
            <div>
              <p className={`${eyebrowClass} mb-1`}>Team</p>
              <p className="font-medium text-gray-950">4 PMs, 12 Engineers</p>
            </div>
            <div>
              <p className={`${eyebrowClass} mb-1`}>Platform</p>
              <p className="font-medium text-gray-950">iOS, Android, Web</p>
            </div>
          </div>

          <figure className={`scroll-reveal opacity-0 translate-y-10 transform transition-all duration-700 ease-out delay-400 ${figureClass}`}>
            <img
              src="/Spaces_hero.png"
              alt="PDF Spaces interface showing collaborative AI workspace across desktop and mobile"
              className={imageClass}
            />
            <figcaption className={mediaCaptionClass}>
              PDF Spaces brought files, people, context, and AI into one shared workspace.
            </figcaption>
          </figure>
          <div className="scroll-reveal opacity-0 translate-y-10 transform transition-all duration-700 ease-out delay-500 space-y-4 md:space-y-5 mt-8 md:mt-10 w-full max-w-3xl">
            <p className={bodyClass}>
              PDFs are good at preserving information. Knowledge work depends on everything around that information: which files matter, what changed, who needs to weigh in, and what decision the team is trying to make.
            </p>
            <p className={bodyClass}>
              I led mobile design for the collaboration layer across sharing, Overview, and agents, so a Space could carry context from the sender to the people joining the work.
            </p>
          </div>
        </section>

        <section className="relative border-t border-gray-200 py-10 md:py-14">
          <div className="grid grid-cols-1 lg:grid-cols-[0.8fr_1.2fr] gap-6 md:gap-14 mb-12 md:mb-16">
            <div className="lg:sticky lg:top-24" style={{ height: 'min-content' }}>
              <p className={`${eyebrowClass} mb-4`}>What makes a Space, a Space</p>
              <h2 className="scroll-reveal opacity-0 translate-y-10 transform transition-all duration-700 ease-out text-2xl sm:text-3xl font-medium leading-tight mb-3 md:mb-8 text-gray-950">
                The product had to preserve the feeling of being brought into the work.
              </h2>
            </div>
            <div className="scroll-reveal opacity-0 translate-y-10 transform transition-all duration-700 ease-out delay-100 space-y-4 md:space-y-6">
              <p className={bodyClass}>
                A folder of PDFs is easy to share and hard to enter. The person sending it knows why the documents matter, what changed, what has already been decided, and what they need from the next person. The recipient usually gets none of that.
              </p>
              <p className={bodyClass}>
                That was the real design problem behind PDF Spaces. It was not enough to make Acrobat understand multiple files. A Space had to hold onto the surrounding context, make itself readable to someone new, and give people a way to act on what they found.
              </p>
              <div className="space-y-5 pt-2">
                {spaceValues.map((value) => (
                  <div key={value.label} className="border-t border-gray-200 pt-4">
                    <p className="text-base sm:text-lg font-semibold text-gray-950 mb-2">{value.label}</p>
                    <p className={smallBodyClass}>{value.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <Chapter number="01" label="Context through sharing" title="A Space had to arrive with its context intact">
          <div className="space-y-5 max-w-3xl">
            <p className={bodyClass}>
              Sharing was the first test of whether Spaces behaved like a workspace or just another file format. The first version was passive: you could share a Space, but recipients could only view it. That was useful for handoff, but it did not match the way teams actually move work forward.
            </p>
            <p className={bodyClass}>
              People were not sharing because they wanted someone else to look at a tidy artifact. They were sharing because they needed review, feedback, editing, validation, or a decision. A lawyer might need someone to review a case file. A sales team might need a teammate to refine a proposal. A researcher might need a collaborator to add notes. The product needed permissions, but the user did not need to think like an admin.
            </p>
          </div>

          <Principle>People think in relationships, not permissions.</Principle>

          <div>
            <p className={`${bodyClass} mb-6 max-w-3xl`}>
              Instead of leading with technical access controls, we designed roles around the intent of the relationship. This made the share flow feel familiar without flattening the complexity of a shared AI workspace.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {roles.map((role) => (
                <div key={role.label} className="border-t border-gray-200 pt-5">
                  <p className={`${eyebrowClass} mb-3`}>{role.label}</p>
                  <p className="text-lg font-medium text-gray-950 mb-2">{role.intent}</p>
                  <p className={captionClass}>{role.detail}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <p className={`${eyebrowClass} mb-4`}>Before and after</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <figure className={figureClass}>
                <img
                  src="/BeforeSS.png"
                  alt="Before PDF Spaces share sheet with binary sharing"
                  className={imageClass}
                />
                <figcaption className={mediaCaptionClass}>Before: sharing was closer to view-or-no-view access.</figcaption>
              </figure>
              <figure className={figureClass}>
                <img
                  src="/AfterSS.png"
                  alt="After PDF Spaces share sheet with role based sharing"
                  className={imageClass}
                />
                <figcaption className={mediaCaptionClass}>After: roles expressed what the collaborator was there to do.</figcaption>
              </figure>
            </div>
          </div>

          <div>
            <p className={`${eyebrowClass} mb-4`}>Two-tap share flow</p>
            <p className={`${bodyClass} mb-6 max-w-3xl`}>
              The main path stayed simple: choose a recipient, apply a smart default role, confirm. More controls were available, but they did not block the act of sharing.
            </p>
            <figure className={figureClass}>
              <div className={mediaStageClass}>
                <video
                  src="/Spaces_copylink.mov"
                  className={stagedVideoClass}
                  aria-label="Two-tap PDF Spaces sharing flow"
                  autoPlay
                  loop
                  muted
                  playsInline
                >
                  Your browser does not support the video tag.
                </video>
              </div>
              <figcaption className={mediaCaptionClass}>
                The default sharing path kept role selection lightweight while preserving advanced control.
              </figcaption>
            </figure>
          </div>

          <SharedContentPlaceholder />
        </Chapter>

        <Chapter number="02" label="Orientation through Overview" title="Before people can collaborate, they need to know where they are">
          <div className="space-y-5 max-w-3xl">
            <p className={bodyClass}>
              Sharing solved how someone gets into a Space. It did not solve what happens in the first few seconds after they arrive.
            </p>
            <p className={bodyClass}>
              The sender already knows the goal, the source material, and the desired action. The recipient opens cold. They may be seeing PDF Spaces for the first time, and even if they are not, they still need to understand why this particular Space exists.
            </p>
            <p className={bodyClass}>
              A blank chat input asks too much too soon. It assumes the recipient already knows what to ask. Overview changed the first moment from interrogation to orientation.
            </p>
          </div>

          <Principle>Access is not understanding.</Principle>

          <MentalModelPlaceholder />

          <div className="space-y-5 max-w-3xl">
            <p className={bodyClass}>
              Overview became that front door. It gave recipients a readable starting point: the files in the Space, a generated summary, an audio overview, and the key context needed to begin. Instead of dropping someone directly into chat, Overview helped them understand the Space first.
            </p>
            <p className={bodyClass}>
              This was especially important on mobile, where the first screen has to work harder. There is less room, less context, and less patience. The design had to answer three questions quickly.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {['What is this Space?', 'What is inside it?', 'What can I do next?'].map((question) => (
              <div key={question} className="border-t border-gray-200 pt-5">
                <p className="text-lg font-medium leading-snug text-gray-950">{question}</p>
              </div>
            ))}
          </div>

          <ChatVsOverviewPlaceholder />

          <div className="space-y-5 max-w-3xl">
            <p className={bodyClass}>
              We used smart defaults so senders did not have to manually build a perfect overview every time. The default Overview included key files, an audio summary, a generated summary, and entry points into chat and creation.
            </p>
            <p className={bodyClass}>
              The goal was not to make users spend more time customizing. The goal was to make every shared Space useful by default.
            </p>
          </div>

          <OverviewAnatomyPlaceholder />
        </Chapter>

        <Chapter number="03" label="Agency through agents" title="Once oriented, people need the right way to act">
          <div className="space-y-5">
            <p className={bodyClass}>
              Once someone understands a Space, the next question is what kind of help they need from it. The same set of documents can support very different work depending on who is looking: a legal researcher, a sales lead, a student, or a teammate preparing a decision.
            </p>
            <p className={bodyClass}>
              That is where custom agents mattered. They gave the Space a way to respond differently depending on the work. But the biggest design challenge was not the agent UI itself. It was deciding where that behavior belonged.
            </p>
            <p className={bodyClass}>
              PMs initially framed agents as a sharing feature. Since agents affected the Space, it seemed logical to put customization in the share sheet. But that mixed two different mental models: access and behavior.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="rounded-lg border border-gray-200 bg-white p-5">
              <p className={`${eyebrowClass} mb-3`}>Access</p>
              <p className="text-base sm:text-lg font-semibold text-gray-950 mb-2">The share sheet is about access.</p>
              <p className={captionClass}>It answers who can enter and what they are allowed to do.</p>
            </div>
            <div className="rounded-lg border border-gray-200 bg-white p-5">
              <p className={`${eyebrowClass} mb-3`}>Behavior</p>
              <p className="text-base sm:text-lg font-semibold text-gray-950 mb-2">The agent is about behavior.</p>
              <p className={captionClass}>It answers how AI should respond once people start working.</p>
            </div>
          </div>

          <Principle>AI behavior belongs where people use AI.</Principle>

          <div>
            <p className={`${eyebrowClass} mb-4`}>Creating an assistant</p>
            <p className={`${bodyClass} mb-6 max-w-3xl`}>
              Instead of making people choose from abstract settings, the creation flow asked for a name and a goal. That kept setup grounded in the work the assistant was meant to support.
            </p>
            <figure className={figureClass}>
              <div className={assistantVideoStageClass}>
                <video
                  src="/Spaces_customassistant.mov"
                  className={assistantVideoClass}
                  aria-label="Creating a custom assistant in PDF Spaces"
                  autoPlay
                  loop
                  muted
                  playsInline
                >
                  Your browser does not support the video tag.
                </video>
              </div>
              <figcaption className={mediaCaptionClass}>
                Creating a new assistant started with the simplest useful inputs: who it is and what it should help with.
              </figcaption>
            </figure>
          </div>

          <div>
            <p className={`${eyebrowClass} mb-4`}>Layered system</p>
            <figure className={`${figureClass} mb-6`}>
              <img
                src="/Shippedagent.png"
                alt="Shipped layered agent system across PDF Spaces mobile surfaces"
                className={imageClass}
              />
              <figcaption className={mediaCaptionClass}>
                The shipped system made the active agent visible across sharing and in-use surfaces.
              </figcaption>
            </figure>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {agentLayers.map((layer) => (
                <div key={layer.label} className="border-t border-gray-200 pt-5">
                  <p className="text-sm font-semibold text-gray-950 mb-2">{layer.label}</p>
                  <p className={captionClass}>{layer.text}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <p className={`${eyebrowClass} mb-4`}>Constrained customization</p>
            <p className={`${bodyClass} mb-6 max-w-3xl`}>
              Blank customization created decision paralysis. The shipped direction used structured defaults and a personality spectrum so users could shape AI behavior without writing a prompt from scratch.
            </p>
            <div className="flex flex-wrap gap-3 mb-6">
              {['Formal', 'Professional', 'Casual', 'Creative', 'Educator'].map((tone, index) => (
                <span key={tone} className={`px-4 py-2 rounded-full text-sm font-medium ${index > 2 ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-700'}`}>
                  {tone}
                </span>
              ))}
            </div>
            <figure className={`${figureClass} mb-6`}>
              <img
                src="/Personality.png"
                alt="Personality spectrum selector for custom agents"
                className={imageClass}
              />
              <figcaption className={mediaCaptionClass}>
                Structured tone defaults helped people shape agent behavior without starting from a blank prompt.
              </figcaption>
            </figure>
            <figure className={figureClass}>
              <img
                src="/Freeformconstrained.png"
                alt="Freeform versus constrained custom agent explorations"
                className={imageClass}
              />
              <figcaption className={mediaCaptionClass}>
                Freeform and constrained explorations clarified how much control users needed.
              </figcaption>
            </figure>
          </div>

          <div>
            <p className={`${eyebrowClass} mb-4`}>Agent creation on mobile</p>
            <p className={`${bodyClass} mb-6 max-w-3xl`}>
              Mobile constraints forced clarity. Agent creation came down to the fields that mattered most: name, personality type, and optional focus area.
            </p>
            <figure className={figureClass}>
              <div className={phoneVideoStageClass}>
                <video
                  src="/customagent.mov"
                  className={phoneVideoClass}
                  autoPlay
                  loop
                  muted
                  playsInline
                >
                  Your browser does not support the video tag.
                </video>
              </div>
              <figcaption className={mediaCaptionClass}>
                The mobile creation flow focused on the fields that gave agents enough shape without adding setup work.
              </figcaption>
            </figure>
          </div>
        </Chapter>

        <section className="relative border-t border-gray-200 py-10 md:py-14">
          <div className="grid grid-cols-1 lg:grid-cols-[0.8fr_1.2fr] gap-6 md:gap-14 mb-12 md:mb-16">
            <div className="lg:sticky lg:top-24" style={{ height: 'min-content' }}>
              <p className={`${eyebrowClass} mb-4`}>Synthesis</p>
              <h2 className="scroll-reveal opacity-0 translate-y-10 transform transition-all duration-700 ease-out text-2xl sm:text-3xl font-medium leading-tight mb-3 md:mb-8 text-gray-950">
                The product became more than collaborative. It became guided.
              </h2>
            </div>
            <div className="scroll-reveal opacity-0 translate-y-10 transform transition-all duration-700 ease-out delay-100 space-y-4 md:space-y-6">
              <p className="text-lg sm:text-xl leading-relaxed text-gray-950">
                If sharing answered &quot;who can access this?&quot;, Overview answered &quot;what is this?&quot;, and agents answered &quot;how should AI help?&quot;
              </p>
              <p className={bodyClass}>
                That connection is what made the system feel coherent. Overview gave the Space context. Agents gave it behavior. Sharing made the whole thing social.
              </p>
              <OverviewAgentFlowPlaceholder />
            </div>
          </div>
        </section>

        <section className="border-t border-gray-200 pt-10 md:pt-14 mb-16 md:mb-32">
          <div className="scroll-reveal opacity-0 translate-y-10 transform transition-all duration-700 ease-out">
            <p className={`${eyebrowClass} mb-4`}>Reflection</p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-medium leading-tight mb-6 md:mb-8 text-gray-950 max-w-3xl">
              The product looked simple when it shipped. The work behind it was not.
            </h2>
            <div className="space-y-6 max-w-3xl">
              <p className={bodyClass}>
                This project took designers, engineers, PMs, leadership, and a lot of cross-functional trust. On mobile, it also required a level of ownership I had not experienced before.
              </p>
              <p className={bodyClass}>
                I had to take a vision, translate it into a constrained surface, align people around tradeoffs, create detailed specs, support engineering, QA the build, and keep pushing for the experience to feel coherent in someone&apos;s hand.
              </p>
              <p className="text-lg sm:text-xl text-gray-950 leading-relaxed">
                PDFs preserve information. Spaces asked what it would take to preserve understanding.
              </p>
            </div>
          </div>
        </section>

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
