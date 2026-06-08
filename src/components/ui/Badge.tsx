const styles: Record<string, string> = {
  Free: 'bg-emerald-50 text-emerald-700 ring-emerald-200 dark:bg-emerald-400/10 dark:text-emerald-300 dark:ring-emerald-400/20',
  Paid: 'bg-orange-50 text-orange-700 ring-orange-200 dark:bg-orange-400/10 dark:text-orange-300 dark:ring-orange-400/20',
  'Open Source': 'bg-blue-50 text-blue-700 ring-blue-200 dark:bg-blue-400/10 dark:text-blue-300 dark:ring-blue-400/20',
  Pakistani: 'bg-teal-50 text-teal-700 ring-teal-200 dark:bg-teal-400/10 dark:text-teal-300 dark:ring-teal-400/20',
  Popular: 'bg-red-50 text-red-700 ring-red-200 dark:bg-red-400/10 dark:text-red-300 dark:ring-red-400/20',
  New: 'bg-cyan-50 text-cyan-700 ring-cyan-200 dark:bg-cyan-400/10 dark:text-cyan-300 dark:ring-cyan-400/20',
  Verified: 'bg-emerald-50 text-emerald-700 ring-emerald-200 dark:bg-emerald-400/10 dark:text-emerald-300 dark:ring-emerald-400/20',
  'Top Rated': 'bg-amber-50 text-amber-700 ring-amber-200 dark:bg-amber-400/10 dark:text-amber-300 dark:ring-amber-400/20',
  'AI-Powered': 'bg-purple-50 text-purple-700 ring-purple-200 dark:bg-purple-400/10 dark:text-purple-300 dark:ring-purple-400/20',
  Trending: 'bg-lime-50 text-lime-700 ring-lime-200 dark:bg-lime-400/10 dark:text-lime-300 dark:ring-lime-400/20',
};

interface BadgeProps {
  children: string;
}

export function Badge({ children }: BadgeProps) {
  return (
    <span
      className={`inline-flex max-w-full items-center truncate rounded-md px-2 py-1 font-mono text-[0.6rem] font-bold ring-1 ${
        styles[children] || 'bg-slate-50 text-aura-muted ring-aura-border dark:bg-white/10'
      }`}
    >
      {children}
    </span>
  );
}
