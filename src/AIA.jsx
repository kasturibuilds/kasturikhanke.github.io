/* eslint-disable react/prop-types */
import CaseStudyLayout, { CaseStudySection } from './CaseStudyLayout';
import './AIA.css';

function PromptStill({ src, title, children }) {
  return <figure className="aia-prompt-still">
    <figcaption>
      <h4>{title}</h4>
      <p>{children}</p>
    </figcaption>
    <a href={src} target="_blank" rel="noopener noreferrer" aria-label={`${title}: open full-size image`}>
      <img src={src} alt={title} loading="lazy" />
    </a>
  </figure>;
}

function OnboardingComparison() {
  return <div className="aia-onboarding-comparison" id="onboarding-comparison">
    <div className="aia-comparison-grid">
      <figure>
        <figcaption><span>Before</span><h3>Explain the feature</h3><p>People saw a feature announcement, then had to choose where to find a file.</p></figcaption>
        <a href="/BeforeUA.png" target="_blank" rel="noopener noreferrer" aria-label="Open original onboarding screens at full size">
          <svg viewBox="225 140 1220 1200" role="img" aria-label="Original onboarding: feature announcement followed by a file-source picker">
            <image href="/BeforeUA.png" width="1664" height="1481" />
          </svg>
        </a>
        <div className="aia-flow-labels"><span>Feature announcement</span><span>Choose a file source</span></div>
      </figure>
      <figure>
        <figcaption><span>After</span><h3>Show how it works</h3><p>People could see AI Assistant in action, then choose a recent file to try it themselves.</p></figcaption>
        <a href="/AfterUA.png" target="_blank" rel="noopener noreferrer" aria-label="Open revised onboarding flow at full size">
          <svg viewBox="88 85 720 708" role="img" aria-label="Revised onboarding: document-task demonstration followed by recent files inside AI Assistant">
            <image href="/AfterUA.png" width="2048" height="873" />
          </svg>
        </a>
        <div className="aia-flow-labels"><span>See questions and summaries</span><span>Choose a recent file</span></div>
      </figure>
    </div>
    <figure className="aia-continuation">
      <figcaption>
        <h3>Asking the first question</h3>
        <p>After choosing a file and giving consent, people could pick a suggested question once the document was ready. The responses shown here are sample copy.</p>
      </figcaption>
      <p className="aia-scroll-hint">Scroll horizontally to inspect the full flow.</p>
      <div className="aia-flow-scroll" tabIndex={0} role="region" aria-label="Consent, processing, and suggested questions; scroll horizontally to inspect">
        <a href="/AfterUA.png" target="_blank" rel="noopener noreferrer" aria-label="Open the complete onboarding flow at full size">
          <svg viewBox="856 85 1108 708" role="img" aria-label="Consent after file selection, document processing, and suggested questions">
            <image href="/AfterUA.png" width="2048" height="873" />
          </svg>
        </a>
      </div>
    </figure>
  </div>;
}

export default function AIA({ embedded = false, headingRef }) {
  return <CaseStudyLayout className="aia-case" embedded={embedded} headingRef={headingRef} title="Adobe AI Assistant"
    role="Lead Product Designer · Sole designer · iOS & Android"
    intro="Acrobat’s AI Assistant launched on mobile, but adoption was low. People did not understand what it could do for them. I redesigned how people found and tried the assistant, from the first introduction to asking a question about their own document."
    nextPath="/pdf-spaces" nextTitle="PDF Spaces">
    <CaseStudySection id="discovery-framework" title="How people found and tried AI Assistant">
      <p>The team wanted to add more messaging about AI Assistant across the app. I mapped out what people needed at each step: notice the feature, understand what it could do, and try it on a document.</p>
      <p>I worked with product marketing managers to give each part of the experience a clear job. Onboarding explained how it worked. Suggestions while reading and selecting text helped people find it when they needed it. Prompts helped them ask their first question.</p>
    </CaseStudySection>
    <CaseStudySection id="onboarding" title="A demo in onboarding" video="/UA.mov" poster="/previews/case-studies/UA.jpg" alt="AI Assistant onboarding demonstrates document questions and summaries" evidence={<>
      <OnboardingComparison />
    </>}>
      <p>Research showed that announcements and coachmarks were not helping people understand AI Assistant.</p>
      <p>I replaced the feature description with a demo of questions and summaries, then brought recent files into the assistant so people could try it on their own document.</p>
    </CaseStudySection>
    <CaseStudySection id="contextual-nudges" title="Suggestions while reading" video="/Chatbubble.mov" poster="/previews/case-studies/Chatbubble.jpg" alt="An AI suggestion appears in the context of a document">
      <p>I did not want to add another notification people would ignore. I designed suggestions based on reading behavior, so they related to the document someone already had open.</p>
    </CaseStudySection>
    <CaseStudySection id="text-selection" title="Ask AI about selected text" video="/AskAI.mov" poster="/previews/case-studies/AskAI.jpg" alt="Selecting text opens a contextual Ask AI action">
      <p>Text selection took the most discussion with the team. We had to decide what action to offer when someone highlighted a passage and how to label it.</p>
      <p>I focused on what the person had already selected. Ask AI let them ask about that passage without copying it into chat.</p>
      <p>I worked with engineers to fit Ask AI into the selection menus on iOS and Android.</p>
    </CaseStudySection>
    <CaseStudySection id="quick-prompts" title="Helping people decide what to ask" video="/IC.mov" poster="/previews/case-studies/IC.jpg" alt="Quick prompts organized into task categories" evidence={<>
      <div className="aia-prompt-comparison" id="prompt-comparison">
        <section className="aia-prompt-before" aria-labelledby="prompt-before-title">
          <h3 id="prompt-before-title">Before</h3>
          <PromptStill src="/aia-prompt-0.jpg" title="Generic suggestions">The welcome screen showed suggested questions above the input.</PromptStill>
        </section>
        <section className="aia-prompt-explorations" aria-labelledby="prompt-explorations-title">
          <h3 id="prompt-explorations-title">Explorations</h3>
          <div className="aia-prompt-options">
            <PromptStill src="/aia-prompt-1.jpg" title="Autocomplete">Suggestions appeared after someone began typing a question.</PromptStill>
            <PromptStill src="/aia-prompt-2.jpg" title="Starter kit">An introduction explained the assistant’s features in the chat.</PromptStill>
          </div>
        </section>
        <section className="aia-prompt-selected" aria-labelledby="prompt-selected-title">
          <h3 id="prompt-selected-title">Selected</h3>
          <PromptStill src="/aia-prompt-3.jpg" title="Prompts by task">Suggestions were grouped under Ask, Analyze, and Generate.</PromptStill>
        </section>
      </div>
    </>}>
      <p>People often did not know what to ask in an empty chat. I explored three options: autocomplete, a starter kit, and prompts grouped by task.</p>
      <p>Based on user testing, we chose prompts grouped by task. People could choose what they wanted help with without having to write a question from scratch.</p>
    </CaseStudySection>
    <CaseStudySection id="impact" title="What shipped">
      <p>The onboarding demo, contextual suggestions, Ask AI text-selection action, and task-based prompts all shipped on mobile.</p>
    </CaseStudySection>
  </CaseStudyLayout>;
}
