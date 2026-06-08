import type { CategorySlug } from './category.types';

export type Region = 'worldwide' | 'pakistan' | 'usa' | 'uk' | 'india' | 'other';

export interface Website {
  id: string;
  name: string;
  description: string;
  url: string;
  favicon?: string;
  screenshot?: string;
  category: CategorySlug;
  tags: string[];
  rating: number;
  votes: number;
  isVerified: boolean;
  isPopular: boolean;
  isFree: boolean;
  isPakistani: boolean;
  isNew: boolean;
  isTrending: boolean;
  isFeatured: boolean;
  region: Region;
  addedDate: string;
  clicks: number;
}

export interface WebsiteFilters {
  categories?: CategorySlug[];
  freeOnly?: boolean;
  paidOnly?: boolean;
  minRating?: number;
  verifiedOnly?: boolean;
  region?: Region | 'all';
}

export type WebsiteSort = 'popular' | 'rating' | 'newest' | 'az';
