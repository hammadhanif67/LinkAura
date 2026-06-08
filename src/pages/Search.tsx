import { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import categoriesData from '../data/categories.json';
import { SearchBar } from '../components/ui/SearchBar';
import { WebsiteCard } from '../components/ui/WebsiteCard';
import { useSearch } from '../hooks/useSearch';
import type { Category } from '../types/category.types';
import type { Region, WebsiteFilters, WebsiteSort } from '../types/website.types';

const categories = categoriesData as Category[];

export default function Search() {
  const [params] = useSearchParams();
  const initialQuery = params.get('q') || '';
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [region, setRegion] = useState<Region | 'all'>('all');
  const [minRating, setMinRating] = useState(0);
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [freeOnly, setFreeOnly] = useState(false);
  const [sort, setSort] = useState<WebsiteSort>('popular');

  const filters = useMemo<WebsiteFilters>(
    () => ({
      categories: selectedCategory === 'all' ? [] : [selectedCategory],
      region,
      minRating,
      verifiedOnly,
      freeOnly,
    }),
    [freeOnly, minRating, region, selectedCategory, verifiedOnly],
  );
  const results = useSearch(initialQuery, filters, sort, 300);

  return (
    <main className="container-aura py-10 sm:py-12">
      <p className="eyebrow">Find faster</p>
      <h1 className="mt-3 font-display text-3xl font-extrabold tracking-[-0.05em] sm:text-4xl">Search</h1>
      <div className="mt-5 max-w-xl">
        <SearchBar large initialValue={initialQuery} autoFocus />
      </div>
      <div className="panel mt-6 grid gap-3 p-3 md:grid-cols-5">
        <select className="field" value={selectedCategory} onChange={(event) => setSelectedCategory(event.target.value)}>
          <option value="all">All categories</option>
          {categories.map((category) => (
            <option key={category.slug} value={category.slug}>
              {category.label}
            </option>
          ))}
        </select>
        <select className="field" value={region} onChange={(event) => setRegion(event.target.value as Region | 'all')}>
          <option value="all">All regions</option>
          <option value="worldwide">Worldwide</option>
          <option value="pakistan">Pakistan</option>
          <option value="usa">USA</option>
          <option value="uk">UK</option>
          <option value="india">India</option>
          <option value="other">Other</option>
        </select>
        <select className="field" value={sort} onChange={(event) => setSort(event.target.value as WebsiteSort)}>
          <option value="popular">Most popular</option>
          <option value="rating">Highest rated</option>
          <option value="newest">Newest added</option>
          <option value="az">A-Z</option>
        </select>
        <label className="flex items-center gap-2 rounded-xl border border-aura-border bg-aura-card px-4 py-3 text-xs font-bold">
          <input type="checkbox" checked={verifiedOnly} onChange={(event) => setVerifiedOnly(event.target.checked)} />
          Verified
        </label>
        <label className="flex items-center gap-2 rounded-xl border border-aura-border bg-aura-card px-4 py-3 text-xs font-bold">
          <input type="checkbox" checked={freeOnly} onChange={(event) => setFreeOnly(event.target.checked)} />
          Free
        </label>
      </div>
      <label className="mt-4 flex max-w-sm items-center gap-3 text-sm text-aura-muted">
        Minimum rating
        <input className="w-full" type="range" min="0" max="5" step="0.5" value={minRating} onChange={(event) => setMinRating(Number(event.target.value))} />
        <span className="font-mono">{minRating}</span>
      </label>
      <p className="mt-6 text-sm font-extrabold text-aura-muted">{results.length} results</p>
      <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {results.map((website) => (
          <WebsiteCard key={website.id} website={website} />
        ))}
      </div>
    </main>
  );
}
