import type { CaseStudyMeta, CaseStudyModule } from './types';

// One .mdx per case study, named after its project id (see src/data/projects.ts).
// Loaded lazily so each case study is its own chunk.
const modules = import.meta.glob<CaseStudyModule>('./*.mdx');

const loaders = new Map(
  Object.entries(modules).map(([path, load]) => [path.slice(2, -'.mdx'.length), load]),
);
const loaded = new Map<string, CaseStudyModule>();

// Frontmatter only, bundled up front for the Work cards (tags etc.); the
// content itself stays in the lazy chunks above.
const frontmatters = new Map(
  Object.entries(
    import.meta.glob<CaseStudyMeta>('./*.mdx', { query: '?frontmatter', import: 'default', eager: true }),
  ).map(([path, meta]) => [path.slice(2, -'.mdx'.length), meta]),
);

export function getCaseStudyMeta(id: string) {
  return frontmatters.get(id);
}

export function hasCaseStudy(id: string) {
  return loaders.has(id);
}

export async function loadCaseStudy(id: string) {
  const cached = loaded.get(id);
  if (cached) return cached;
  const load = loaders.get(id);
  if (!load) throw new Error(`No case study for "${id}"`);
  const mod = await load();
  loaded.set(id, mod);
  return mod;
}

/** Synchronous read of an already-loaded case study, or undefined. */
export function getLoadedCaseStudy(id: string) {
  return loaded.get(id);
}
