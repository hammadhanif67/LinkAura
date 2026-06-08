import { create } from 'zustand';
import type { Website } from '../types/website.types';

interface SearchStore {
  query: string;
  results: Website[];
  isSearching: boolean;
  history: string[];
  setQuery: (query: string) => void;
  setResults: (results: Website[]) => void;
  setIsSearching: (isSearching: boolean) => void;
  addHistory: (query: string) => void;
  clearHistory: () => void;
}

const loadHistory = () => {
  try {
    return JSON.parse(sessionStorage.getItem('link-aura-search-history') || '[]') as string[];
  } catch {
    return [];
  }
};

const saveHistory = (history: string[]) => {
  sessionStorage.setItem('link-aura-search-history', JSON.stringify(history));
};

export const useSearchStore = create<SearchStore>((set, get) => ({
  query: '',
  results: [],
  isSearching: false,
  history: loadHistory(),
  setQuery: (query) => set({ query }),
  setResults: (results) => set({ results }),
  setIsSearching: (isSearching) => set({ isSearching }),
  addHistory: (query) => {
    const value = query.trim();
    if (!value) return;
    const history = [value, ...get().history.filter((item) => item !== value)].slice(0, 8);
    saveHistory(history);
    set({ history });
  },
  clearHistory: () => {
    saveHistory([]);
    set({ history: [] });
  },
}));
