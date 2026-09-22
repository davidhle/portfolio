import { useCallback, useRef } from 'react';
import type { ReactZoomPanPinchContentRef } from 'react-zoom-pan-pinch';
import { CanvasEngine } from './canvas/CanvasEngine';
import { CanvasNode } from './canvas/CanvasNode';
import { NavigationContext } from './canvas/NavigationContext';
import { ZoomControls } from './components/ZoomControls';
import { canvasSections } from './content/canvasSections';

function App() {
  const transformRef = useRef<ReactZoomPanPinchContentRef | null>(null);

  const navigateTo = useCallback((nodeId: string) => {
    transformRef.current?.zoomToElement(nodeId, { maxScale: 1.1 }, 650, 'easeInOutCubic');
  }, []);

  const focusIntroOnLoad = useCallback((ref: ReactZoomPanPinchContentRef) => {
    ref.zoomToElement('intro', 1, 0);
  }, []);

  return (
    <NavigationContext.Provider value={navigateTo}>
      <CanvasEngine ref={transformRef} onInit={focusIntroOnLoad}>
        {canvasSections.map(({ id, position, size, Component }) => (
          <CanvasNode key={id} id={id} position={position} size={size}>
            <Component />
          </CanvasNode>
        ))}
      </CanvasEngine>
      <ZoomControls transformRef={transformRef} />
    </NavigationContext.Provider>
  );
}

export default App;
