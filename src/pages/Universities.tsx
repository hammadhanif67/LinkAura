import { useMemo, useState } from 'react';
import { Search } from 'lucide-react';
import { universities, universitySubcategories } from '../data/universities';
import { UniversityCard } from '../components/ui/UniversityCard';
import type { UniversityCategory, UniversityType } from '../types/university.types';

const countries = Array.from(new Set(universities.map((university) => university.country))).sort();
const cities = Array.from(new Set(universities.map((university) => university.city))).sort();
const rankings = Array.from(new Set(universities.map((university) => university.ranking))).sort();

export default function Universities() {
  const [query, setQuery] = useState('');
  const [country, setCountry] = useState('all');
  const [city, setCity] = useState('all');
  const [type, setType] = useState<UniversityType | 'all'>('all');
  const [category, setCategory] = useState<UniversityCategory | 'all'>('all');
  const [ranking, setRanking] = useState('all');
  const [featured, setFeatured] = useState(false);
  const [verified, setVerified] = useState(false);

  const results = useMemo(() => {
    const normalized = query.trim().toLowerCase();

    return universities.filter((university) => {
      const matchesQuery =
        !normalized ||
        university.name.toLowerCase().includes(normalized) ||
        university.country.toLowerCase().includes(normalized) ||
        university.city.toLowerCase().includes(normalized) ||
        university.tags.some((tag) => tag.toLowerCase().includes(normalized));
      const matchesCountry = country === 'all' || university.country === country;
      const matchesCity = city === 'all' || university.city === city;
      const matchesType = type === 'all' || university.type === type;
      const matchesCategory = category === 'all' || university.subcategories.includes(category);
      const matchesRanking = ranking === 'all' || university.ranking === ranking;
      const matchesFeatured = !featured || university.featured;
      const matchesVerified = !verified || university.verified;

      return (
        matchesQuery &&
        matchesCountry &&
        matchesCity &&
        matchesType &&
        matchesCategory &&
        matchesRanking &&
        matchesFeatured &&
        matchesVerified
      );
    });
  }, [category, city, country, featured, query, ranking, type, verified]);

  return (
    <main className="container-aura py-10 sm:py-12">
      <p className="eyebrow">Education & Learning</p>
      <div className="mt-3 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <h1 className="font-display text-3xl font-extrabold tracking-[-0.05em] sm:text-4xl">Universities</h1>
          <p className="mt-3 max-w-2xl text-sm text-aura-muted">
            A global university directory covering Pakistani public/private institutions and major universities worldwide.
          </p>
        </div>
        <strong className="rounded-xl bg-red-50 px-4 py-2 text-sm text-aura-red ring-1 ring-red-100">
          {results.length} universities
        </strong>
      </div>

      <section className="panel mt-8 grid gap-3 p-3 lg:grid-cols-[1.3fr_1fr_1fr_1fr]">
        <label className="field flex items-center gap-2 py-0">
          <Search size={16} className="text-aura-muted" />
          <input
            className="min-w-0 flex-1 bg-transparent py-3 text-sm outline-none"
            value={query}
            placeholder="Search universities, country, city, tags..."
            onChange={(event) => setQuery(event.target.value)}
          />
        </label>
        <select className="field" value={country} onChange={(event) => setCountry(event.target.value)}>
          <option value="all">All countries</option>
          {countries.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
        <select className="field" value={city} onChange={(event) => setCity(event.target.value)}>
          <option value="all">All cities</option>
          {cities.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
        <select className="field" value={type} onChange={(event) => setType(event.target.value as UniversityType | 'all')}>
          <option value="all">Public / Private</option>
          <option value="Public">Public</option>
          <option value="Private">Private</option>
        </select>
        <select
          className="field"
          value={category}
          onChange={(event) => setCategory(event.target.value as UniversityCategory | 'all')}
        >
          <option value="all">All university subcategories</option>
          {universitySubcategories.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
        <select className="field" value={ranking} onChange={(event) => setRanking(event.target.value)}>
          <option value="all">All rankings</option>
          {rankings.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
        <label className="flex items-center gap-2 rounded-xl border border-aura-border bg-aura-card px-4 py-3 text-xs font-bold">
          <input type="checkbox" checked={featured} onChange={(event) => setFeatured(event.target.checked)} />
          Featured
        </label>
        <label className="flex items-center gap-2 rounded-xl border border-aura-border bg-aura-card px-4 py-3 text-xs font-bold">
          <input type="checkbox" checked={verified} onChange={(event) => setVerified(event.target.checked)} />
          Verified
        </label>
      </section>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {results.map((university) => (
          <UniversityCard key={university.id} university={university} />
        ))}
      </div>
    </main>
  );
}
