import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  // Served at davidhle.github.io/portfolio/ via GitHub Pages, not a
  // custom domain, so asset URLs need the repo name prefix.
  base: '/portfolio/',
  plugins: [react()],
})
