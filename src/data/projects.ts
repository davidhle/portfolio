export interface Project {
  /** Also the case study's file name: src/content/case-studies/<id>.mdx (and its assets/<id>/ folder) */
  id: string;
  title: string;
  tagline: string;
  /** No case study page yet — card renders in a muted, inert state. */
  comingSoon?: boolean;
  /**
   * Work card thumbnail that changes with the portfolio theme. Filenames in
   * assets/<id>/, one per theme. A `coverImage` in the case study's
   * frontmatter wins over this, so leave that out when using it.
   */
  cover?: { light: string; dark: string };
}

export const projects: Project[] = [
  {
    id: 'dabble',
    title: 'Dabble',
    tagline: 'Web app for hobby tracking, visualization, and reflection',
    comingSoon: true,
    // Inverted on purpose: Dabble's own default (dark) stands out against the
    // light portfolio, and vice versa.
    cover: { light: 'dabble-thumbnail-dark.png', dark: 'dabble-thumbnail-light.png' },
  },
  { id: 'choreomapper', title: 'ChoreoMapper', tagline: "Master's thesis — visualization and archival tool for dancers" },
  { id: 'hey-siri', title: 'Hey Siri, Are You A Feminist?', tagline: 'Research study on gender bias in voice assistant design' },
  { id: 'arobot', title: 'ARobot for Sustainable Mobility in Seestadt', tagline: 'Speculative design of an AR-based robot for an urban space', comingSoon: true },
];
