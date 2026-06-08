import { Link2, X } from 'lucide-react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { SearchBar } from '../ui/SearchBar';
import { ThemeToggle } from '../ui/ThemeToggle';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const links = [
  ['Home', '/'],
  ['All Categories', '/categories'],
  ['Library', '/library'],
  ['AI Tools', '/ai-tools'],
  ['Research', '/research'],
  ['Newly Added', '/new'],
  ['Feedback', '/feedback'],
];

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  useEffect(() => {
    if (!isOpen) return undefined;
    const original = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = original;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[90] lg:hidden">
      <button className="absolute inset-0 bg-slate-950/45 backdrop-blur-sm" type="button" aria-label="Close menu" onClick={onClose} />
      <aside className="absolute right-3 top-3 flex max-h-[calc(100vh-1.5rem)] w-[min(360px,calc(100vw-1.5rem))] flex-col overflow-hidden rounded-3xl border border-white/70 bg-white shadow-[0_28px_80px_rgba(15,23,42,0.24)] dark:border-slate-800 dark:bg-slate-950">
        <div className="flex h-16 items-center justify-between border-b border-aura-border px-4">
          <Link className="flex items-center gap-2.5" to="/" onClick={onClose}>
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-[linear-gradient(135deg,#ec4899,#8b5cf6)] text-white">
              <Link2 size={18} />
            </span>
            <span className="font-display text-lg font-extrabold tracking-[-0.03em]">
              <span className="text-slate-950 dark:text-white">Link</span><span className="text-aura-red">Aura</span>
            </span>
          </Link>
          <button className="icon-button" type="button" onClick={onClose} aria-label="Close menu">
            <X size={18} />
          </button>
        </div>

        <div className="overflow-y-auto px-4 py-4">
          <SearchBar />
          <nav className="mt-4 grid gap-1.5" aria-label="Mobile navigation">
            {links.map(([label, to]) => (
              <Link
                key={label}
                className="rounded-2xl px-4 py-3 text-sm font-extrabold text-slate-700 transition hover:bg-slate-100 hover:text-slate-950 dark:text-slate-200 dark:hover:bg-slate-900 dark:hover:text-pink-100"
                to={to}
                onClick={onClose}
              >
                {label}
              </Link>
            ))}
          </nav>

          <div className="mt-4 grid gap-3 border-t border-aura-border pt-4">
            <Link className="primary-button w-full" to="/submit" onClick={onClose}>
              Submit Website
            </Link>
            <div className="flex items-center justify-between rounded-2xl border border-aura-border bg-aura-card px-4 py-3 dark:border-slate-800 dark:bg-slate-900">
              <span className="text-sm font-extrabold text-aura-text">Dark Mode</span>
              <ThemeToggle />
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
}
