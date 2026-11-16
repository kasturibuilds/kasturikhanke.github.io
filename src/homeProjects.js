import feature from './openai-feature.json';

export const projects = [
  { name: 'OpenAI', purpose: 'what’s next.', description: 'Featured by OpenAI Developers: how I built Generative Loaders with Codex, from idea to a published React package.', video: feature.src, image: feature.poster, captions: feature.captions, href: feature.post, cta: 'Watch on LinkedIn', film: true },
  { name: 'PDF Spaces', purpose: 'collaboration.', description: 'Turned scattered PDFs into a collaborative workspace for sharing, orientation, and AI-guided action.', video: '/previews/spaces-phone.mp4', image: '/previews/spaces-phone.jpg', phone: true, alt: 'PDF Spaces mobile collaboration interface', href: '/pdf-spaces' },
  { name: 'Generative Loaders', purpose: 'open source.', description: '190k+ installs. A React npm package for streaming text, activity indicators, and image loading experiences.', video: '/previews/loaders-fixed.mp4', image: '/previews/loaders-fixed.jpg', href: '/generative-loaders', cta: 'Read case study' },
  { name: 'AI Assistant', purpose: 'conversion.', description: 'Drove discovery and engagement for a newly launched AI assistant through strategic in-product promotion.', video: '/previews/assistant-phone.mp4', image: '/previews/assistant-phone.jpg', phone: true, alt: 'Acrobat AI Assistant discovery experience', href: '/aia' },
  { name: 'Generative Charts', purpose: 'clarity.', description: 'Experiments in how charts look and feel, built into a React library for other developers to use.', video: '/previews/charts-film.mp4', image: '/previews/charts-film.jpg', href: '/generative-charts', cta: 'Read case study' },
  { name: 'Sezzle', purpose: 'trust.', description: 'Led end-to-end design for the first BNPL credit reporting flow, which was key to landing a partnership with Target.', image: '/previews/sezzle-phone.jpg', phone: true, alt: 'Sezzle Up credit reporting experience', href: '/sezzle-up' },
];
