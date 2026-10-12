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
  not a web font), and a byline ("M.Sc. HCI Graduate based in Berlin,
  Germany" — placeholder, may change). No project cards in the hero itself
  (superseded — see "Open design decisions"); the hero's job is the intro,
  Work is where all projects live. A placeholder portrait sits to the right
  of the hero text, inside an organic horizontal-oblong shape (an
  asymmetric, flowing blob outline — not a simple ellipse/circle — per
  David's reference image; a CSS `border-radius` blob or SVG `clip-path`
  both work, precision isn't critical for the placeholder).
- **About**
- **Work** — the project grid: four cards today (ChoreoMapper, Dabble,
  A Robot, Hey Siri), each leading into its own case study via the
  page-turn transition. See "Work section layout" below for the responsive
  behavior.
- **CV** *(renamed from "Contact")* — CV content (education, career), with
  contact links (LinkedIn, GitHub) as icons at the bottom of the section.
  See "CV content" below for the actual copy.
- **Stickers** — the currently-listening music widget, currently-reading
  book/reading list, and illustrated hobby stickers (pole dance, bouldering,
  crochet) live within the page layout now (a dedicated area, a sidebar, or
  scattered with a bit of playful rotation inside sections) rather than
  scattered across an infinite canvas. Hobby stickers may eventually also
  "turn the page" into more detail, same pattern as the case studies.

**Case studies remain the one exception to the single page.** Clicking a
project card in Work triggers a "turn the page" transition out of the
one-pager into a dedicated case study view. Pressing back, or clicking the
"David Lê" signature (styled as a sticker, same calligraphy style as the
name), returns to the page via the same transition in reverse.

**Case study internal navigation:** once inside a case study, a secondary
nav layer — styled like an outline/table of contents (think Word/Google
Docs heading navigator) — appears hierarchically below the main site nav
and lists that case study's own sections/headings for quick in-page
jumping. See "Navigation" below.

**Source content to port:**
- ChoreoMapper — copy finalized, ready to port now (text only; the source
  page has images/other media to bring over later):
  https://ledavid.framer.website/work/choreomapper
- Hey Siri — copy finalized, ready to port now (text only for now):
  https://ledavid.framer.website/work/voice
- Dabble (live app) — copy status not yet confirmed:
  https://davidhle.github.io/dabble
- A Robot — copy status not yet confirmed, no source link given yet.

### Navigation

Main nav is fixed to the left edge of the viewport (in the left padding/
margin area), not a conventional top navbar. Visual treatment: each nav
item reads as an annotation tab or sticky note — the kind of paper flag
you'd stick on a book or journal page edge to bookmark a section — in
keeping with the bullet-journal aesthetic. Stays fixed/visible while
scrolling the one-pager.

When a case study is open, a second nav layer appears hierarchically below
the main left-edge nav: an outline/table-of-contents of that case study's
own sections/headings (same idea as Word's or Google Docs' heading
navigator), letting the reader jump within the case study rather than
scrolling through it linearly. This outline is specific to the case study
view and goes away when the reader returns to the one-pager.

### Work section layout

Four project cards today (ChoreoMapper, Dabble, A Robot, Hey Siri), laid
out as a responsive grid, not a carousel:
- Full-width desktop: one row of 4.
- Mid-width: 2×2.
- Narrow/mobile: a single column, one card per row (4 rows of 1).
- Side padding sized so the breakpoint above actually fits 4 cards in one
  row at typical desktop widths, rather than wrapping prematurely.

**Why a grid over a carousel:** with a small, fixed number of items (4),
a grid keeps every project visible without requiring an interaction, which
matters for a portfolio where the goal is a recruiter or collaborator
seeing all the work at a glance. Carousels solve a real problem when there
are more items than fit in a view, but research on rotating carousels
(e.g. Yale's usability guidance, and the broader "nobody clicks past slide
one" findings common in carousel UX writing) consistently shows low
engagement with anything past the first visible item — a real cost for a
portfolio where every project should get equal visibility. A carousel is
worth reconsidering later if the project count grows enough that a grid
stops fitting comfortably, but isn't the right call at 4 items.

### Layout

All section content (hero, about, work, CV) shares one left alignment,
matching the Work section's existing left edge — the Milestone 1 build had
About/CV content inset further right than Work, which reads as
inconsistent; fix by aligning every section's content block to the same
left margin Work already uses.

### CV content

Real copy, ready to use as-is (not a placeholder):

```
EDUCATION
(2020–2025) M.Sc. Human-Computer Interaction
Bauhaus-Universität Weimar, Weimar, Germany

(2021–2022) M.Sc. Media & Human-Centered Computing (Erasmus)
Technische Universität Wien, Vienna, Austria

(2015–2020) B.Sc. Computational Media
Georgia Institute of Technology, Atlanta, USA

(2019) Bachelor in Film, Television & Media Studies (Erasmus)
Universidad Carlos III Madrid, Getafe, Spain

(2017) Faculty-Led Undergraduate Summer Program
Universitat Politècnica de Catalunya, Barcelona, Spain

CAREER
(2022–2023) HCI Research Intern
Ex)Situ, Université Paris-Saclay, Paris, France

(2019) Program Manager Intern
Microsoft, Redmond, Washington, USA

(2018) Strategic Solutions Engineer Intern
Zuora, Atlanta, Georgia, USA

(2017) Software Engineer Intern
CareerBuilder, Norcross, Georgia, USA
```

Contact links at the bottom of the section, as icons:
- LinkedIn: https://www.linkedin.com/in/davidle97/
- GitHub: https://github.com/davidhle

### Accessibility note — nav contrast

The Work nav tab's text should be white; check actual contrast against the
current yellow background and darken the yellow (just enough to pass WCAG
AA, ~4.5:1 for normal-size text) if white doesn't read cleanly. The yellow
is a shared design token used elsewhere in the palette, so confirm a
darkened value still works everywhere else it's used before changing it
globally — introduce a separate token instead if other uses would suffer.

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
- **Light-mode dot-grid opacity** needs a specific value — see Architecture
  above.
- **Copy status for Dabble and A Robot** isn't confirmed (ChoreoMapper and
  Hey Siri are ready — see Vision → Source content to port). A Robot also
  has no source link yet.
- **Sticky-note nav visual details** (exact shape/texture of the tabs,
  spacing, active-state styling) aren't specified beyond the "annotation
  tab on a book/journal edge" direction in Navigation above — there's room
  for a few rounds of visual iteration here.
- **Header/display font — decided: Unbounded.** Body font — decided: Sora.
  See Typography below.

## Typography

**Header/display font: Unbounded** (Google Fonts, free, variable weight
100–900). Matches the blocky, geometric, poster-like feel David liked in
the reference image's "CANCER" wordmark (that image was used only for its
font style — its moondust/daybreak/pebble/seaglass/harbor-night color
palette is not part of this project's palette). Use Unbounded for section
headers (About, Work, Contact), the nav, and any display-scale type; the
"David"/"David Lê" name treatment stays a custom illustrated PNG, not a web
font, so Unbounded doesn't need to carry that part.

**Body font: Sora** (Google Fonts, free, variable weight) — David's pick
over the earlier Inter suggestion, to pair with Unbounded. Sora is a
rounded-geometric grotesque, which reads as more of a family resemblance to
Unbounded's own geometric construction than a neutral default like Inter
would, while staying calmer and lighter-weight so it doesn't compete at
body size inside the glass cards. If a Vietnamese word ever needs to appear
in a header or body copy, double-check Sora's and Unbounded's accented-
character glyph coverage before relying on either — this wasn't confirmed
and a fallback stack may be needed for full diacritic support.

Both are free, self-hostable, and available via Google Fonts — no licensing
decision needed.

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
- **Deployment: Cloudflare Pages**, connected to the `portfolio` GitHub
  repo for continuous deployment (auto-build on every push to `main`).
  Chosen over GitHub Pages/Vercel because the domain (`ledavid.me`) is
  already on Cloudflare — Pages can attach it with auto-managed DNS and
  free SSL, no cross-service DNS configuration needed. Build command
  `npm run build` (Vite default), output directory `dist`. Needs a
  `public/_redirects` file with `/* /index.html 200` for SPA fallback
  routing (so direct links to case-study routes like `/work/choreomapper`
  don't 404 on refresh).

## Architecture

- **Section components.** Hero, About, Work, CV, and the sticker area are
  each their own component, composed on one page.
- **`GlassCard` as a shared primitive.** Since nearly every piece of content
  sits inside a glass panel, build this early and reuse it everywhere
  rather than letting each section reimplement the blur/border/shadow
  treatment.
- **Design tokens file** drives color (paper white / Bauhaus red / blue /
  yellow accents, plus light and dark variants of each), typography, and
  the dot-grid background (a repeating CSS `radial-gradient`, not an image,
  recolored per theme). In light mode the dots were too strong against
  body text in the Milestone 1 build and need a lower opacity (reduce until
  text reads cleanly over them — no confirmed value yet, tune by eye). Dark
  mode already uses a dimmed/desaturated variant so it recedes rather than
  fighting the content; re-check it once light mode's opacity is fixed, in
  case the two need different treatment.
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
   before the final calligraphy illustration exists), byline set in Sora,
   nav and section headers set in Unbounded.
6. About / Work / Contact sections as placeholder content inside
   `GlassCard`s, with working anchor-link nav and smooth scroll between
   them.
7. Deployed to GitHub Pages or Vercel for a shareable, iterable link.

**Done when:** the deployed site shows hero → about → work → contact as one
scrolling page; the Bauhaus-red dot grid is visible and recedes properly
behind glass cards (shipped, but light-mode opacity needs the tune-down
noted in Architecture above); the dark/light toggle works and persists; nav
links smooth-scroll to each section. *(Status: shipped — David's first look
is in, see the polish/follow-on items layered on top in Open design
decisions and Milestone 3.)*

### Milestone 2 — Real content + static stickers

- Real About/Contact/Work copy.
- Static (non-interactive yet) sticker widgets: music, reading, hobby icons,
  placed within the layout.
- Palette hex values confirmed against the actual notebook/swatch
  (typography is already decided — Unbounded + Inter, see Typography above).

### Milestone 3 — Case studies + page-turn transition

- Dedicated case-study view template, with ChoreoMapper and Hey Siri
  content ported first (copy is finalized for both — text only; images and
  other media come later). Dabble and A Robot follow once their copy is
  ready.
- Wire up the Work section's four project cards so clicking one triggers
  the transition into its case study (only ChoreoMapper and Hey Siri will
  have real destinations until the other two have content — Dabble/A Robot
  cards can stay visually present but inert, or get a "coming soon" state,
  until then).
- In-case-study outline/TOC nav: a secondary nav layer, generated from that
  case study's own section headings, appearing hierarchically below the
  main left-edge nav (see Navigation above) for jumping within the case
  study.
- Page-turn transition: start with a View-Transitions-driven crossfade/
  morph from the card; refine toward the full 3D page-curl once the
  pattern works end-to-end.
- Back navigation / signature-click returns to the page via the same
  transition in reverse.

### Milestone 4 — Interactive stickers + live data

- Hobby stickers become clickable, reusing the case-study "turn the page"
  pattern for hobby detail views.
- Currently-listening / currently-reading widgets wired to live data. This
  likely needs a small serverless function (Spotify/Last.fm API, Goodreads/
  StoryGraph, or a manually-updated JSON file) — scope as its own sub-task.