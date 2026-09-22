import type { Project } from '../data/projects';

interface ProjectThumbnailProps {
  project: Project;
}

// Not yet clickable — see Project type comment. Milestone 3 wires this up
// to the page-turn transition into the real case study.
export function ProjectThumbnail({ project }: ProjectThumbnailProps) {
  return (
    <div className="project-thumbnail" onDoubleClick={(event) => event.stopPropagation()}>
      <span className="project-thumbnail__title">{project.title}</span>
      <span className="project-thumbnail__tagline">{project.tagline}</span>
    </div>
  );
}
