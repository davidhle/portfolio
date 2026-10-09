import type { Project } from '../data/projects';
import { GlassCard } from './GlassCard';
import './ProjectThumbnail.css';

interface ProjectThumbnailProps {
  project: Project;
}

// Visual placement only — Milestone 3 makes this clickable and wires it to
// the page-turn transition into the real case study.
export function ProjectThumbnail({ project }: ProjectThumbnailProps) {
  return (
    <GlassCard className="project-thumbnail">
      <div className="project-thumbnail__image" aria-hidden="true" />
      <span className="project-thumbnail__title">{project.title}</span>
      <span className="project-thumbnail__tagline">{project.tagline}</span>
    </GlassCard>
  );
}
