import { useEffect, useState } from 'react';
import { useReducedMotion } from '../hooks/useReducedMotion';
import './TypewriterName.css';

// Đ is U+0110 (Vietnamese D with stroke), not the lookalike Ð U+00D0, which
// Patriot doesn't have. NFC so ạ/ê are single code points, typed as one key.
const NAMES = [
  { text: 'David Lê', lang: undefined },
  { text: 'Đạt Lê'.normalize('NFC'), lang: 'vi' },
];

const TYPE_MS = 120;
const DELETE_MS = 60;
const HOLD_MS = 2400;
const GAP_MS = 500;

// Types one name, holds, backspaces it, types the other, on a loop. With
// reduced motion: the first name, static, no cursor.
export function TypewriterName() {
  const reducedMotion = useReducedMotion();
  const [typed, setTyped] = useState({ index: 0, length: 0 });

  useEffect(() => {
    if (reducedMotion) return;
    let cancelled = false;
    let timer = 0;
    const wait = (ms: number) => new Promise((resolve) => (timer = window.setTimeout(resolve, ms)));

    (async () => {
      for (let index = 0; !cancelled; index = (index + 1) % NAMES.length) {
        const length = Array.from(NAMES[index].text).length;
        for (let n = 1; n <= length && !cancelled; n++) {
          setTyped({ index, length: n });
          await wait(TYPE_MS);
        }
        await wait(HOLD_MS);
        for (let n = length - 1; n >= 0 && !cancelled; n--) {
          setTyped({ index, length: n });
          await wait(DELETE_MS);
        }
        await wait(GAP_MS);
      }
    })();

    return () => {
      cancelled = true;
      window.clearTimeout(timer);
    };
  }, [reducedMotion]);

  const name = NAMES[reducedMotion ? 0 : typed.index];
  const shown = reducedMotion ? name.text : Array.from(name.text).slice(0, typed.length).join('');

  return (
    <>
      {/* Screen readers get both names once, not every keystroke */}
      <span className="visually-hidden">
        {NAMES[0].text}, also <span lang="vi">{NAMES[1].text}</span>
      </span>
      <span className="typewriter" aria-hidden="true">
        {/* Invisible full names reserve the longer one's size, so typing never reflows the hero */}
        {NAMES.map((n) => (
          <span key={n.text} className="typewriter__sizer">
            {n.text}
          </span>
        ))}
        <span className="typewriter__text" lang={name.lang}>
          {shown}
          {!reducedMotion && <span className="typewriter__cursor" />}
        </span>
      </span>
    </>
  );
}
