# Portfolio Site — Project Spec

Personal portfolio for David Lê. Put this file at `docs/SPEC.md` in the
`portfolio` repo (a fresh repo — an earlier Create-React-App-based
portfolio repo was retired in favor of this one). It's the reference for
every Claude Code session working on this project — each session starts
fresh with no memory of past ones, so this file (plus `CLAUDE.md` at the
repo root) is what carries context forward.

## Vision

A traditional one-page portfolio: a single scrolling page with anchor-linked
sections, not a pannable/zoomable canvas (that direction was explored and
dropped — see "Superseded decisions" below). It keeps the bullet-journal
aesthetic throughout.

**Palette:** paper white as the base, with a dot grid in Bauhaus red —
matching the red dot grid of the Leuchtturm1917 Bauhaus Edition notebook —
and blue and yellow as highlight/accent colors. This red/blue/yellow triad
is a deliberate bridge between both schools, not just a Bauhaus reference:
it's the primary color triad from Bauhaus color pedagogy itself (Itten/
Kandinsky — red, yellow, blue as the foundational hues taught at the
Bauhaus, which Bauhaus-Universität Weimar's visual identity still traces
back to), and it happens to overlap naturally with Georgia Tech's palette —
GT's accent gold ("Buzz," `#EAAA00`) sits close enough to a Bauhaus yellow
that one accent color can honor both schools instead of picking a side. GT
Navy (`#051E39`) is a candidate for the dark-mode background (see Theming),
so the two schools show up as a considered color choice rather than a
literal team-colors mashup.

**Dark/light mode:** user-switchable, defaulting to system preference.

**Content containers:** page content — photos, embedded prototypes/videos,
body text — sits inside "glass" panels: a frosted, blurred, semi-transparent
card treatment that softens the dot grid behind it so the grid reads as
texture rather than noise, without hiding the content.

**Sections (page order):**
- **Hero/intro** — "Hi, my name is David," name rendered in a Vietnamese-
  calligraphy-inspired flowing style (planned as a custom illustrated PNG,
  not a web font), a byline ("M.Sc. HCI Graduate based in Berlin, Germany" —
  placeholder, may change), nav links to About / Work / Contact, and two
  project thumbnails (ChoreoMapper, Dabble) directly beneath the byline for
  one-click access into their case studies.
- **About**
- **Work** — a fuller project section; the two flagship case studies may be
  repeated here alongside anything else David wants to list (open design
  decision, see below).
- **Contact**
- **Stickers** — the currently-listening music widget, currently-reading
  book/reading list, and illustrated hobby stickers (pole dance, bouldering,
  crochet) live within the page layout now (a dedicated area, a sidebar, or
  scattered with a bit of playful rotation inside sections) rather than
  scattered across an infinite canvas. Hobby stickers may eventually also
  "turn the page" into more detail, same pattern as the case studies.

**Case studies remain the one exception to the single page.** Clicking a
thumbnail/"Learn more" for ChoreoMapper or Dabble still triggers a "turn the
page" transition out of the one-pager into a dedicated case study view.
Pressing back, or clicking the "David Lê" signature (styled as a sticker,
same calligraphy style as the name), returns to the page via the same
transition in reverse.

**Source content to port:**
- ChoreoMapper: https://ledavid.framer.website/work/choreomapper
- Dabble (live app): https://davidhle.github.io/dabble

### Superseded decisions

An earlier version of this spec scoped an infinite pannable/zoomable canvas
(Prezi-style) as the navigation model, with `react-zoom-pan-pinch` driving
pan/gesture handling and sections positioned as nodes in canvas space. That
direction is dropped in favor of the one-page layout above — noted here so
a Claude Code session doesn't resurrect canvas-engine code from an earlier
commit or conversation.

## Open design decisions

Flagging these rather than silently picking one, since they shape layout
work directly:

- **Exact hex values for paper white / Bauhaus red / blue / yellow** below
  are a reasonable starting palette, not confirmed against the actual
  notebook or a swatch. Treat them as placeholders to refine once David can
  compare against the physical journal or a proper photo of its dot grid
  and cover.
- **Where the case study thumbnails live** — hero only, or hero + repeated
  in the Work section. Default below is hero-only for Milestone 1, with
  Work holding a fuller project list later; revisit once there's real
  content to arrange.
- **Header/display font — decided: Unbounded.** See Typography below.

## Typography

**Header/display font: Unbounded** (Google Fonts, free, variable weight
100–900). Matches the blocky, geometric, poster-like feel David liked in
the reference image's "CANCER" wordmark (that image was used only for its
font style — its moondust/daybreak/pebble/seaglass/harbor-night color
palette is not part of this project's palette). Use Unbounded for section
headers (About, Work, Contact), the nav, and any display-scale type; the
"David"/"David Lê" name treatment stays a custom illustrated PNG, not a web
font, so Unbounded doesn't need to carry that part.

**Body font: Inter** (Google Fonts, free, variable weight). Chosen to pair
with Unbounded rather than compete with it — Unbounded is heavy and
geometric, so body copy needs to be quiet and highly legible at small sizes
inside the glass cards. Inter is a neutral, widely-used grotesque with
excellent legibility across weights, a large x-height that holds up at
small sizes, and full language coverage (useful given David's name carries
a Vietnamese diacritic and he may want Vietnamese text elsewhere). If
Unbounded's coverage of accented/Vietnamese characters ever matters for a
header, double-check glyph support before relying on it — Inter can serve
as the fallback there too.

Both are free, self-hostable, and available via Google Fonts — no licensing
decision needed before Milestone 1.

## Tech stack decisions

