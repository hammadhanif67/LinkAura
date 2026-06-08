import { useMemo } from 'react';
import websitesData from '../data/websites.json';
import { useDebounce } from './useDebounce';
import { filterWebsites } from '../utils/filterWebsites';
import type { Website, WebsiteFilters, WebsiteSort } from '../types/website.types';
import { sortWebsites } from '../utils/sortWebsites';

const websites = websitesData as Website[];

export const useSearch = (
  query: string,
  filters: WebsiteFilters = {},
  sort: WebsiteSort = 'popular',
  delay = 300,
) => {
  const debouncedQuery = useDebounce(query, delay);

  return useMemo(
    () => sortWebsites(filterWebsites(websites, filters, debouncedQuery), sort),
    [debouncedQuery, filters, sort],
  );
};
