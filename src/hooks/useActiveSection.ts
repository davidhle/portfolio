import { useCallback, useEffect, useRef, useState } from 'react';

// Scroll-spy: returns the id of the section currently being read — the last
// one whose top has passed 25% of the viewport — or null while in the hero.
// At the very bottom of the page the last section wins, since a short final
// section may never reach that line.
//
// `pin(id)` marks a section active straight away (e.g. on nav click) and
// holds it until the user scrolls by hand, so a section the page can't
// scroll all the way to (near the bottom) still shows as active.
export function useActiveSection(ids: readonly string[]) {
  const [active, setActive] = useState<string | null>(null);
  const pinned = useRef<string | null>(null);

  const pin = useCallback((id: string) => {
    pinned.current = id;
    setActive(id);
  }, []);

  useEffect(() => {
    let frame = 0;

    const update = () => {
      frame = 0;
      if (pinned.current) return;

      const line = window.innerHeight * 0.25;
      const atBottom =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;

      let current: string | null = null;
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= line) current = id;
      }
      if (atBottom && ids.length > 0) current = ids[ids.length - 1];
      setActive(current);
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    // Smooth-scrolling from a nav click also fires `scroll`, so only direct
    // user input releases a pin.
    const unpin = () => {
      if (!pinned.current) return;
      pinned.current = null;
      onScroll();
    };
    const userInput = ['wheel', 'touchmove', 'keydown'] as const;

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    userInput.forEach((type) => window.addEventListener(type, unpin, { passive: true }));
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      userInput.forEach((type) => window.removeEventListener(type, unpin));
    };
  }, [ids]);

  return { active, pin };
}
