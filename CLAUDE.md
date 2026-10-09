# CLAUDE.md

This is David's personal portfolio site (a fresh repo — an earlier
Create-React-App-based portfolio repo was retired in favor of this one): a
one-page scrolling portfolio styled like a bullet journal (Leuchtturm1917
Bauhaus Edition — paper white background, a dot grid in Bauhaus red, blue
and yellow as accent colors), with dark/light mode and glassmorphism
("glass" blurred) cards holding photos, embedded prototypes/videos, and
body text. Two case studies (ChoreoMapper, Dabble) break out of the
one-pager into dedicated views via a "turn the page" transition, with
direct-access thumbnails on the hero section beneath the byline.

**Read `docs/SPEC.md` before starting any work in this repo.** It has the
full vision, tech stack decisions, typography/palette notes, architecture,
and milestone roadmap. This file is just a pointer to it.

Note: an earlier version of this project was scoped as an infinite
pannable/zoomable canvas. That direction was dropped for a standard
one-page layout — see `docs/SPEC.md` → "Superseded decisions" — so don't
reintroduce canvas-engine code (`react-zoom-pan-pinch`, pan/zoom gesture
handling) from an earlier commit or conversation.

## Current status

Working on **Milestone 1** (see `docs/SPEC.md` → Roadmap → Milestone 1):
static one-page shell — hero/about/work/contact sections, the `GlassCard`
component, the themed dot-grid background, dark/light toggle, and static
(non-clickable yet) ChoreoMapper/Dabble thumbnails under the byline —
deployed somewhere shareable. Update this section as milestones are
completed.

## Stack quick-reference

- Vite + React + TypeScript
- Standard CSS Grid/Flexbox layout, anchor-link nav, smooth scroll — no
  pan/zoom library
- Fonts: **Unbounded** (headers/display, Google Fonts) + **Inter** (body,
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