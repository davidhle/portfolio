import { useEffect, useRef, useState } from 'react';
import { useCaseStudyAsset } from '../../content/case-studies/assets';

interface CarouselItem {
  /** Filename in this case study's assets folder (src/content/case-studies/assets/<id>/) */
  src: string;
  alt: string;
}

interface ParticipantResponseCarouselProps {
  label: string;
  items: CarouselItem[];
  /** Auto-scroll speed in px per second. */
  speed?: number;
}

const prefersReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;
/** After a touch/wheel/keyboard scroll, wait this long before auto-scrolling again */
const RESUME_DELAY = 2500;

// A row of image cards that drifts sideways on a seamless loop (the set is
// rendered twice, and the scroll position wraps after one set) and stops
// while the pointer is over it, it has focus, or the reader is scrolling it
// themselves — so a card can actually be read. It's a normal horizontal
// scroller underneath, and the Pause button covers keyboard and touch
// readers. With reduced motion it's just the scrollable row.
export function ParticipantResponseCarousel({ label, items, speed = 30 }: ParticipantResponseCarouselProps) {
  const resolve = useCaseStudyAsset();
  const scroller = useRef<HTMLDivElement>(null);
  const [autoplay] = useState(() => !prefersReducedMotion() && items.length > 1);
  const [paused, setPaused] = useState(false);
  // Read by the animation loop, which shouldn't restart on every toggle
  const pausedRef = useRef(paused);
  useEffect(() => {
    pausedRef.current = paused;
  }, [paused]);

  useEffect(() => {
    const el = scroller.current;
    if (!autoplay || !el) return;

    let hovering = false;
    let focused = false;
    let visible = false;
    let resumeAt = 0;
    let position = el.scrollLeft;
    let lastSet = position;
    let frame = 0;
    let last = 0;

    // Distance from the first card to its duplicate: one full set, gap included
    const loopLength = () => {
      const cards = el.querySelectorAll<HTMLElement>('.response-carousel__card');
      return cards.length > items.length ? cards[items.length].offsetLeft - cards[0].offsetLeft : 0;
    };

    const tick = (now: number) => {
      const dt = last ? Math.min(now - last, 100) / 1000 : 0;
      last = now;
      const loop = loopLength();
      const moving = !pausedRef.current && !hovering && !focused && visible && now >= resumeAt;
      if (moving && loop > 0) {
        position += speed * dt;
        if (position >= loop) position -= loop;
        el.scrollLeft = position;
        lastSet = el.scrollLeft;
      }
      frame = requestAnimationFrame(tick);
    };

    // The reader scrolled it themselves: carry on from there, wrapped into the first set
    const onScroll = () => {
      if (Math.abs(el.scrollLeft - lastSet) < 2) return;
      const loop = loopLength();
      position = loop > 0 && el.scrollLeft >= loop ? el.scrollLeft - loop : el.scrollLeft;
      if (position !== el.scrollLeft) el.scrollLeft = position;
      lastSet = el.scrollLeft;
      resumeAt = performance.now() + RESUME_DELAY;
    };

    const onPointerEnter = (event: PointerEvent) => {
      if (event.pointerType === 'mouse' || event.pointerType === 'pen') hovering = true;
    };
    const onPointerLeave = () => {
      hovering = false;
    };
    const holdOff = () => {
      resumeAt = performance.now() + RESUME_DELAY;
    };
    const onFocusIn = () => {
      focused = true;
    };
    const onFocusOut = (event: FocusEvent) => {
      if (!el.contains(event.relatedTarget as Node)) focused = false;
    };

    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      last = 0;
    });
    observer.observe(el);

    el.addEventListener('scroll', onScroll, { passive: true });
    el.addEventListener('pointerenter', onPointerEnter);
    el.addEventListener('pointerleave', onPointerLeave);
    el.addEventListener('pointerdown', holdOff);
    el.addEventListener('touchmove', holdOff, { passive: true });
    el.addEventListener('focusin', onFocusIn);
    el.addEventListener('focusout', onFocusOut);
    frame = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      el.removeEventListener('scroll', onScroll);
      el.removeEventListener('pointerenter', onPointerEnter);
      el.removeEventListener('pointerleave', onPointerLeave);
      el.removeEventListener('pointerdown', holdOff);
      el.removeEventListener('touchmove', holdOff);
      el.removeEventListener('focusin', onFocusIn);
      el.removeEventListener('focusout', onFocusOut);
    };
  }, [autoplay, items.length, speed]);

  const card = (item: CarouselItem, key: string, duplicate = false) => (
    <li key={key} className="response-carousel__card" aria-hidden={duplicate || undefined}>
      <img src={resolve(item.src)} alt={duplicate ? '' : item.alt} loading="lazy" decoding="async" />
    </li>
  );

  return (
    <figure className="mdx-figure response-carousel">
      <div
        ref={scroller}
        className="response-carousel__scroller"
        role="region"
        aria-label={label}
        tabIndex={0}
      >
        <ul className="response-carousel__track">
          {items.map((item, i) => card(item, `a${i}`))}
          {/* Second copy for the seamless loop — hidden from assistive tech */}
          {autoplay && items.map((item, i) => card(item, `b${i}`, true))}
        </ul>
      </div>
      <figcaption className="response-carousel__caption">
        <span>{label}</span>
        {autoplay && (
          <button
            type="button"
            className="response-carousel__pause"
            aria-pressed={paused}
            onClick={() => setPaused((value) => !value)}
          >
            {paused ? 'Play' : 'Pause'}
          </button>
        )}
      </figcaption>
    </figure>
  );
}