- **Vite + React + TypeScript**, scaffolded fresh in the new `portfolio`
  repo (the old Create React App-based repo has been retired — CRA was
  officially sunset by the React team in Feb 2025). Not Next.js — there's
  no dynamic data/SSR need, so Next's routing/server machinery isn't worth
  the complexity for incremental builds.
- **No pan/zoom library needed** — the canvas-engine direction is dropped
  (see Superseded decisions). Layout is standard CSS Grid/Flexbox with
  native anchor-link navigation and smooth scrolling (`scroll-behavior:
  smooth`, or a small scroll-spy for highlighting the active nav link).
- **Theming:** CSS custom properties for every color token, swapped via a
  `data-theme="light" | "dark"` attribute on `<html>`. Default from
  `prefers-color-scheme`, with the user's explicit toggle choice persisted
  (e.g., `localStorage`) and taking precedence on return visits.
- **Glassmorphism:** a shared `GlassCard` component using `backdrop-filter:
  blur(...)` over a semi-transparent background, subtle border and shadow.
  Needs a solid-background fallback (`@supports not (backdrop-filter:
  blur(1px))`) for the rare browser without support.
- **Transitions:** native View Transitions API (broadly supported across
  major browsers as of 2026) drives the Work-section ↔ case-study "page
  turn," layered with a custom CSS 3D effect (`perspective` + `rotateY`)
  for the literal paper-curl look. Build the simple version first
  (crossfade/morph via `view-transition-name` on the thumbnail); treat the
  full page-curl physics as a later polish pass.
- **Framer Motion** for supporting UI animation (scroll-reveal, hover
  states) as needed.
- **Deployment:** GitHub Pages or Vercel (static site, no backend needed for
  Milestone 1).

## Architecture

- **Section components.** Hero, About, Work, Contact, and the sticker area
  are each their own component, composed on one page.
- **`GlassCard` as a shared primitive.** Since nearly every piece of content
  sits inside a glass panel, build this early and reuse it everywhere
  rather than letting each section reimplement the blur/border/shadow
  treatment.
- **Design tokens file** drives color (paper white / Bauhaus red / blue /
  yellow accents, plus light and dark variants of each), typography, and
  the dot-grid background (a repeating CSS `radial-gradient`, not an image,
  recolored per theme — full Bauhaus red in light mode, a dimmed/
  desaturated variant in dark mode so it recedes rather than fighting the
  content).
- **Case study content** (ChoreoMapper, Dabble) as structured MDX/JSON, kept
  separate from layout/presentation components.
- **Stickers** share a common wrapper component (tilt, shadow, washi-tape
  styling) and differ only in content/data.

## Working conventions

- Build each milestone on its own branch (e.g., `milestone-1-one-page-shell`),
  merge to `main` only once it's in a deployable/demo-able state. `main`
  should always be safe to point people at, since the deployed link gets
  shared as work-in-progress.
- Prefer small, reviewable diffs per session; check in before big structural
  decisions (folder layout, deployment target, new dependencies, and the
  open design decisions above) when more than one reasonable option exists.

## Roadmap

### Milestone 1 — Static one-page shell *(current)*

1. Scaffold a fresh Vite + React + TypeScript project in the `portfolio`
   repo (skip if already done).
2. Design tokens file: color palette (paper white, Bauhaus red, blue and
   yellow accents) with light/dark variants, plus the dot-grid CSS
   background that recolors per theme.
3. `GlassCard` component (frosted/blurred container), built first since
   every section uses it.
4. Dark/light toggle wired up: defaults to system preference, persists the
   user's explicit choice, swaps the `data-theme` attribute.
5. Hero section: placeholder name treatment (plain styled text is fine
   before the final calligraphy illustration exists), byline set in Inter,
   nav links and section headers set in Unbounded, and two static
   project-thumbnail placeholders (ChoreoMapper, Dabble) beneath the
   byline. Thumbnails are visual placement only at this stage — they
   become clickable once the page-turn transition and real case study
   content are wired up in Milestone 3.
6. About / Work / Contact sections as placeholder content inside
   `GlassCard`s, with working anchor-link nav and smooth scroll between
   them.
7. Deployed to GitHub Pages or Vercel for a shareable, iterable link.

**Done when:** the deployed site shows hero → about → work → contact as one
scrolling page; the Bauhaus-red dot grid is visible and recedes properly
behind glass cards; the dark/light toggle works and persists; nav links
smooth-scroll to each section; the two project thumbnails are visible
beneath the byline (not yet interactive).

### Milestone 2 — Real content + static stickers

- Real About/Contact/Work copy.
- Static (non-interactive yet) sticker widgets: music, reading, hobby icons,
  placed within the layout.
- Palette hex values confirmed against the actual notebook/swatch
  (typography is already decided — Unbounded + Inter, see Typography above).

### Milestone 3 — Case studies + page-turn transition

- Dedicated case-study views for ChoreoMapper and Dabble, content ported
  from the source links above.
- Wire up the hero thumbnails placed in Milestone 1 (and any thumbnail in
  the Work section) so clicking either triggers the transition into its
  case study.
- Page-turn transition: start with a View-Transitions-driven crossfade/
  morph from the thumbnail; refine toward the full 3D page-curl once the
  pattern works end-to-end.
- Back navigation / signature-click returns to the page via the same
  transition in reverse.

### Milestone 4 — Interactive stickers + live data

- Hobby stickers become clickable, reusing the case-study "turn the page"
  pattern for hobby detail views.
- Currently-listening / currently-reading widgets wired to live data. This
  likely needs a small serverless function (Spotify/Last.fm API, Goodreads/
  StoryGraph, or a manually-updated JSON file) — scope as its own sub-task.