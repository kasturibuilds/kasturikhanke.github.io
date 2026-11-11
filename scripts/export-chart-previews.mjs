// Export the real Generative Charts Mono Editorial renderer as portable previews.
// Usage: node scripts/export-chart-previews.mjs /path/to/Generativecharts
import { build } from 'esbuild';
import { mkdir, mkdtemp, readFile, rm, writeFile } from 'node:fs/promises';
import { createRequire } from 'node:module';
import { tmpdir } from 'node:os';
import { resolve, join } from 'node:path';

if (!process.argv[2]) throw new Error('Provide the Generativecharts repository path.');
const chartRoot = resolve(process.argv[2]);
const temporary = await mkdtemp(join(tmpdir(), 'portfolio-mono-'));
try {
  const bundle = join(temporary, 'render.cjs');
  await build({
    stdin: { contents: `
      import React from 'react';
      import { renderToStaticMarkup } from 'react-dom/server';
      import { BarChart, LineChart, PieChart } from './packages/chartkit/src/index.ts';
      const data = [
        { month: 'Jan', revenue: 42 }, { month: 'Feb', revenue: 58 },
        { month: 'Mar', revenue: 51 }, { month: 'Apr', revenue: 74 },
        { month: 'May', revenue: 82 }, { month: 'Jun', revenue: 96 }
      ];
      const common = { theme: 'mono-editorial', appearance: 'light', animate: false, height: 460, showLegend: false, figureLabel: '' };
      const series = [{ dataKey: 'revenue', label: 'Revenue' }];
      export const previews = {
        bar: renderToStaticMarkup(React.createElement(BarChart, { ...common, data, series, categoryKey: 'month' })),
        line: renderToStaticMarkup(React.createElement(LineChart, { ...common, data, series, xKey: 'month' })),
        donut: renderToStaticMarkup(React.createElement(PieChart, { ...common, variant: 'donut', data: [{ name: 'Direct', value: 48 }, { name: 'Search', value: 32 }, { name: 'Referral', value: 20 }], nameKey: 'name', valueKey: 'value' }))
      };
    `, resolveDir: chartRoot, loader: 'tsx' },
    outfile: bundle, bundle: true, platform: 'node', format: 'cjs', jsx: 'automatic',
    define: { 'process.env.NODE_ENV': '"production"' }, logLevel: 'silent',
  });
  const { previews } = createRequire(import.meta.url)(bundle);
  const css = await readFile(join(chartRoot, 'packages/chartkit/src/styles.css'), 'utf8');
  await mkdir(new URL('../src/generated/', import.meta.url), { recursive: true });
  await writeFile(new URL('../src/generated/chart-preview.css', import.meta.url), css);
  for (const [name, html] of Object.entries(previews)) {
    const variables = html.match(/<figure[^>]*style="([^"]*)"/)[1];
    const plot = html.match(/<svg[\s\S]*?<\/svg>/)[0].replace('<svg ', '<svg x="40" y="250" width="640" height="460" ');
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="720" height="960" viewBox="0 0 720 960"><style><![CDATA[${css}\n.ck-svg{width:640px;height:460px} .ck-mark{animation:none}]]></style><rect width="720" height="960" fill="#ffffff"/><g class="ck-chart" data-theme="mono-editorial-light" style="${variables};--ck-background:#ffffff;--ck-plot-background:#ffffff;--ck-surface:#ffffff;--ck-text:#000000;--ck-point-fill:#ffffff">${plot}</g></svg>`;
    // Trusted local renderer output: remove controls because these are visual previews.
    const inline = html.match(/<svg[\s\S]*?<\/svg>/)[0]
      .replaceAll('_R_0_', `bento-${name}`)
      .replace(/ tabindex="[^"]*"/g, '')
      .replace(/ role="button"/g, '')
      .replace(/<desc[\s\S]*?<\/desc>/, '')
      .replace(/ aria-describedby="[^"]*"/g, '');
    await writeFile(new URL(`../src/generated/mono-${name}.html`, import.meta.url), `<div class="ck-chart" data-theme="mono-editorial-light" style="${variables};--ck-background:#fff;--ck-plot-background:#fff;--ck-surface:#fff;--ck-text:#000;--ck-point-fill:#fff">${inline}</div>`);
    await writeFile(new URL(`../public/thumbnails/mono-${name}.svg`, import.meta.url), svg);
  }
  console.log('Exported bar, line, and donut previews from the Mono Editorial renderer.');
} finally {
  await rm(temporary, { recursive: true, force: true });
}
