import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface FavoritesStore {
  favorites: string[];
  addFavorite: (id: string) => void;
  removeFavorite: (id: string) => void;
  toggleFavorite: (id: string) => void;
  isFavorite: (id: string) => boolean;
  clearAll: () => void;
}

export const useFavoritesStore = create<FavoritesStore>()(
  persist(
    (set, get) => ({
      favorites: [],
      addFavorite: (id) =>
        set((state) => ({
          favorites: state.favorites.includes(id) ? state.favorites : [...state.favorites, id],
        })),
      removeFavorite: (id) =>
        set((state) => ({ favorites: state.favorites.filter((favorite) => favorite !== id) })),
      toggleFavorite: (id) =>
        get().isFavorite(id) ? get().removeFavorite(id) : get().addFavorite(id),
      isFavorite: (id) => get().favorites.includes(id),
      clearAll: () => set({ favorites: [] }),
    }),
    { name: 'link-aura-favorites' },
  ),
);
