import * as Icons from 'lucide-react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import categoriesData from '../data/categories.json';
import websitesData from '../data/websites.json';
import { HomeCategoryNavbar } from '../components/sections/HomeCategoryNavbar';
import { NewsletterSection } from '../components/sections/NewsletterSection';
import { SubmitWebsite } from '../components/sections/SubmitWebsite';
import { SearchBar } from '../components/ui/SearchBar';
import { WebsiteCard } from '../components/ui/WebsiteCard';
import { formatDate, formatNumber } from '../utils/formatters';
import { sortWebsites } from '../utils/sortWebsites';
import type { Category } from '../types/category.types';
import type { Website } from '../types/website.types';

const websites = websitesData as Website[];
const categories = categoriesData as Category[];

const categoryPath = (slug: string) => {
  const map: Record<string, string> = {
    library: '/library',
    'ai-tools': '/ai-tools',
    'research-and-science': '/research',
    'education-and-learning': '/education',
    'travel-and-tourism': '/travel-transport',
    'jobs-and-careers': '/jobs-careers',
    'developer-tools': '/developer-tools',
    'freelancing-and-remote-work': '/freelancing',
    'finance-and-banking': '/finance-banking',
    'health-and-medical': '/health-medical',
    'utilities-and-bill-payment': '/utilities',
    'entertainment-and-streaming': '/entertainment',
  };
  return map[slug] || `/category/${slug}`;
};

const findCategory = (slug: string) => categories.find((category) => category.slug === slug);
const findWebsite = (name: string) => websites.find((website) => website.name.toLowerCase() === name.toLowerCase());

const featuredCollections = [
  {
    title: 'Best Free Book Libraries',
    description: 'Free ebooks, public-domain classics, digital lending, and academic reading collections.',
    count: '55 resources',
    to: '/library',
    icon: Icons.LibraryBig,
    gradient: 'from-violet-500 via-fuchsia-500 to-sky-500',
  },
  {
    title: 'Top AI Tools',
    description: 'Assistants, generators, copilots, AI search, productivity, and creative tools.',
    count: `${findCategory('ai-tools')?.websiteCount || 0} resources`,
    to: '/ai-tools',
    icon: Icons.Sparkles,
    gradient: 'from-red-500 via-pink-500 to-violet-500',
  },
  {
    title: 'Research Resources',
    description: 'Scholarly search, journals, papers, citations, datasets, and science platforms.',
    count: `${findCategory('research-and-science')?.websiteCount || 0} resources`,
    to: '/research',
    icon: Icons.Microscope,
    gradient: 'from-cyan-500 via-blue-500 to-violet-500',
  },
  {
    title: 'Travel Booking Platforms',
    description: 'Flights, hotels, tours, routes, maps, transport, and global travel services.',
    count: `${findCategory('travel-and-tourism')?.websiteCount || 0} resources`,
    to: '/travel-transport',
    icon: Icons.Plane,
    gradient: 'from-sky-500 via-cyan-500 to-emerald-500',
  },
  {
    title: 'Freelancing Sites',
    description: 'Remote work, freelance marketplaces, job discovery, and creator income platforms.',
    count: `${findCategory('freelancing-and-remote-work')?.websiteCount || 0} resources`,
    to: '/freelancing',
    icon: Icons.BriefcaseBusiness,
    gradient: 'from-amber-500 via-orange-500 to-pink-500',
  },
  {
    title: 'Pakistan Resources',
    description: 'Government, utilities, telecom, education, scholarships, and local services.',
    count: '100+ resources',
    to: '/categories',
    icon: Icons.Landmark,
    gradient: 'from-emerald-500 via-teal-500 to-sky-500',
  },
];

const popularCategorySlugs = [
  'ai-tools',
  'library',
  'research-and-science',
  'education-and-learning',
  'travel-and-tourism',
  'jobs-and-careers',
  'developer-tools',
  'freelancing-and-remote-work',
  'finance-and-banking',
  'health-and-medical',
  'utilities-and-bill-payment',
  'entertainment-and-streaming',
];

const librarySubcategories = [
  'Free Online Books',
  'Academic Books',
  'Research Papers',
  'Audiobooks',
  'Programming Books',
  'Islamic Books',
  'Medical Books',
  "Children's Books",
  'Book Stores',
];

