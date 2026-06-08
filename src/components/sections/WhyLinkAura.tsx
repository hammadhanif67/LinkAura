import { Clock, RefreshCcw, SearchCheck, Smile } from 'lucide-react';

const items = [
  { icon: SearchCheck, title: 'Handpicked Websites', text: 'Every listing is organized, useful, and safe for general audiences.' },
  { icon: Clock, title: 'Save Time', text: 'Skip scattered searches and reach trusted resources faster.' },
  { icon: RefreshCcw, title: 'Always Updated', text: 'Trending, new, and popular sections keep the directory fresh.' },
  { icon: Smile, title: '100% Free', text: 'No signups, no paywall, no ads blocking the experience.' },
];

export function WhyLinkAura() {
  return (
    <section className="container-aura section-padding">
      <h2 className="mb-7 font-display text-xl font-extrabold tracking-[-0.04em] sm:text-2xl">Why Choose Link Aura?</h2>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((item) => (
          <div key={item.title} className="flex gap-4">
            <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-red-50 text-aura-red dark:bg-red-500/10">
              <item.icon size={19} />
            </div>
            <div>
              <h3 className="font-display text-sm font-extrabold tracking-[-0.02em]">{item.title}</h3>
              <p className="mt-1 text-xs leading-6 text-aura-muted">{item.text}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
