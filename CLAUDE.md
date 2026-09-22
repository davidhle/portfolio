# CLAUDE.md

This is David's personal portfolio site (a fresh repo — an earlier
Create-React-App-based portfolio repo was retired in favor of this one): an
infinite pannable/zoomable canvas styled like a bullet journal (Leuchtturm1917
Bauhaus Edition — paper white, red, blue, yellow accent), with two case
studies (ChoreoMapper, Dabble) that break out into dedicated views via a
"turn the page" transition. Thumbnails for both case studies sit directly on
the landing view, beneath the byline, for one-click access.

**Read `docs/SPEC.md` before starting any work in this repo.** It has the
full vision, tech stack decisions, interaction model, architecture, and
milestone roadmap. This file is just a pointer to it.

## Current status

Working on **Milestone 1** (see `docs/SPEC.md` → Roadmap → Milestone 1):
static journal shell + a basic pannable canvas with three placeholder
sections, plus static (non-clickable yet) ChoreoMapper/Dabble thumbnails
under the byline, deployed somewhere shareable. Update this section as
milestones are completed.

## Stack quick-reference

- Vite + React + TypeScript
- Canvas: `react-zoom-pan-pinch`
- Transitions: native View Transitions API + custom CSS 3D page-curl
- Framer Motion for supporting animation

## Conventions

- Each milestone gets its own branch; merge to `main` only when it's
  deployable/demo-able. `main` is shared as a live progress link, so keep
  it in a working state.
- Check in before big structural decisions (folder layout, deployment
  target, new dependencies) when more than one reasonable option exists.
