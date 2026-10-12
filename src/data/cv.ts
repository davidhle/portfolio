export interface CvEntry {
  years: string;
  title: string;
  place: string;
}

export interface CvGroup {
  heading: string;
  entries: CvEntry[];
}

export const cv: CvGroup[] = [
  {
    heading: 'Education',
    entries: [
      { years: '2020–2025', title: 'M.Sc. Human-Computer Interaction', place: 'Bauhaus-Universität Weimar, Weimar, Germany' },
      { years: '2021–2022', title: 'M.Sc. Media & Human-Centered Computing (Erasmus)', place: 'Technische Universität Wien, Vienna, Austria' },
      { years: '2015–2020', title: 'B.Sc. Computational Media', place: 'Georgia Institute of Technology, Atlanta, USA' },
      { years: '2019', title: 'Bachelor in Film, Television & Media Studies (Erasmus)', place: 'Universidad Carlos III Madrid, Getafe, Spain' },
      { years: '2017', title: 'Faculty-Led Undergraduate Summer Program', place: 'Universitat Politècnica de Catalunya, Barcelona, Spain' },
    ],
  },
  {
    heading: 'Career',
    entries: [
      { years: '2022–2023', title: 'HCI Research Intern', place: 'Ex)Situ, Université Paris-Saclay, Paris, France' },
      { years: '2019', title: 'Program Manager Intern', place: 'Microsoft, Redmond, Washington, USA' },
      { years: '2018', title: 'Strategic Solutions Engineer Intern', place: 'Zuora, Atlanta, Georgia, USA' },
      { years: '2017', title: 'Software Engineer Intern', place: 'CareerBuilder, Norcross, Georgia, USA' },
    ],
  },
];

export const contactLinks = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/davidle97/', icon: 'linkedin' },
  { label: 'GitHub', href: 'https://github.com/davidhle', icon: 'github' },
] as const;
