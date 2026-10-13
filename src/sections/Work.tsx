import { ProjectThumbnail } from '../components/ProjectThumbnail';
import { projects } from '../data/projects';

// Not wrapped in a GlassCard: the project cards are the glass layer here,
// which avoids glass-on-glass and leaves room for 4 cards per row.
export function Work() {
  return (
    <section id="work" className="section">
      <h2>Highlighted Work Samples</h2>
      <div className="work__grid">
        {projects.map((project) => (
          <ProjectThumbnail key={project.id} project={project} />
        ))}
      </div>
    </section>
  );
}
