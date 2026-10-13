import type { ReactNode } from 'react';
import { Figure } from './Figure';
import { ImagePlaceholder } from './ImagePlaceholder';

interface MediaSplitProps {
  /** Which side the image sits on (the prose takes the other). Default "right". */
  side?: 'left' | 'right';
  /** Filename in this case study's assets folder */
  image?: string;
  /** Alt text for `image` */
  alt?: string;
  /** Caption under the image */
  label?: string;
  /** No photo yet: renders an ImagePlaceholder with this label instead */
  placeholderLabel?: string;
  children: ReactNode;
}

// Prose and an image side by side; stacks (prose first) once the column gets
// too narrow for two. Collapse point is a container query, so it follows
// the reading column's width rather than the viewport's.
export function MediaSplit({ side = 'right', image, alt = '', label, placeholderLabel, children }: MediaSplitProps) {
  return (
    <div className={`media-split media-split--image-${side}`}>
      <div className="media-split__grid">
        <div className="media-split__text">{children}</div>
        <div className="media-split__media">
          {image ? (
            <Figure src={image} alt={alt} label={label} />
          ) : (
            <ImagePlaceholder label={placeholderLabel ?? label ?? 'Photo'} />
          )}
        </div>
      </div>
    </div>
  );
}
