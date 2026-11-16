import ProjectNavigation from './ProjectNavigation';
import SiteHeader from './SiteHeader';
import SiteFooter from './SiteFooter';
import PortfolioVideo from './PortfolioVideo';
import CaseStudyFeature, { CaseStudyMotion } from './CaseStudyFeature';
/* eslint-disable react/prop-types */
import { useState, useLayoutEffect } from 'react';
import BottomNav from './BottomNav';

if (typeof window !== 'undefined' && 'scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}

const titleClass = 'text-2xl sm:text-3xl md:text-4xl font-medium leading-tight text-gray-900';
const sectionTitleClass = 'text-base sm:text-lg font-medium leading-relaxed text-gray-950';
const bodyClass = 'text-base md:text-lg leading-relaxed text-gray-600';
const mediaCaptionClass = 'w-full text-center text-sm leading-relaxed text-gray-500';
const figureClass = 'w-full space-y-4 my-10 md:my-12';
const heroFigureClass = 'w-full space-y-4 my-10 md:my-12';
const imageClass = 'block w-full rounded-lg';
const heroImageClass = 'block w-full h-auto';
const featureVideoFrameClass = 'relative h-[400px] overflow-hidden rounded-lg bg-white md:h-[600px]';
const featureVideoClass = 'h-full w-full rounded-lg object-cover scale-[1.04]';
const croppedFeatureVideoClass = 'h-full w-full rounded-lg object-cover scale-[1.08]';
const assistantFeatureVideoClass = 'h-full w-full rounded-lg object-cover scale-[1.2]';

const CaseSection = CaseStudyFeature;

const VideoCaseSection = ({ title, children, videoSrc, videoClass = featureVideoClass, caption, ariaLabel, after }) => (
  <CaseStudyFeature title={title} after={after} media={
    <figure className="w-full space-y-4">
      <div className={featureVideoFrameClass}>
        <PortfolioVideo src={videoSrc} className={videoClass} aria-label={ariaLabel} autoPlay loop muted playsInline>
          Your browser does not support the video tag.
        </PortfolioVideo>
      </div>
      <figcaption className={mediaCaptionClass}>{caption}</figcaption>
    </figure>
  }>{children}</CaseStudyFeature>
);

const CopyBlock = ({ children }) => (
  <div className="space-y-5 max-w-3xl">{children}</div>
);

const ImpactSection = () => (
  <section className="relative py-6 md:py-8">
    <div className="grid grid-cols-1 lg:grid-cols-[140px_minmax(0,1fr)] gap-6 md:gap-12">
      <div className="lg:sticky lg:top-24" style={{ height: 'min-content' }}>
        <h2 className="scroll-reveal transform transition-all duration-700 ease-out text-lg sm:text-xl md:text-2xl font-medium text-gray-900">
          Impact
        </h2>
      </div>

      <div className="scroll-reveal transform transition-all duration-700 ease-out delay-100 grid grid-cols-1 gap-8 sm:grid-cols-[minmax(0,1fr)_1px_minmax(0,1fr)] md:gap-16">
        <div className="min-w-0">
          <h3 className="text-2xl sm:text-3xl font-normal text-gray-900 mb-3 leading-tight">Mobile-first sharing</h3>
          <p className="text-base sm:text-lg leading-relaxed text-gray-600">
            made access, permissions, and handoff critical to the launch experience
          </p>
        </div>
        <div className="hidden w-px bg-gray-200 self-stretch min-h-[80px] sm:block" />
        <div className="min-w-0">
          <h3 className="text-2xl sm:text-3xl font-normal text-gray-900 mb-3 leading-tight">Early collaboration</h3>
          <p className="text-base sm:text-lg leading-relaxed text-gray-600">
            showed that shared Spaces were starting to behave like collaborative work surfaces
          </p>
        </div>
      </div>
    </div>
  </section>
);

const ChallengeList = () => (
  <div className="space-y-6 md:space-y-8">
    {[
      {
        title: 'Make the product legible',
        body: 'PDF Spaces could not feel like “chat with a PDF” with more files attached. People needed to understand that a Space was an interactive experience where source material, generated context, collaborators, and AI behavior worked together.'
      },
      {
        title: 'Protect trust and control',
        body: 'Collaboration changed the stakes. Access, roles, and recipient context had to feel explicit so people knew who could enter a Space, what they could do there, and how much control the sender still had.'
      },
      {
        title: 'Keep AI useful, not abstract',
        body: 'Custom agents were powerful, but they needed to be shaped around goals, audience, and tone where people were already thinking about the work the AI should support.'
      }
    ].map((challenge) => (
      <CaseStudyMotion key={challenge.title}>
        <div className="max-w-3xl space-y-3">
          <h3 className="text-base sm:text-lg font-semibold text-gray-900">{challenge.title}</h3>
          <p className="text-base md:text-lg leading-relaxed text-gray-600">{challenge.body}</p>
        </div>
      </CaseStudyMotion>
    ))}
  </div>
);

const PDFSpaces = () => {
  const [activePage, setActivePage] = useState('pdf-spaces');

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
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
      <SiteHeader />

      <main className="case-study-main container mx-auto px-8 sm:px-6 max-w-4xl">
        <section className="case-study-intro mb-12 md:mb-16">
          <h1 className={`${titleClass} mb-3 md:mb-4`}>
            Acrobat PDF Spaces
          </h1>
          <p className="max-w-4xl text-base sm:text-lg md:text-xl font-normal mb-6 md:mb-8 text-gray-600">
            Building an AI-powered shared experience that brings PDFs, documents, links, notes, collaborators, context, and custom agents into a unified workspace across Acrobat.
          </p>

          <div className="grid max-w-4xl grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 text-sm mb-8 md:mb-12">
            <div>
              <p className="text-gray-400 text-xs uppercase tracking-wide mb-1">Role</p>
              <p className="text-gray-900">Design Lead, Mobile</p>
            </div>
            <div>
              <p className="text-gray-400 text-xs uppercase tracking-wide mb-1">Timeline</p>
              <p className="text-gray-900">Accelerated launch timeline</p>
            </div>
            <div>
              <p className="text-gray-400 text-xs uppercase tracking-wide mb-1">Team</p>
              <p className="text-gray-900">Cross-functional product and engineering partners</p>
            </div>
            <div>
              <p className="text-gray-400 text-xs uppercase tracking-wide mb-1">Platform</p>
              <p className="text-gray-900">iOS, Android, Web</p>
            </div>
          </div>

          <figure className={`${heroFigureClass}`}>
            <img
              src="/Spaces_cover.png"
              alt="PDF Spaces interface showing collaborative AI workspace across desktop and mobile"
              className={heroImageClass}
            />
          </figure>
        </section>

        <ImpactSection />

        <CaseSection title="Project context" after={(
          <figure className={figureClass}>
            <PortfolioVideo
              src="/Spaces_Vision.mov"
              className="block h-auto w-full rounded-lg"
              aria-label="Large screen PDF Spaces vision"
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
            >
              Your browser does not support the video tag.
            </PortfolioVideo>
            <figcaption className={mediaCaptionClass}>
              Vision work helped stakeholders align on PDF Spaces as a shared AI experience, not another file-sharing surface.
            </figcaption>
          </figure>
        )}>
          <CopyBlock>
            <p className={bodyClass}>
              Acrobat has always been where people open important documents, but AI Assistant shifted the expectation from reading files to understanding and acting on them. PDF Spaces was the next step: moving from static file sharing to tailored, interactive experiences where PDFs, documents, links, notes, collaborators, and AI could live together.
            </p>
            <p className={bodyClass}>
              The project started as a broad workspace vision and quickly became a launch problem. We needed to ship an initial experience that felt ambitious enough to change how people shared information, but grounded enough to fit inside Acrobat’s existing mental models for files, permissions, and trust.
            </p>
          </CopyBlock>

        </CaseSection>

        <CaseSection title="The core challenge">
          <CopyBlock>
            <p className={bodyClass}>
              The hard part was not only designing new surfaces. It was making a new product category legible inside a familiar tool. A Space had to feel more capable than a folder, more structured than a chat, and safer than an open-ended AI playground.
            </p>
            <p className={bodyClass}>
              My role focused on the mobile experience, collaboration model, recipient landing experience, custom agent entry points, and the detailed specs needed to keep the product coherent across iOS, Android, and web without losing context, control, or familiar Acrobat patterns.
            </p>
          </CopyBlock>
        </CaseSection>

        <CaseSection title="Design goals">
          <ChallengeList />
        </CaseSection>

        <section className="mb-6 md:mb-8">
          <div
            className="scroll-reveal transform transition-all duration-700 ease-out relative rounded-2xl md:rounded-3xl p-6 sm:p-8 md:p-10"
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
                How might we help people move from sending static PDFs to sharing interactive AI experiences without losing context, control, or trust?
              </h2>
            </div>
          </div>
        </section>

        <VideoCaseSection
          title="Enabling different roles of access"
          videoSrc="/Spaces_roles.mov"
          ariaLabel="Role based sharing in PDF Spaces"
          caption="Roles made sharing feel like inviting someone into a workspace, not exposing a file."
        >
          <p className={bodyClass}>
            The collaboration problem started with access. Sharing a Space was not the same as sending a static PDF. People could review, edit, comment, ask AI questions, or simply read. The permission model had to make those relationships clear without making the sender think like an admin.
          </p>
          <p className={bodyClass}>
            We moved from binary view access to roles that matched what collaborators were there to do: contributor, reviewer, and viewer.
          </p>
        </VideoCaseSection>

        <VideoCaseSection
          title="Ensuring we don’t reinvent the wheel"
          videoSrc="/Spaces_copylink.mov"
          videoClass={croppedFeatureVideoClass}
          ariaLabel="Two-tap PDF Spaces sharing flow"
          caption="Reusing known sharing mechanics kept the new product easier to learn."
        >
          <p className={bodyClass}>
            Acrobat already had mature sharing patterns, and PDF Spaces needed to feel native to that system. The goal was not to invent a new share model for every surface. It was to reuse the parts people already understood, then add the smallest layer needed to share a Space as an experience instead of a file drop.
          </p>
          <p className={bodyClass}>
            The final flow kept the familiar invite path: choose people, set the right access, send. The new behavior lived where it mattered, but the interaction still felt like Acrobat: clear, familiar, and ready for follow-up.
          </p>
        </VideoCaseSection>

        <VideoCaseSection
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
            Custom agents started as a separate project. PMs originally wanted the entry point inside the share sheet, because the assistant affected the Space being shared with a specific audience.
          </p>
          <p className={bodyClass}>
            I pushed to move it into the input container instead. Sharing is about access. The assistant is about behavior: goals, audience, tone, and the kind of guidance the Space should provide. People should customize AI when they are about to use AI, not when they are deciding who can enter the Space.
          </p>
          <p className={bodyClass}>
            Across the custom agent track, I partnered with PMs, researchers, and AI/ML engineers to evaluate a broad set of concepts and prioritize the strongest directions for the launch experience.
          </p>
        </VideoCaseSection>

        <VideoCaseSection
          title="Letting senders craft a narrative with an Overview page for their recipients"
          videoSrc="/Spaces_edit.mov"
          ariaLabel="Recipient landing experience for PDF Spaces"
          caption="Overview helped recipients understand the Space before they had to ask a question."
        >
          <p className={bodyClass}>
            Recipients were often opening a Space cold. The sender knew why the files mattered, what had changed, and what they needed someone else to do. The recipient usually got none of that context, even though the experience was supposed to be tailored to them.
          </p>
          <p className={bodyClass}>
            Overview became the sender’s way to shape the initial read. It gave the Space a front door: an editable narrative, files, generated summaries, audio, and a clear sense of what the recipient was walking into.
          </p>
        </VideoCaseSection>

        <VideoCaseSection
          title="Designing the recipient experience"
          videoSrc="/Spaces_recipient_landing.mov"
          ariaLabel="Recipient landing experience in PDF Spaces"
          caption="Recipient surfaces clarified why someone had been invited and what they could do next."
        >
          <p className={bodyClass}>
            The recipient experience had to answer a few questions quickly: what is this Space, what is inside it, and what can I do next?
          </p>
          <p className={bodyClass}>
            That meant the initial moments could not feel like a blank chat. The product had to orient people, show them the source material, and make the AI feel useful before asking them to interact.
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
              This project was messy in the way real product work is messy: multiple PMs, a large engineering team, platform constraints, leadership reviews, and a lot of cross-functional trust.
            </p>
            <p className={bodyClass}>
              The shipped product looked simple, but the work was in making access, context, audience, and AI behavior feel like a cohesive system.
            </p>
            <p className={sectionTitleClass}>
              PDFs preserve information. Spaces reframed the PDF as a living layer for shared understanding.
            </p>
          </CopyBlock>
        </CaseSection>

        <ProjectNavigation currentPath="/pdf-spaces" />
      </main>

      <SiteFooter />

      <div className="w-full bg-gray-950">
        <BottomNav activePage={activePage} onNavClick={handleNavClick} isCaseStudy={true} />
      </div>
    </div>
  );
};

export default PDFSpaces;
