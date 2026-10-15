import { useState } from 'react';
import { CaseStudyOutline, OUTLINE_DOCKED_QUERY } from './components/CaseStudyOutline';
import { SideNav } from './components/SideNav';
import { StickerDefs } from './components/Sticker';
import { ThemeToggle } from './components/ThemeToggle';
import { CaseStudyPage } from './case-study/CaseStudyPage';
import { getLoadedCaseStudy } from './content/case-studies';
import { useRoute } from './router';
import { About } from './sections/About';
import { CV } from './sections/CV';
import { Hero } from './sections/Hero';
import { Work } from './sections/Work';
import './sections/sections.css';

export default function App() {
  const route = useRoute();
  // The router loads a case study's chunk before switching to it
  const study = route.name === 'case-study' ? getLoadedCaseStudy(route.id) : undefined;
  // Shared by the outline and the column that makes room for it. Starts open
  // where it can dock beside the content; stays as the reader left it
  // between case studies.
  const [outlineOpen, setOutlineOpen] = useState(() => window.matchMedia(OUTLINE_DOCKED_QUERY).matches);

  return (
    <>
      <SideNav inCaseStudy={Boolean(study)} />
      <ThemeToggle />
      <StickerDefs />
      {route.name === 'case-study' && study ? (
        <>
          <CaseStudyPage key={route.id} id={route.id} study={study} outlineOpen={outlineOpen} />
          <CaseStudyOutline
            title={study.frontmatter.title}
            headings={study.headings}
            open={outlineOpen}
            onOpenChange={setOutlineOpen}
          />
        </>
      ) : (
        <main className="page">
          <Hero />
          <About />
          <Work />
          <CV />
        </main>
      )}
    </>
  );
}
