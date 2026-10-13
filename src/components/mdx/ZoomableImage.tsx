import { useEffect, useRef, useState } from 'react';
import type { PointerEvent as ReactPointerEvent, WheelEvent as ReactWheelEvent } from 'react';
import { useCaseStudyAsset } from '../../content/case-studies/assets';
import { ImagePlaceholder } from './ImagePlaceholder';

interface ZoomableImageProps {
  /** Filename in this case study's assets folder. Omit (with placeholderLabel) while there's no image yet. */
  src?: string;
  alt?: string;
  label?: string;
  /** No image yet: renders an ImagePlaceholder with this label instead */
  placeholderLabel?: string;
}

interface View {
  scale: number;
  x: number;
  y: number;
}

const MAX_ZOOM = 8; // × the fit-to-screen scale

// An image with fine detail (e.g. a Miro board) that opens in a full-screen
// lightbox to explore: wheel / pinch / +− buttons to zoom, drag to pan,
// double-click to zoom in, Esc or × to close.
export function ZoomableImage({ src, alt = '', label, placeholderLabel }: ZoomableImageProps) {
  const resolve = useCaseStudyAsset();
  const url = src ? resolve(src) : undefined;
  const dialog = useRef<HTMLDialogElement>(null);
  const [open, setOpen] = useState(false);

  if (!url) return <ImagePlaceholder label={placeholderLabel ?? label ?? 'Zoomable image'} />;

  const show = () => {
    dialog.current?.showModal();
    setOpen(true);
  };

  return (
    <figure className="mdx-figure zoomable">
      <button type="button" className="zoomable__trigger" onClick={show} aria-label={`Open zoomable view: ${alt || label || 'image'}`}>
        <img className="mdx-image" src={url} alt={alt} loading="lazy" decoding="async" />
        <span className="zoomable__hint" aria-hidden="true">
          <ZoomIcon /> Click to explore
        </span>
      </button>
      {label && <figcaption>{label}</figcaption>}

      <dialog
        ref={dialog}
        className="zoomable__dialog"
        aria-label={alt || label || 'Zoomable image'}
        onClose={() => setOpen(false)}
      >
        {open && <PanZoom src={url} alt={alt} onClose={() => dialog.current?.close()} />}
      </dialog>
    </figure>
  );
}

function PanZoom({ src, alt, onClose }: { src: string; alt: string; onClose: () => void }) {
  const stage = useRef<HTMLDivElement>(null);
  const [view, setView] = useState<View | null>(null);
  const fit = useRef<View>({ scale: 1, x: 0, y: 0 });
  const natural = useRef({ width: 0, height: 0 });
  const pointers = useRef(new Map<number, { x: number; y: number }>());
  const pinch = useRef<{ distance: number; view: View } | null>(null);

  // Lock page scroll behind the lightbox
  useEffect(() => {
    const root = document.documentElement;
    const previous = root.style.overflow;
    root.style.overflow = 'hidden';
    return () => {
      root.style.overflow = previous;
    };
  }, []);

  const fitToStage = () => {
    const el = stage.current;
    const { width, height } = natural.current;
    if (!el || !width) return;
    const rect = el.getBoundingClientRect();
    const scale = Math.min(rect.width / width, rect.height / height);
    fit.current = { scale, x: (rect.width - width * scale) / 2, y: (rect.height - height * scale) / 2 };
    setView(fit.current);
  };

  useEffect(() => {
    window.addEventListener('resize', fitToStage);
    return () => window.removeEventListener('resize', fitToStage);
  }, []);

  // Zoom by `factor` keeping the stage point (px, py) fixed under the cursor
  const zoomAt = (v: View, factor: number, px: number, py: number): View => {
    const min = fit.current.scale;
    const scale = Math.min(min * MAX_ZOOM, Math.max(min, v.scale * factor));
    const k = scale / v.scale;
    return { scale, x: px - (px - v.x) * k, y: py - (py - v.y) * k };
  };

  const stagePoint = (clientX: number, clientY: number) => {
    const rect = stage.current!.getBoundingClientRect();
    return [clientX - rect.left, clientY - rect.top] as const;
  };

  const zoomCenter = (factor: number) => {
    const rect = stage.current!.getBoundingClientRect();
    setView((v) => v && zoomAt(v, factor, rect.width / 2, rect.height / 2));
  };

  const onWheel = (event: ReactWheelEvent) => {
    const [px, py] = stagePoint(event.clientX, event.clientY);
    setView((v) => v && zoomAt(v, Math.exp(-event.deltaY * 0.0015), px, py));
  };

  const onPointerDown = (event: ReactPointerEvent) => {
    (event.currentTarget as HTMLElement).setPointerCapture(event.pointerId);
    pointers.current.set(event.pointerId, { x: event.clientX, y: event.clientY });
    if (pointers.current.size === 2 && view) {
      const [a, b] = [...pointers.current.values()];
      pinch.current = { distance: Math.hypot(a.x - b.x, a.y - b.y), view };
    }
  };

  const onPointerMove = (event: ReactPointerEvent) => {
    const previous = pointers.current.get(event.pointerId);
    if (!previous || !view) return;
    pointers.current.set(event.pointerId, { x: event.clientX, y: event.clientY });

    if (pointers.current.size === 2 && pinch.current) {
      const [a, b] = [...pointers.current.values()];
      const [px, py] = stagePoint((a.x + b.x) / 2, (a.y + b.y) / 2);
      const factor = Math.hypot(a.x - b.x, a.y - b.y) / pinch.current.distance;
      setView(zoomAt(pinch.current.view, factor, px, py));
    } else if (pointers.current.size === 1) {
      setView({ ...view, x: view.x + event.clientX - previous.x, y: view.y + event.clientY - previous.y });
    }
  };

  const onPointerUp = (event: ReactPointerEvent) => {
    pointers.current.delete(event.pointerId);
    if (pointers.current.size < 2) pinch.current = null;
  };

  return (
    <div className="zoomable__lightbox">
      <div
        ref={stage}
        className="zoomable__stage"
        onWheel={onWheel}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        onDoubleClick={(event) => {
          const [px, py] = stagePoint(event.clientX, event.clientY);
          setView((v) => v && zoomAt(v, 2, px, py));
        }}
      >
        <img
          src={src}
          alt={alt}
          draggable={false}
          onLoad={(event) => {
            natural.current = { width: event.currentTarget.naturalWidth, height: event.currentTarget.naturalHeight };
            fitToStage();
          }}
          style={
            view
              ? { transform: `translate(${view.x}px, ${view.y}px) scale(${view.scale})` }
              : { visibility: 'hidden' }
          }
        />
      </div>
      <div className="zoomable__controls">
        <button type="button" onClick={() => zoomCenter(1.5)} aria-label="Zoom in">
          +
        </button>
        <button type="button" onClick={() => zoomCenter(1 / 1.5)} aria-label="Zoom out">
          −
        </button>
        <button type="button" onClick={fitToStage}>
          Fit
        </button>
        <button type="button" onClick={onClose} aria-label="Close" autoFocus>
          ×
        </button>
      </div>
    </div>
  );
}

function ZoomIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" aria-hidden="true" focusable="false" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
      <circle cx="10.5" cy="10.5" r="6.5" />
      <path d="M15.5 15.5 21 21M10.5 7.5v6M7.5 10.5h6" />
    </svg>
  );
}
