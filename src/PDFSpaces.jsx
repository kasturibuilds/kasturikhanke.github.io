/* eslint-disable react/prop-types */
import CaseStudyLayout, { CaseStudySection } from './CaseStudyLayout';

export default function PDFSpaces({ embedded = false, headingRef }) {
  return <CaseStudyLayout embedded={embedded} headingRef={headingRef} title="PDF Spaces"
    role="Mobile Design Lead · 8 months · iOS, Android & Web"
    intro="PDF Spaces brought documents, collaborators, and AI into a shared workspace in Acrobat. The challenge was to move beyond static file sharing while keeping access, permissions, and AI behavior understandable within a familiar product."
    details={<p className="case-project-fact">I led mobile design end to end and redesigned sharing and contributor/reviewer roles for larger screens, working with one other designer, four PMs, and twelve engineers.</p>}
    nextPath="/sezzle-up" nextTitle="Sezzle Up">
    <figure className="case-media">
      <a href="/Spaces_cover.png" target="_blank" rel="noopener noreferrer" aria-label="PDF Spaces across desktop and mobile. Open full-size image">
        <img src="/previews/spaces-cover.webp" width="1800" height="1013" alt="PDF Spaces across desktop and mobile, bringing source documents, an Overview, and sharing permissions together" />
      </a>
    </figure>
    <CaseStudySection id="access" title="Make collaboration possible" video="/Spaces_roles.mov" poster="/previews/case-studies/Spaces_roles.jpg" alt="Choosing contributor, reviewer, or viewer access when sharing a Space">
      <p>Research highlighted a gap: people shared Spaces expecting feedback, but recipients could only view them. Collaboration continued outside the product. Contributor, reviewer, and viewer roles gave people access that matched the work they came to do.</p>
      <p>I shaped the share-sheet direction around making permissions explicit without asking people to learn an entirely new sharing model. I kept Acrobat’s familiar sequence—choose people, set access, send—and adapted the experience across screen sizes.</p>
    </CaseStudySection>
    <CaseStudySection id="custom-assistants" title="Broaden custom agents beyond sharing" video="/Spaces_customassistant.mov" poster="/previews/case-studies/Spaces_customassistant.jpg" alt="Creating a custom assistant from the AI prompt bar">
      <p>PMs proposed adding custom assistants to the share sheet as a new touchpoint for recipients. I pushed for a broader role: sharing determines who can access a Space; customizing an assistant determines how AI should help people work in it.</p>
      <p>I presented three entry-point options through prototypes, helping PMs and design visualize the alternatives. That comparison aligned the team around the prompt bar and helped expand the scope of the custom-agent effort on the roadmap.</p>
      <p>Custom agents shipped in the prompt bar, placing customization where people interact with AI and extending the feature beyond the act of sharing.</p>
    </CaseStudySection>
    <CaseStudySection id="overview" title="Make the Overview editable" video="/Spaces_edit.mov" poster="/previews/case-studies/Spaces_edit.jpg" alt="Editing, reordering, removing, and adding content in a Space Overview">
      <p>The Overview brings different types of content into one place. Edit mode lets people revise individual items, change their order, remove what they do not need, and add content. These controls let people shape the Overview themselves.</p>
    </CaseStudySection>
    <CaseStudySection id="recipient-experience" title="Carry the direction through delivery" video="/Spaces_recipient_landing.mov" poster="/previews/case-studies/Spaces_recipient_landing.jpg" alt="A recipient opens a Space and reviews its overview and documents">
      <p>I carried the mobile flows through detailed specifications, build reviews, and QA across iOS and Android. The recipient experience brought the work together: clarify the invitation, show the source material, and give people a starting point for working with AI.</p>
      <p>The version shown here puts the Overview before the conversation. As the product evolved, its AI-generated content was not providing enough useful context. In leadership discussions, I advocated for making generation opt-in so people could choose when they wanted an Overview.</p>
      <p>The team chose that direction. The opt-in update is rolling out and is not shown in these recordings.</p>
    </CaseStudySection>
  </CaseStudyLayout>;
}
