import type { CSSProperties, ReactNode } from 'react';
import { CANVAS_CENTER } from './canvasConfig';

interface CanvasNodeProps {
  id: string;
  position: { x: number; y: number };
  size: { width: number; height: number };
  children: ReactNode;
}

// Positions a section absolutely on the canvas surface from a
// center-relative coordinate, and exposes `id` so the engine's
// zoomToElement(id) can target it by DOM id.
export function CanvasNode({ id, position, size, children }: CanvasNodeProps) {
  const style: CSSProperties = {
    position: 'absolute',
    left: CANVAS_CENTER.x + position.x - size.width / 2,
    top: CANVAS_CENTER.y + position.y - size.height / 2,
    width: size.width,
    height: size.height,
  };

  return (
    <div id={id} className="canvas-node" style={style}>
      {children}
    </div>
  );
}
