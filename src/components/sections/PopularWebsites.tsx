import featuredData from '../../data/featured.json';
import websitesData from '../../data/websites.json';
import { WebsiteCard } from '../ui/WebsiteCard';
import { SectionHeader } from './SectionHeader';
import type { Website } from '../../types/website.types';

const websites = websitesData as Website[];
const featured = featuredData as { popularIds: string[] };

export function PopularWebsites() {
  const popular = featured.popularIds.map((id) => websites.find((website) => website.id === id)).filter(Boolean) as Website[];

  return (
    <section className="section-padding bg-white/45 dark:bg-slate-950/20">
      <div className="container-aura">
        <SectionHeader title="Popular Websites" subtitle="The most visited picks in the directory." to="/top-rated" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {popular.slice(0, 4).map((website) => (
            <WebsiteCard key={website.id} website={website} variant="popular" />
          ))}
        </div>
      </div>
    </section>
  );
}
