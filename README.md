# Kasturi’s portfolio

React and Vite. Run `npm run dev` for local development and `npm run build` for the production bundle and static route entry points. `node --test tests/gameOfLife.test.mjs` checks the interactive canvas logic.

## Source map

- `src/main.jsx` loads `GalleryApp.jsx`, the active route table.
- `PortfolioBoard.jsx` owns the homepage, project selection, About and Contact panels. Query parameters (`?project=loaders`, `?view=contact`) preserve direct links and browser history.
- `portfolioProjects.js` supplies project media and facts. `LoadersBento.jsx` and `ChartsBento.jsx` pair design decisions with live examples from the installed libraries. They use the same `CaseStudyLayout.jsx` introduction and sections as the other case studies; each story’s copy lives beside its demos.
- `ProjectExampleGalleries.jsx` contains the end-of-story loader and chart galleries. Loader previews pause offscreen and respect reduced motion.
- `CaseStudyLayout.jsx` renders the shared introduction and `CaseStudySection` pairs each decision with its evidence. `AIA.jsx`, `PDFSpaces.jsx`, and `SezzleUp.jsx` contain the stories, reused inside project sheets and on standalone routes. Keep section IDs stable for direct links; use native headings and media controls instead of generated chapter navigation or scroll reveals.
- `useProjectTransition.js` and `ProjectTransition.css` coordinate the 620 ms curtain and page swipe for all homepage views and case studies, including browser Back/Forward, logo or Work/About/Contact taps (even the current section), and interrupted navigation.
- `HomeEntrance.jsx` and `HomeEntrance.css` provide the homepage curtain reveal at most once on initial entry. It skips logo taps, direct project links, return navigation, and reduced motion, and dismisses immediately on interaction.
- `GenerativeHero.jsx` and `gameOfLife.js` own the interactive footer.
- `/receiver` retains the alternate gallery; `/2025/` is the archived portfolio.
- `scripts/create-static-routes.mjs` generates direct-entry HTML and page metadata after the build.

- `src/index.css` defines the shared page-title, section-title, introduction, body, and label typography. Current portfolio pages consume these tokens; chart/demo internals keep their product typography.

## Editing principles

Follow [AGENTS.md](AGENTS.md) for site-wide design, content, interaction, implementation, and verification guidance.
