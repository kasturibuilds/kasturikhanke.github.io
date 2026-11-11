import { spawnSync } from 'node:child_process';
import { existsSync, mkdirSync, copyFileSync, mkdtempSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { fileURLToPath } from 'node:url';
import { resolve } from 'node:path';

const root = fileURLToPath(new URL('../', import.meta.url));
const output = resolve(root, 'public/previews');
const rebuild = process.argv.includes('--rebuild');
const only = process.argv.find(arg => arg.startsWith('--only='))?.split('=')[1];
mkdirSync(output, { recursive: true });
const run = args => {
  const result = spawnSync('ffmpeg', ['-hide_banner', '-loglevel', 'error', '-y', ...args], { stdio: 'inherit' });
  if (result.status !== 0) throw new Error('Film export failed');
};

// Source seconds are preserved: only trims, fixed crops and direct cuts.
const films = [
  { name: 'spaces-film', poster: 1.3, shots: [
    ['public/Spaces_customassistant.mov', 0, 2, 'crop=900:1400:936:81'],
    ['public/Spaces_customassistant.mov', 3, 3, 'crop=900:1400:936:81'],
    ['public/Spaces_sharesheet.mov', 0, 2, 'crop=1000:1700:996:51'],
    ['public/Spaces_roles.mov', 0, 1.5, 'crop=1000:1700:996:51'],
    ['public/Spaces_recipient_landing.mov', 3.8, 3.5, 'crop=1000:1700:996:51'],
  ] },
];

// Capture the actual website at retina resolution. Do not use the legacy 720p
// recordings or substitute reconstructed animations for the original loaders.
if ((!only || only === 'loaders-film') && (rebuild || !existsSync(resolve(output, 'loaders-film.mp4')) || !existsSync(resolve(output, 'loaders-film.jpg')))) {
  const result = spawnSync(process.execPath, [resolve(root, 'scripts/capture-loaders-site-reel.mjs')], { stdio: 'inherit' });
  if (result.status !== 0) throw new Error('Loaders site capture failed');
}

for (const { name, poster, shots } of films) {
  if (only && only !== name) continue;
  const destination = resolve(output, `${name}.mp4`);
  if (rebuild || !existsSync(destination)) {
    const work = mkdtempSync(resolve(tmpdir(), 'portfolio-film-'));
    const parts = shots.map(([source, start, duration, crop], index) => {
      const part = resolve(work, `${index}.mp4`);
      run(['-ss', String(start), '-i', resolve(root, source), '-t', String(duration),
        '-vf', `${crop},scale=1280:720:flags=lanczos:force_original_aspect_ratio=decrease,pad=1280:720:(ow-iw)/2:(oh-ih)/2:color=white,fps=30,setsar=1`,
        '-an', '-c:v', 'libx264', '-crf', '0', '-preset', 'fast', '-pix_fmt', 'yuv420p', part]);
      return part;
    });
    const filters = parts.map((_, index) => `[${index}:v]settb=AVTB,setpts=PTS-STARTPTS[v${index}]`);
    filters.push(`${parts.map((_, index) => `[v${index}]`).join('')}concat=n=${parts.length}:v=1:a=0[out]`);
    run([...parts.flatMap(source => ['-i', source]),
      '-filter_complex', filters.join(';'), '-map', '[out]', '-an', '-c:v', 'libx264',
      '-preset', 'slow', '-crf', '17', '-movflags', '+faststart', destination]);
  }
  if (rebuild || !existsSync(resolve(output, `${name}.jpg`))) {
    run(['-ss', String(poster), '-i', destination, '-frames:v', '1', '-q:v', '2', resolve(output, `${name}.jpg`)]);
  }
  console.log(`Ready: ${name}`);
}

// Charts uses the matching actual-site capture. An explicit source import is
// still supported when no export exists, for compatibility with older workflows.
const chartsIndex = process.argv.indexOf('--charts-source');
const charts = resolve(output, 'charts-film.mp4');
if (chartsIndex !== -1 && !existsSync(charts)) {
  const source = process.argv[chartsIndex + 1];
  if (!source || !existsSync(source)) throw new Error('--charts-source requires an existing MP4');
  copyFileSync(source, charts);
}
if (chartsIndex === -1 && (!only || only === 'charts-film') && (rebuild || !existsSync(charts) || !existsSync(resolve(output, 'charts-film.jpg')))) {
  const result = spawnSync(process.execPath, [resolve(root, 'scripts/capture-charts-site-reel.mjs')], { stdio: 'inherit' });
  if (result.status !== 0) throw new Error('Charts site capture failed');
}
if (existsSync(charts) && !existsSync(resolve(output, 'charts-film.jpg'))) {
  run(['-i', charts, '-frames:v', '1', resolve(output, 'charts-film.jpg')]);
}
