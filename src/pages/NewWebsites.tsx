import websitesData from '../data/websites.json';
import { WebsiteCard } from '../components/ui/WebsiteCard';
import { sortWebsites } from '../utils/sortWebsites';
import type { Website } from '../types/website.types';

const websites = websitesData as Website[];

export default function NewWebsites() {
  const newest = sortWebsites(websites.filter((website) => website.isNew), 'newest');

  return (
    <main className="container-aura py-10 sm:py-12">
      <p className="eyebrow">Fresh finds</p>
      <h1 className="mt-3 font-display text-3xl font-extrabold tracking-[-0.05em] sm:text-4xl">New Websites</h1>
      <p className="mt-3 max-w-2xl text-sm text-aura-muted">Recently added websites from every category.</p>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {newest.map((website) => (
          <WebsiteCard key={website.id} website={website} variant="new" />
        ))}
      </div>
    </main>
  );
}
