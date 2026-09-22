# Portfolio Site — Project Spec

Personal portfolio for David Lê. Put this file at `docs/SPEC.md` in the repo.
It's the reference for every Claude Code session working on this project —
each session starts fresh with no memory of past ones, so this file (plus
`CLAUDE.md` at the repo root) is what carries context forward.

## Vision

The site is a single infinite, pannable/zoomable canvas styled like a bullet
journal — specifically inspired by the Leuchtturm1917 Bauhaus Edition
notebook: blue binding, red dots, red sprayed edges, paper-white pages.
Palette: paper white + red + blue as the main colors, yellow as a
highlight/accent.

Instead of traditional pages, different sections of the site live at
different positions on one big canvas. Navigating means panning/zooming to a
position, not loading a new page.

**Home / default state:** an intro reading "Hi, my name is David," with the
name rendered in a Vietnamese-calligraphy-inspired flowing style (planned as
a custom illustrated PNG, not a web font). Below it, a byline
("M.Sc. HCI Graduate based in Berlin, Germany" — placeholder, may change) and
three nav buttons — About Me, My Work, Contact — each pans/zooms to a
different part of the canvas.

Directly beneath the byline, two project thumbnails (ChoreoMapper and
Dabble) give immediate access to their case studies — clicking either
triggers the page-turn transition straight from the landing state, without
needing to pan to the Work section first. The My Work nav button still pans
to a broader work/projects area of the canvas, for anything beyond these two
flagship case studies.

