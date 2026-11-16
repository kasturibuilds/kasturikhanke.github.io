# Kasturi’s portfolio

React and Vite. Run `npm run dev` for local development and `npm run build` for the production bundle and static route entry points. `node --test tests/gameOfLife.test.mjs` checks the retained interactive canvas logic.

## Source map

- `src/main.jsx` loads `App.jsx`, the restored pre-redesign portfolio from commit `a54da21c`.
- `App.jsx` owns the route table and homepage. `ProjectHero.jsx` and `ProjectHero.css` supply the six-project showcase, with laptop framing for wide demos and navigation below the media. `Homepage.css` scopes the homepage width and two-column footer. `SiteHeader.jsx` and `StandardNavbar.jsx` supply shared navigation. `LiveHomepage.jsx` is an inactive reference to the deployed three-project layout.
- `homeProjects.js` defines the homepage order; `ProjectNavigation.jsx` uses its case-study routes for shared Previous/Next links, wrapping at either end and skipping external features.
- `AIA.jsx`, `PDFSpaces.jsx`, `SezzleUp.jsx`, `About.jsx`, and `FrameworkSection.jsx` contain the restored case studies and About page.
- `GenerativeCaseStudy.jsx` supplies the shared case-study format for `/generative-loaders` and `/generative-charts`; `generativeStories.js` contains their process narratives and media. `SiteFooter.jsx` supplies the shared contact CTA and footer across the main portfolio routes. `CaseStudyFeature.jsx` shares feature-section layout between these stories and PDF Spaces. Rebuild the focused video demos from the 4K source recordings with `node scripts/create-case-study-demos.mjs` (requires FFmpeg).
- `/receiver` retains the alternate gallery (`ProjectGallery.jsx`); `/work-with-me` retains the contact page.
- `GenerativeUseCases.jsx` and `GenerativeUseCases.css` contain the live chart dashboard and simulated AI conversation examples, using the actual chart and loader library components.
- `/2025/` remains the independent frozen archive in `public/2025`.
- `scripts/create-static-routes.mjs` generates direct-entry HTML and metadata after the build.
- `src/index.css` and `tailwind.config.js` supply styles. Redesign components remain inactive source references, not a new public archive route.

The redesign was saved outside this repository as a private local archive before restoration, including source, media, and its built preview. No reference copy is published by the build.

## Editing principles

Follow [AGENTS.md](AGENTS.md) for site-wide design, content, interaction, implementation, and verification guidance.
