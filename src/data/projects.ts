export interface Project {
  id: string;
  title: string;
  tagline: string;
  /** No case study page yet — card renders in a muted, inert state. */
  comingSoon?: boolean;
}

export const projects: Project[] = [
  { id: 'dabble', title: 'Dabble', tagline: 'Personal hobby tracking & reflection web app' },
  { id: 'choreomapper', title: 'ChoreoMapper', tagline: "Master's thesis — visualization and archival tool for dancers" },
  { id: 'siri', title: 'Hey Siri Are You Feminist?', tagline: 'Research study on gender biases in voice assistants', comingSoon: true },
  { id: 'arobot', title: 'ARobot for Sustainable Mobility in Seestadt', tagline: 'Speculative design of an AR-based robot for an urban space', comingSoon: true },
];
