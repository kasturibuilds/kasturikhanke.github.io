/* eslint-disable react/prop-types */
import CaseStudyLayout, { CaseStudySection } from './CaseStudyLayout';

export default function SezzleUp({ embedded = false, headingRef }) {
  return <CaseStudyLayout embedded={embedded} headingRef={headingRef} title="Sezzle Up"
    role="Lead Product Designer · 6 months · VP Product & 2 engineers"
    intro="Sezzle Up lets customers build credit through purchases they already make. As the sole designer, I designed enrollment around three steps: payment history, identity verification, and bank connection."
    outcome="Bank connections increased 70%. Enrollment completion increased 22%."
    nextPath="/aia" nextTitle="Adobe AI Assistant">
    <CaseStudySection id="educational-onboarding" title="Make the next step obvious" image="/SezzleUpMock3.png" alt="Enrollment checklist before and after, with clearer completed and available steps">
      <p>The original checklist looked like a set of buttons. Analytics showed repeated clicks on labels, and usability testing confirmed that people could not tell what was complete or what to do next.</p>
      <p>I separated progress from actions and made the current step clear. Rage clicks on checklist labels dropped to near zero.</p>
    </CaseStudySection>
    <CaseStudySection id="secure-information" title="Earn trust before asking for an SSN" image="/Showhideexploration.png" alt="Comparison of repeated SSN entry and a single field with a show/hide control">
      <p>Four of twelve interview participants questioned why Sezzle needed their Social Security number. I explained its purpose before asking for it and added immediate validation.</p>
      <p>Testing two entry fields against one with a show/hide control revealed that re-entry caused errors. The single field let people verify their information directly.</p>
    </CaseStudySection>
    <CaseStudySection id="link-bank" title="Explain the bank connection" image="/Beforeafterbank.png" alt="Bank connection before and after, prioritizing instant verification with manual entry as a fallback">
      <p>Bank connection had the lowest conversion in the flow. People had just shared sensitive information and did not understand why another step was necessary.</p>
      <p>Plaid’s interface was fixed, so I redesigned the handoff: explain the benefit, recommend instant verification, and retain manual entry as a fallback. After connecting, people went straight to their credit-building dashboard.</p>
    </CaseStudySection>
    <CaseStudySection id="follow-up" title="Measure beyond enrollment">
      <p>The redesign improved connections and completion. Longer-term credit score changes would be the next measure of whether the program delivered on its promise.</p>
    </CaseStudySection>
  </CaseStudyLayout>;
}
