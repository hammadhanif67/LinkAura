import { Search, X } from 'lucide-react';
import { FormEvent, KeyboardEvent, useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import websitesData from '../../data/websites.json';
import { useDebounce } from '../../hooks/useDebounce';
import { useSearchStore } from '../../store/useSearchStore';
import type { Website } from '../../types/website.types';

const websites = websitesData as Website[];

interface SearchBarProps {
  large?: boolean;
  autoFocus?: boolean;
  initialValue?: string;
  enableShortcut?: boolean;
}

export function SearchBar({ large = false, autoFocus = false, initialValue = '', enableShortcut = false }: SearchBarProps) {
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);
  const [value, setValue] = useState(initialValue);
  const [activeIndex, setActiveIndex] = useState(-1);
  const debounced = useDebounce(value, 300);
  const { history, addHistory } = useSearchStore();

  const suggestions = useMemo(() => {
    const query = debounced.trim().toLowerCase();
    if (!query) return [];
    return websites
      .filter(
        (website) =>
          website.name.toLowerCase().includes(query) ||
          website.tags.some((tag) => tag.toLowerCase().includes(query)),
      )
      .slice(0, 6);
  }, [debounced]);

  useEffect(() => {
    if (!enableShortcut) return undefined;
    const onShortcut = (event: globalThis.KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', onShortcut);
    return () => window.removeEventListener('keydown', onShortcut);
  }, [enableShortcut]);

  const submit = (query = value) => {
    const trimmed = query.trim();
    if (!trimmed) return;
    addHistory(trimmed);
    navigate(`/search?q=${encodeURIComponent(trimmed)}`);
  };

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    submit();
  };

  const onKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (!suggestions.length) return;
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      setActiveIndex((index) => Math.min(index + 1, suggestions.length - 1));
    }
    if (event.key === 'ArrowUp') {
      event.preventDefault();
      setActiveIndex((index) => Math.max(index - 1, 0));
    }
    if (event.key === 'Enter' && activeIndex >= 0) {
      event.preventDefault();
      submit(suggestions[activeIndex].name);
    }
  };

  return (
    <div className="relative w-full">
      <form className="relative" onSubmit={onSubmit}>
        <Search
          className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-aura-muted transition duration-200"
          size={large ? 22 : 18}
        />
        <input
          ref={inputRef}
          className={`search-input w-full border border-white/70 bg-white/80 pl-11 pr-11 text-aura-text outline-none backdrop-blur-xl transition duration-300 placeholder:text-aura-muted focus:border-red-500/35 focus:bg-white focus:shadow-[0_18px_45px_rgba(239,68,68,0.14)] focus:ring-4 focus:ring-red-500/10 dark:border-white/10 dark:bg-white/[0.08] dark:focus:bg-white/10 ${
            enableShortcut ? 'sm:pr-24' : ''
          } ${large ? 'h-16 rounded-2xl text-sm shadow-[0_24px_60px_rgba(15,23,42,0.12)] sm:text-base' : 'h-11 rounded-xl text-xs shadow-[0_12px_26px_rgba(15,23,42,0.07)]'
          }`}
          value={value}
          autoFocus={autoFocus}
          placeholder="Search websites, tools, tags, or categories..."
          onChange={(event) => {
            setValue(event.target.value);
            setActiveIndex(-1);
          }}
          onKeyDown={onKeyDown}
        />
        {enableShortcut && !value ? (
          <span className="pointer-events-none absolute right-3 top-1/2 hidden -translate-y-1/2 rounded-lg border border-aura-border bg-white/70 px-2 py-1 font-mono text-[0.65rem] font-bold text-aura-muted shadow-sm dark:bg-white/10 sm:block">
            Ctrl K
          </span>
        ) : null}
        {value ? (
          <button
            className="absolute right-3 top-1/2 grid h-8 w-8 -translate-y-1/2 place-items-center rounded-xl text-aura-muted transition hover:bg-aura-hover hover:text-aura-text"
            type="button"
            aria-label="Clear search"
            onClick={() => setValue('')}
          >
            <X size={16} />
          </button>
        ) : null}
      </form>

      {(suggestions.length > 0 || history.length > 0) && value ? (
        <div className="panel absolute left-0 right-0 top-full z-30 mt-3 overflow-hidden p-1">
          {suggestions.map((website, index) => (
            <button
              key={website.id}
              className={`flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-left transition hover:bg-aura-hover ${
                index === activeIndex ? 'bg-aura-hover' : ''
              }`}
              type="button"
              onClick={() => submit(website.name)}
            >
              <img className="h-8 w-8 rounded-xl border border-aura-border bg-white p-1" src={website.favicon} alt="" />
              <span className="font-semibold">{website.name}</span>
              <span className="ml-auto text-xs text-aura-muted">{website.category}</span>
            </button>
          ))}
          {suggestions.length === 0 && history.slice(0, 5).map((item) => (
            <button
              key={item}
              className="flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-left transition hover:bg-aura-hover"
              type="button"
              onClick={() => submit(item)}
            >
              <Search size={15} />
              {item}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
