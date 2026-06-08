import { ArrowUpRight, CheckCircle2, MapPin, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { University } from '../../types/university.types';

interface UniversityCardProps {
  university: University;
}

export function UniversityCard({ university }: UniversityCardProps) {
  return (
    <article className="panel relative flex min-h-[220px] flex-col p-4 transition duration-200 hover:border-red-200 hover:shadow-aura">
      {university.featured ? (
        <span className="absolute right-3 top-3 rounded-full bg-red-50 px-2.5 py-1 text-[0.62rem] font-extrabold text-aura-red ring-1 ring-red-100">
          Featured
        </span>
      ) : null}

      <div className="flex min-w-0 items-start gap-3 pr-16">
        <img className="h-11 w-11 shrink-0 rounded-xl border border-aura-border bg-white p-2 shadow-sm" src={university.logo} alt="" />
        <div className="min-w-0">
          <div className="flex items-center gap-1.5">
            <h3 className="truncate text-sm font-extrabold tracking-[-0.02em]">{university.name}</h3>
            {university.verified ? <CheckCircle2 className="shrink-0 text-emerald-500" size={14} /> : null}
          </div>
          <p className="mt-1 flex items-center gap-1 truncate text-xs font-semibold text-aura-muted">
            <MapPin size={12} /> {university.city}, {university.country}
          </p>
        </div>
      </div>

      <p className="mt-4 line-clamp-2 flex-1 text-xs leading-5 text-aura-muted">{university.description}</p>

      <div className="mt-3 flex flex-wrap gap-1.5">
        <span className="rounded-md bg-slate-50 px-2 py-1 font-mono text-[0.6rem] font-bold text-aura-muted ring-1 ring-aura-border">
          {university.type}
        </span>
        <span className="rounded-md bg-amber-50 px-2 py-1 font-mono text-[0.6rem] font-bold text-amber-700 ring-1 ring-amber-200">
          {university.ranking}
        </span>
      </div>

      <div className="mt-3 flex items-center gap-2 border-t border-aura-border pt-3">
        <span className="inline-flex min-w-0 items-center gap-1 truncate text-xs font-bold text-aura-muted">
          <Star size={12} className="text-amber-500" fill="currentColor" />
          {university.establishedYear || 'Verified'}
        </span>
        <div className="ml-auto flex shrink-0 gap-1.5">
          <Link className="icon-button h-8 w-8 rounded-lg shadow-none" to={`/university/${university.slug}`} aria-label="View details">
            <ArrowUpRight size={15} />
          </Link>
          <a
            className="primary-button px-3 py-2"
            href={university.website}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(event) => event.stopPropagation()}
          >
            Website
          </a>
        </div>
      </div>
    </article>
  );
}
