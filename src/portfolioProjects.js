import feature from './openai-feature.json';

// AI Assistant recognition: https://time.com/7094842/adobe-acrobat-ai-assistant/
// Rounded download counts below use the recorded project facts, not live totals.
// npm public downloads API, checked November 3, 2026. Downloads are not unique installs.
export const chartsDownloads = {
  count: '1,187',
  period: 'September 22–November 2, 2026',
  source: 'https://api.npmjs.org/downloads/point/2026-09-22:2026-11-02/generative-charts',
};
export const slides = [
  { title: 'OpenAI Developers', tags: ['Builder film', 'Featured by OpenAI'], detail: 'Featured builder · Generative Loaders with Codex', path: feature.post, theme: 'film', external: true },
  { title: 'Generative Loaders', tags: ['React loading library', '165k+ npm downloads'], detail: 'Independent · Built with Codex', facts: [['Total npm downloads', '165,319'], ['Built with', 'React'], ['Role', 'Design & engineering']], path: 'https://generativeloaders.com', theme: 'loaders', video: 'loaders-film', mediaVersion: 'actual-site-dark-v2', demo: true, external: true },
  { title: 'Generative Charts', tags: ['React chart library', '1k+ npm downloads'], detail: 'Independent · Generative Charts', facts: [['Total npm downloads', chartsDownloads.count], ['Role', 'Design & engineering']], path: 'https://generativecharts.com', theme: 'charts', video: 'charts-film', mediaVersion: 'actual-site-dark-v1', demo: true, external: true },
  { title: 'Adobe AI Assistant', tags: ['Mobile AI assistant', 'TIME Best Inventions 2024'], caseStudy: '/aia', detail: 'Adobe · Discovery → activation on mobile', facts: [['Active usage', '+38%'], ['Conversion', '+32%'], ['Role', 'Lead Product Designer']], theme: 'assistant', video: 'assistant-overview', mediaVersion: 'proof-reel-v1', demo: true },
  { title: 'PDF Spaces', tags: ['AI workspace', '0–1 mobile product'], caseStudy: '/pdf-spaces', detail: 'Adobe · Multi-document AI workspace', facts: [['Launch', '0→1 product'], ['Role', 'Mobile design lead'], ['Platforms', 'iOS, Android, Web']], theme: 'spaces', video: 'spaces-film', mediaVersion: 'film-v1', demo: true },
  { title: 'Lowstakes', detail: 'Independent · Social scorecards & plans', theme: 'lowstakes', facts: [['Product', 'Social planning app'], ['Platform', 'iOS'], ['Role', 'Design & engineering']] },
  { title: 'Clicky', detail: 'Independent · Frosted keys in motion', theme: 'clicky', demo: true, facts: [['Product', 'Custom keyboard'], ['Platform', 'iOS'], ['Focus', 'Tactile interaction']] },
  { title: 'Sezzle Up', tags: ['Credit-building experience', '+70% bank connections'], caseStudy: '/sezzle-up', detail: 'Sezzle · Building credit from everyday purchases', theme: 'sezzle', facts: [['Bank connections', '+70%'], ['Duration', '6 months'], ['Team', 'Designer, VP Product, 2 engineers']] },
  { title: 'Contextual AI', detail: 'Adobe · Ask about the text you select', theme: 'assistant-prompts', demo: true, facts: [['Focus', 'AI activation'], ['Platform', 'Mobile']] },
  { title: 'AI Discovery', detail: 'Adobe · Showing value at the right moment', theme: 'assistant-discovery', demo: true, facts: [['Focus', 'Contextual onboarding'], ['Role', 'Lead Product Designer']] },
  { title: 'Custom Agents', detail: 'Adobe · Tailoring AI to the task', theme: 'spaces-agents', demo: true, facts: [['Product', 'PDF Spaces'], ['Focus', 'Agent customization']] },
  { title: 'Sharing & Access', detail: 'Adobe · Making collaboration clear', theme: 'spaces-sharing', mediaVersion: '2', demo: true, facts: [['Product', 'PDF Spaces'], ['Focus', 'Roles & permissions']] },
  { title: 'The Recipient View', detail: 'Adobe · Context before the conversation', theme: 'spaces-overview', demo: true, facts: [['Product', 'PDF Spaces'], ['Focus', 'Recipient experience']] },
  { title: 'Word Generator', detail: 'Interaction study · Generative text', theme: 'word-generator', demo: true, facts: [['Focus', 'Text generation'], ['Format', 'Interaction study']] },
  { title: 'AI Quick Prompts', detail: 'Adobe · A starting point for every question', theme: 'interaction-components', demo: true, facts: [['Product', 'Acrobat AI Assistant'], ['Focus', 'First-use prompts']] },
  { title: 'Studio', detail: 'Product design · AI prototyping · Design engineering', path: '/work-with-me', theme: 'studio' },
];
