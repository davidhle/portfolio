import { useRef, useState } from 'react';
import type { KeyboardEvent, PointerEvent } from 'react';
import { useCaseStudyAsset } from '../../content/case-studies/assets';

interface SlideshowItem {
  /** Filename in this case study's assets folder (src/content/case-studies/assets/<id>/) */
  src: string;
  alt: string;
}

interface ImageSlideshowProps {
  label: string;
  items: SlideshowItem[];
}

/** Horizontal drag distance (px) that counts as a swipe */
const SWIPE_THRESHOLD = 40;

// One image at a time, paged by the reader: arrow buttons either side, dots
// below, ←/→ keys while focused, and swipe on touch. Stops at the first and
// last image rather than wrapping (it's a booklet: cover to back cover).
export function ImageSlideshow({ label, items }: ImageSlideshowProps) {
  const resolve = useCaseStudyAsset();
  const [index, setIndex] = useState(0);
  const swipeStart = useRef<number | null>(null);
  const last = items.length - 1;

  const go = (next: number) => setIndex(Math.max(0, Math.min(last, next)));

  const onKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'ArrowLeft') go(index - 1);
    else if (event.key === 'ArrowRight') go(index + 1);
    else return;
    event.preventDefault();
  };

  const onPointerDown = (event: PointerEvent) => {
    if (event.pointerType !== 'mouse') swipeStart.current = event.clientX;
  };
  const onPointerUp = (event: PointerEvent) => {
    if (swipeStart.current === null) return;
    const dx = event.clientX - swipeStart.current;
    swipeStart.current = null;
    if (Math.abs(dx) >= SWIPE_THRESHOLD) go(index + (dx < 0 ? 1 : -1));
  };

  return (
    <figure className="mdx-figure slideshow">
      <div
        className="slideshow__frame"
        role="region"
        aria-roledescription="slideshow"
        aria-label={label}
        tabIndex={0}
        onKeyDown={onKeyDown}
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
        onPointerCancel={() => (swipeStart.current = null)}
      >
        <ul className="slideshow__track" style={{ transform: `translateX(-${index * 100}%)` }}>
          {items.map((item, i) => (
            <li
              key={item.src}
              className="slideshow__slide"
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${items.length}`}
              aria-hidden={i !== index || undefined}
              inert={i !== index}
            >
              {/* Eager for the current and neighbouring images so paging doesn't flash */}
              <img src={resolve(item.src)} alt={item.alt} loading={Math.abs(i - index) <= 1 ? 'eager' : 'lazy'} decoding="async" draggable={false} />
            </li>
          ))}
        </ul>

        <button
          type="button"
          className="slideshow__arrow slideshow__arrow--prev"
          aria-label="Previous image"
          disabled={index === 0}
          onClick={() => go(index - 1)}
        >
          <Arrow />
        </button>
        <button
          type="button"
          className="slideshow__arrow slideshow__arrow--next"
          aria-label="Next image"
          disabled={index === last}
          onClick={() => go(index + 1)}
        >
          <Arrow />
        </button>
      </div>

      <div className="slideshow__dots">
        {items.map((item, i) => (
          <button
            key={item.src}
            type="button"
            className="slideshow__dot"
            aria-label={`Go to image ${i + 1}`}
            aria-current={i === index || undefined}
            onClick={() => go(i)}
          />
        ))}
      </div>

      <figcaption className="slideshow__caption">
        <span>{label}</span>
        <span aria-live="polite">
          {index + 1} / {items.length}
        </span>
      </figcaption>
    </figure>
  );
}

function Arrow() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 12h15M13 6l6 6-6 6" />
    </svg>
  );
}
