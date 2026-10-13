interface ImagePlaceholderProps {
  label: string;
  /** Number of photos in this spot (laid out as a small gallery). Default 1. */
  count?: number;
}

// Stand-in for photos that haven't been supplied yet. Swap for real <img>s
// (same figure/caption structure) once the files exist.
export function ImagePlaceholder({ label, count = 1 }: ImagePlaceholderProps) {
  const boxes = Math.max(1, Math.floor(count));
  return (
    <figure className="mdx-figure">
      <div className={`image-placeholder image-placeholder--${boxes > 4 ? 'many' : boxes}`}>
        {Array.from({ length: boxes }, (_, i) => (
          <div
            key={i}
            className="image-placeholder__box"
            role="img"
            aria-label={`Photo placeholder: ${label}${boxes > 1 ? ` (${i + 1} of ${boxes})` : ''}`}
          >
            {boxes > 1 && <span aria-hidden="true">{i + 1}/{boxes}</span>}
          </div>
        ))}
      </div>
      <figcaption>{label}</figcaption>
    </figure>
  );
}
