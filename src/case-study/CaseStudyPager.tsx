import { hasCaseStudy } from '../content/case-studies';
import { projects } from '../data/projects';
import { caseStudyPath, goHome, handleLinkClick } from '../router';

// Case studies in Work-grid order: every project that has an .mdx page and
// isn't marked comingSoon. New pages join the sequence automatically.
const sequence = projects.filter((project) => !project.comingSoon && hasCaseStudy(project.id));

interface CaseStudyPagerProps {
  id: string;
  label: string;
}

// ← Previous · Back to Work · Next →  (prev/next only render when they exist)
export function CaseStudyPager({ id, label }: CaseStudyPagerProps) {
  const index = sequence.findIndex((project) => project.id === id);
  const previous = index > 0 ? sequence[index - 1] : undefined;
  const next = index >= 0 ? sequence[index + 1] : undefined;

  return (
    <nav className="case-study__pager" aria-label={label}>
      {previous && (
        <a
          href={caseStudyPath(previous.id)}
          className="case-study__back"
          rel="prev"
          onClick={(event) => handleLinkClick(event)}
        >
          ← {previous.title}
        </a>
      )}
      <a href="/#work" className="case-study__back" onClick={(event) => handleLinkClick(event, goHome)}>
        Back to Work
      </a>
      {next && (
        <a
          href={caseStudyPath(next.id)}
          className="case-study__back"
          rel="next"
          onClick={(event) => handleLinkClick(event)}
        >
          {next.title} →
        </a>
      )}
    </nav>
  );
}
