import type { Project } from '../data/projects';
import { GlassCard } from './GlassCard';
import './ProjectThumbnail.css';

interface ProjectThumbnailProps {
  project: Project;
}

// Visual placement only — Milestone 3 makes these clickable and wires them
// to the page-turn transition. `comingSoon` projects stay inert even then,
// until their case study pages exist.
export function ProjectThumbnail({ project }: ProjectThumbnailProps) {
  const className = ['project-thumbnail', project.comingSoon && 'project-thumbnail--coming-soon']
    .filter(Boolean)
    .join(' ');

  return (
    <GlassCard as="article" className={className}>
      <div className="project-thumbnail__image" aria-hidden="true" />
      {project.comingSoon && <span className="project-thumbnail__badge">Coming soon</span>}
      <h3 className="project-thumbnail__title">{project.title}</h3>
      <p className="project-thumbnail__tagline">{project.tagline}</p>
    </GlassCard>
  );
}