const reviews = [
  ['Ayesha Khan', 'Student', 'LinkAura helped me find useful learning websites and book sources in one place.'],
  ['Muhammad Ali', 'Freelancer', 'Best directory for tools, jobs and productivity resources.'],
  ['Sarah Ahmed', 'Developer', 'Clean, fast and very useful for discovering trusted websites.'],
  ['Hamza Butt', 'Researcher', 'The Library and Research sections are extremely helpful.'],
];

function setMeta(name: string, content: string, property = false) {
  const attr = property ? 'property' : 'name';
  let tag = document.querySelector(`meta[${attr}="${name}"]`);
  if (!tag) {
    tag = document.createElement('meta');
    tag.setAttribute(attr, name);
    document.head.appendChild(tag);
  }
  tag.setAttribute('content', content);
}

function useHomeSeo(popular: Website[]) {
  useEffect(() => {
    document.title = 'LinkAura - Discover Useful Websites, Tools, Books, Research & Travel Resources';
    const description =
      'LinkAura is a curated website directory for discovering AI tools, digital libraries, online books, research resources, education platforms, jobs, travel booking services and useful websites worldwide.';
    setMeta('description', description);
    setMeta(
      'keywords',
      'website directory, useful websites, AI tools, online books, digital libraries, research papers, travel booking, education resources, Pakistan websites, global website directory',
    );
    setMeta('og:title', document.title, true);
    setMeta('og:description', description, true);
    setMeta('og:image', '/og-linkaura.png', true);
    setMeta('og:type', 'website', true);
    setMeta('og:url', window.location.origin, true);
    setMeta('twitter:card', 'summary_large_image');
    setMeta('twitter:title', document.title);
    setMeta('twitter:description', description);

    const ld = document.createElement('script');
    ld.type = 'application/ld+json';
    ld.id = 'linkaura-home-jsonld';
    ld.textContent = JSON.stringify([
      {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: 'LinkAura',
        url: window.location.origin,
        potentialAction: {
          '@type': 'SearchAction',
          target: `${window.location.origin}/search?q={search_term_string}`,
          'query-input': 'required name=search_term_string',
        },
      },
      {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: 'LinkAura',
        url: window.location.origin,
        description,
      },
      {
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        name: 'Popular Websites',
        itemListElement: popular.slice(0, 8).map((website, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: website.name,
          url: website.url,
        })),
      },
    ]);
    document.getElementById('linkaura-home-jsonld')?.remove();
    document.head.appendChild(ld);
    return () => ld.remove();
  }, [popular]);
}

function SectionIntro({ title, subtitle, to }: { title: string; subtitle: string; to?: string }) {
  return (
    <div className="mb-7 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <h2 className="font-display text-2xl font-extrabold tracking-[-0.045em] sm:text-3xl">{title}</h2>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-aura-muted">{subtitle}</p>
      </div>
      {to ? (
        <Link className="muted-button w-fit" to={to}>
          View All <Icons.ArrowRight size={16} />
        </Link>
      ) : null}
    </div>
  );
}

