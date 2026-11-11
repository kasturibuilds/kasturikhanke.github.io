# Generative Loaders site reel

The current reel is a **silent, dark-mode-only, 15-second recording of the actual generativeloaders.com website**, captured October 7, 2026 (America/Los_Angeles). It shows the existing site, components, text, images, and styles. No added title cards, illustrations, reconstructed loader animations, or sound.

## Files

- `docs/media/loaders-site-reel/generative-loaders-site-15s.mp4`: native 3840 × 2160 / 60 fps master, with no audio stream.
- `public/previews/loaders-film.mp4`: 2560 × 1440 / 60 fps web copy, downsampled from the master with Lanczos; H.264 CRF 15 and fast-start metadata.
- `public/previews/loaders-film.jpg`: actual website poster.
- `public/previews/loaders-promo.mp4` and `.jpg`: matching copies for the older standalone links.
- `docs/media/loaders-site-reel/capture-manifest.json`: source URL, capture timestamp, scene timing, and sampled browser states.

Both the portfolio grid and expanded view use `loaders-film` with the `actual-site-dark-v2` cache version.

## Sequence

| Time | Actual site view |
| --- | --- |
| 0–1s | Homepage, install command, and running text demos. |
| 1–3.5s | Text loaders 01–08. |
| 3.5–4.5s | Text loaders 09–16. |
| 4.5–5.5s | Inline loaders 01–09, using the site's dark mode. |
| 5.5–6.5s | Inline loaders 10–18. |
| 6.5–9.25s | Image loaders 01–08, from loading through the site's original photo reveals. |
| 9.25–12s | Image loaders 05–12, including Raster, Bloom, Focus, and Shutter. |
| 12–15s | The site's In Use → Chat demo, streaming the original response with Cascade. |

The image and chat shots use the site's own 1.5× playback control. Dark mode remains enabled for every shot, including the homepage and chat. Editing uses direct cuts between views. No synthetic cursor, graphics, or overlays are added.

## Rebuild

```sh
node scripts/capture-loaders-site-reel.mjs --stills
node scripts/capture-loaders-site-reel.mjs
```

The existing `node scripts/create-project-films.mjs --rebuild --only=loaders-film` command invokes this capture script too. Requires local Playwright Chromium, FFmpeg, Node, and access to the site.

Capture uses a 1280 × 720 browser viewport at device pixel ratio 3. Each of 900 frames is captured as a lossless PNG before encoding. Browser timers and the site's existing CSS/WAAPI animations are advanced together at 60 fps, so capture speed does not alter the animations. The site itself is not edited.

Legacy September screen recordings under `docs/media/loaders-promo/` remain archival sources and are not used for this reel.

Validation: both exports contain exactly 900 video frames / 15.000 seconds, with no audio stream, and decode without errors. The production build passes. Capture completed with no page errors; the final chat sample contains the complete original response. All sampled scenes, including the homepage and chat, are confirmed in dark mode. The web copy is approximately 2.6 MB.
