import websitesData from '../data/websites.json';
import { useFavoritesStore } from '../store/useFavoritesStore';
import type { Website } from '../types/website.types';

const websites = websitesData as Website[];

export const useFavorites = () => {
  const store = useFavoritesStore();
  const favoriteWebsites = websites.filter((website) => store.favorites.includes(website.id));

  return { ...store, favoriteWebsites };
};
