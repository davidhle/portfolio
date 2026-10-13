import { useCaseStudyAsset } from '../../content/case-studies/assets';

interface FigureProps {
  /** Filename in this case study's assets folder (src/content/case-studies/assets/<id>/) */
  src: string;
  alt: string;
  label?: string;
}

// A single captioned image — what an ImagePlaceholder becomes once the photo exists.
export function Figure({ src, alt, label }: FigureProps) {
  const resolve = useCaseStudyAsset();
  return (
    <figure className="mdx-figure">
      <img className="mdx-image" src={resolve(src)} alt={alt} loading="lazy" decoding="async" />
      {label && <figcaption>{label}</figcaption>}
    </figure>
  );
}
