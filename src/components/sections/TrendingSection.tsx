import websitesData from '../../data/websites.json';
import { sortWebsites } from '../../utils/sortWebsites';
import { WebsiteCard } from '../ui/WebsiteCard';
import { SectionHeader } from './SectionHeader';
import type { Website } from '../../types/website.types';

const websites = websitesData as Website[];

export function TrendingSection() {
  const trending = sortWebsites(websites.filter((website) => website.isTrending), 'popular').slice(0, 4);

  return (
    <section className="container-aura section-padding">
      <SectionHeader title="Trending This Week" subtitle="Fast-rising links people are opening now." to="/trending" />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {trending.map((website) => (
          <WebsiteCard key={website.id} website={website} variant="trending" />
        ))}
      </div>
    </section>
  );
}
