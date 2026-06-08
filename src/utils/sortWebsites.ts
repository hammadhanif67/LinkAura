import type { Website, WebsiteSort } from '../types/website.types';

export const sortWebsites = (websites: Website[], sort: WebsiteSort = 'popular') => {
  const sorted = [...websites];

  switch (sort) {
    case 'rating':
      return sorted.sort((a, b) => b.rating - a.rating || b.votes - a.votes);
    case 'newest':
      return sorted.sort((a, b) => b.addedDate.localeCompare(a.addedDate));
    case 'az':
      return sorted.sort((a, b) => a.name.localeCompare(b.name));
    case 'popular':
    default:
      return sorted.sort((a, b) => b.clicks - a.clicks || b.votes - a.votes);
  }
};
