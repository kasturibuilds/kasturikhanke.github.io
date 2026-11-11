# Gallery video previews

The gallery has 16 channels: the OpenAI feature, two static photographic covers, twelve looping product films or interaction studies, and the Studio offer.

Lowstakes and Sezzle remain still images pending genuine interaction recordings. Their available covers and screenshots do not provide motion footage.

## September 28 project films

All three additions are silent, 12-second MP4s with fixed framing and direct cuts. Source playback stays at its recorded speed. No new product claims or metrics were added. The older Loaders promo and all photographic covers are retained.

| Film | Edit | Output |
| --- | --- | --- |
| PDF Spaces | Workspace 2s → assistant customization 3s → share sheet 2s → permissions 1.5s → recipient experience 3.5s | `spaces-film.mp4`, 1280×720, 30 fps |
| Generative Loaders | Text 3s → inline 3s → image 3s → actual website hero with install control 3s | `loaders-film.mp4`, 1280×720, 30 fps |
| ChartKit | Existing approved Charts film: chart/theme cuts followed by the install command | `charts-film.mp4`, 1920×1080, 60 fps |

Spaces sources: `Spaces_customassistant.mov` (0–2s, 3–6s), `Spaces_sharesheet.mov` (0–2s), `Spaces_roles.mov` (0–1.5s), `Spaces_recipient_landing.mov` (3.8–7.3s), all under `public/`. Fixed crops remove recording canvas while preserving the handset and its interface. These are separate demonstrations, not one uninterrupted user session.

Loaders sources: the first 3 seconds of `text-a-fixed.mp4`, `inline-a.mp4`, `image-a-fixed.mp4`, and `hero.mp4` under `docs/media/loaders-promo/`. These are the real website captures recorded September 24. This shorter edit is now used in the gallery; `loaders-promo.mp4` retains the longer edit.

Charts source: `/Users/kasturi/Developer/Generativecharts/output/product-film-fast/generative-charts-fast-12s.mp4`, copied intact from the approved component-rendered product film. The source project retains its editable recording composition. It is not described as a browser interaction recording.

Generate missing films and posters with `node scripts/create-project-films.mjs`. Use `--rebuild` to regenerate Spaces and Loaders. On a fresh checkout without the Charts MP4, add `--charts-source /absolute/path/to/generative-charts-fast-12s.mp4`. The script does not overwrite an existing Charts edit. Temporary intermediate clips are written to a uniquely named system temp directory.

Each gallery entry uses the existing active-only loading, pause, poster fallback, and reduced-motion behavior. Revert the three slide video references in `src/ProjectGallery.jsx` to restore the previous covers/Loaders promo.

## Adobe AI Assistant proof reel

The flagship AI Assistant channel uses an 11.2-second silent proof reel assembled entirely from existing product recordings. It follows the case-study arc from awareness to understanding to activation with direct cuts and no added interface, captions, cursor effects, or fabricated behavior:

1. `PN.mov`, 0.45–1.75s — the notification arrives and settles.
2. `UA.mov`, 0.40–2.20s — the onboarding story introduces the assistant.
3. `Chatbubble.mov`, 0–1.30s — a contextual prompt appears over a document.
4. `AskAI.mov`, 0–2.00s — selected text exposes the native Ask AI action.
5. `IC.mov`, 3.55–8.35s — a quick prompt is chosen and the response begins.

Each source is cropped to remove unused recording canvas, centered on a consistent white 1280×720 stage, and played at its native speed. The edit is reproducible as `public/previews/assistant-overview.mp4`; the poster comes from the native Ask AI action at 5.6 seconds.

Seven existing product recordings show contextual text selection, onboarding, custom agents, access roles, the PDF Spaces recipient experience, the word-generator experiment, and AI Quick Prompts. They are silent, resized to 1280×720, and capped at ten seconds.

Clicky uses an actual Simulator recording of tapping its frosted keyboard, captured through Simulator's Record Screen UI. Source: `docs/media/clicky-source.mov`; the preview is cropped to the typing surface and trimmed to eight seconds.

Run `node scripts/create-gallery-videos.mjs` to generate missing outputs. Existing files are left intact. FFmpeg is required. Outputs live in `public/previews/`.

Only a selected thumbnail loads its video and plays. Leaving a channel or opening a dialog pauses it. Pause/Play applies across thumbnail channels; reduced-motion users see still posters. The OpenAI feature retains its own controls. Video errors fall back to the poster.