**Case studies (the one exception to staying on-canvas):** two projects —
ChoreoMapper (master's thesis) and Dabble (personal web app) — are full case
studies. Clicking a thumbnail/"Learn more" for either triggers a "turn the
page" transition that takes the user OUT of the pannable canvas into a
dedicated case study view. Pressing back, or clicking the "David Lê"
signature (styled as a sticker, same calligraphy style as the name), returns
to the home canvas via the same transition in reverse.

**Source content to port:**
- ChoreoMapper: https://ledavid.framer.website/work/choreomapper
- Dabble (live app): https://davidhle.github.io/dabble

**Scattered "sticker" elements on the main canvas** (later milestones):
a currently-listening music widget, a currently-reading book + reading list,
and illustrated stickers for other hobbies (pole dance, bouldering, crochet)
that may eventually also "turn the page" into more detail, following the
same pattern as the case studies.

## Tech stack decisions

- **Vite + React + TypeScript**, scaffolded fresh in a new `portfolio` repo
  (the old Create React App-based repo has been retired — CRA was
  officially sunset by the React team in Feb 2025). Not Next.js either —
  there's no dynamic data/SSR need here, just one client-side interactive
  canvas plus two case-study views, so Next's routing/server machinery
  isn't worth the complexity for incremental builds.
- **Astro is an accepted future option**, not part of Milestone 1. If
  per-route SEO / social-preview metadata for the case studies becomes a
  priority later, the shell can move to Astro with the canvas mounted as a
  React island. Don't make this switch until the interaction model is
  proven on Vite.
- **Canvas engine: `react-zoom-pan-pinch`.** The canvas content is real UI
  (buttons, images, widgets), not painted graphics, so it's built as
  absolutely-positioned DOM elements inside a transformed coordinate space —
  not `<canvas>` or WebGL. This library handles wheel zoom, trackpad pinch,
  double-click zoom, pan, bounds, and exposes an imperative API
  (`zoomToElement` / `setTransform`) for animating the viewport to a named
  node, which is how nav buttons will work.
- **Transitions: native View Transitions API** (broadly supported across
  major browsers as of 2026) drives the canvas ↔ case-study "page turn,"
  layered with a custom CSS 3D effect (`perspective` + `rotateY`) for the
  literal paper-curl look. Build the simple version first (crossfade/morph
  via `view-transition-name` on the thumbnail); treat the full page-curl
  physics as a later polish pass, not a Milestone 1 blocker.
- **Framer Motion** for any supporting UI animation as needed.
- **Deployment:** GitHub Pages or Vercel (static site, no backend needed for
  Milestone 1).

## Interaction model — pan & zoom

- Plain scroll / two-finger trackpad drag → **pan** the canvas.
- Ctrl/Cmd + scroll, or trackpad pinch → **zoom**. (Browsers emit trackpad
  pinch as a `wheel` event with `ctrlKey: true`, so one handler covers both
  trackpad pinch and mouse-with-modifier — no separate code paths needed.)
- A visible zoom control (+/-, styled as a ruler/protractor "sticker") is
  included regardless, both for discoverability on mouse-only setups and as
  an accessible fallback.
- Double-click on empty canvas → step-zoom in. Double-click on a nav
  target/sticker → pan+zoom to it instead (stop propagation so it doesn't
  also trigger the generic zoom).
- Nav buttons animate the viewport to a named canvas node via the library's
  imperative API.

## Architecture

- **Engine/content separation.** Pan-zoom mechanics, the coordinate system,
  and "navigate to node" logic live in a self-contained module that knows
  nothing about what's being rendered.
- **Canvas content as data.** Sections/stickers are defined as an array of
  `{ id, position: { x, y }, size, component }` entries. Adding a new
  section or sticker later should mean adding a data entry, not touching
  canvas logic.
- **Design tokens file.** Colors (paper white, red, blue, yellow accent),
  typography, and the dot-grid background (a repeating CSS
  `radial-gradient`, not an image, so it tiles across an arbitrarily large
  canvas for free). Every component references tokens.
- **Case study content** (ChoreoMapper, Dabble) as structured MDX/JSON, kept
  separate from layout/presentation components.
- **Stickers** share a common wrapper component (tilt, shadow, washi-tape
  styling) and differ only in content/data.

## Working conventions

- Build each milestone on its own branch (e.g., `milestone-1-canvas-foundation`),
  merge to `main` only once it's in a deployable/demo-able state. `main`
  should always be safe to point people at, since the deployed link gets
  shared as work-in-progress.
- Prefer small, reviewable diffs per session; check in before big structural
  decisions (folder layout, deployment target, new dependencies) when more
  than one reasonable option exists.

## Roadmap

### Milestone 1 — Static journal shell + basic pannable canvas *(current)*

1. Scaffold a fresh Vite + React + TypeScript project in the new
   `portfolio` repo.
2. Design tokens file (paper white / red / blue / yellow-accent palette,
   typography) and a dot-grid CSS background that tiles across the canvas.
3. Static intro view: placeholder name treatment (plain styled text is fine
   before the final calligraphy illustration exists), byline, three nav
   buttons (About Me / My Work / Contact), and two static project-thumbnail
   placeholders (ChoreoMapper, Dabble) directly beneath the byline. The
   thumbnails are visual placement only at this stage — they become
   clickable once the page-turn transition and real case study content are
   wired up in Milestone 3.
4. `react-zoom-pan-pinch` wired up with three placeholder content nodes
   (About, Work, Contact) at fixed canvas coordinates. Nav buttons animate
   the viewport to their corresponding node.
5. Interaction model implemented as specified above (pan on scroll, zoom on
   ctrl/cmd+scroll or pinch, visible zoom control).
6. Deployed to GitHub Pages or Vercel for a shareable, iterable link.

**Done when:** the deployed site shows the intro state, including the two
project thumbnails beneath the byline (not yet interactive); each nav
button smoothly pans/zooms to a distinct placeholder section; scroll pans;
ctrl+scroll or trackpad pinch zooms; the visible zoom control also works.

### Milestone 2 — Real content + static stickers

- Real About/Contact content.
- Static (non-interactive yet) sticker widgets on the canvas: music,
  reading, hobby icons.
- Zoom/pan UX polish based on how Milestone 1 actually feels.

### Milestone 3 — Case studies + page-turn transition

- Dedicated case-study views for ChoreoMapper and Dabble, content ported
  from the source links above.
- Wire up the landing-page thumbnails placed in Milestone 1 (and any
  thumbnail reached via the My Work canvas section) so clicking either
  triggers the transition into its case study.
- Page-turn transition: start with a View-Transitions-driven crossfade/morph
  from the thumbnail; refine toward the full 3D page-curl once the pattern
  works end-to-end.
- Back navigation / signature-click returns to the canvas via the same
  transition in reverse.

### Milestone 4 — Interactive stickers + live data

- Hobby stickers become clickable, reusing the case-study "turn the page"
  pattern for hobby detail views.
- Currently-listening / currently-reading widgets wired to live data.
  This likely needs a small serverless function (Spotify/Last.fm API,
  Goodreads/StoryGraph, or a manually-updated JSON file) — scope as its own
  sub-task, independent of the canvas milestones.
