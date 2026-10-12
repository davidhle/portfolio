import { GlassCard } from '../components/GlassCard';
import { SocialIcon } from '../components/SocialIcon';
import { contactLinks, cv } from '../data/cv';

export function CV() {
  return (
    <GlassCard as="section" id="cv" className="section cv">
      <h2>CV</h2>

      <div className="cv__groups">
        {cv.map((group) => (
          <div key={group.heading} className="cv__group">
            <h3 className="cv__heading">{group.heading}</h3>
            <ul className="cv__list">
              {group.entries.map((entry) => (
                <li key={`${entry.years}-${entry.title}`} className="cv__entry">
                  <p className="cv__title">
                    ({entry.years}) {entry.title}
                  </p>
                  <p className="cv__place">{entry.place}</p>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <ul className="cv__links">
        {contactLinks.map((link) => (
          <li key={link.href}>
            <a href={link.href} target="_blank" rel="noopener noreferrer" aria-label={link.label}>
              <SocialIcon name={link.icon} />
            </a>
          </li>
        ))}
      </ul>
    </GlassCard>
  );
}
