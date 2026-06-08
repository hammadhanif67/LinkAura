import { Link2, Menu, Plus } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { MobileMenu } from './MobileMenu';
import { SearchBar } from '../ui/SearchBar';
import { ThemeToggle } from '../ui/ThemeToggle';

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-[90] border-b border-white/50 bg-white/[0.86] shadow-[0_1px_0_rgba(255,255,255,0.7),0_18px_45px_rgba(15,23,42,0.06)] backdrop-blur-2xl dark:border-white/10 dark:bg-slate-950/[0.9]">
      <div className="container-aura grid h-[76px] min-w-0 grid-cols-[auto_1fr_auto] items-center gap-3">
        <Link className="flex shrink-0 items-center gap-2.5" to="/">
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-[linear-gradient(135deg,#ec4899,#8b5cf6)] text-white shadow-[0_12px_30px_rgba(139,92,246,0.28)]">
            <Link2 size={19} />
          </span>
          <span className="font-display text-lg font-extrabold tracking-[-0.03em] sm:text-xl">
            <span className="text-slate-950 dark:text-white">Link</span><span className="text-aura-red">Aura</span>
          </span>
        </Link>
        <div className="mx-auto hidden w-full max-w-[620px] md:block">
          <SearchBar enableShortcut />
        </div>
        <div className="ml-auto flex shrink-0 items-center gap-2">
          <Link className="primary-button hidden shrink-0 whitespace-nowrap px-4 py-2.5 lg:inline-flex" to="/submit">
            <Plus size={16} />
            Submit Website
          </Link>
          <Link className="icon-button lg:hidden" to="/submit" aria-label="Submit website" title="Submit Website">
            <Plus size={18} />
          </Link>
          <div className="shrink-0">
            <ThemeToggle />
          </div>
          <button className="icon-button shrink-0 lg:hidden" type="button" onClick={() => setOpen(true)} aria-label="Open menu">
            <Menu size={20} />
          </button>
        </div>
      </div>
      <MobileMenu isOpen={open} onClose={() => setOpen(false)} />
    </header>
  );
}
