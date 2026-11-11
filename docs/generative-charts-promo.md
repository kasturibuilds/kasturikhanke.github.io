# Generative Charts site reel

A silent 15-second reel captured directly from `https://generativecharts.com/`. Dark mode stays enabled throughout. The existing site layout, data, chart components, and animations are preserved. There are no added titles, recreated charts, illustrations, transitions, or audio.

## Deliverables

- `docs/media/charts-site-reel/generative-charts-site-15s.mp4`: native 3840 × 2160 / 60 fps master; no audio stream.
- `public/previews/charts-film.mp4`: 2560 × 1440 / 60 fps web export, H.264 CRF 15, Lanczos downsample, fast-start MP4.
- `public/previews/charts-film.jpg`: poster captured from the site's pie chart gallery.
- `public/previews/charts-preview.mp4` and `.jpg`: matching copies for existing compact-preview links.
- `docs/media/charts-site-reel/capture-manifest.json`: source, timestamp, shot timings, and sampled browser state.

The portfolio grid and expanded view both use `charts-film`, with cache version `actual-site-dark-v1` for video and poster.

## Shot list

| Time | Actual site view | Chart style |
| --- | --- | --- |
| 0–1s | Homepage, install command, initial bar gallery | Mono Editorial |
| 1–2.5s | Ranked and vertical bars | Mono Editorial |
| 2.5–4.25s | Smooth and straight lines | Neon Instruments |
| 4.25–5.75s | Single and multiple area charts | Airform |
| 5.75–7.5s | Donut and pie charts | Neon Instruments |
| 7.5–9s | Activity and intensity heatmaps | Neon Instruments |
| 9–10.75s | Wireframe and point-cloud terrain | Airform |
| 10.75–12s | Progress rings and gauge | Neon Instruments |
| 12–13.5s | Single and comparison radar charts | Mono Editorial |
| 13.5–15s | Sankey visitor flow | Airform |

Each gallery view is selected using the site's existing controls, which replay its animations. The framing retains those controls and the actual charts. Shots are joined with direct cuts.

## Rebuild

```sh
node scripts/capture-charts-site-reel.mjs --stills
node scripts/capture-charts-site-reel.mjs
```

Also supported: `node scripts/create-project-films.mjs --rebuild --only=charts-film`.

Requires Playwright Chromium, Node, FFmpeg, and access to the live site. Capture uses a 1280 × 720 viewport at device pixel ratio 3, lossless PNG frames, and the site's own CSS/WAAPI animations synchronized with browser timers at 60 fps. Each export contains 900 video frames.
