import { useEffect } from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import categoriesData from '../data/categories.json';
import websitesData from '../data/websites.json';
import { WebsiteCard } from '../components/ui/WebsiteCard';
import { sortWebsites } from '../utils/sortWebsites';
import type { Category as CategoryType } from '../types/category.types';
import type { Website } from '../types/website.types';
import type { WebsiteSort } from '../types/website.types';

const categories = categoriesData as CategoryType[];
const websites = websitesData as Website[];

const libraryFilters = [
  'Free Books',
  'Paid Books',
  'PDF Books',
  'EPUB Books',
  'Kindle Books',
  'Audiobooks',
  'Academic Books',
  'Research Books',
  'Medical Books',
  'Islamic Books',
  'Programming',
  'Psychology',
  'Engineering',
  'Business',
  "Children's Books",
  'Urdu Books',
  'English Books',
  'Arabic Books',
  'Hindi Books',
];

const generalFilters = ['All', 'Free', 'Paid', 'Verified', 'Popular', 'Newest', 'Trending', 'Top Rated'];

const librarySubcategories = [
  'Free Online Books',
  'Academic Books',
  'Research Papers',
  'Programming Books',
  'Medical Books',
  'Islamic Books',
  'Audiobooks',
  "Children's Books",
  'Book Stores',
];

interface CategoryProps {
  slugOverride?: string;
}

