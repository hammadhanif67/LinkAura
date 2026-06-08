import * as Icons from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import categoriesData from '../../data/categories.json';
import type { Category } from '../../types/category.types';

const categories = categoriesData as Category[];

const prioritySlugs = [
  'ai-tools',
  'library',
  'research-and-science',
  'education-and-learning',
  'developer-tools',
  'travel-and-tourism',
  'jobs-and-careers',
];

const menuGroups = [
  {
    title: 'Work & Business',
    slugs: ['freelancing-and-remote-work', 'jobs-and-careers', 'business-and-entrepreneurship', 'finance-and-banking', 'real-estate'],
  },
  {
    title: 'Learning & Research',
    slugs: ['library', 'research-and-science', 'universities', 'kids-and-education', 'scholarships-and-study-abroad'],
  },
  {
    title: 'Lifestyle & Services',
    slugs: ['health-and-medical', 'food-and-delivery', 'fashion-and-clothing', 'travel-and-tourism', 'utilities-and-bill-payment'],
  },
  {
    title: 'Tech & Media',
    slugs: ['ai-tools', 'developer-tools', 'cybersecurity-and-privacy', 'tech-news-and-blogs', 'news-and-media', 'entertainment-and-streaming'],
  },
  {
    title: 'Pakistan Services',
    slugs: ['government-and-official', 'telecom-and-internet', 'islamic-and-religious', 'sports-and-cricket', 'automobiles-and-cars'],
  },
];

function categoryPath(category: Category | { slug: string }) {
  if (category.slug === 'library') return '/library';
  if (category.slug === 'ai-tools') return '/ai-tools';
  if (category.slug === 'research-and-science') return '/research';
  if (category.slug === 'education-and-learning') return '/education';
  if (category.slug === 'travel-and-tourism') return '/travel-transport';
  if (category.slug === 'jobs-and-careers') return '/jobs-careers';
  if (category.slug === 'developer-tools') return '/developer-tools';
  if (category.slug === 'freelancing-and-remote-work') return '/freelancing';
  if (category.slug === 'finance-and-banking') return '/finance-banking';
  if (category.slug === 'health-and-medical') return '/health-medical';
  if (category.slug === 'scholarships-and-study-abroad') return '/scholarships';
  if (category.slug === 'utilities-and-bill-payment') return '/utilities';
  if (category.slug === 'entertainment-and-streaming') return '/entertainment';
  if (category.slug === 'universities') return '/universities';
  return `/category/${category.slug}`;
}

function getMenuCategory(slug: string): Category {
  if (slug === 'universities') {
    return {
      slug: 'universities',
      label: 'Universities',
      description: 'Global and Pakistan university directories.',
      icon: 'School',
      color: '#0ea5e9',
      gradient: 'from-sky-500 to-blue-500',
      websiteCount: 120,
    };
  }
  return categories.find((category) => category.slug === slug) as Category;
}

function CategoryMenuItem({ category, onSelect }: { category: Category; onSelect: () => void }) {
  const Icon = (Icons[category.icon as keyof typeof Icons] || Icons.Globe2) as Icons.LucideIcon;

  return (
    <Link
      className="group/menuitem flex items-center gap-3 rounded-2xl border border-transparent p-3 outline-none transition hover:border-violet-200 hover:bg-violet-50/80 focus-visible:border-violet-300 focus-visible:bg-violet-50 dark:hover:border-white/10 dark:hover:bg-white/[0.06]"
      role="menuitem"
      to={categoryPath(category)}
      onClick={onSelect}
    >
      <span
        className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-white shadow-sm ring-1 ring-black/5 transition group-hover/menuitem:scale-105 dark:bg-white/10 dark:ring-white/10"
        style={{ color: category.color }}
      >
        <Icon size={16} />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block truncate text-xs font-extrabold text-slate-900 dark:text-white">{category.label}</span>
        <span className="mt-0.5 block text-[0.68rem] font-bold text-slate-500 dark:text-slate-400">{category.websiteCount} resources</span>
      </span>
      <Icons.ArrowRight className="shrink-0 text-aura-muted opacity-0 transition group-hover/menuitem:translate-x-0.5 group-hover/menuitem:opacity-100" size={14} />
    </Link>
  );
}

