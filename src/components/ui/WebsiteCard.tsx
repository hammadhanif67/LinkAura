import { ArrowUpRight, CheckCircle2, ExternalLink, Heart, Share2, Star } from 'lucide-react';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { Badge } from './Badge';
import { Modal } from './Modal';
import { useFavoritesStore } from '../../store/useFavoritesStore';
import { categoryLabel, formatNumber, getDomain } from '../../utils/formatters';
import type { Website } from '../../types/website.types';

interface WebsiteCardProps {
  website: Website;
  variant?: 'default' | 'popular' | 'trending' | 'new';
}

const openWebsite = (website: Website) => {
  const recent = JSON.parse(localStorage.getItem('link-aura-recent') || '[]') as string[];
  localStorage.setItem(
    'link-aura-recent',
    JSON.stringify([website.id, ...recent.filter((id) => id !== website.id)].slice(0, 6)),
  );
  window.open(website.url, '_blank', 'noopener,noreferrer');
};

export function WebsiteCard({ website, variant = 'default' }: WebsiteCardProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { isFavorite, toggleFavorite } = useFavoritesStore();
  const favorite = isFavorite(website.id);

  const share = async () => {
    if (navigator.share) {
      await navigator.share({ title: website.name, url: website.url });
    } else {
      await navigator.clipboard.writeText(website.url);
      toast.success('Link copied');
    }
  };

  return (
    <>
      <article
        className="panel group flex h-full min-h-[190px] min-w-0 cursor-pointer flex-col p-4 transition duration-300 hover:border-red-200 hover:shadow-aura"
        role="button"
        tabIndex={0}
        onClick={() => openWebsite(website)}
        onKeyDown={(event) => {
          if (event.key === 'Enter') openWebsite(website);
        }}
      >
        <div className="flex min-w-0 items-start gap-3">
          <img
            className="h-9 w-9 shrink-0 rounded-xl border border-aura-border bg-white p-1.5 shadow-sm"
            src={website.favicon}
            alt=""
            loading="lazy"
          />
          <div className="min-w-0 flex-1">
            <div className="flex items-start justify-between gap-2">
              <h3 className="truncate text-sm font-extrabold tracking-[-0.02em]">{website.name}</h3>
              {website.isVerified ? <CheckCircle2 className="shrink-0 text-emerald-500" size={14} /> : null}
            </div>
            <p className="mt-1 truncate text-xs font-semibold text-aura-muted">{getDomain(website.url)}</p>
          </div>
        </div>

        <p className="mt-3 line-clamp-2 flex-1 text-xs leading-5 text-aura-muted">{website.description}</p>

        <div className="mt-3 flex flex-wrap gap-1.5">
          <Badge>{categoryLabel(website.category)}</Badge>
          {website.tags.slice(0, 2).map((tag) => (
            <Badge key={tag}>{tag}</Badge>
          ))}
        </div>

        <div className="mt-3 flex min-w-0 items-center gap-2 border-t border-aura-border pt-3">
          <span className="inline-flex shrink-0 items-center gap-1 text-xs font-extrabold text-amber-500">
            <Star size={12} fill="currentColor" /> {website.rating}
          </span>
          {variant === 'trending' ? (
            <span className="inline-flex min-w-0 items-center gap-1 truncate text-xs font-bold text-aura-muted">
              <ArrowUpRight className="shrink-0 text-sky-500" size={13} /> {formatNumber(website.votes)} votes
            </span>
          ) : (
            <span className="min-w-0 truncate text-xs font-bold text-aura-muted">{formatNumber(website.clicks)} visits</span>
          )}
          <div className="ml-auto flex shrink-0 gap-1.5">
            <button
              className="icon-button h-8 w-8 rounded-lg shadow-none"
              type="button"
              aria-label="Favorite website"
              title="Favorite"
              onClick={(event) => {
                event.stopPropagation();
                toggleFavorite(website.id);
              }}
            >
              <Heart size={15} fill={favorite ? 'currentColor' : 'none'} className={favorite ? 'text-aura-red' : ''} />
            </button>
            <button
              className="icon-button h-8 w-8 rounded-lg shadow-none"
              type="button"
              aria-label="Preview website"
              title="Preview"
              onClick={(event) => {
                event.stopPropagation();
                setIsOpen(true);
              }}
            >
              <ExternalLink size={15} />
            </button>
          </div>
        </div>
      </article>

      <Modal isOpen={isOpen} title={website.name} onClose={() => setIsOpen(false)}>
        <img
          className="aspect-video w-full rounded-[20px] border border-aura-border object-cover"
          src={website.screenshot}
          alt={`${website.name} preview`}
          loading="lazy"
        />
        <p className="mt-4 text-aura-muted">{website.description}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {website.tags.map((tag) => (
            <Badge key={tag}>{tag}</Badge>
          ))}
        </div>
        <div className="mt-5 flex flex-wrap gap-3">
          <a className="primary-button" href={website.url} target="_blank" rel="noopener noreferrer">
            <ExternalLink size={16} /> Visit
          </a>
          <button className="muted-button" type="button" onClick={() => toggleFavorite(website.id)}>
            <Heart size={16} fill={favorite ? 'currentColor' : 'none'} /> {favorite ? 'Saved' : 'Favorite'}
          </button>
          <button className="muted-button" type="button" onClick={share}>
            <Share2 size={16} /> Share
          </button>
        </div>
      </Modal>
    </>
  );
}
