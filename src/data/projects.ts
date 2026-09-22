export interface Project {
  id: string;
  title: string;
  tagline: string;
}

// Visual placement only for Milestone 1 — these become clickable and pull
// in real case-study content (see source links in docs/SPEC.md) once the
// page-turn transition is wired up in Milestone 3.
export const projects: Project[] = [
  { id: 'choreomapper', title: 'ChoreoMapper', tagline: "Master's thesis — case study coming soon" },
  { id: 'dabble', title: 'Dabble', tagline: 'Personal web app — case study coming soon' },
];