export function HomeCategoryNavbar() {
  const { pathname } = useLocation();
  const [moreOpen, setMoreOpen] = useState(false);
  const rootRef = useRef<HTMLElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);
  const priorityCategories = prioritySlugs.map((slug) => categories.find((category) => category.slug === slug)).filter(Boolean) as Category[];
  const mobilePriorityCategories = priorityCategories.filter((category) => ['ai-tools', 'library', 'research-and-science', 'education-and-learning'].includes(category.slug));

  useEffect(() => {
    if (!moreOpen) return undefined;

    const onPointerDown = (event: MouseEvent | TouchEvent) => {
      if (rootRef.current?.contains(event.target as Node)) return;
      setMoreOpen(false);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMoreOpen(false);
      if (event.key === 'Tab' && drawerRef.current && window.matchMedia('(max-width: 767px)').matches) {
        const focusable = drawerRef.current.querySelectorAll<HTMLElement>('a[href], button:not([disabled])');
        if (!focusable.length) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener('mousedown', onPointerDown);
    document.addEventListener('touchstart', onPointerDown);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('mousedown', onPointerDown);
      document.removeEventListener('touchstart', onPointerDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [moreOpen]);

  useEffect(() => {
    if (!moreOpen || !window.matchMedia('(max-width: 767px)').matches) return undefined;
    const original = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.setTimeout(() => drawerRef.current?.querySelector<HTMLElement>('button, a[href]')?.focus(), 0);
    return () => {
      document.body.style.overflow = original;
    };
  }, [moreOpen]);

  return (
    <section
      ref={rootRef}
      className="relative z-[70] border-b border-white/60 bg-white/[0.72] shadow-[0_14px_34px_rgba(15,23,42,0.045)] backdrop-blur-2xl dark:border-white/10 dark:bg-slate-950/72"
    >
      <div className="container-aura min-w-0">
        <nav className="scrollbar-hide flex min-w-0 flex-nowrap gap-2.5 overflow-x-auto py-4 sm:gap-3" aria-label="Priority categories">
          <Link className={`category-chip shrink-0 ${pathname === '/categories' ? 'category-chip-active' : ''}`} to="/categories">
            <span className="category-chip-icon bg-aura-red text-white">
              <Icons.LayoutGrid size={14} />
            </span>
            All Categories
          </Link>
          {priorityCategories.map((category) => {
            const Icon = (Icons[category.icon as keyof typeof Icons] || Icons.Globe2) as Icons.LucideIcon;
            const to = categoryPath(category);
            const active = pathname === to;
            const mobileVisible = mobilePriorityCategories.some((item) => item.slug === category.slug);

            return (
              <Link key={category.slug} className={`category-chip shrink-0 ${mobileVisible ? '' : 'hidden sm:inline-flex'} ${active ? 'category-chip-active' : ''}`} to={to}>
                <span className="category-chip-icon" style={{ color: category.color }}>
                  <Icon size={14} />
                </span>
                <span>{category.label === 'Library' ? 'Books & Libraries' : category.label}</span>
                <span className="hidden font-mono text-[0.65rem] font-bold text-slate-500/80 dark:text-slate-400/80 sm:inline">{category.websiteCount}</span>
              </Link>
            );
          })}
          <button
            className={`category-chip shrink-0 ${moreOpen ? 'category-chip-active' : ''}`}
            type="button"
            aria-expanded={moreOpen}
            aria-controls="category-mega-menu"
            onClick={() => setMoreOpen((open) => !open)}
          >
            <span className="category-chip-icon text-violet-500">
              <Icons.LayoutList size={14} />
            </span>
            More
            <Icons.ChevronDown className={`transition ${moreOpen ? 'rotate-180' : ''}`} size={14} />
          </button>
        </nav>
      </div>

      {moreOpen ? (
        <>
          <div id="category-mega-menu" className="absolute left-1/2 top-[calc(100%+12px)] z-[100] hidden w-[min(1120px,calc(100vw-32px))] -translate-x-1/2 animate-[mega-menu-in_180ms_ease-out] md:block" role="menu" aria-label="More categories">
            <div className="grid gap-5 rounded-[24px] border border-slate-200 bg-white p-6 shadow-[0_28px_80px_rgba(15,23,42,0.16)] md:grid-cols-2 lg:grid-cols-4 dark:border-white/10 dark:bg-slate-950">
              {menuGroups.map((group) => (
                <div key={group.title} className="min-w-0">
                  <h3 className="px-2 text-xs font-extrabold uppercase tracking-[0.14em] text-violet-500">{group.title}</h3>
                  <div className="mt-3 grid gap-1.5">
                    {group.slugs.map((slug) => {
                      const category = getMenuCategory(slug);
                      if (!category) return null;
                      return <CategoryMenuItem key={slug} category={category} onSelect={() => setMoreOpen(false)} />;
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="fixed inset-0 z-[60] bg-slate-950/45 md:hidden" role="presentation" onClick={() => setMoreOpen(false)}>
            <div
              ref={drawerRef}
              className="absolute bottom-0 left-0 right-0 max-h-[76vh] overflow-y-auto rounded-t-[24px] border border-white/70 bg-white p-4 shadow-[0_-24px_70px_rgba(15,23,42,0.24)] dark:border-white/10 dark:bg-slate-950"
              role="menu"
              aria-label="More categories"
              onClick={(event) => event.stopPropagation()}
            >
              <div className="mb-4 flex items-center justify-between gap-3">
                <div>
                  <p className="font-display text-base font-extrabold tracking-[-0.04em] text-slate-950 dark:text-white">More Categories</p>
                  <p className="mt-1 text-xs font-bold text-slate-500 dark:text-slate-400">Browse grouped resources.</p>
                </div>
                <button className="icon-button" type="button" aria-label="Close categories menu" onClick={() => setMoreOpen(false)}>
                  <Icons.X size={18} />
                </button>
              </div>
              <div className="grid gap-4">
                {menuGroups.map((group) => (
                  <div key={group.title}>
                    <h3 className="px-1 text-xs font-extrabold uppercase tracking-[0.14em] text-violet-500">{group.title}</h3>
                    <div className="mt-2 grid gap-1">
                      {group.slugs.slice(0, 4).map((slug) => {
                        const category = getMenuCategory(slug);
                        if (!category) return null;
                        return <CategoryMenuItem key={slug} category={category} onSelect={() => setMoreOpen(false)} />;
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      ) : null}
    </section>
  );
}
