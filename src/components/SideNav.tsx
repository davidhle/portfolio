import { useActiveSection } from '../hooks/useActiveSection';
import './SideNav.css';

const sections = [
  { id: 'about', label: 'About', color: 'red' },
  { id: 'work', label: 'Work', color: 'yellow' },
  { id: 'cv', label: 'CV', color: 'blue' },
] as const;

const sectionIds = sections.map((section) => section.id);

// Main nav: index tabs stuck to the left page edge, like a notebook's
// bookmark flags. The tab for the section being read sticks out further.
export function SideNav() {
  const { active, pin } = useActiveSection(sectionIds);

  return (
    <nav className="side-nav" aria-label="Sections">
      {sections.map((section) => (
        <a
          key={section.id}
          href={`#${section.id}`}
          className={`side-nav__tab side-nav__tab--${section.color}`}
          aria-current={active === section.id ? 'location' : undefined}
          onClick={() => pin(section.id)}
        >
          {section.label}
        </a>
      ))}
    </nav>
  );
}
