import type { ComponentType } from 'react';
import { IntroSection } from './IntroSection';
import { AboutSection } from './AboutSection';
import { WorkSection } from './WorkSection';
import { ContactSection } from './ContactSection';

export interface CanvasSectionData {
  id: string;
  position: { x: number; y: number };
  size: { width: number; height: number };
  Component: ComponentType;
}

// Canvas content as data: adding a new section/sticker later means adding
// an entry here, not touching the canvas engine. Positions are offsets
// (px) from the canvas center.
export const canvasSections: CanvasSectionData[] = [
  { id: 'intro', position: { x: 0, y: 0 }, size: { width: 760, height: 620 }, Component: IntroSection },
  { id: 'about', position: { x: -1900, y: -120 }, size: { width: 640, height: 460 }, Component: AboutSection },
  { id: 'work', position: { x: 1900, y: -120 }, size: { width: 680, height: 500 }, Component: WorkSection },
  { id: 'contact', position: { x: 0, y: 1300 }, size: { width: 560, height: 400 }, Component: ContactSection },
];
