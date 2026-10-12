import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  // Served from the root of ledavid.me via Cloudflare Pages, so the
  // default base ('/') is correct. Don't reintroduce a repo-name prefix.
  plugins: [react()],
})
