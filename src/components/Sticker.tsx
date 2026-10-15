import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react';
import './Sticker.css';

/** Die-cut outlines, from the same family as the hero portrait's blob */
export type StickerShape = 'blob-a' | 'blob-b' | 'blob-c';

interface StickerProps {
  /** Resting tilt, in degrees */
  rotate?: number;
  /** Die-cut outline; omit for a plain rounded sticker */
  shape?: StickerShape;
  /** Brought to the foreground (tap / keyboard), on top of hover */
  raised?: boolean;
  /** Makes the sticker a button that toggles `raised` */
  onToggle?: () => void;
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
}

// Shared sticker wrapper (see docs/SPEC.md → Architecture → Stickers): tilt,
// shadow, white die-cut border, and lift-to-foreground on hover/focus/tap.
// Content is anything — photos now, illustrated hobby icons later.
export function Sticker({ rotate = 0, shape, raised = false, onToggle, className, style, children }: StickerProps) {
  const classes = ['sticker', shape && `sticker--${shape}`, raised && 'sticker--raised', className]
    .filter(Boolean)
    .join(' ');
  const vars = { '--sticker-rotate': `${rotate}deg`, ...style } as CSSProperties;
  const die = <span className="sticker__die">{children}</span>;

  if (!onToggle) {
    return (
      <div className={classes} style={vars}>
        {die}
      </div>
    );
  }

  return (
    <button
      type="button"
      className={classes}
      style={vars}
      aria-pressed={raised}
      // Mouse users get hover; touch/pen taps toggle (hover doesn't exist there)
      onPointerUp={(e) => e.pointerType !== 'mouse' && onToggle()}
      // Keyboard activation (Enter/Space) arrives as a click with no pointer
      onClick={(e) => e.detail === 0 && onToggle()}
    >
      {die}
    </button>
  );
}

export interface ScatterPhoto {
  src: string;
  alt: string;
  rotate: number;
  shape: StickerShape;
  /** Share of the row's width, e.g. 0.2 */
  width: number;
  /** Intrinsic width / height, so the space is held while the photo lazy-loads */
  aspect: number;
  /**
   * Free placement (`free` scatters only): x/y from 0 (left/top edge) to 1
   * (right/bottom edge), always kept inside the box; w = share of its width.
   */
  place?: { x: number; y: number; w: number };
}

interface StickerScatterProps {
  photos: ScatterPhoto[];
  /** Placed by each photo's `place` across the box (from 1024px; a zigzag row below) */
  free?: boolean;
  className?: string;
}

// Photos scattered across the page; one at a time can be tapped to the
// foreground, and tapping anywhere else puts it back.
export function StickerScatter({ photos, free = false, className }: StickerScatterProps) {
  const [raised, setRaised] = useState<number | null>(null);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (raised === null) return;
    const onPointerDown = (e: PointerEvent) => {
      const active = ref.current?.children[raised];
      if (!active?.contains(e.target as Node)) setRaised(null);
    };
    document.addEventListener('pointerdown', onPointerDown);
    return () => document.removeEventListener('pointerdown', onPointerDown);
  }, [raised]);

  return (
    <div
      ref={ref}
      className={['sticker-scatter', free && 'sticker-scatter--free', className].filter(Boolean).join(' ')}
    >
      {photos.map((photo, i) => (
        <Sticker
          key={photo.src}
          rotate={photo.rotate}
          shape={photo.shape}
          raised={raised === i}
          onToggle={() => setRaised((current) => (current === i ? null : i))}
          style={
            {
              '--sticker-width': photo.width,
              '--place-x': photo.place?.x,
              '--place-y': photo.place?.y,
              '--place-w': photo.place?.w,
            } as CSSProperties
          }
        >
          <img
            src={photo.src}
            alt={photo.alt}
            loading="lazy"
            decoding="async"
            style={{ aspectRatio: photo.aspect }}
          />
        </Sticker>
      ))}
    </div>
  );
}

/** The die-cut outlines as SVG clip paths, in 0–1 units so they stretch to any sticker. Render once per page. */
export function StickerDefs() {
  return (
    <svg width="0" height="0" aria-hidden="true" focusable="false" className="sticker-defs">
      {/* Pebble — the hero portrait's outline */}
      <clipPath id="sticker-blob-a" clipPathUnits="objectBoundingBox">
        <path d="M0.06,0.46 C0.03,0.22 0.2,0.05 0.44,0.06 C0.62,0.07 0.74,0.01 0.88,0.1 C1.0,0.19 1.0,0.47 0.95,0.66 C0.9,0.85 0.76,0.97 0.55,0.95 C0.4,0.94 0.3,0.99 0.17,0.9 C0.06,0.82 0.08,0.64 0.06,0.46 Z" />
      </clipPath>
      {/* Squashed bean, heavier at the bottom left */}
      <clipPath id="sticker-blob-b" clipPathUnits="objectBoundingBox">
        <path d="M0.1,0.2 C0.18,0.04 0.42,0.02 0.6,0.04 C0.8,0.06 0.97,0.14 0.97,0.36 C0.97,0.55 0.93,0.7 0.94,0.83 C0.95,0.96 0.78,0.99 0.6,0.97 C0.4,0.95 0.22,0.99 0.09,0.9 C0.0,0.83 0.03,0.62 0.04,0.48 C0.05,0.36 0.04,0.3 0.1,0.2 Z" />
      </clipPath>
      {/* Lumpy oval with a soft notch on the right */}
      <clipPath id="sticker-blob-c" clipPathUnits="objectBoundingBox">
        <path d="M0.5,0.02 C0.72,0.01 0.93,0.1 0.97,0.3 C1.0,0.44 0.9,0.5 0.93,0.62 C0.97,0.8 0.85,0.97 0.6,0.98 C0.4,0.99 0.15,0.96 0.06,0.8 C-0.01,0.66 0.04,0.5 0.03,0.36 C0.02,0.16 0.26,0.03 0.5,0.02 Z" />
      </clipPath>
    </svg>
  );
}
