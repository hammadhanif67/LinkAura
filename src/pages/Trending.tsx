import websitesData from '../data/websites.json';
import { WebsiteCard } from '../components/ui/WebsiteCard';
import { sortWebsites } from '../utils/sortWebsites';
import type { Website } from '../types/website.types';

const websites = websitesData as Website[];

export default function Trending() {
  const trending = sortWebsites(websites.filter((website) => website.isTrending), 'popular');

  return (
    <main className="container-aura py-10 sm:py-12">
      <p className="eyebrow">Momentum</p>
      <h1 className="mt-3 font-display text-3xl font-extrabold tracking-[-0.05em] sm:text-4xl">
        Trending This Week
      </h1>
      <p className="mt-3 max-w-2xl text-sm text-aura-muted">Ranked by clicks, votes, and current momentum.</p>
      <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {trending.map((website) => (
          <WebsiteCard key={website.id} website={website} variant="trending" />
        ))}
      </div>
    </main>
  );
}
