import mdx from '@mdx-js/rollup'
import react from '@vitejs/plugin-react'
import remarkFrontmatter from 'remark-frontmatter'
import remarkMdxFrontmatter from 'remark-mdx-frontmatter'
import { defineConfig } from 'vite'
import { mdxFrontmatterOnly } from './plugins/mdx-frontmatter-only.ts'
import { remarkHeadings } from './plugins/remark-headings.ts'

// https://vite.dev/config/
export default defineConfig({
  // Served from the root of ledavid.me via Cloudflare Pages, so the
  // default base ('/') is correct. Don't reintroduce a repo-name prefix.
  plugins: [
    // `*.mdx?frontmatter` → metadata only, for the Work cards
    mdxFrontmatterOnly(),
    // Case studies: frontmatter → `export const frontmatter`, ## / ### → `export const headings`
    {
      enforce: 'pre',
      ...mdx({
        remarkPlugins: [remarkFrontmatter, remarkMdxFrontmatter, remarkHeadings],
      }),
    },
    react({ include: /\.(jsx|js|mdx|md|tsx|ts)$/ }),
  ],
  optimizeDeps: {
    // The dep scanner can't load `*.mdx?frontmatter` imports (it doesn't run
    // mdxFrontmatterOnly's load hook), so the scan fails and deps get found
    // one at a time — which split react-dom and react-dom/client into
    // mismatched chunks. Pre-bundle them together up front instead.
    include: ['react', 'react/jsx-runtime', 'react/jsx-dev-runtime', 'react-dom', 'react-dom/client'],
  },
})
