import { useCallback, useEffect, useState } from 'react';

export type Theme = 'light' | 'dark';

// Must stay in sync with the pre-paint script in index.html.
const THEME_STORAGE_KEY = 'theme';

function readStoredTheme(): Theme | null {
  try {
    const stored = localStorage.getItem(THEME_STORAGE_KEY);
    return stored === 'light' || stored === 'dark' ? stored : null;
  } catch {
    return null;
  }
}

const systemQuery = () => window.matchMedia('(prefers-color-scheme: dark)');

// Defaults to the system preference; an explicit toggle is persisted and
// wins on return visits. The theme lives on <html data-theme="...">.
export function useTheme() {
  const [theme, setTheme] = useState<Theme>(
    () => readStoredTheme() ?? (systemQuery().matches ? 'dark' : 'light'),
  );

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // Follow live system changes until the user has made an explicit choice.
  useEffect(() => {
    const query = systemQuery();
    const onChange = (event: MediaQueryListEvent) => {
      if (!readStoredTheme()) setTheme(event.matches ? 'dark' : 'light');
    };
    query.addEventListener('change', onChange);
    return () => query.removeEventListener('change', onChange);
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme((current) => {
      const next = current === 'dark' ? 'light' : 'dark';
      try {
        localStorage.setItem(THEME_STORAGE_KEY, next);
      } catch {
        // Storage unavailable (private mode etc.) — theme still applies for this visit.
      }
      return next;
    });
  }, []);

  return { theme, toggleTheme };
}
