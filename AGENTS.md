# Site design principles

Apply these instructions to every change to this portfolio. Use Linear and Apple Notes as references for clarity and restraint, without copying their branding. Aim for simple purpose, simple architecture, simple design, and simple implementation.

Every decision should improve the visitor experience (UX), the developer experience (DX), and the agent experience (AX) together. Prefer changes that make the site easier to understand, use, maintain, and inspect. Do not trade working behavior or accessibility for a cleaner screenshot.

## Purpose and content

- Give each page one clear purpose and each section one distinct contribution.
- Lead with the work: project names, product screens, concrete decisions, and evidence.
- Cut taglines, helper text, secondary labels, decorative numbering, and repeated summaries. If a screen needs explanatory copy to make its structure understandable, fix the layout first.
- Keep text that adds necessary context, explains a design decision, establishes ownership, or supports a result. Preserve essential instructions, error messages, and accessible names.
- State each fact once. Avoid a project introduction followed by another hero saying the same thing, or an impact section repeated as results and conclusions.
- Use specific, plain language. Do not invent metrics or strengthen claims beyond the available evidence.

## Layout and visual design

- Establish hierarchy with placement, spacing, scale, and alignment before adding labels or decoration.
- Use a small, consistent set of type sizes, spacing values, colors, and components. Preserve the site's visual identity.
- Prefer a continuous reading surface. Add cards, borders, backgrounds, and panels only when they clarify a meaningful grouping.
- Avoid competing focal points, oversized empty regions, and dense clusters of small labels. Whitespace should support reading and relationships.
- Pair a design decision with the relevant image or demo. Keep text readable and product interfaces large enough to inspect.
- Use white reading surfaces for case studies. Make media backgrounds blend into the page; remove recording-edge artifacts and unnecessary framing.
- Keep full devices and important UI visible. Check video and poster framing at desktop and mobile sizes; do not rely on an arbitrary crop that hides content.
- Use animation only when it demonstrates the work or aids interaction. Content must not depend on a scroll reveal to become readable.

## Navigation and interaction

- Never use northeast-pointing arrow decorations or external-link arrow icons in this portfolio. Keep CTA and link labels as plain text. This is an explicit user preference.

- Keep navigation obvious and actions explicitly named. Remove redundant controls, including a project Close button when the existing Work navigation already provides a clear exit.
- Preserve project URLs, standalone routes, browser history, meaningful anchors, keyboard navigation, focus behavior, and responsive layouts.
- Retain media controls, reduced-motion support, and useful still previews. Pause autoplay when media is offscreen or the page is hidden.
- Use semantic HTML and meaningful headings, links, buttons, alt text, and accessible names so people and agents can understand the same interface.

## Implementation

- Read the source map in README.md and edit the active implementation.
- Use one shared component for repeated structure; keep project-specific content straightforward to find and edit.
- Prefer native HTML and CSS over extra state, observers, DOM discovery, or custom controls when native behavior meets the need.
- Remove obsolete code and superseded styles within the changed feature. Avoid layers of CSS overrides and abstractions with no clear reuse.
- Do not add dependencies for minor visual changes.
- Preserve unrelated work, the alternate gallery, and the 2025 archive unless explicitly included in the request.

## Before finishing

- Ask whether each visible element supplies information, supports navigation, or shows the work. Remove elements that do none of these.
- Verify changed layouts at desktop and narrow mobile widths, including wrapping, overflow, media framing, and spacing.
- Check affected interactions and direct routes. Run the production build for code changes and relevant existing tests when behavior changes.
- Report what changed and what was verified. State verification limits honestly; a successful build alone does not establish visual quality.
