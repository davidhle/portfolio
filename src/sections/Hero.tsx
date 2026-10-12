export function Hero() {
  return (
    <header id="top" className="hero">
      <div className="hero__text">
        <p className="hero__greeting">Hi, my name is</p>
        {/* Placeholder — replaced by the calligraphy illustration (PNG) later */}
        <h1 className="hero__name">David</h1>
        {/* Placeholder byline, may change */}
        <p className="hero__byline">M.Sc. HCI Graduate based in Berlin, Germany</p>
      </div>

      {/* Placeholder portrait — swap this div for <img className="hero__portrait" src=… alt=…>;
          the blob clip-path applies to either. */}
      {/* Frame = the blob filled with the card surface; the portrait is the same
          blob inset by the Work cards' padding, leaving a matching border */}
      <div className="hero__portrait-frame">
        <div className="hero__portrait" role="img" aria-label="Portrait of David (placeholder)" />
      </div>

      {/* Organic pebble outline in 0–1 units, so it stretches to the portrait's box */}
      <svg width="0" height="0" aria-hidden="true" focusable="false" className="hero__defs">
        <clipPath id="hero-portrait-blob" clipPathUnits="objectBoundingBox">
          <path d="M0.06,0.46 C0.03,0.22 0.2,0.05 0.44,0.06 C0.62,0.07 0.74,0.01 0.88,0.1 C1.0,0.19 1.0,0.47 0.95,0.66 C0.9,0.85 0.76,0.97 0.55,0.95 C0.4,0.94 0.3,0.99 0.17,0.9 C0.06,0.82 0.08,0.64 0.06,0.46 Z" />
        </clipPath>
      </svg>
    </header>
  );
}
