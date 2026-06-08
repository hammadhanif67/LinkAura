import { ExternalLink, MapPin } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { universities } from '../data/universities';
import { UniversityCard } from '../components/ui/UniversityCard';

export default function UniversityDetail() {
  const { slug } = useParams();
  const university = universities.find((item) => item.slug === slug);

  if (!university) {
    return (
      <main className="container-aura py-16">
        <h1 className="font-display text-3xl font-extrabold tracking-[-0.05em]">University not found</h1>
        <Link className="primary-button mt-5" to="/universities">
          Browse Universities
        </Link>
      </main>
    );
  }

  const similar = universities
    .filter((item) => item.id !== university.id && item.subcategories.some((category) => university.subcategories.includes(category)))
    .slice(0, 4);

  return (
    <main className="container-aura py-10 sm:py-12">
      <section className="panel p-6 sm:p-8">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
          <img className="h-20 w-20 rounded-2xl border border-aura-border bg-white p-3 shadow-sm" src={university.logo} alt="" />
          <div className="min-w-0 flex-1">
            <p className="eyebrow">{university.category}</p>
            <h1 className="mt-3 font-display text-3xl font-extrabold tracking-[-0.05em] sm:text-4xl">{university.name}</h1>
            <p className="mt-3 flex flex-wrap items-center gap-2 text-sm font-semibold text-aura-muted">
              <MapPin size={16} /> {university.city}, {university.country}
            </p>
            <p className="mt-5 max-w-3xl text-sm leading-7 text-aura-muted">{university.description}</p>
            <div className="mt-5 flex flex-wrap gap-2">
              {[university.type, university.ranking, ...(university.establishedYear ? [`Established ${university.establishedYear}`] : []), ...university.tags].map(
                (tag) => (
                  <span key={tag} className="rounded-md bg-slate-50 px-2.5 py-1.5 text-xs font-bold text-aura-muted ring-1 ring-aura-border">
                    {tag}
                  </span>
                ),
              )}
            </div>
          </div>
          <a className="primary-button shrink-0" href={university.website} target="_blank" rel="noopener noreferrer">
            <ExternalLink size={15} /> Official Website
          </a>
        </div>
      </section>

      <section className="mt-10">
        <div className="mb-5 flex items-end justify-between">
          <div>
            <h2 className="font-display text-2xl font-extrabold tracking-[-0.04em]">Similar universities</h2>
            <p className="mt-1 text-sm text-aura-muted">Related universities from matching categories.</p>
          </div>
          <Link className="text-xs font-extrabold text-aura-red hover:underline" to="/universities">
            View all
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {similar.map((item) => (
            <UniversityCard key={item.id} university={item} />
          ))}
        </div>
      </section>
    </main>
  );
}
