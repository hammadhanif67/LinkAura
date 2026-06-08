import { useMemo, useState } from 'react';
import { Search } from 'lucide-react';
import { entertainmentPlatforms, entertainmentSubcategories } from '../data/entertainment';
import { EntertainmentCard } from '../components/ui/EntertainmentCard';
import type { EntertainmentPricing, EntertainmentSubcategory } from '../types/entertainment.types';

const countries = Array.from(new Set(entertainmentPlatforms.map((item) => item.country))).sort();
const contentTypes = Array.from(new Set(entertainmentPlatforms.map((item) => item.contentType))).sort();
const pricingOptions: EntertainmentPricing[] = ['Free', 'Freemium', 'Paid'];

export default function Entertainment() {
  const [query, setQuery] = useState('');
  const [subcategory, setSubcategory] = useState<EntertainmentSubcategory | 'all'>('all');
  const [pricing, setPricing] = useState<EntertainmentPricing | 'all'>('all');
  const [country, setCountry] = useState('all');
  const [contentType, setContentType] = useState('all');
  const [featured, setFeatured] = useState(false);
  const [verified, setVerified] = useState(false);

  const results = useMemo(() => {
    const normalized = query.trim().toLowerCase();

    return entertainmentPlatforms.filter((item) => {
      const matchesQuery =
        !normalized ||
        item.name.toLowerCase().includes(normalized) ||
        item.description.toLowerCase().includes(normalized) ||
        item.contentType.toLowerCase().includes(normalized) ||
        item.tags.some((tag) => tag.toLowerCase().includes(normalized));

      return (
        matchesQuery &&
        (subcategory === 'all' || item.subcategory === subcategory) &&
        (pricing === 'all' || item.pricing === pricing) &&
        (country === 'all' || item.country === country) &&
        (contentType === 'all' || item.contentType === contentType) &&
        (!featured || item.featured) &&
        (!verified || item.verified)
      );
    });
  }, [contentType, country, featured, pricing, query, subcategory, verified]);

  return (
    <main className="container-aura py-10 sm:py-12">
      <p className="eyebrow">Entertainment & Streaming</p>
      <div className="mt-3 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <h1 className="font-display text-3xl font-extrabold tracking-[-0.05em] sm:text-4xl">Media Directory</h1>
          <p className="mt-3 max-w-2xl text-sm text-aura-muted">
            Streaming services, anime, sports, music, live TV, databases, reviews, entertainment news, trailers, and podcasts.
          </p>
        </div>
        <strong className="rounded-xl bg-red-50 px-4 py-2 text-sm text-aura-red ring-1 ring-red-100">{results.length} platforms</strong>
      </div>

      <section className="panel mt-8 grid gap-3 p-3 lg:grid-cols-[1.3fr_1fr_1fr_1fr]">
        <div className="lg:col-span-4">
          <p className="mb-2 text-xs font-extrabold text-aura-text">Collections</p>
          <div className="flex flex-wrap gap-2">
            <button className="muted-button px-3 py-2" type="button" onClick={() => setSubcategory('Movie Streaming')}>Movie Streaming</button>
            <button className="muted-button px-3 py-2" type="button" onClick={() => setSubcategory('Anime Streaming')}>Anime Websites</button>
            <button className="muted-button px-3 py-2" type="button" onClick={() => setSubcategory('Music Streaming')}>Music Apps</button>
            <button className="muted-button px-3 py-2" type="button" onClick={() => setSubcategory('Sports Streaming')}>Sports Streaming</button>
            <button className="muted-button px-3 py-2" type="button" onClick={() => setSubcategory('Movie Reviews')}>Movie Reviews</button>
            <button className="muted-button px-3 py-2" type="button" onClick={() => setSubcategory('Entertainment News')}>Entertainment News</button>
          </div>
        </div>
        <label className="field flex items-center gap-2 py-0">
          <Search size={16} className="text-aura-muted" />
          <input className="min-w-0 flex-1 bg-transparent py-3 text-sm outline-none" value={query} placeholder="Search media platforms..." onChange={(event) => setQuery(event.target.value)} />
        </label>
        <select className="field" value={subcategory} onChange={(event) => setSubcategory(event.target.value as EntertainmentSubcategory | 'all')}>
          <option value="all">All subcategories</option>
          {entertainmentSubcategories.map((item) => <option key={item} value={item}>{item}</option>)}
        </select>
        <select className="field" value={pricing} onChange={(event) => setPricing(event.target.value as EntertainmentPricing | 'all')}>
          <option value="all">Free / Paid</option>
          {pricingOptions.map((item) => <option key={item} value={item}>{item}</option>)}
        </select>
        <select className="field" value={country} onChange={(event) => setCountry(event.target.value)}>
          <option value="all">All countries</option>
          {countries.map((item) => <option key={item} value={item}>{item}</option>)}
        </select>
        <select className="field lg:col-span-2" value={contentType} onChange={(event) => setContentType(event.target.value)}>
          <option value="all">All content types</option>
          {contentTypes.map((item) => <option key={item} value={item}>{item}</option>)}
        </select>
        <label className="flex items-center gap-2 rounded-xl border border-aura-border bg-aura-card px-4 py-3 text-xs font-bold">
          <input type="checkbox" checked={featured} onChange={(event) => setFeatured(event.target.checked)} /> Featured
        </label>
        <label className="flex items-center gap-2 rounded-xl border border-aura-border bg-aura-card px-4 py-3 text-xs font-bold">
          <input type="checkbox" checked={verified} onChange={(event) => setVerified(event.target.checked)} /> Verified
        </label>
      </section>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {results.map((item) => <EntertainmentCard key={item.id} platform={item} />)}
      </div>
    </main>
  );
}
