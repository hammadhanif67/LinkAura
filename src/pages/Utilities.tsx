import { useMemo, useState } from 'react';
import { Search } from 'lucide-react';
import { utilities, utilitySubcategories } from '../data/utilities';
import { UtilityCard } from '../components/ui/UtilityCard';
import type { UtilitySubcategory } from '../types/utility.types';

const provinces = Array.from(new Set(utilities.map((item) => item.province))).sort();
const cities = Array.from(new Set(utilities.map((item) => item.city))).sort();

export default function Utilities() {
  const [query, setQuery] = useState('');
  const [province, setProvince] = useState('all');
  const [city, setCity] = useState('all');
  const [subcategory, setSubcategory] = useState<UtilitySubcategory | 'all'>('all');
  const [featured, setFeatured] = useState(false);
  const [verified, setVerified] = useState(false);

  const results = useMemo(() => {
    const normalized = query.trim().toLowerCase();

    return utilities.filter((item) => {
      const matchesQuery =
        !normalized ||
        item.name.toLowerCase().includes(normalized) ||
        item.description.toLowerCase().includes(normalized) ||
        item.useCase.toLowerCase().includes(normalized) ||
        item.tags.some((tag) => tag.toLowerCase().includes(normalized));

      return (
        matchesQuery &&
        (province === 'all' || item.province === province) &&
        (city === 'all' || item.city === city) &&
        (subcategory === 'all' || item.subcategory === subcategory) &&
        (!featured || item.featured) &&
        (!verified || item.verified)
      );
    });
  }, [city, featured, province, query, subcategory, verified]);

  return (
    <main className="container-aura py-10 sm:py-12">
      <p className="eyebrow">Utilities & Bill Payment</p>
      <div className="mt-3 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <h1 className="font-display text-3xl font-extrabold tracking-[-0.05em] sm:text-4xl">Utilities Directory</h1>
          <p className="mt-3 max-w-2xl text-sm text-aura-muted">
            Pakistan utility providers, telecom companies, internet services, bill payment platforms, and digital wallets.
          </p>
        </div>
        <strong className="rounded-xl bg-red-50 px-4 py-2 text-sm text-aura-red ring-1 ring-red-100">{results.length} services</strong>
      </div>

      <section className="panel mt-8 grid gap-3 p-3 lg:grid-cols-[1.3fr_1fr_1fr_1fr]">
        <div className="lg:col-span-4">
          <p className="mb-2 text-xs font-extrabold text-aura-text">Collections</p>
          <div className="flex flex-wrap gap-2">
            <button className="muted-button px-3 py-2" type="button" onClick={() => setSubcategory('Internet Service Providers (ISP)')}>
              Best Internet Providers
            </button>
            <button className="muted-button px-3 py-2" type="button" onClick={() => setSubcategory('Telecom Providers')}>
              Top Telecom Companies
            </button>
            <button className="muted-button px-3 py-2" type="button" onClick={() => setSubcategory('Electricity')}>
              Electricity Companies
            </button>
            <button className="muted-button px-3 py-2" type="button" onClick={() => setSubcategory('Gas Utilities')}>
              Gas Providers
            </button>
            <button className="muted-button px-3 py-2" type="button" onClick={() => setSubcategory('Bill Payment Platforms')}>
              Bill Payment Platforms
            </button>
            <button className="muted-button px-3 py-2" type="button" onClick={() => setSubcategory('Digital Utility Payments')}>
              Digital Wallets
            </button>
          </div>
        </div>
        <label className="field flex items-center gap-2 py-0">
          <Search size={16} className="text-aura-muted" />
          <input className="min-w-0 flex-1 bg-transparent py-3 text-sm outline-none" value={query} placeholder="Search utilities..." onChange={(event) => setQuery(event.target.value)} />
        </label>
        <select className="field" value={province} onChange={(event) => setProvince(event.target.value)}>
          <option value="all">All provinces</option>
          {provinces.map((item) => <option key={item} value={item}>{item}</option>)}
        </select>
        <select className="field" value={city} onChange={(event) => setCity(event.target.value)}>
          <option value="all">All cities</option>
          {cities.map((item) => <option key={item} value={item}>{item}</option>)}
        </select>
        <select className="field" value={subcategory} onChange={(event) => setSubcategory(event.target.value as UtilitySubcategory | 'all')}>
          <option value="all">All utility types</option>
          {utilitySubcategories.map((item) => <option key={item} value={item}>{item}</option>)}
        </select>
        <label className="flex items-center gap-2 rounded-xl border border-aura-border bg-aura-card px-4 py-3 text-xs font-bold">
          <input type="checkbox" checked={featured} onChange={(event) => setFeatured(event.target.checked)} /> Featured
        </label>
        <label className="flex items-center gap-2 rounded-xl border border-aura-border bg-aura-card px-4 py-3 text-xs font-bold">
          <input type="checkbox" checked={verified} onChange={(event) => setVerified(event.target.checked)} /> Verified
        </label>
      </section>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {results.map((item) => <UtilityCard key={item.id} utility={item} />)}
      </div>
    </main>
  );
}
