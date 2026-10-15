import type { CSSProperties, ReactNode } from 'react';

interface EmbedProps {
  src: string;
  label: string;
}

interface EmbedFrameProps extends EmbedProps {
  variant: 'video' | 'figma' | 'notion' | 'miro' | 'app';
  allow?: string;
  style?: CSSProperties;
  /** Extra caption content after the label */
  children?: ReactNode;
  /** Sticky note taped above the frame's top edge */
  note?: ReactNode;
}

// Lazy-loaded iframe in a captioned figure; sizing per embed type lives in mdx.css.
function EmbedFrame({ src, label, variant, allow, style, children, note }: EmbedFrameProps) {
  return (
    <figure className="mdx-figure">
      {note && <p className="embed-note">{note}</p>}
      <div className={`embed embed--${variant}`} style={style}>
        <iframe src={src} title={label} loading="lazy" allow={allow} allowFullScreen />
      </div>
      <figcaption>
        {label}
        {children}
      </figcaption>
    </figure>
  );
}

/** Accepts a YouTube watch/share link (rewritten to a privacy-enhanced embed) or a direct video file. */
export function VideoEmbed({ src, label }: EmbedProps) {
  if (/\.(mp4|webm)(\?|$)/i.test(src)) {
    return (
      <figure className="mdx-figure">
        <div className="embed embed--video">
          <video src={src} controls preload="metadata" aria-label={label} />
        </div>
        <figcaption>{label}</figcaption>
      </figure>
    );
  }
  return (
    <EmbedFrame
      src={youTubeEmbedUrl(src)}
      label={label}
      variant="video"
      allow="accelerometer; encrypted-media; gyroscope; picture-in-picture; web-share"
    />
  );
}

interface FigmaEmbedProps extends EmbedProps {
  /**
   * The prototype's frame size in px (W and H of the top-level frame in
   * Figma). Only the ratio matters. Defaults to 1440×1024. Figma's embed
   * doesn't expose the frame size, so it can't be detected.
   */
  frameWidth?: number;
  frameHeight?: number;
}

/**
 * `src` is a Figma embed URL (embed.figma.com/…), as copied from Share → Embed,
 * with `scaling=fit-width`. The prototype area is sized to the frame's exact
 * ratio (no room left for Figma's letterbox bars), plus Figma's toolbar below.
 */
export function FigmaEmbed({ src, label, frameWidth = 1440, frameHeight = 1024 }: FigmaEmbedProps) {
  const ratio = frameWidth > 0 && frameHeight > 0 ? frameWidth / frameHeight : 1440 / 1024;
  return (
    <EmbedFrame
      src={src}
      label={label}
      variant="figma"
      style={{ '--prototype-aspect': ratio } as CSSProperties}
    />
  );
}

/** `src` is a published Notion page's embed URL (…notion.site/ebd/…). */
export function NotionEmbed({ src, label }: EmbedProps) {
  return <EmbedFrame src={src} label={label} variant="notion" />;
}

interface MiroEmbedProps extends EmbedProps {
  /** Size from Miro's embed code (only the ratio is used). Defaults to Miro's 768×496. */
  width?: number;
  height?: number;
}

/**
 * `src` is the live-embed URL from Miro's Share → Embed code
 * (miro.com/app/live-embed/…). The board must be viewable by anyone with
 * the link, or visitors get a Miro login screen instead.
 */
export function MiroEmbed({ src, label, width = 768, height = 496 }: MiroEmbedProps) {
  return (
    <EmbedFrame
      src={src}
      label={label}
      variant="miro"
      allow="fullscreen"
      style={{ aspectRatio: `${width} / ${height}` }}
    />
  );
}

/**
 * A live, interactive view of a deployed web app (e.g. one of Dabble's views
 * on GitHub Pages). The app is responsive, so the frame is a fixed height
 * rather than a design-frame ratio. The site must not send X-Frame-Options
 * or a CSP frame-ancestors that blocks embedding — check before using.
 * `note` adds a sticky note above the frame, e.g. pointing at the app's own
 * controls.
 */
export function LiveAppEmbed({ src, label, note }: EmbedProps & { note?: ReactNode }) {
  return (
    <EmbedFrame src={src} label={label} variant="app" note={note}>
      {' · '}
      <a href={src} target="_blank" rel="noopener noreferrer" aria-label={`${label}: open in new tab`}>
        Open in new tab ↗
      </a>
    </EmbedFrame>
  );
}

function youTubeEmbedUrl(src: string) {
  try {
    const url = new URL(src);
    let id: string | null = null;
    if (url.hostname === 'youtu.be') id = url.pathname.slice(1);
    else if (url.hostname.endsWith('youtube.com')) {
      id = url.searchParams.get('v') ?? url.pathname.match(/^\/(?:embed|shorts)\/([\w-]+)/)?.[1] ?? null;
    }
    return id ? `https://www.youtube-nocookie.com/embed/${id}` : src;
  } catch {
    return src;
  }
}

