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

**Milestone 1 is fully shipped and live at ledavid.me** (Cloudflare
Workers, deployed via Workers Builds from `main`). Includes the full
one-page shell, left-edge sticky-note nav, 4-card Work grid, CV section
with real content, dark/light toggle, and dot-grid theming.

**Milestone 3 in progress** on branch `milestone-3-case-studies` (case
studies + page-turn transition). Milestone 2 (real About copy, static
stickers, confirmed palette hex values) is intentionally deferred since it
doesn't block Milestone 3 — see `docs/SPEC.md` → Roadmap.
- Done: MDX pipeline (`@mdx-js/rollup` + frontmatter; a local remark plugin
  in `plugins/remark-headings.ts` exports `headings` for the outline), case
  study template (`src/case-study/`), History-API router (`src/router.ts`,
  no router dependency), View-Transitions crossfade/morph from the Work
  card, collapsible outline/TOC nav on the right edge (column matches the
  home page's `.page` box when it's collapsed), prev/next case study pager
  in Work-grid order, signature sticker + Back returning to the one-pager,
  MDX component vocabulary in `src/components/mdx/`. ChoreoMapper is live at `/work/choreomapper`.
- Work cards show the case study's frontmatter `tags`, read via
  `import … from './x.mdx?frontmatter'` (`plugins/mdx-frontmatter-only.ts`
  — metadata only, so the MDX bodies stay in their lazy chunks).
- `<FigmaEmbed frameWidth={W} frameHeight={H}>` sizes the embed from the
  prototype frame's real size (default 1440×1024 — ChoreoMapper's three
  frames, confirmed). Neither the embed URL nor Figma's Embed API events
  expose frame dimensions, so read W/H off the frame in Figma. Letterbox
  bars inside the embed are Figma's own canvas color (not stylable from our
  CSS) — an accurate frame size is the fix.
- A Work card links to its case study automatically once
  `src/content/case-studies/<project id>.mdx` exists (and it isn't
  `comingSoon`).
- Open: Hey Siri MDX not delivered yet; real photos for `ImagePlaceholder`;
  full 3D page-curl (hook: `html[data-page-turn='forward'|'back']`).
Update this section as these land.

## Deployment

Cloudflare Workers (static assets, via Workers Builds — not classic Pages),
connected to this repo for continuous deployment on push to `main`. Build
command `npm run build`, output dir `dist`, deploy command
`npx wrangler deploy`. Domain: ledavid.me (already on Cloudflare).
SPA fallback is handled by `not_found_handling: single-page-application`
in `wrangler.jsonc` — **no `_redirects` file**, it causes a redirect-loop
deploy failure. See `docs/SPEC.md` → Tech stack decisions → Deployment.

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