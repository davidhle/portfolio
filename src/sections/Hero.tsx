import { ProjectThumbnail } from '../components/ProjectThumbnail';
import { projects } from '../data/projects';

const navLinks = [
  { href: '#about', label: 'About' },
  { href: '#work', label: 'Work' },
  { href: '#contact', label: 'Contact' },
];

export function Hero() {
  return (
    <header id="top" className="hero">
      <p className="hero__greeting">Hi, my name is</p>
      {/* Placeholder — replaced by the calligraphy illustration (PNG) later */}
      <h1 className="hero__name">David</h1>
      {/* Placeholder byline, may change */}
      <p className="hero__byline">M.Sc. HCI Graduate based in Berlin, Germany</p>

      <nav className="hero__nav" aria-label="Sections">
        {navLinks.map((link) => (
          <a key={link.href} href={link.href}>
            {link.label}
          </a>
        ))}
      </nav>

      <div className="hero__projects">
        {projects.map((project) => (
          <ProjectThumbnail key={project.id} project={project} />
        ))}
      </div>
    </header>
  );
}
