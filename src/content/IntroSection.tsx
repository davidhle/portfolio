import { useNavigateTo } from '../canvas/NavigationContext';
import { NavButton } from '../components/NavButton';
import { ProjectThumbnail } from '../components/ProjectThumbnail';
import { projects } from '../data/projects';

// The canvas's home node. Name treatment is plain styled text for now —
// the calligraphy illustration referenced in docs/SPEC.md comes later.
export function IntroSection() {
  const navigateTo = useNavigateTo();

  return (
    <div className="intro-section">
      <p className="intro-greeting">Hi, my name is</p>
      <h1 className="intro-name">David Lê</h1>
      <p className="intro-byline">M.Sc. HCI Graduate based in Berlin, Germany</p>

      <nav className="intro-nav" aria-label="Primary">
        <NavButton label="About Me" onClick={() => navigateTo('about')} />
        <NavButton label="My Work" onClick={() => navigateTo('work')} />
        <NavButton label="Contact" onClick={() => navigateTo('contact')} />
      </nav>

      <div className="intro-thumbnails">
        {projects.map((project) => (
          <ProjectThumbnail key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
}
