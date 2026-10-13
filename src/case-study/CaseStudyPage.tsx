import { useEffect } from 'react';
import { GlassCard } from '../components/GlassCard';
import { mdxComponents } from '../components/mdx';
import { Signature } from '../components/Signature';
import { CaseStudyIdContext, caseStudyAssetUrl } from '../content/case-studies/assets';
import type { CaseStudyModule } from '../content/case-studies/types';
import { pageTurnName } from '../router';
import { CaseStudyPager } from './CaseStudyPager';
import './CaseStudy.css';

interface CaseStudyPageProps {
  id: string;
  study: CaseStudyModule;
  /** The outline is open beside the column (the column makes room for it) */
  outlineOpen: boolean;
}

const DEFAULT_TITLE = document.title;

// Template for every case study: header from the MDX frontmatter, body from
// the MDX content. The header shares a view-transition-name with the Work
// card it was opened from, so the card morphs into it.
export function CaseStudyPage({ id, study, outlineOpen }: CaseStudyPageProps) {
  const { default: Content, frontmatter: meta } = study;
  const cover = meta.coverImage && caseStudyAssetUrl(id, meta.coverImage);

  useEffect(() => {
    document.title = `${meta.title} — David Lê`;
    return () => {
      document.title = DEFAULT_TITLE;
    };
  }, [meta.title]);

  const details = [
    ['Collaborators', meta.collaborators?.join(', ')],
    ['Affiliations', meta.affiliations],
    ['Location', meta.location],
    ['Year', meta.year],
  ].filter((entry): entry is [string, string] => Boolean(entry[1]));

  return (
    <main className={`page case-study${outlineOpen ? ' case-study--outline-open' : ''}`}>
      <div className="case-study__top">
        <Signature />
        <CaseStudyPager id={id} label="Case studies" />
      </div>

      <GlassCard
        as="header"
        id="top"
        className="case-study__header"
        style={{ viewTransitionName: pageTurnName(id) }}
      >
        {/* Same image (or placeholder art) as the Work card, so the morph reads as one object.
            Decorative: the title below names the project. */}
        {cover ? (
          <img className="case-study__cover case-study__cover--image" src={cover} alt="" decoding="async" />
        ) : (
          <div className="case-study__cover" aria-hidden="true" />
        )}
        {meta.tags && meta.tags.length > 0 && (
          <ul className="case-study__tags" aria-label="Methods">
            {meta.tags.map((tag) => (
              <li key={tag}>{tag}</li>
            ))}
          </ul>
        )}
        <h1 className="case-study__title">{meta.title}</h1>
        {meta.subtitle && <p className="case-study__subtitle">{meta.subtitle}</p>}
        {details.length > 0 && (
          <dl className="case-study__details">
            {details.map(([term, value]) => (
              <div key={term}>
                <dt>{term}</dt>
                <dd>{value}</dd>
              </div>
            ))}
          </dl>
        )}
      </GlassCard>

      <GlassCard as="article" className="case-study__body">
        <CaseStudyIdContext value={id}>
          <Content components={mdxComponents} />
        </CaseStudyIdContext>
      </GlassCard>

      <footer className="case-study__footer">
        <CaseStudyPager id={id} label="Case studies (end of page)" />
      </footer>
    </main>
  );
}
