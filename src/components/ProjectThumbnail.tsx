import type { Project } from '../data/projects';
import { getCaseStudyMeta, hasCaseStudy } from '../content/case-studies';
import { caseStudyPath, handleLinkClick, pageTurnName } from '../router';
import { GlassCard } from './GlassCard';
import './ProjectThumbnail.css';

interface ProjectThumbnailProps {
  project: Project;
}

// Cards with a case study (an .mdx in src/content/case-studies) open it with
// the page-turn transition; the rest stay visually present but inert.
export function ProjectThumbnail({ project }: ProjectThumbnailProps) {
  const linked = !project.comingSoon && hasCaseStudy(project.id);
  const tags = getCaseStudyMeta(project.id)?.tags ?? [];
  const className = [
    'project-thumbnail',
    project.comingSoon && 'project-thumbnail--coming-soon',
    linked && 'project-thumbnail--linked',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <GlassCard
      as="article"
      className={className}
      style={linked ? { viewTransitionName: pageTurnName(project.id) } : undefined}
    >
      <div className="project-thumbnail__image" aria-hidden="true" />
      {project.comingSoon && <span className="project-thumbnail__badge">Coming soon</span>}
      <h3 className="project-thumbnail__title">
        {linked ? (
          <a
            href={caseStudyPath(project.id)}
            className="project-thumbnail__link"
            onClick={(event) => handleLinkClick(event)}
          >
            {project.title}
          </a>
        ) : (
          project.title
        )}
      </h3>
      <p className="project-thumbnail__tagline">{project.tagline}</p>
      {tags.length > 0 && (
        <ul className="project-thumbnail__tags" aria-label="Methods">
          {tags.map((tag) => (
            <li key={tag}>{tag}</li>
          ))}
        </ul>
      )}
    </GlassCard>
  );
}
