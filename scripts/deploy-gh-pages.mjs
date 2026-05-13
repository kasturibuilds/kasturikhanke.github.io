import { cp, mkdtemp, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';

const exec = promisify(execFile);
const distDir = 'dist';
const branch = 'gh-pages';

async function git(args, options = {}) {
  const { stdout, stderr } = await exec('git', args, options);
  if (stdout) process.stdout.write(stdout);
  if (stderr) process.stderr.write(stderr);
}

const { stdout: remoteUrl } = await exec('git', ['remote', 'get-url', 'origin']);
const deployDir = await mkdtemp(join(tmpdir(), 'kasturi-gh-pages-'));

try {
  await cp(distDir, deployDir, { recursive: true });
  await git(['init', '-b', branch], { cwd: deployDir });
  await git(['add', '.'], { cwd: deployDir });
  await git(['commit', '-m', 'Deploy static site'], { cwd: deployDir });
  await git(['remote', 'add', 'origin', remoteUrl.trim()], { cwd: deployDir });
  await git(['push', '--force', 'origin', branch], { cwd: deployDir });
} finally {
  await rm(deployDir, { recursive: true, force: true });
}
