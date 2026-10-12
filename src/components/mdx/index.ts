import type { MDXComponents } from 'mdx/types';
import { FigmaEmbed, NotionEmbed, VideoEmbed } from './Embeds';
import { ImagePlaceholder } from './ImagePlaceholder';
import { ThemeComparison } from './ThemeComparison';
import './mdx.css';

// The component vocabulary available inside case study .mdx files
export const mdxComponents: MDXComponents = {
  ImagePlaceholder,
  VideoEmbed,
  FigmaEmbed,
  NotionEmbed,
  ThemeComparison,
};
