import { readFile } from 'node:fs/promises';
import type { Plugin } from 'vite';
import { parse } from 'yaml';

const QUERY = '?frontmatter';
// Resolved ids get a .js suffix: @mdx-js/rollup ignores queries when picking
// files, so `x.mdx?frontmatter` would still be compiled as MDX.
const SUFFIX = '.frontmatter.js';

// `import meta from './x.mdx?frontmatter'` → just the file's YAML frontmatter
// as a plain object, without compiling (or bundling) the MDX body. Lets the
// Work cards show case-study metadata while the content stays lazy-loaded.
export function mdxFrontmatterOnly(): Plugin {
  return {
    name: 'mdx-frontmatter-only',
    enforce: 'pre',
    async resolveId(source, importer) {
      if (!source.endsWith(`.mdx${QUERY}`)) return null;
      const resolved = await this.resolve(source.slice(0, -QUERY.length), importer, { skipSelf: true });
      return resolved && `${resolved.id}${SUFFIX}`;
    },
    async load(id) {
      if (!id.endsWith(SUFFIX)) return null;
      const file = id.slice(0, -SUFFIX.length);
      this.addWatchFile(file);
      const source = await readFile(file, 'utf8');
      const match = /^---\r?\n([\s\S]*?)\r?\n---/.exec(source);
      return `export default ${JSON.stringify(match ? (parse(match[1]) ?? {}) : {})};`;
    },
  };
}
