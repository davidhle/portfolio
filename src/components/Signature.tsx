import { goHome, handleLinkClick } from '../router';
import './Signature.css';

// "David Lê" signature sticker — the way back to the one-pager from a case
// study. Placeholder lettering until the calligraphy PNG (same style as the
// hero name) exists; swap the text for an <img> with alt="David Lê".
export function Signature() {
  return (
    <a
      href="/#work"
      className="signature"
      aria-label="David Lê — back to the portfolio"
      onClick={(event) => handleLinkClick(event, goHome)}
    >
      David Lê
    </a>
  );
}
