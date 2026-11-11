import { spawnSync } from 'node:child_process';
import { mkdirSync, existsSync } from 'node:fs';
const output = 'public/previews';
const rebuild = process.argv.includes('--rebuild');
mkdirSync(output, { recursive: true });
const run = args => { const result = spawnSync('ffmpeg', ['-hide_banner', '-loglevel', 'error', '-y', ...args], { stdio: 'inherit' }); if (result.status !== 0) throw new Error('Video encoding failed'); };
const demos = { 'assistant-prompts': 'AskAI.mov', 'assistant-discovery': 'UA.mov', 'spaces-agents': 'Spaces_customassistant.mov', 'spaces-sharing': 'Spaces_roles.mov', 'spaces-overview': 'Spaces_recipient_landing.mov', 'word-generator': 'wordgenerator.mov', 'interaction-components': 'IC.mov' };
for (const [name, source] of Object.entries(demos)) {
  const destination = `${output}/${name}.mp4`;
  if (existsSync(destination) && !rebuild) continue;
  const trim = name === 'spaces-sharing' ? 'crop=iw-64:ih-64:32:32,' : '';
  const canvas = name === 'spaces-sharing' ? 'white' : '0x171918';
  const width = name === 'word-generator' ? 1920 : 2560;
  const height = name === 'word-generator' ? 1080 : 1440;
  run(['-i', `public/${source}`, '-t', '10', '-vf', `${trim}fps=60,scale=${width}:${height}:flags=lanczos:force_original_aspect_ratio=decrease,pad=${width}:${height}:(ow-iw)/2:(oh-ih)/2:color=${canvas},setsar=1`, '-an', '-c:v', 'libx264', '-preset', 'slow', '-crf', '17', '-pix_fmt', 'yuv420p', '-movflags', '+faststart', destination]);
  run(['-i', destination, '-frames:v', '1', '-q:v', '2', `${output}/${name}.jpg`]);
  console.log(`Created ${destination}`);
}

const assistantOverview = `${output}/assistant-overview.mp4`;
if (!existsSync(assistantOverview)) {
  const normalize = (input, start, end, crop) => `[${input}:v]trim=start=${start}:end=${end},setpts=PTS-STARTPTS,crop=${crop},scale=1280:720:force_original_aspect_ratio=decrease,pad=1280:720:(ow-iw)/2:(oh-ih)/2:color=white,fps=30,setsar=1`;
  run([
    '-i', 'public/PN.mov',
    '-i', 'public/UA.mov',
    '-i', 'public/Chatbubble.mov',
    '-i', 'public/AskAI.mov',
    '-i', 'public/IC.mov',
    '-filter_complex', [
      `${normalize(0, '0.45', '1.75', '1200:1550:744:76')}[v0]`,
      `${normalize(1, '0.40', '2.20', '1200:1550:744:76')}[v1]`,
      `${normalize(2, '0', '1.30', '1200:1550:744:76')}[v2]`,
      `${normalize(3, '0', '2.00', '1200:1550:744:76')}[v3]`,
      `${normalize(4, '3.55', '8.35', '1200:1450:896:66')}[v4]`,
      '[v0][v1][v2][v3][v4]concat=n=5:v=1:a=0[outv]',
    ].join(';'),
    '-map', '[outv]',
    '-an',
    '-c:v', 'libx264',
    '-preset', 'fast',
    '-crf', '22',
    '-pix_fmt', 'yuv420p',
    '-movflags', '+faststart',
    assistantOverview,
  ]);
  run(['-ss', '5.6', '-i', assistantOverview, '-frames:v', '1', `${output}/assistant-overview.jpg`]);
  console.log(`Created ${assistantOverview}`);
}

if (rebuild || !existsSync(`${output}/clicky.mp4`)) {
  // The source holds its opening frame until 9.88s; keep the actual typing sequence.
  run(['-ss', '9.88', '-i', 'docs/media/clicky-source.mov', '-t', '3.4', '-vf', 'crop=1136:1140:35:665,fps=30,scale=-2:1000:flags=lanczos,pad=1920:1080:(ow-iw)/2:(oh-ih)/2:color=0xe8e9ec,setsar=1', '-an', '-c:v', 'libx264', '-preset', 'slow', '-crf', '17', '-pix_fmt', 'yuv420p', '-movflags', '+faststart', `${output}/clicky.mp4`]);
  run(['-i', `${output}/clicky.mp4`, '-frames:v', '1', '-q:v', '2', `${output}/clicky.jpg`]);
}
