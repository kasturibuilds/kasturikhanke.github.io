# Gallery video quality

Updated October 7, 2026. Gallery URLs use `quality-v2` to invalidate cached previews, except Generative Loaders (`actual-site-dark-v2`) and Generative Charts (`actual-site-dark-v1`), which version both video and poster.

- Adobe phone demos: rebuilt from original MOV recordings at 2560×1440, 60 fps, H.264 CRF 17 with Lanczos scaling. Percentage-based handset masks and framing remain unchanged.
- Word Generator: 1920×1080, 60 fps, CRF 17 from its original recording.
- Clicky: 1920×1080, CRF 17, original keyboard crop. Trim starts at 9.88 seconds, where actual typing begins. The source has only ten frames across 13.26 seconds; the 30 fps export repeats those captured frames and does not create additional motion detail. A fresh recording is needed for fluid typing.
- Charts: new silent 15-second reel of the actual site, entirely in dark mode, captured at native 3840×2160 / 60 fps. The 2560×1440 web export uses Lanczos downsampling and CRF 15. Covers nine chart families and all three themes. Both grid and expanded views use it; see `docs/generative-charts-promo.md`.
- Loaders: a silent, dark-mode-only 15-second reel of the actual live site, captured at native 3840×2160, 60 fps. The web version is a 2560×1440 Lanczos downsample at CRF 15. Both the grid and expanded view use it. The master is in `docs/media/loaders-site-reel/`; see `docs/generative-loaders-promo.md` for the shot list and capture script. No added audio, illustrations, or reconstructed animations. Legacy 720p recordings are not used.
- OpenAI: existing remote LinkedIn 1280×720 film; no higher-resolution source is available in this repository.
- Generated demo posters use high-quality JPEG encoding.

Rebuild the source demos: `node scripts/create-gallery-videos.mjs --rebuild`.
Rebuild only the Loaders film: `node scripts/create-project-films.mjs --rebuild --only=loaders-film`.

Validation: full decode checks for all ten local demo assets, browser decoded dimensions, handset masking, gallery link destinations, and production build.
