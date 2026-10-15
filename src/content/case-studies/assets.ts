import { createContext, useContext } from 'react';

// Every image under assets/<case study id>/, as its built URL. Only the URL
// strings are bundled; the files themselves are emitted as separate assets.
// Extensions in both cases: camera files are often .JPG.
const urls = import.meta.glob<string>(
  './assets/**/*.{png,jpg,jpeg,webp,avif,gif,svg,PNG,JPG,JPEG,WEBP,AVIF,GIF,SVG}',
  {
    eager: true,
    query: '?url',
    import: 'default',
  },
);

/** URL of `file` in src/content/case-studies/assets/<caseStudyId>/, or undefined if it isn't there. */
export function caseStudyAssetUrl(caseStudyId: string, file: string) {
  const url = urls[`./assets/${caseStudyId}/${file}`];
  if (!url && import.meta.env.DEV) {
    console.warn(`Case study asset not found: assets/${caseStudyId}/${file}`);
  }
  return url;
}

/** Which case study is rendering, so MDX components can resolve its asset filenames. */
export const CaseStudyIdContext = createContext<string | null>(null);

/**
 * Resolves a filename from an MDX file (e.g. `src: "photo.png"`) against the
 * current case study's folder: src/content/case-studies/assets/<id>/.
 */
export function useCaseStudyAsset() {
  const id = useContext(CaseStudyIdContext);
  return (file: string) => (id ? caseStudyAssetUrl(id, file) : undefined);
}
