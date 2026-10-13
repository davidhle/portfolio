import type { Project } from '../data/projects';
import { getCaseStudyMeta, hasCaseStudy } from '../content/case-studies';
import { caseStudyAssetUrl } from '../content/case-studies/assets';
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
  const meta = getCaseStudyMeta(project.id);
  const tags = meta?.tags ?? [];
  const cover = meta?.coverImage && caseStudyAssetUrl(project.id, meta.coverImage);
  const themedCover = !cover && project.cover && {
    light: caseStudyAssetUrl(project.id, project.cover.light),
    dark: caseStudyAssetUrl(project.id, project.cover.dark),
  };
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
      {/* Decorative: the title link already names the project. No coverImage → placeholder pattern. */}
      {cover ? (
        <img className="project-thumbnail__image" src={cover} alt="" loading="lazy" decoding="async" />
      ) : themedCover ? (
        // Both rendered; CSS shows the one for the current theme (lazy, so the hidden one isn't fetched)
        <>
          <img
            className="project-thumbnail__image project-thumbnail__image--light"
            src={themedCover.light}
            alt=""
            loading="lazy"
            decoding="async"
          />
          <img
            className="project-thumbnail__image project-thumbnail__image--dark"
            src={themedCover.dark}
            alt=""
            loading="lazy"
            decoding="async"
          />
        </>
      ) : (
        <div className="project-thumbnail__image" aria-hidden="true" />
      )}
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