export default function Category({ slugOverride }: CategoryProps) {
  const { slug } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const activeSlug = slugOverride || slug;
  const category = categories.find((item) => item.slug === activeSlug);
  const selectedFilter = searchParams.get('filter') || 'All';
  const selectedSort = (searchParams.get('sort') || 'popular') as WebsiteSort;
  const availableFilters = category?.slug === 'library' ? ['All', ...librarySubcategories, ...libraryFilters] : generalFilters;
  const items = sortWebsites(
    websites
      .filter((website) => website.category === activeSlug)
      .filter((website) => {
        if (selectedFilter === 'All') return true;
        const haystack = `${website.name} ${website.description} ${website.tags.join(' ')}`.toLowerCase();
        const filter = selectedFilter.toLowerCase();
        if (selectedFilter === 'Free') return website.isFree;
        if (selectedFilter === 'Paid') return !website.isFree;
        if (selectedFilter === 'Verified') return website.isVerified;
        if (selectedFilter === 'Popular') return website.isPopular;
        if (selectedFilter === 'Newest') return website.isNew;
        if (selectedFilter === 'Trending') return website.isTrending;
        if (selectedFilter === 'Top Rated') return website.rating >= 4.6;
        if (selectedFilter === 'Free Books') return website.isFree || haystack.includes('free');
        if (selectedFilter === 'Paid Books') return !website.isFree || haystack.includes('paid');
        return haystack.includes(filter.replace('books', '').trim()) || haystack.includes(filter);
      }),
    selectedSort,
  );

  const updateFilter = (filter: string) => {
    const next = new URLSearchParams(searchParams);
    if (filter === 'All') next.delete('filter');
    else next.set('filter', filter);
    setSearchParams(next, { replace: false });
  };

  const updateSort = (sort: WebsiteSort) => {
    const next = new URLSearchParams(searchParams);
    if (sort === 'popular') next.delete('sort');
    else next.set('sort', sort);
    setSearchParams(next, { replace: false });
  };

  useEffect(() => {
    if (!category) return;
    const title =
      category.slug === 'library'
        ? 'Library - Online Books, Digital Libraries & Research Sources | LinkAura'
        : `${category.label} - Best Websites and Resources | LinkAura`;
    const description =
      category.slug === 'library'
        ? 'Discover trusted platforms for free books, academic books, audiobooks, research papers, Islamic books, programming books, medical books and book stores.'
        : category.description;
    document.title = title;
    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement('meta');
      meta.setAttribute('name', 'description');
      document.head.appendChild(meta);
    }
    meta.setAttribute('content', description);

    const ld = document.createElement('script');
    ld.type = 'application/ld+json';
    ld.id = 'linkaura-category-jsonld';
    ld.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: window.location.origin },
        { '@type': 'ListItem', position: 2, name: 'Categories', item: `${window.location.origin}/categories` },
        { '@type': 'ListItem', position: 3, name: category.label, item: window.location.href },
      ],
    });
    document.getElementById('linkaura-category-jsonld')?.remove();
    document.head.appendChild(ld);
    return () => ld.remove();
  }, [category]);

  if (!category) {
    return (
      <main className="container-aura py-16">
        <h1 className="font-display text-4xl font-extrabold tracking-[-0.05em]">Category not found</h1>
      </main>
    );
  }

  return (
    <main className="container-aura py-10 sm:py-12">
      <p className="eyebrow">Category</p>
      <h1 className="mt-3 font-display text-3xl font-extrabold tracking-[-0.05em] sm:text-4xl">
        {category.slug === 'library' ? 'Library - Online Books, Digital Libraries & Research Sources' : category.label}
      </h1>
      <p className="mt-3 max-w-3xl text-sm leading-7 text-aura-muted">
        {category.slug === 'library'
          ? 'Discover trusted platforms for free books, academic books, audiobooks, research papers, Islamic books, programming books, medical books and book stores.'
          : category.description}
      </p>
      {category.slug === 'library' ? (
        <>
          <div className="mt-7 grid gap-3 sm:grid-cols-3">
            {librarySubcategories.map((item) => (
              <button
                key={item}
                className={`rounded-2xl border px-4 py-3 text-left text-sm font-extrabold transition hover:-translate-y-0.5 ${
                  selectedFilter === item
                    ? 'border-violet-400 bg-violet-100 text-violet-800 shadow-sm dark:border-violet-300 dark:bg-violet-500/20 dark:text-violet-100'
                    : 'border-violet-200/70 bg-violet-50/70 text-violet-700 dark:border-white/10 dark:bg-violet-500/10 dark:text-violet-200'
                }`}
                type="button"
                onClick={() => updateFilter(item)}
              >
                {item}
              </button>
            ))}
          </div>
        </>
      ) : null}
      <section className="mt-7 rounded-3xl border border-aura-border bg-white/72 p-4 shadow-sm backdrop-blur-xl dark:bg-white/[0.06]" aria-label="Category filters">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="min-w-0">
            <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-aura-muted">Filters</p>
            <div className="scrollbar-hide mt-3 flex gap-2 overflow-x-auto pb-1">
              {availableFilters.map((item) => (
                <button
                  key={item}
                  className={`shrink-0 rounded-full border px-3 py-1.5 text-xs font-extrabold transition ${
                    selectedFilter === item
                      ? 'border-red-500/30 bg-red-500/10 text-aura-red shadow-sm'
                      : 'border-aura-border bg-aura-card text-aura-muted hover:border-red-500/25 hover:text-aura-text'
                  }`}
                  type="button"
                  onClick={() => updateFilter(item)}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
          <label className="flex shrink-0 items-center gap-3 text-xs font-extrabold text-aura-muted">
            Sort
            <select
              className="field min-w-[170px] py-2 text-xs"
              value={selectedSort}
              onChange={(event) => updateSort(event.target.value as WebsiteSort)}
            >
              <option value="popular">Most Popular</option>
              <option value="rating">Top Rated</option>
              <option value="newest">Newest</option>
              <option value="az">A to Z</option>
            </select>
          </label>
        </div>
        <div className="mt-4 flex flex-wrap items-center gap-3 text-xs font-bold text-aura-muted">
          <span>{items.length} results</span>
          {selectedFilter !== 'All' ? (
            <button className="text-aura-red hover:underline" type="button" onClick={() => updateFilter('All')}>
              Clear filter
            </button>
          ) : null}
        </div>
      </section>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {items.map((website) => (
          <WebsiteCard key={website.id} website={website} />
        ))}
      </div>
      {!items.length ? (
        <div className="panel mt-8 p-8 text-center">
          <h2 className="font-display text-xl font-extrabold tracking-[-0.04em]">No matching resources found</h2>
          <p className="mx-auto mt-2 max-w-md text-sm text-aura-muted">Try another filter or browse every category to keep exploring LinkAura.</p>
          <Link className="primary-button mt-5" to="/categories">
            Browse Categories
          </Link>
        </div>
      ) : null}
    </main>
  );
}
