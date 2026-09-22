import type { RefObject } from 'react';
import type { ReactZoomPanPinchContentRef } from 'react-zoom-pan-pinch';

interface ZoomControlsProps {
  transformRef: RefObject<ReactZoomPanPinchContentRef | null>;
}

// Visible fallback for the scroll/pinch zoom gesture — for discoverability
// and for mouse-only setups without a modifier-scroll or pinch input.
export function ZoomControls({ transformRef }: ZoomControlsProps) {
  return (
    <div className="zoom-controls" role="group" aria-label="Zoom controls">
      <button type="button" aria-label="Zoom in" onClick={() => transformRef.current?.zoomIn()}>
        +
      </button>
      <button type="button" aria-label="Zoom out" onClick={() => transformRef.current?.zoomOut()}>
        &minus;
      </button>
    </div>
  );
}
