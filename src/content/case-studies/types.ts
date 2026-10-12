import type { MDXContent } from 'mdx/types';

/** Frontmatter block at the top of each case study's .mdx file */
export interface CaseStudyMeta {
  title: string;
  subtitle?: string;
  tags?: string[];
  affiliations?: string;
  location?: string;
  year?: string;
}

/** An outline entry, generated from the file's ## / ### headings at build time */
export interface OutlineHeading {
  depth: 2 | 3;
  text: string;
  id: string;
}

export interface CaseStudyModule {
  default: MDXContent;
  frontmatter: CaseStudyMeta;
  headings: OutlineHeading[];
}
