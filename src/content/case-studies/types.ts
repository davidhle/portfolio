import type { MDXContent } from 'mdx/types';

/** Frontmatter block at the top of each case study's .mdx file */
export interface CaseStudyMeta {
  title: string;
  subtitle?: string;
  tags?: string[];
  /** Teammates on a group project, by name; leave out for solo work. Listed in the header before Affiliations. */
  collaborators?: string[];
  affiliations?: string;
  location?: string;
  year?: string;
  /** Filename in assets/<id>/ — the Work card's thumbnail. Without one, the card shows a placeholder pattern. */
  coverImage?: string;
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
