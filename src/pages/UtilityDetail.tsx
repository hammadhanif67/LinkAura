import { ExternalLink, MapPin, Star } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { utilities } from '../data/utilities';
import { UtilityCard } from '../components/ui/UtilityCard';

export default function UtilityDetail() {
  const { slug } = useParams();
  const utility = utilities.find((item) => item.slug === slug);

  if (!utility) {
    return (
      <main className="container-aura py-16">
        <h1 className="font-display text-3xl font-extrabold tracking-[-0.05em]">Utility service not found</h1>
        <Link className="primary-button mt-5" to="/utilities">Browse Utilities</Link>
      </main>
    );
  }

  const similar = utilities.filter((item) => item.id !== utility.id && item.subcategory === utility.subcategory).slice(0, 4);

  return (
    <main className="container-aura py-10 sm:py-12">
      <section className="panel p-6 sm:p-8">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
          <img className="h-20 w-20 rounded-2xl border border-aura-border bg-white p-3 shadow-sm" src={utility.logo} alt="" />
          <div className="min-w-0 flex-1">
            <p className="eyebrow">{utility.subcategory}</p>
            <h1 className="mt-3 font-display text-3xl font-extrabold tracking-[-0.05em] sm:text-4xl">{utility.name}</h1>
            <p className="mt-3 flex flex-wrap items-center gap-3 text-sm font-semibold text-aura-muted">
              <span className="inline-flex items-center gap-1"><MapPin size={16} /> {utility.city}, {utility.province}</span>
              <span className="inline-flex items-center gap-1"><Star size={16} className="text-amber-500" fill="currentColor" /> {utility.rating}</span>
            </p>
            <p className="mt-5 max-w-3xl text-sm leading-7 text-aura-muted">{utility.description}</p>
            <div className="mt-5 flex flex-wrap gap-2">
              {[utility.category, utility.subcategory, utility.country, utility.province, utility.verified ? 'Verified' : 'Unverified', ...utility.tags].map((tag) => (
                <span key={tag} className="rounded-md bg-slate-50 px-2.5 py-1.5 text-xs font-bold text-aura-muted ring-1 ring-aura-border dark:bg-white/5">{tag}</span>
              ))}
            </div>
          </div>
          <a className="primary-button shrink-0" href={utility.website} target="_blank" rel="noopener noreferrer">
            <ExternalLink size={15} /> Visit Website
          </a>
        </div>
      </section>
      <section className="mt-10">
        <div className="mb-5 flex items-end justify-between">
          <div>
            <h2 className="font-display text-2xl font-extrabold tracking-[-0.04em]">Similar services</h2>
            <p className="mt-1 text-sm text-aura-muted">Related utility providers and payment platforms.</p>
          </div>
          <Link className="text-xs font-extrabold text-aura-red hover:underline" to="/utilities">View all</Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {similar.map((item) => <UtilityCard key={item.id} utility={item} />)}
        </div>
      </section>
    </main>
  );
}
