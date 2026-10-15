import type { MDXComponents } from 'mdx/types';
import { FigmaEmbed, LiveAppEmbed, MiroEmbed, NotionEmbed, VideoEmbed } from './Embeds';
import { Figure } from './Figure';
import { ImagePlaceholder } from './ImagePlaceholder';
import { ImageSlideshow } from './ImageSlideshow';
import { MediaSplit } from './MediaSplit';
import { ParticipantResponseCarousel } from './ParticipantResponseCarousel';
import { ThemeComparison } from './ThemeComparison';
import { ZoomableImage } from './ZoomableImage';
import './mdx.css';

// The component vocabulary available inside case study .mdx files
export const mdxComponents: MDXComponents = {
  ImagePlaceholder,
  VideoEmbed,
  FigmaEmbed,
  NotionEmbed,
  MiroEmbed,
  LiveAppEmbed,
  ThemeComparison,
  ParticipantResponseCarousel,
  ImageSlideshow,
  Figure,
  MediaSplit,
  ZoomableImage,
};
