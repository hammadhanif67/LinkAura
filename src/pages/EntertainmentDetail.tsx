import { ExternalLink, Star } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { entertainmentPlatforms } from '../data/entertainment';
import { EntertainmentCard } from '../components/ui/EntertainmentCard';

export default function EntertainmentDetail() {
  const { slug } = useParams();
  const platform = entertainmentPlatforms.find((item) => item.slug === slug);

  if (!platform) {
    return (
      <main className="container-aura py-16">
        <h1 className="font-display text-3xl font-extrabold tracking-[-0.05em]">Entertainment platform not found</h1>
        <Link className="primary-button mt-5" to="/entertainment">Browse Entertainment</Link>
      </main>
    );
  }

  const similar = entertainmentPlatforms.filter((item) => item.id !== platform.id && item.subcategory === platform.subcategory).slice(0, 4);

  return (
    <main className="container-aura py-10 sm:py-12">
      <section className="panel p-6 sm:p-8">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
          <img className="h-20 w-20 rounded-2xl border border-aura-border bg-white p-3 shadow-sm" src={platform.logo} alt="" />
          <div className="min-w-0 flex-1">
            <p className="eyebrow">{platform.subcategory}</p>
            <h1 className="mt-3 font-display text-3xl font-extrabold tracking-[-0.05em] sm:text-4xl">{platform.name}</h1>
            <p className="mt-3 flex flex-wrap items-center gap-3 text-sm font-semibold text-aura-muted">
              <span className="inline-flex items-center gap-1"><Star size={16} className="text-amber-500" fill="currentColor" /> {platform.rating}</span>
              <span>{platform.country}</span>
              <span>{platform.pricing}</span>
            </p>
            <p className="mt-5 max-w-3xl text-sm leading-7 text-aura-muted">{platform.description}</p>
            <div className="mt-5 flex flex-wrap gap-2">
              {[platform.category, platform.subcategory, platform.contentType, platform.pricing, platform.verified ? 'Verified' : 'Unverified', ...platform.tags].map((tag) => (
                <span key={tag} className="rounded-md bg-slate-50 px-2.5 py-1.5 text-xs font-bold text-aura-muted ring-1 ring-aura-border dark:bg-white/5">{tag}</span>
              ))}
            </div>
          </div>
          <a className="primary-button shrink-0" href={platform.website} target="_blank" rel="noopener noreferrer">
            <ExternalLink size={15} /> Visit Website
          </a>
        </div>
      </section>
      <section className="mt-10">
        <div className="mb-5 flex items-end justify-between">
          <div>
            <h2 className="font-display text-2xl font-extrabold tracking-[-0.04em]">Similar platforms</h2>
            <p className="mt-1 text-sm text-aura-muted">Related entertainment and media resources.</p>
          </div>
          <Link className="text-xs font-extrabold text-aura-red hover:underline" to="/entertainment">View all</Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {similar.map((item) => <EntertainmentCard key={item.id} platform={item} />)}
        </div>
      </section>
    </main>
  );
}
