import { ArrowUpRight, BadgeCheck, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { EntertainmentPlatform } from '../../types/entertainment.types';

interface EntertainmentCardProps {
  platform: EntertainmentPlatform;
}

export function EntertainmentCard({ platform }: EntertainmentCardProps) {
  return (
    <article className="panel relative flex min-h-[244px] flex-col p-4 transition duration-200 hover:border-red-200 hover:shadow-aura">
      {platform.featured ? (
        <span className="absolute right-3 top-3 rounded-full bg-red-50 px-2.5 py-1 text-[0.62rem] font-extrabold text-aura-red ring-1 ring-red-100">
          Featured
        </span>
      ) : null}
      <div className="flex min-w-0 items-start gap-3 pr-16">
        <img className="h-11 w-11 shrink-0 rounded-xl border border-aura-border bg-white p-2 shadow-sm" src={platform.logo} alt="" />
        <div className="min-w-0">
          <div className="flex items-center gap-1.5">
            <h3 className="truncate text-sm font-extrabold tracking-[-0.02em]">{platform.name}</h3>
            {platform.verified ? <BadgeCheck className="shrink-0 text-emerald-500" size={14} /> : null}
          </div>
          <p className="mt-1 truncate text-xs font-semibold text-aura-muted">{platform.contentType}</p>
        </div>
      </div>
      <p className="mt-4 line-clamp-3 flex-1 text-xs leading-5 text-aura-muted">{platform.description}</p>
      <div className="mt-3 flex flex-wrap gap-1.5">
        <span className="rounded-md bg-red-50 px-2 py-1 font-mono text-[0.6rem] font-bold text-aura-red ring-1 ring-red-100 dark:bg-red-500/10">{platform.pricing}</span>
        <span className="rounded-md bg-slate-50 px-2 py-1 font-mono text-[0.6rem] font-bold text-aura-muted ring-1 ring-aura-border dark:bg-white/5">{platform.subcategory}</span>
      </div>
      <div className="mt-3 flex items-center gap-2 border-t border-aura-border pt-3">
        <span className="inline-flex items-center gap-1 text-xs font-bold text-aura-muted">
          <Star size={12} className="text-amber-500" fill="currentColor" /> {platform.rating}
        </span>
        <div className="ml-auto flex shrink-0 gap-1.5">
          <Link className="icon-button h-8 w-8 rounded-lg shadow-none" to={`/entertainment/${platform.slug}`} aria-label={`View ${platform.name}`}>
            <ArrowUpRight size={15} />
          </Link>
          <a className="primary-button px-3 py-2" href={platform.website} target="_blank" rel="noopener noreferrer">Visit</a>
        </div>
      </div>
    </article>
  );
}
