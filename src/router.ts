import type { MouseEvent } from 'react';
import { useSyncExternalStore } from 'react';
import { flushSync } from 'react-dom';
import { hasCaseStudy, loadCaseStudy } from './content/case-studies';

// Two views only — the one-pager and a case study — so a few lines of
// History API beat pulling in a router dependency.
export type Route = { name: 'home' } | { name: 'case-study'; id: string };

const HOME: Route = { name: 'home' };

export function caseStudyPath(id: string) {
  return `/work/${id}`;
}

function parse(pathname: string): Route {
  const match = /^\/work\/([\w-]+)\/?$/.exec(pathname);
  return match && hasCaseStudy(match[1]) ? { name: 'case-study', id: match[1] } : HOME;
}

function sameRoute(a: Route, b: Route) {
  return a.name === 'home' ? b.name === 'home' : b.name === 'case-study' && a.id === b.id;
}

let current = parse(window.location.pathname);

/** Resolves once the view for the initial URL can render (its case study chunk, if any). */
export const initialRouteReady: Promise<unknown> =
  current.name === 'case-study' ? loadCaseStudy(current.id).catch(() => (current = HOME)) : Promise.resolve();
const listeners = new Set<() => void>();

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function useRoute() {
  return useSyncExternalStore(subscribe, () => current);
}

// Scroll positions are stored per history entry and restored by hand, since
// the browser's own restoration runs before the new view has rendered.
history.scrollRestoration = 'manual';

function rememberScroll() {
  history.replaceState({ ...history.state, scrollY: window.scrollY }, '');
}

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

/**
 * Swap views inside a View Transition (the "page turn"): the clicked Work
 * card and the case study header share a `view-transition-name`, so the
 * card morphs into the header and back. `direction` is exposed as
 * `html[data-page-turn]` for direction-aware CSS (e.g. the later page curl).
 */
async function show(route: Route, direction: 'forward' | 'back', scrollTarget: number | string) {
  // Load the case study before the transition starts, so the page isn't
  // frozen on the old snapshot while its chunk downloads.
  if (route.name === 'case-study') await loadCaseStudy(route.id);

  const update = () => {
    flushSync(() => {
      current = route;
      listeners.forEach((listener) => listener());
    });
    const top =
      typeof scrollTarget === 'number'
        ? scrollTarget
        : (document.getElementById(scrollTarget)?.getBoundingClientRect().top ?? 0) + window.scrollY;
    window.scrollTo({ top, behavior: 'instant' });
  };

  if (!document.startViewTransition || prefersReducedMotion.matches) {
    update();
    return;
  }

  const root = document.documentElement;
  root.dataset.pageTurn = direction;
  const transition = document.startViewTransition(update);
  transition.finished.finally(() => delete root.dataset.pageTurn);
}

/** Go to `path` (optionally with a #hash to land on) via the page-turn transition. */
export function navigate(path: string) {
  const url = new URL(path, window.location.href);
  const route = parse(url.pathname);
  if (sameRoute(route, current)) {
    if (url.hash) document.getElementById(url.hash.slice(1))?.scrollIntoView();
    return;
  }

  rememberScroll();
  // Marks entries opened from the one-pager, so goHome() can step back to them
  history.pushState({ fromHome: current.name === 'home' }, '', url);
  void show(route, route.name === 'case-study' ? 'forward' : 'back', url.hash.slice(1) || 0);
}

/**
 * Leave the case study for the one-pager. Steps back through history when
 * the reader came from there (so the Work section's scroll position comes
 * back with it); otherwise — e.g. a direct link — pushes the home page.
 */
export function goHome() {
  if (history.state?.fromHome) {
    rememberScroll();
    history.back();
  } else {
    navigate('/#work');
  }
}

window.addEventListener('popstate', () => {
  const route = parse(window.location.pathname);
  // Hash-only history entries (in-page anchors) don't change the view
  if (sameRoute(route, current)) return;
  const direction = route.name === 'case-study' ? 'forward' : 'back';
  void show(route, direction, history.state?.scrollY ?? 0);
});

/** onClick for internal <a> links: plain left-clicks navigate in-app; modified clicks open normally. */
export function handleLinkClick(
  event: MouseEvent<HTMLAnchorElement>,
  onNavigate: (href: string) => void = navigate,
) {
  if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
  event.preventDefault();
  onNavigate(event.currentTarget.getAttribute('href') ?? '/');
}

/** Shared `view-transition-name` for a project's Work card and its case study header. */
export function pageTurnName(id: string) {
  return `project-${id}`;
}
