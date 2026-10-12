import { useEffect, useMemo, useRef } from 'react';
import type { MouseEvent } from 'react';
import type { OutlineHeading } from '../content/case-studies/types';
import { useActiveSection } from '../hooks/useActiveSection';
import './CaseStudyOutline.css';

interface CaseStudyOutlineProps {
  title: string;
  headings: OutlineHeading[];
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface OutlineGroup extends OutlineHeading {
  children: OutlineHeading[];
}

// ### entries nest under the ## before them
function toTree(headings: OutlineHeading[]) {
  const groups: OutlineGroup[] = [];
  for (const heading of headings) {
    const parent = groups[groups.length - 1];
    if (heading.depth === 3 && parent) parent.children.push(heading);
    else groups.push({ ...heading, children: [] });
  }
  return groups;
}

/** At or above this width the open outline gets its own column; below it, it overlays the page. */
export const OUTLINE_DOCKED_QUERY = '(min-width: 1024px)';

// Heading navigator (like Docs' document outline) built from the MDX's
// ## / ### headings, on the right edge of the viewport. The →/← handle
// slides it fully off-screen and back. Docked on wide screens (the reading
// column makes room for it); an overlay that closes after a jump on narrow ones.
export function CaseStudyOutline({ title, headings, open, onOpenChange }: CaseStudyOutlineProps) {
  const groups = useMemo(() => toTree(headings), [headings]);
  const ids = useMemo(() => headings.map((heading) => heading.id), [headings]);
  const { active, pin } = useActiveSection(ids);
  const root = useRef<HTMLDivElement>(null);

  // Overlay mode: close on Escape or a click elsewhere
  useEffect(() => {
    if (!open || window.matchMedia(OUTLINE_DOCKED_QUERY).matches) return;
    const onKey = (event: KeyboardEvent) => event.key === 'Escape' && onOpenChange(false);
    const onPointer = (event: PointerEvent) => {
      if (!root.current?.contains(event.target as Node)) onOpenChange(false);
    };
    window.addEventListener('keydown', onKey);
    window.addEventListener('pointerdown', onPointer);
    return () => {
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('pointerdown', onPointer);
    };
  }, [open, onOpenChange]);

  // Jump without adding a history entry, so Back still returns to the one-pager
  const jump = (event: MouseEvent<HTMLAnchorElement>, id: string) => {
    event.preventDefault();
    const target = document.getElementById(id);
    if (!target) return;
    if (id !== 'top') pin(id);
    target.scrollIntoView();
    history.replaceState(history.state, '', `#${id}`);
    if (!window.matchMedia(OUTLINE_DOCKED_QUERY).matches) onOpenChange(false);
  };

  const entry = (heading: OutlineHeading) => (
    <a
      href={`#${heading.id}`}
      className="outline__link"
      aria-current={active === heading.id ? 'location' : undefined}
      onClick={(event) => jump(event, heading.id)}
    >
      {heading.text}
    </a>
  );

  return (
    <div className="outline" data-open={open} ref={root}>
      <button
        type="button"
        className="outline__toggle"
        aria-expanded={open}
        aria-controls="case-study-outline"
        aria-label={open ? 'Hide contents' : 'Show contents'}
        title={open ? 'Hide contents' : 'Show contents'}
        onClick={() => onOpenChange(!open)}
      >
        {/* → slides the panel out to the right; ← brings it back */}
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          aria-hidden="true"
          focusable="false"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={open ? undefined : 'outline__arrow--back'}
        >
          <path d="M4 12h15M13 6l6 6-6 6" />
        </svg>
      </button>
      {/* inert while slid away, so its links drop out of the tab order */}
      <nav id="case-study-outline" className="outline__panel" aria-label="Case study contents" inert={!open}>
        <a href="#top" className="outline__title" onClick={(event) => jump(event, 'top')}>
          {title}
        </a>
        <ol className="outline__list">
          {groups.map((group) => (
            <li key={group.id}>
              {entry(group)}
              {group.children.length > 0 && (
                <ol className="outline__sublist">
                  {group.children.map((child) => (
                    <li key={child.id}>{entry(child)}</li>
                  ))}
                </ol>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </div>
  );
}
