import websitesData from '../data/websites.json';
import { WebsiteCard } from '../components/ui/WebsiteCard';
import { sortWebsites } from '../utils/sortWebsites';
import type { Website } from '../types/website.types';

const websites = websitesData as Website[];

export default function TopRated() {
  const topRated = sortWebsites(websites, 'rating');

  return (
    <main className="container-aura py-10 sm:py-12">
      <p className="eyebrow">Best of directory</p>
      <h1 className="mt-3 font-display text-3xl font-extrabold tracking-[-0.05em] sm:text-4xl">Top Rated</h1>
      <p className="mt-3 max-w-2xl text-sm text-aura-muted">Highest rated verified websites in Link Aura.</p>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {topRated.slice(0, 120).map((website) => (
          <WebsiteCard key={website.id} website={website} />
        ))}
      </div>
    </main>
  );
}
