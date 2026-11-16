import { mkdirSync } from 'node:fs';
import { spawnSync } from 'node:child_process';

// Source timings are documented in docs/generative-{loaders,charts}-promo.md.
// Loaders share the full 16:9 recording frame. Charts retain their focused card framing.
// Keep labels and original playback speed.
const clips = [
  ['loaders-text', 'loaders', 1, 2.5, 'scale=2560:1440:flags=lanczos'],
  ['loaders-activity', 'loaders', 4.5, 2, 'scale=2560:1440:flags=lanczos'],
  ['loaders-images', 'loaders', 6.5, 5.5, 'scale=2560:1440:flags=lanczos'],
  ['loaders-chat', 'loaders', 12, 3, 'scale=2560:1440:flags=lanczos'],
  ['charts-mono', 'charts', 1, 1.5, 'crop=1818:1680:72:420'],
  ['charts-lines', 'charts', 2.5, 1.75, 'crop=1818:1680:72:420'],
];
mkdirSync('public/previews/case-studies', { recursive: true });
function run(args) {
  const result = spawnSync('ffmpeg', ['-hide_banner', '-loglevel', 'error', '-y', ...args], { stdio: 'inherit' });
  if (result.status !== 0) throw new Error('Video export failed');
}
for (const [name, project, start, duration, framing] of clips) {
  const source = `docs/media/${project}-site-reel/generative-${project}-site-15s.mp4`;
  const output = `public/previews/case-studies/${name}`;
  run(['-ss', String(start), '-i', source, '-t', String(duration), '-an', '-vf', framing, '-c:v', 'libx264', '-crf', '17', '-preset', 'medium', '-pix_fmt', 'yuv420p', '-movflags', '+faststart', `${output}.mp4`]);
  run(['-ss', String(Math.min(duration / 2, 1)), '-i', `${output}.mp4`, '-frames:v', '1', '-q:v', '2', `${output}.jpg`]);
  console.log(`Exported ${name}: ${framing}, ${duration}s`);
}
