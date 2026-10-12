# Portfolio

David Lê's personal portfolio site — a one-page scrolling portfolio styled
like a bullet journal. See `CLAUDE.md` and `docs/SPEC.md` for the full
project vision, tech stack decisions, and milestone roadmap.

## Development

```bash
npm install
npm run dev
```

## Stack

- Vite + React + TypeScript
- Fonts: Unbounded (display) + Inter (body) via Google Fonts
- Theming: CSS custom properties in `src/styles/tokens.css`, swapped via
  `data-theme` on `<html>`
- Deployed to GitHub Pages from `main` (`.github/workflows/deploy.yml`)
