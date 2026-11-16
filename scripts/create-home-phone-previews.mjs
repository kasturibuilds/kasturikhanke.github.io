// Homepage phone previews from original recordings. No reconstructed interactions.
import { spawnSync } from 'node:child_process';
const run = args => {
  const result = spawnSync('ffmpeg', ['-hide_banner', '-loglevel', 'error', '-y', ...args], { stdio: 'inherit' });
  if (result.status !== 0) throw new Error('Phone preview export failed');
};
// Tight bounds retain the entire device, with the same small safety margin.
// Each phone is then centered at the same scale on a 720 × 1280 canvas.
const frame = crop => `crop=${crop},scale=-2:1080:flags=lanczos,pad=720:1280:(ow-iw)/2:(oh-ih)/2:color=white,setsar=1`;
const previews = [
  ['spaces-phone', 'public/Spaces_customassistant.mov', '640:1280:1068:144'],
  ['assistant-phone', 'public/UA.mov', '700:1400:990:150'],
];
for (const [name, source, crop] of previews) {
  const output = `public/previews/${name}`;
  run(['-i', source, '-t', '8', '-vf',
    `${frame(crop)},fps=30`,
    '-an', '-c:v', 'libx264', '-preset', 'slow', '-crf', '18', '-pix_fmt', 'yuv420p', '-movflags', '+faststart', `${output}.mp4`]);
  run(['-ss', '1', '-i', `${output}.mp4`, '-frames:v', '1', '-q:v', '2', `${output}.jpg`]);
  console.log(`Created ${output}`);
}

run(['-i', 'public/sezzle-up.jpg', '-vf', frame('448:896:97:74'),
  '-frames:v', '1', '-q:v', '2', 'public/previews/sezzle-phone.jpg']);
