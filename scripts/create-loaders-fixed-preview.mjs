// Re-edit genuine website footage into three stationary, aligned category views.
// Run from the repository root: node scripts/create-loaders-fixed-preview.mjs
import { spawnSync } from 'node:child_process';

const source = 'docs/media/loaders-site-reel/generative-loaders-site-15s.mp4';
const output = 'public/previews/loaders-fixed';
const run = args => {
  const result = spawnSync('ffmpeg', ['-hide_banner', '-loglevel', 'error', '-y', ...args], { stdio: 'inherit' });
  if (result.status !== 0) throw new Error('Loaders preview encoding failed');
};
// All three source shots hold scrollY=324. Retain native animation speed;
// exclude the hero, lower rows, and chat so the viewport never moves.
const shots = [[1, 3.5], [4.5, 5.5], [6.5, 9.25]];
const filters = shots.map(([start, end], i) =>
  `[0:v]trim=start=${start}:end=${end},setpts=PTS-STARTPTS,scale=2560:1440:flags=lanczos,setsar=1[v${i}]`
);
filters.push('[v0][v1][v2]concat=n=3:v=1:a=0[out]');
run(['-i', source, '-filter_complex', filters.join(';'), '-map', '[out]', '-an',
  '-c:v', 'libx264', '-preset', 'slow', '-crf', '16', '-pix_fmt', 'yuv420p',
  '-movflags', '+faststart', `${output}.mp4`]);
run(['-ss', '1.2', '-i', `${output}.mp4`, '-frames:v', '1', '-q:v', '2', `${output}.jpg`]);
console.log(`Created ${output}.mp4 and poster`);
