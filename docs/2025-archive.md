# 2025 website archive

The pre-redesign portfolio is frozen at `/2025/`. Its homepage and original case studies have their own compiled JavaScript, CSS, and media under `public/2025`, so editing the current site does not change the archive.

Source: Git commit `a54da21` (the last committed site before the current redesign). “2025” is the requested archive label, not the commit date.

The only archival adaptations are namespaced internal links/assets, static route entry points, a 2025 title and archive badge, a return link to the current portfolio, and `noindex` metadata. The original design and content are retained.

To deliberately regenerate the snapshot, run `node scripts/build-2025-archive.mjs`. It reads the fixed revision, builds in a temporary directory, and replaces only `public/2025`. Ordinary `npm run build` copies the frozen archive into `dist/2025` unchanged. Both `/2025/` and nested case-study URLs work on static hosting.

The current homepage links to the archive from its About panel. Deploy using the normal site deployment process when ready.
