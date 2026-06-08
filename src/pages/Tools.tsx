import websitesData from '../data/websites.json';
import { WebsiteCard } from '../components/ui/WebsiteCard';
import { sortWebsites } from '../utils/sortWebsites';
import type { Website } from '../types/website.types';

const websites = websitesData as Website[];
const toolCategories = ['ai-tools', 'developer-tools', 'design-creative', 'productivity-tools', 'cybersecurity-privacy', 'miscellaneous-useful'];

export default function Tools() {
  const tools = sortWebsites(websites.filter((website) => toolCategories.includes(website.category)), 'popular');

  return (
    <main className="container-aura py-10 sm:py-12">
      <p className="eyebrow">Useful toolkit</p>
      <h1 className="mt-3 font-display text-3xl font-extrabold tracking-[-0.05em] sm:text-4xl">Tools</h1>
      <p className="mt-3 max-w-2xl text-sm text-aura-muted">
        Developer, AI, productivity, design, cybersecurity, and everyday utility websites.
      </p>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {tools.map((website) => (
          <WebsiteCard key={website.id} website={website} />
        ))}
      </div>
    </main>
  );
}
