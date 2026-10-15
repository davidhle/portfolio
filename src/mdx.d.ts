declare module '*.mdx' {
  import type { CaseStudyMeta, OutlineHeading } from './content/case-studies/types';

  export const frontmatter: CaseStudyMeta;
  export const headings: OutlineHeading[];
  const MDXComponent: import('mdx/types').MDXContent;
  export default MDXComponent;
}
