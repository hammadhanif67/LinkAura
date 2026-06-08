import { Link } from 'react-router-dom';
import { Sparkles } from 'lucide-react';
import featuredData from '../../data/featured.json';
import { SearchBar } from '../ui/SearchBar';

const featured = featuredData as { heroTags: string[] };

export function HeroSection() {
  return (
    <section className="relative isolate overflow-hidden border-b border-white/60 dark:border-white/10">
      <div className="hero-mesh absolute inset-0" />
      <div className="hero-grid absolute inset-0 opacity-[0.38] dark:opacity-[0.18]" />
      <div className="hero-orbit hero-orbit-one" />
      <div className="hero-orbit hero-orbit-two" />
      <div className="container-aura relative flex min-h-[620px] items-center justify-center py-16 sm:min-h-[680px] sm:py-20 lg:min-h-[720px]">
        <div className="hero-content mx-auto w-full max-w-5xl text-center">
          <div className="inline-flex items-center justify-center gap-2 rounded-full border border-white/70 bg-white/70 px-4 py-2 text-xs font-extrabold text-aura-red shadow-[0_16px_34px_rgba(15,23,42,0.08)] backdrop-blur-xl dark:border-white/10 dark:bg-white/[0.08]">
            <Sparkles size={14} /> Curated collection of the best
          </div>
          <h1 className="mx-auto mt-8 max-w-4xl font-display text-[clamp(3rem,7vw,6.8rem)] font-extrabold leading-[0.96] tracking-[-0.055em] text-aura-text">
            Discover useful websites without the <span className="hero-gradient-text">search noise</span>
          </h1>
          <p className="mx-auto mt-7 max-w-2xl text-base leading-8 text-aura-muted sm:text-lg">
            Link Aura organizes the best global and Pakistan-focused tools, platforms, learning resources, and services into one fast directory.
          </p>

          <div className="mx-auto mt-10 max-w-[640px]">
            <SearchBar large />
            <div className="mt-6 flex flex-wrap justify-center gap-2.5">
              {featured.heroTags.map((tag) => (
                <Link
                  key={tag}
                  className="rounded-full border border-white/70 bg-white/55 px-3.5 py-2 text-xs font-bold text-aura-muted shadow-sm backdrop-blur transition duration-200 hover:-translate-y-0.5 hover:border-red-500/25 hover:bg-white hover:text-aura-red hover:shadow-[0_14px_28px_rgba(15,23,42,0.08)] dark:border-white/10 dark:bg-white/[0.07] dark:hover:bg-white/10"
                  to={`/search?q=${tag}`}
                >
                  {tag}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
