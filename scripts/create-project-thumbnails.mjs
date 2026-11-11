// Text-free project artwork. Run: node scripts/create-project-thumbnails.mjs
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { readFile, writeFile } from 'node:fs/promises';
const root = new URL('../public/thumbnails/', import.meta.url);
const image = async name => `data:image/jpeg;base64,${(await readFile(new URL(name, root))).toString('base64')}`;
const defs = `<defs>
  <filter id="shadow" x="-60%" y="-30%" width="220%" height="180%"><feDropShadow dx="0" dy="16" stdDeviation="18" flood-color="#000000" flood-opacity=".10"/></filter>
  <filter id="blur"><feGaussianBlur stdDeviation="65"/></filter>
  <clipPath id="cover"><rect width="720" height="960"/></clipPath>
</defs>`;
const save = (name, background, body) => writeFile(new URL(`${name}.svg`, root), `<svg xmlns="http://www.w3.org/2000/svg" width="720" height="960" viewBox="0 0 720 960">${defs}<g clip-path="url(#cover)"><rect width="720" height="960" fill="${background}"/>${body}</g></svg>`);

// Crop only the whitespace around the original device mockups. Their screen UI
// and phone frames stay intact; no synthetic interface copy is added.
async function phone(name, source, sourceWidth, sourceHeight, crop, screenOnly = false) {
  const data = await image(source);
  const width = 408, height = width * crop[3] / crop[2];
  const x = (720 - width) / 2, y = (960 - height) / 2;
  await save(name, '#f3f3f1', `
    <g filter="url(#shadow)">
      ${screenOnly ? `<rect x="${x-9}" y="${y-9}" width="${width+18}" height="${height+18}" rx="68" fill="#171719" stroke="#8d8d8d" stroke-width="2"/>` : ''}
      <defs><clipPath id="phone"><rect x="${x}" y="${y}" width="${width}" height="${height}" rx="62"/></clipPath></defs>
      <g clip-path="url(#phone)"><svg x="${x}" y="${y}" width="${width}" height="${height}" viewBox="${crop.join(' ')}" overflow="hidden">
        <image href="${data}" width="${sourceWidth}" height="${sourceHeight}"/>
      </svg></g>
    </g>`);
}
await phone('spaces', '../Spaces.jpg', 2568, 4564, [411, 326, 1749, 3540]);
// Keep a high-resolution, upright screen from the original design board.
execFileSync('sips', ['-Z', '3840', fileURLToPath(new URL('../SplashUI.png', root)), '--setProperty', 'format', 'jpeg', '--setProperty', 'formatOptions', '92', '--out', fileURLToPath(new URL('assistant-source.jpg', root))], { stdio: 'ignore' });
await phone('ai-assistant', 'assistant-source.jpg', 3840, 2160, [1950, 176, 678, 1465], true);
await phone('sezzle', '../sezzle-up.jpg', 642, 1141, [105, 81, 432, 883]);
execFileSync('sips', ['-Z', '3600', fileURLToPath(new URL('../Feedback.jpg', root)), '--setProperty', 'format', 'jpeg', '--setProperty', 'formatOptions', '92', '--out', fileURLToPath(new URL('feedback-source.jpg', root))], { stdio: 'ignore' });
await phone('feedback', 'feedback-source.jpg', 3600, 3600, [1255, 697, 1093, 2191]);

// A compact component study for the design-system project, with no cover copy.
await save('design-system', '#e9e9e3', `
  <g transform="translate(76 199) rotate(-7 284 280)" filter="url(#shadow)">
    <rect width="327" height="261" rx="25" fill="#fbfbf8"/>
    <g fill="none" stroke="#333e37" stroke-width="4"><circle cx="163" cy="130" r="76"/><rect x="107" y="74" width="112" height="112" rx="23" transform="rotate(45 163 130)"/></g>
    <rect x="345" width="224" height="261" rx="25" fill="#b9c7ad"/>
    <rect x="383" y="66" width="148" height="59" rx="30" fill="#384c3e"/><circle cx="501" cy="95.5" r="23" fill="#f8faf3"/>
    <rect x="383" y="145" width="148" height="50" rx="25" fill="#f7f9f1"/><path d="M445 170h24m-12 -12v24" stroke="#536d56" stroke-width="3" stroke-linecap="round"/>
    <rect y="279" width="224" height="261" rx="25" fill="#d9c9e3"/>
    <g stroke="#6b507e" fill="none" stroke-width="4"><rect x="35" y="329" width="61" height="61" rx="15"/><circle cx="157" cy="359" r="30"/><path d="M65 423l32 55H33ZM130 433h56v56h-56Z"/></g>
    <rect x="242" y="279" width="327" height="261" rx="25" fill="#fbfbf8"/>
    <circle cx="340" cy="362" r="46" fill="#d6786c"/><circle cx="454" cy="362" r="46" fill="#e6cd8c"/>
    <circle cx="340" cy="464" r="46" fill="#9bbda9"/><circle cx="454" cy="464" r="46" fill="#ad97c1"/>
  </g>`);

// Static text-free fallbacks for the live previews.
let matrix = '';
for (let i = 0; i < 25; i++) matrix += `<circle cx="${220 + (i % 5) * 70}" cy="${340 + Math.floor(i / 5) * 70}" r="${13 - Math.abs(i % 5 - 2) - Math.abs(Math.floor(i / 5) - 2)}" fill="#393244"/>`;
await save('generative-loaders', '#eeebf3', matrix);
let bars = '';
for (const [i, h] of [145, 235, 190, 315, 265, 360].entries()) bars += `<rect x="${99 + i * 90}" y="${675 - h}" width="54" height="${h}" fill="none" stroke="#000" stroke-width="2"/>`;
await save('generative-charts', '#ffffff', bars);
const martini = `data:image/png;base64,${(await readFile(new URL('lowstakes-martini.png', root))).toString('base64')}`;
await save('lowstakes', '#eef0e8', `
  <ellipse cx="360" cy="805" rx="120" ry="18" fill="#6d7556" opacity=".12" filter="url(#blur)"/>
  <image href="${martini}" x="35" y="155" width="650" height="650"/>
`);
console.log('Created eight text-free project thumbnails.');
