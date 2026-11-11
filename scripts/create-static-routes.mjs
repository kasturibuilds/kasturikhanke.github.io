import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

const distDir = 'dist';
const siteUrl = 'https://kasturi.live';
const defaultDescription = 'Product designer and builder connecting AI product design, growth, and community. Explore Adobe, Sezzle, and independent work.';
const routes = {
  about: {
    title: 'About Kasturi Khanke — Product Designer & Builder',
    description: 'Meet Kasturi Khanke, a product designer and builder working across product strategy, design, and code in AI, mobile, and developer tools.',
  },
  receiver: {
    title: 'Receiver — Kasturi Khanke',
    description: defaultDescription,
    noindex: true,
  },
  'work-with-me': {
    title: 'Work with Kasturi Khanke — Product Design & AI',
    description: 'Contact Kasturi Khanke about product design roles and freelance projects.',
  },
  aia: {
    title: 'Adobe AI Assistant — Kasturi Khanke',
    description: 'Designing contextual discovery and onboarding for Acrobat AI Assistant on mobile. A product design case study by Kasturi Khanke.',
  },
  'pdf-spaces': {
    title: 'Adobe PDF Spaces — Kasturi Khanke',
    description: 'Designing the mobile experience, sharing, permissions, and custom agents for Adobe PDF Spaces. A case study by Kasturi Khanke.',
  },
  'sezzle-up': {
    title: 'Sezzle Up — Kasturi Khanke',
    description: 'Designing a credit-building experience through everyday purchases, from enrollment to bank connection. A product design case study by Kasturi Khanke.',
  },
  ...Object.fromEntries(['design-system', 'feedback', 'ic'].map(route => [route, {
    title: 'Kasturi Khanke — Product Designer & Builder',
    description: defaultDescription,
    noindex: true,
    canonicalPath: '/',
  }])),
};

const template = await readFile(join(distDir, 'index.html'), 'utf8');
const metadataPattern = /<!-- portfolio-metadata:start -->[\s\S]*?<!-- portfolio-metadata:end -->/;
if (!metadataPattern.test(template)) {
  throw new Error('The built index.html is missing the portfolio metadata block.');
}
const escapeAttribute = value => value.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

function routeMetadata(route, { title, description, noindex = false, canonicalPath = `/${route}` }) {
  const url = `${siteUrl}${canonicalPath}`;
  const image = `${siteUrl}/social/portfolio.png`;
  const imageAlt = 'Kasturi Khanke. I design and build products, then help them grow. Open to my next role.';
  const meta = (attribute, key, value) => `<meta ${attribute}="${key}" content="${escapeAttribute(value)}" />`;
  return [
    '<!-- portfolio-metadata:start -->',
    `<title>${escapeAttribute(title)}</title>`,
    meta('name', 'description', description),
    `<link rel="canonical" href="${url}" />`,
    meta('name', 'robots', noindex ? 'noindex, follow' : 'index, follow'),
    meta('property', 'og:type', 'website'),
    meta('property', 'og:site_name', 'Kasturi Khanke'),
    meta('property', 'og:title', title),
    meta('property', 'og:description', description),
    meta('property', 'og:url', url),
    meta('property', 'og:image', image),
    meta('property', 'og:image:width', '1200'),
    meta('property', 'og:image:height', '630'),
    meta('property', 'og:image:alt', imageAlt),
    meta('name', 'twitter:card', 'summary_large_image'),
    meta('name', 'twitter:title', title),
    meta('name', 'twitter:description', description),
    meta('name', 'twitter:image', image),
    meta('name', 'twitter:image:alt', imageAlt),
    '<!-- portfolio-metadata:end -->',
  ].join('\n    ');
}

await Promise.all(
  Object.entries(routes).map(async ([route, metadata]) => {
    const routeDir = join(distDir, route);
    const html = template.replace(metadataPattern, routeMetadata(route, metadata));
    await mkdir(routeDir, { recursive: true });
    await writeFile(join(routeDir, 'index.html'), html);
    await writeFile(join(distDir, `${route}.html`), html);
  }),
);

console.log(`Created static HTML entry points with metadata for ${Object.keys(routes).length} routes.`);
