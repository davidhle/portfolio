import { forwardRef, type ReactNode } from 'react';
import {
  TransformWrapper,
  TransformComponent,
  type ReactZoomPanPinchContentRef,
} from 'react-zoom-pan-pinch';
import { CANVAS_SIZE } from './canvasConfig';
import './canvas.css';

interface CanvasEngineProps {
  children: ReactNode;
  onInit: (ref: ReactZoomPanPinchContentRef) => void;
}

// Pan-zoom mechanics only — this module has no idea what it's rendering.
// Interaction model (per docs/SPEC.md):
//   - plain scroll / two-finger trackpad drag -> pan
//   - ctrl/cmd + scroll, or trackpad pinch      -> zoom
//     (trackpad pinch is reported by browsers as a wheel event with
//     ctrlKey: true, so checking for Control/Meta covers both)
//   - double-click empty canvas -> step-zoom in
export const CanvasEngine = forwardRef<ReactZoomPanPinchContentRef, CanvasEngineProps>(
  function CanvasEngine({ children, onInit }, ref) {
    return (
      <div className="canvas-viewport">
        <TransformWrapper
          ref={ref}
          initialScale={1}
          minScale={0.35}
          maxScale={2.5}
          limitToBounds={false}
          smooth
          wheel={{
            activationKeys: (keys) => keys.includes('Control') || keys.includes('Meta'),
            step: 0.2,
          }}
          trackPadPanning={{ disabled: false }}
          doubleClick={{ mode: 'zoomIn', step: 0.6 }}
          onInit={onInit}
        >
          <TransformComponent
            wrapperStyle={{ width: '100%', height: '100%' }}
            contentStyle={{ width: CANVAS_SIZE.width, height: CANVAS_SIZE.height }}
          >
            <div className="canvas-surface">{children}</div>
          </TransformComponent>
        </TransformWrapper>
      </div>
    );
  },
);