export default function Home() {
  const popularWebsites = [
    'ChatGPT',
    'Google Scholar',
    'Open Library',
    'Coursera',
    'Fiverr',
    'Skyscanner',
    'GitHub',
    'Canva',
  ]
    .map(findWebsite)
    .filter(Boolean) as Website[];
  const popularFallback = sortWebsites(websites.filter((website) => website.isPopular), 'popular').slice(0, 8);
  const popular = popularWebsites.length >= 6 ? popularWebsites : popularFallback;
  const trending = sortWebsites(websites.filter((website) => website.isTrending), 'popular').slice(0, 6);
  const newest = sortWebsites(websites.filter((website) => website.isNew && website.isVerified), 'newest').slice(0, 6);

  useHomeSeo(popular);

  return (
    <>
      <HomeCategoryNavbar />
      <main>
        <section className="relative isolate overflow-hidden border-b border-white/60 dark:border-white/10">
          <div className="hero-mesh absolute inset-0" />
          <div className="hero-grid absolute inset-0 opacity-[0.32] dark:opacity-[0.15]" />
          <div className="hero-orbit hero-orbit-one" />
          <div className="hero-orbit hero-orbit-two" />
          <div className="container-aura relative flex min-h-[690px] items-center justify-center py-16 sm:py-20">
            <div className="hero-content mx-auto w-full max-w-5xl text-center">
              <div className="inline-flex items-center justify-center gap-2 rounded-full border border-white/70 bg-white/70 px-4 py-2 text-xs font-extrabold text-aura-red shadow-[0_16px_34px_rgba(15,23,42,0.08)] backdrop-blur-xl dark:border-white/10 dark:bg-white/[0.08]">
                <Icons.Sparkles size={14} /> Curated collection of the best
              </div>
              <h1 className="mx-auto mt-8 max-w-4xl font-display text-[clamp(3rem,7vw,6.6rem)] font-extrabold leading-[0.98] tracking-[-0.055em] text-aura-text">
                Discover Useful Websites Without The <span className="hero-gradient-text">Search Noise</span>
              </h1>
              <p className="mx-auto mt-7 max-w-3xl text-base leading-8 text-aura-muted sm:text-lg">
                LinkAura organizes the best global and Pakistan-focused websites, tools, platforms, learning resources, books, research sources, and services into one fast directory.
              </p>
              <div className="mx-auto mt-10 max-w-[660px]">
                <SearchBar large enableShortcut />
                <div className="mt-6 flex flex-wrap justify-center gap-2.5">
                  {['AI Tools', 'Books', 'Research', 'Jobs', 'Travel', 'Scholarships', 'Coding'].map((tag) => (
                    <Link key={tag} className="rounded-full border border-white/70 bg-white/55 px-3.5 py-2 text-xs font-bold text-aura-muted shadow-sm backdrop-blur transition hover:-translate-y-0.5 hover:border-red-500/25 hover:bg-white hover:text-aura-red dark:border-white/10 dark:bg-white/[0.07]" to={`/search?q=${encodeURIComponent(tag)}`}>
                      {tag}
                    </Link>
                  ))}
                </div>
              </div>
              <div className="mx-auto mt-10 grid max-w-4xl gap-3 sm:grid-cols-4">
                {[
                  ['2500+', 'Verified Websites'],
                  ['120+', 'Categories'],
                  ['50+', 'Countries'],
                  ['100K+', 'Monthly Visitors'],
                ].map(([value, label]) => (
                  <div key={label} className="rounded-2xl border border-white/70 bg-white/60 p-4 shadow-sm backdrop-blur-xl dark:border-white/10 dark:bg-white/[0.07]">
                    <strong className="block font-display text-2xl font-extrabold tracking-[-0.04em]">{value}</strong>
                    <span className="mt-1 block text-xs font-bold text-aura-muted">{label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="container-aura section-padding">
          <SectionIntro title="Featured Collections" subtitle="Handpicked groups of the most useful websites and resources." />
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {featuredCollections.map((collection, index) => (
              <Link key={collection.title} className={`group overflow-hidden rounded-3xl border border-aura-border bg-white shadow-[0_18px_48px_rgba(15,23,42,0.08)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_28px_70px_rgba(15,23,42,0.13)] dark:bg-white/[0.06] ${index > 2 ? 'hidden md:block' : ''}`} to={collection.to}>
                <div className={`grid h-36 place-items-center bg-gradient-to-br ${collection.gradient}`}>
                  <collection.icon className="text-white drop-shadow-lg transition duration-300 group-hover:scale-110" size={54} />
                </div>
                <div className="p-5">
                  <h3 className="font-display text-lg font-extrabold tracking-[-0.035em]">{collection.title}</h3>
                  <p className="mt-2 min-h-[48px] text-sm leading-6 text-aura-muted">{collection.description}</p>
                  <div className="mt-5 flex items-center justify-between gap-3">
                    <span className="rounded-full bg-slate-100 px-3 py-1.5 text-xs font-extrabold text-aura-muted dark:bg-white/10">{collection.count}</span>
                    <span className="primary-button py-2">Explore Collection <Icons.ArrowRight size={15} /></span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section className="section-padding bg-white/45 dark:bg-slate-950/20">
          <div className="container-aura">
            <SectionIntro title="Popular Categories" subtitle="Start with the highest-value areas of the LinkAura directory." to="/categories" />
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {popularCategorySlugs.map((slug, index) => {
                const category = findCategory(slug);
                if (!category) return null;
                const Icon = (Icons[category.icon as keyof typeof Icons] || Icons.Globe2) as Icons.LucideIcon;
                return (
                  <Link key={slug} className={`panel group min-h-[210px] p-5 transition duration-300 hover:-translate-y-1 hover:border-violet-200 hover:shadow-aura ${index > 5 ? 'hidden md:block' : ''}`} to={categoryPath(slug)}>
                    <div className="flex items-start justify-between gap-3">
                      <div className="grid h-12 w-12 place-items-center rounded-2xl text-white shadow-sm transition group-hover:scale-105" style={{ background: `linear-gradient(135deg, ${category.color}, #ec4899)` }}>
                        <Icon size={22} />
                      </div>
                      <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-extrabold text-aura-muted dark:bg-white/10">{category.websiteCount}</span>
                    </div>
                    <h3 className="mt-5 font-display text-base font-extrabold tracking-[-0.03em]">{category.label === 'Travel & Tourism' ? 'Travel & Transport' : category.label}</h3>
                    <p className="mt-2 line-clamp-2 text-xs leading-6 text-aura-muted">{category.description}</p>
                    <span className="mt-5 inline-flex items-center gap-2 text-xs font-extrabold text-aura-red">Explore <Icons.ArrowRight className="transition group-hover:translate-x-1" size={15} /></span>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        <section className="container-aura section-padding">
          <div className="relative overflow-hidden rounded-[26px] border border-violet-200/70 bg-[radial-gradient(circle_at_12%_20%,rgba(236,72,153,0.16),transparent_23rem),radial-gradient(circle_at_82%_10%,rgba(59,130,246,0.16),transparent_23rem),linear-gradient(135deg,rgba(255,255,255,0.96),rgba(245,240,255,0.9))] p-5 shadow-[0_22px_64px_rgba(124,58,237,0.12)] sm:p-7 lg:p-8 dark:border-white/10 dark:bg-none dark:bg-white/[0.06]">
            <div className="grid gap-6 lg:grid-cols-[minmax(0,0.82fr)_minmax(0,1fr)] lg:items-center">
              <div>
                <p className="eyebrow">Books & Libraries</p>
                <h2 className="mt-3 max-w-lg font-display text-3xl font-extrabold leading-tight tracking-[-0.05em] sm:text-4xl">Explore 500+ Book Sources</h2>
                <p className="mt-4 max-w-xl text-sm leading-7 text-aura-muted sm:text-base">
                  Find online books, digital libraries, free ebooks, research papers, audiobooks, Islamic books, programming books, medical books, and academic resources from trusted sources.
                </p>
                <Link className="primary-button mt-6" to="/library">
                  <Icons.LibraryBig size={17} /> Explore Library
                </Link>
              </div>
              <div className="grid gap-2.5 sm:grid-cols-3">
                {librarySubcategories.map((item) => (
                  <Link key={item} className="flex min-h-[66px] items-center rounded-2xl border border-white/70 bg-white/72 px-4 py-3 text-sm font-extrabold leading-5 shadow-sm backdrop-blur transition hover:-translate-y-0.5 hover:border-violet-300 hover:text-violet-600 dark:border-white/10 dark:bg-white/[0.07]" to={`/library?filter=${encodeURIComponent(item)}`}>
                    {item}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="section-padding bg-white/45 dark:bg-slate-950/20">
          <div className="container-aura">
            <SectionIntro title="Popular Websites" subtitle="Trusted links people open most across the directory." to="/top-rated" />
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {popular.slice(0, 8).map((website, index) => (
                <div key={website.id} className={index > 3 ? 'hidden md:block' : ''}>
                  <WebsiteCard website={website} variant="popular" />
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="container-aura section-padding">
          <SectionIntro title="Trending This Week" subtitle="Fast-rising resources with ranking context, weekly activity, and trust signals." to="/trending" />
          <div className="grid gap-4 lg:grid-cols-2">
            {trending.map((website, index) => (
              <article key={website.id} className={`panel group gap-4 p-4 transition duration-300 hover:-translate-y-0.5 hover:border-violet-200 hover:shadow-aura ${index > 3 ? 'hidden md:flex' : 'flex'}`}>
                <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-slate-950 font-display text-lg font-extrabold text-white dark:bg-white dark:text-slate-950">#{index + 1}</div>
                <img className="h-11 w-11 shrink-0 rounded-xl border border-aura-border bg-white p-1.5" src={website.favicon} alt="" loading="lazy" />
                <div className="min-w-0 flex-1">
                  <h3 className="truncate text-sm font-extrabold">{website.name}</h3>
                  <p className="mt-1 line-clamp-1 text-xs text-aura-muted">{website.description}</p>
                  <div className="mt-2 flex flex-wrap gap-2 text-[0.68rem] font-bold text-aura-muted">
                    <span>{formatNumber(website.clicks + 2400)} weekly visits</span>
                    <span>{website.rating} rating</span>
                    {website.tags.slice(0, 2).map((tag) => <span key={tag}>{tag}</span>)}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="section-padding bg-white/45 dark:bg-slate-950/20">
          <div className="container-aura">
            <SectionIntro title="Newly Added" subtitle="Fresh verified entries recently reviewed for the catalog." to="/new" />
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {newest.map((website, index) => (
                <article key={website.id} className={`rounded-2xl border border-aura-border bg-aura-card p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-aura ${index > 3 ? 'hidden md:block' : ''}`}>
                  <div className="flex items-start gap-3">
                    <img className="h-9 w-9 rounded-xl border border-aura-border bg-white p-1.5" src={website.favicon} alt="" loading="lazy" />
                    <div className="min-w-0 flex-1">
                      <h3 className="truncate text-sm font-extrabold">{website.name}</h3>
                      <p className="mt-1 text-xs font-bold text-aura-muted">{website.category} / {formatDate(website.addedDate)}</p>
                    </div>
                    <Icons.BadgeCheck className="shrink-0 text-emerald-500" size={16} />
                  </div>
                  <a className="muted-button mt-4 w-full" href={website.url} target="_blank" rel="noopener noreferrer">Visit <Icons.ExternalLink size={14} /></a>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="container-aura section-padding">
          <SectionIntro title="What Users Say" subtitle="4.8/5 based on 12,000+ reviews from students, creators, developers, and researchers." to="/feedback" />
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {reviews.map(([name, role, review], index) => (
              <article key={name} className={`panel p-5 ${index > 1 ? 'hidden md:block' : ''}`}>
                <div className="flex items-center gap-3">
                  <div className="grid h-11 w-11 place-items-center rounded-full bg-gradient-to-br from-violet-500 to-pink-500 text-sm font-extrabold text-white">{name.split(' ').map((part) => part[0]).join('')}</div>
                  <div>
                    <h3 className="text-sm font-extrabold">{name}</h3>
                    <p className="text-xs font-bold text-aura-muted">{role}</p>
                  </div>
                </div>
                <div className="mt-4 flex text-amber-400">{Array.from({ length: 5 }).map((_, index) => <Icons.Star key={index} size={15} fill="currentColor" />)}</div>
                <p className="mt-3 text-sm leading-6 text-aura-muted">{review}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="container-aura section-padding pt-0">
          <div className="panel grid gap-6 p-6 md:grid-cols-[1fr_auto] md:items-center md:p-8">
            <div>
              <h2 className="font-display text-2xl font-extrabold tracking-[-0.04em]">Share Your Feedback</h2>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-aura-muted">
                Help us improve LinkAura by sharing your opinion, reporting broken links, or suggesting new websites.
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {['Rate LinkAura', 'Suggest Website', 'Report Broken Link', 'Request Category', 'General Feedback'].map((item) => (
                  <span key={item} className="rounded-full border border-aura-border bg-aura-hover px-3 py-1.5 text-xs font-bold text-aura-muted">{item}</span>
                ))}
              </div>
              <div className="mt-5 flex flex-wrap gap-2" aria-label="Quick rating">
                {['Love it', 'Good', 'Okay', 'Needs work', 'Problem'].map((item) => (
                  <button key={item} className="rounded-full border border-aura-border bg-aura-card px-3 py-1.5 text-xs font-extrabold text-aura-muted transition hover:-translate-y-0.5 hover:text-aura-red" type="button">
                    {item}
                  </button>
                ))}
              </div>
            </div>
            <Link className="primary-button" to="/feedback">Write Feedback</Link>
          </div>
        </section>

        <NewsletterSection />
        <SubmitWebsite />
      </main>
    </>
  );
}
