// Rebuild the frozen pre-redesign website without importing current site content.
import { execFileSync } from 'node:child_process';
import { mkdtemp, mkdir, readFile, writeFile, readdir, symlink, rm, copyFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { resolve, join } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const revision = 'a54da21';
const staging = await mkdtemp(join(tmpdir(), 'portfolio-2025-'));
const output = join(root, 'public/2025');

try {
  const snapshot = execFileSync('git', ['archive', revision, 'src', 'public', 'index.html', 'package.json', 'tailwind.config.js', 'postcss.config.js'], { cwd: root, maxBuffer: 256 * 1024 * 1024 });
  execFileSync('tar', ['-x', '-C', staging], { input: snapshot, maxBuffer: 256 * 1024 * 1024 });
  await symlink(join(root, 'node_modules'), join(staging, 'node_modules'), 'dir');
  // Namespace the old site's route and absolute asset literals. Relative media
  // resolve through the base element, including on nested case-study URLs.
  async function namespace(directory) {
    for (const entry of await readdir(directory, { withFileTypes: true })) {
      const file = join(directory, entry.name);
      if (entry.isDirectory()) await namespace(file);
      else if (/\.(jsx?|css)$/.test(entry.name)) {
        const source = await readFile(file, 'utf8');
        await writeFile(file, source.replace(/(['"`])\/(?!\/)([^'"`\n]*)\1/g, (_, quote, path) => `${quote}/2025/${path}${quote}`));
      }
    }
  }
  await namespace(join(staging, 'src'));
  let html = await readFile(join(staging, 'index.html'), 'utf8');
  html = html.replace('<head>', '<head>\n    <base href="/2025/" />\n    <meta name="robots" content="noindex" />')
    .replace('<title>Kasturi Khanke</title>', '<title>Kasturi Khanke — 2025 Archive</title>')
    .replaceAll('href="/favicon/', 'href="/2025/favicon/')
    .replace('<div id="root"></div>', `<div id="root"></div>
    <aside aria-label="Archived website" style="position:fixed;bottom:12px;right:12px;z-index:99999;background:#f2f3ef;color:#263e30;border:1px solid #263e3030;border-radius:6px;padding:10px 14px;font:11px/1.5 Arial,sans-serif;box-shadow:0 2px 12px #0001"><strong>2025 archive</strong><span aria-hidden="true"> · </span><a href="/" style="color:inherit;text-decoration:underline">Current portfolio</a></aside>`);
  await writeFile(join(staging, 'index.html'), html);
  // Do not carry hosting configuration or the old root-level 404 redirect.
  for (const name of ['CNAME', '404.html', '.DS_Store']) await rm(join(staging, 'public', name), { force: true });
  await writeFile(join(staging, 'vite.config.mjs'), `import { defineConfig } from 'vite';\nimport react from '@vitejs/plugin-react';\nexport default defineConfig({base:'/2025/',plugins:[react()],assetsInclude:['**/*.mov']});\n`);
  execFileSync(process.execPath, [join(root, 'node_modules/vite/bin/vite.js'), 'build', '--outDir', output, '--emptyOutDir'], { cwd: staging, stdio: 'inherit' });
  for (const route of ['about', 'aia', 'design-system', 'feedback', 'pdf-spaces', 'sezzle-up']) {
    await mkdir(join(output, route), { recursive: true });
    await copyFile(join(output, 'index.html'), join(output, route, 'index.html'));
    await copyFile(join(output, 'index.html'), join(output, `${route}.html`));
  }
  await writeFile(join(output, 'archive.json'), JSON.stringify({ label: '2025', sourceCommit: execFileSync('git', ['rev-parse', revision], { cwd: root, encoding: 'utf8' }).trim(), description: 'Frozen pre-redesign portfolio. The year is the archive label, not the source commit date.' }, null, 2));
} finally {
  await rm(staging, { recursive: true, force: true });
}
