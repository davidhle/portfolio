import { useSyncExternalStore } from 'react';

const query = () => window.matchMedia('(prefers-reduced-motion: reduce)');

function subscribe(onChange: () => void) {
  const list = query();
  list.addEventListener('change', onChange);
  return () => list.removeEventListener('change', onChange);
}

/** Live `prefers-reduced-motion: reduce`, re-rendering if the setting changes. */
export function useReducedMotion() {
  return useSyncExternalStore(subscribe, () => query().matches);
}
