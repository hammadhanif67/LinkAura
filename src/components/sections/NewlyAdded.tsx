import websitesData from '../../data/websites.json';
import { sortWebsites } from '../../utils/sortWebsites';
import { WebsiteCard } from '../ui/WebsiteCard';
import { SectionHeader } from './SectionHeader';
import type { Website } from '../../types/website.types';

const websites = websitesData as Website[];

export function NewlyAdded() {
  const newest = sortWebsites(websites.filter((website) => website.isNew), 'newest').slice(0, 4);

  return (
    <section className="section-padding bg-white/45 dark:bg-slate-950/20">
      <div className="container-aura">
        <SectionHeader title="Newly Added" subtitle="Fresh verified entries from the catalog." to="/new" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {newest.map((website) => (
            <WebsiteCard key={website.id} website={website} variant="new" />
          ))}
        </div>
      </div>
    </section>
  );
}
