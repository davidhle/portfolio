import { useActiveSection } from '../hooks/useActiveSection';
import { handleLinkClick } from '../router';
import './SideNav.css';

const sections = [
  { id: 'about', label: 'About', color: 'red' },
  { id: 'work', label: 'Work', color: 'yellow' },
  { id: 'cv', label: 'CV', color: 'blue' },
] as const;

const sectionIds = sections.map((section) => section.id);

interface SideNavProps {
  inCaseStudy?: boolean;
}

// Main nav: index tabs stuck to the left page edge, like a notebook's
// bookmark flags. The tab for the section being read sticks out further.
// Inside a case study the Work tab stays active and the tabs lead back to
// the one-pager.
export function SideNav({ inCaseStudy = false }: SideNavProps) {
  const { active, pin } = useActiveSection(sectionIds);
  const current = inCaseStudy ? 'work' : active;

  return (
    <nav className="side-nav" aria-label="Sections">
      {sections.map((section) => (
        <a
          key={section.id}
          href={inCaseStudy ? `/#${section.id}` : `#${section.id}`}
          className={`side-nav__tab side-nav__tab--${section.color}`}
          aria-current={current === section.id ? 'location' : undefined}
          onClick={(event) => (inCaseStudy ? handleLinkClick(event) : pin(section.id))}
        >
          {section.label}
        </a>
      ))}
    </nav>
  );
}
