import { useMemo, useState } from 'react';
import { Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import { scholarships, scholarshipSubcategories } from '../data/scholarships';
import { ScholarshipCard } from '../components/ui/ScholarshipCard';
import type { DegreeLevel, FundingType, ScholarshipSubcategory } from '../types/scholarship.types';

const countries = Array.from(new Set(scholarships.map((item) => item.country))).sort();
const fundingTypes = Array.from(new Set(scholarships.map((item) => item.fundingType))).sort() as FundingType[];
const degreeLevels = Array.from(new Set(scholarships.map((item) => item.degreeLevel))).sort() as DegreeLevel[];

export default function Scholarships() {
  const [query, setQuery] = useState('');
  const [country, setCountry] = useState('all');
  const [subcategory, setSubcategory] = useState<ScholarshipSubcategory | 'all'>('all');
  const [fundingType, setFundingType] = useState<FundingType | 'all'>('all');
  const [degreeLevel, setDegreeLevel] = useState<DegreeLevel | 'all'>('all');
  const [deadline, setDeadline] = useState('all');
  const [featured, setFeatured] = useState(false);
  const [verified, setVerified] = useState(false);

  const deadlines = useMemo(() => Array.from(new Set(scholarships.map((item) => item.deadline))).sort(), []);

  const results = useMemo(() => {
    const normalized = query.trim().toLowerCase();

    return scholarships.filter((item) => {
      const matchesQuery =
        !normalized ||
        item.name.toLowerCase().includes(normalized) ||
        item.country.toLowerCase().includes(normalized) ||
        item.description.toLowerCase().includes(normalized) ||
        item.tags.some((tag) => tag.toLowerCase().includes(normalized));
      const matchesCountry = country === 'all' || item.country === country;
      const matchesSubcategory = subcategory === 'all' || item.subcategory === subcategory;
      const matchesFundingType = fundingType === 'all' || item.fundingType === fundingType;
      const matchesDegreeLevel = degreeLevel === 'all' || item.degreeLevel === degreeLevel;
      const matchesDeadline = deadline === 'all' || item.deadline === deadline;
      const matchesFeatured = !featured || item.featured;
      const matchesVerified = !verified || item.verified;

      return (
        matchesQuery &&
        matchesCountry &&
        matchesSubcategory &&
        matchesFundingType &&
        matchesDegreeLevel &&
        matchesDeadline &&
        matchesFeatured &&
        matchesVerified
      );
    });
  }, [country, deadline, degreeLevel, featured, fundingType, query, subcategory, verified]);

  return (
    <main className="container-aura py-10 sm:py-12">
      <p className="eyebrow">Scholarships & Study Abroad</p>
      <div className="mt-3 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <h1 className="font-display text-3xl font-extrabold tracking-[-0.05em] sm:text-4xl">Scholarships Directory</h1>
          <p className="mt-3 max-w-2xl text-sm text-aura-muted">
            Verified scholarships, fellowships, study-abroad resources, admissions portals, student visa pages, and research funding.
          </p>
        </div>
        <strong className="rounded-xl bg-red-50 px-4 py-2 text-sm text-aura-red ring-1 ring-red-100">
          {results.length} resources
        </strong>
      </div>

      <section className="panel mt-8 grid gap-3 p-3 lg:grid-cols-[1.3fr_1fr_1fr_1fr]">
        <div className="lg:col-span-4">
          <p className="mb-2 text-xs font-extrabold text-aura-text">Collections</p>
          <div className="flex flex-wrap gap-2">
            <button className="muted-button px-3 py-2" type="button" onClick={() => setFundingType('Fully Funded')}>
              Top Fully Funded
            </button>
            <button className="muted-button px-3 py-2" type="button" onClick={() => setCountry('Pakistan')}>
              Pakistani Students
            </button>
            <button className="muted-button px-3 py-2" type="button" onClick={() => setDegreeLevel('Masters')}>
              Masters Scholarships
            </button>
            <button className="muted-button px-3 py-2" type="button" onClick={() => setDegreeLevel('PhD')}>
              PhD Scholarships
            </button>
            <Link className="muted-button px-3 py-2" to="/study-abroad">
              Study Abroad Guides
            </Link>
            <Link className="muted-button px-3 py-2" to="/student-visas">
              Visa Resources
            </Link>
          </div>
        </div>
        <label className="field flex items-center gap-2 py-0">
          <Search size={16} className="text-aura-muted" />
          <input
            className="min-w-0 flex-1 bg-transparent py-3 text-sm outline-none"
            value={query}
            placeholder="Search scholarships, tags, country..."
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
        <select
          className="field"
          value={subcategory}
          onChange={(event) => setSubcategory(event.target.value as ScholarshipSubcategory | 'all')}
        >
          <option value="all">All subcategories</option>
          {scholarshipSubcategories.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
        <select className="field" value={fundingType} onChange={(event) => setFundingType(event.target.value as FundingType | 'all')}>
          <option value="all">All funding</option>
          {fundingTypes.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
        <select className="field" value={degreeLevel} onChange={(event) => setDegreeLevel(event.target.value as DegreeLevel | 'all')}>
          <option value="all">All degree levels</option>
          {degreeLevels.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
        <select className="field" value={deadline} onChange={(event) => setDeadline(event.target.value)}>
          <option value="all">All deadlines</option>
          {deadlines.map((item) => (
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
        {results.map((item) => (
          <ScholarshipCard key={item.id} scholarship={item} />
        ))}
      </div>
    </main>
  );
}
