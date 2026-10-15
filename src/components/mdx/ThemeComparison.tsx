interface ThemeComparisonProps {
  previous: string[];
  updated: string[];
}

// Before/after list of research themes, as a taped-on sticky note — an
// annotation in the margin of the journal rather than a data table.
export function ThemeComparison({ previous, updated }: ThemeComparisonProps) {
  return (
    <aside className="theme-comparison" aria-label="Before and after comparison">
      <div className="theme-comparison__column">
        <h4 className="theme-comparison__heading">Previous themes</h4>
        <ul>
          {previous.map((theme) => (
            <li key={theme}>{theme}</li>
          ))}
        </ul>
      </div>
      <span className="theme-comparison__arrow" aria-hidden="true">
        →
      </span>
      <div className="theme-comparison__column">
        <h4 className="theme-comparison__heading">Updated themes</h4>
        <ul>
          {updated.map((theme) => (
            <li key={theme}>{theme}</li>
          ))}
        </ul>
      </div>
    </aside>
  );
}
