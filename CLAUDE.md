# CLAUDE.md

This is David's personal portfolio site (a fresh repo — an earlier
Create-React-App-based portfolio repo was retired in favor of this one): a
one-page scrolling portfolio styled like a bullet journal (Leuchtturm1917
Bauhaus Edition — paper white background, a dot grid in Bauhaus red, blue
and yellow as accent colors), with dark/light mode and glassmorphism
("glass" blurred) cards holding photos, embedded prototypes/videos, and
body text. Main nav is fixed to the left edge, styled like sticky-note/
annotation tabs. Four projects (ChoreoMapper, Dabble, A Robot, Hey Siri)
sit in a responsive Work-section grid (1 row of 4 → 2×2 → 4×1, not a
carousel); each breaks out of the one-pager into a dedicated case study
view via a "turn the page" transition, with an in-page outline/TOC nav for
jumping within the case study once inside one. The old "Contact" section is
now "CV" — education/career copy plus LinkedIn/GitHub icons at the bottom.

**Read `docs/SPEC.md` before starting any work in this repo.** It has the
full vision, tech stack decisions, typography/palette notes, architecture,
and milestone roadmap. This file is just a pointer to it.

Note: an earlier version of this project was scoped as an infinite
pannable/zoomable canvas. That direction was dropped for a standard
one-page layout — see `docs/SPEC.md` → "Superseded decisions" — so don't
reintroduce canvas-engine code (`react-zoom-pan-pinch`, pan/zoom gesture
handling) from an earlier commit or conversation.

## Current status

Milestone 1 (static one-page shell) shipped. Working through a round of
polish plus pulled-forward Milestone 3 work:
- Light-mode dot-grid opacity needs lowering (text legibility).
- Body font changed from Inter to Sora.
- Work section expanded to 4 project cards (ChoreoMapper, Dabble, A Robot,
  Hey Siri) with responsive grid layout (not a carousel — see
  `docs/SPEC.md` → Work section layout).
- Nav rebuilt as fixed left-edge sticky-note tabs (shipped); Work tab's
  text needs to be white, darkening the yellow token if contrast requires
  it (see `docs/SPEC.md` → Accessibility note — nav contrast).
- All sections need one consistent left alignment, matching Work's (see
  `docs/SPEC.md` → Layout).
- Contact section renamed to CV, with real education/career copy and
  LinkedIn/GitHub icons at the bottom (see `docs/SPEC.md` → CV content).
- Hero needs a placeholder portrait image, organic horizontal-oblong shape,
  to the right of the hero text.
- ChoreoMapper and Hey Siri copy is ready to port into a new case-study
  page template (text only for now); in-case-study outline/TOC nav is new
  scope — see `docs/SPEC.md` → Navigation and → Milestone 3.
Update this section as these land.

## Stack quick-reference

- Vite + React + TypeScript
- Standard CSS Grid/Flexbox layout, anchor-link nav, smooth scroll — no
  pan/zoom library
- Fonts: **Unbounded** (headers/display, Google Fonts) + **Sora** (body,
  Google Fonts) — see `docs/SPEC.md` → Typography
- Theming: CSS custom properties + `data-theme` attribute, default from
  `prefers-color-scheme`, persisted via `localStorage`
- `GlassCard`: `backdrop-filter: blur(...)` container with solid-background
  fallback
- Transitions: native View Transitions API + custom CSS 3D page-curl, for
  the Work ↔ case-study transition
- Framer Motion for supporting animation

## Conventions

- Each milestone gets its own branch; merge to `main` only when it's
  deployable/demo-able. `main` is shared as a live progress link, so keep
  it in a working state.
- Check in before big structural decisions (folder layout, deployment
  target, new dependencies) and before resolving any of the "Open design
  decisions" in `docs/SPEC.md` when more than one reasonable option exists.