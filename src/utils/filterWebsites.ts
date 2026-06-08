import type { Website, WebsiteFilters } from '../types/website.types';

export const filterWebsites = (websites: Website[], filters: WebsiteFilters, query = '') => {
  const normalized = query.trim().toLowerCase();

  return websites.filter((website) => {
    const matchesQuery =
      !normalized ||
      website.name.toLowerCase().includes(normalized) ||
      website.description.toLowerCase().includes(normalized) ||
      website.category.toLowerCase().includes(normalized) ||
      website.tags.some((tag) => tag.toLowerCase().includes(normalized));

    const matchesCategory =
      !filters.categories?.length || filters.categories.includes(website.category);
    const matchesFree = !filters.freeOnly || website.isFree;
    const matchesPaid = !filters.paidOnly || !website.isFree;
    const matchesRating = !filters.minRating || website.rating >= filters.minRating;
    const matchesVerified = !filters.verifiedOnly || website.isVerified;
    const matchesRegion =
      !filters.region || filters.region === 'all' || website.region === filters.region;

    return (
      matchesQuery &&
      matchesCategory &&
      matchesFree &&
      matchesPaid &&
      matchesRating &&
      matchesVerified &&
      matchesRegion
    );
  });
};
