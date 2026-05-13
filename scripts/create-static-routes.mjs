import { mkdir, copyFile } from 'node:fs/promises';
import { join } from 'node:path';

const distDir = 'dist';
const routes = [
  'about',
  'aia',
  'design-system',
  'feedback',
  'ic',
  'pdf-spaces',
  'sezzle-up',
];

await Promise.all(
  routes.map(async (route) => {
    const routeDir = join(distDir, route);
    await mkdir(routeDir, { recursive: true });
    await copyFile(join(distDir, 'index.html'), join(routeDir, 'index.html'));
    await copyFile(join(distDir, 'index.html'), join(distDir, `${route}.html`));
  }),
);

console.log(`Created static HTML entry points for ${routes.length} routes.`);
