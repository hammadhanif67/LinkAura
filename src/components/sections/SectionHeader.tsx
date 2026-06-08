import { Link } from 'react-router-dom';

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  to?: string;
}

export function SectionHeader({ title, subtitle, to }: SectionHeaderProps) {
  return (
    <div className="mb-6 flex flex-row items-end justify-between gap-4">
      <div>
        <h2 className="font-display text-xl font-extrabold tracking-[-0.04em] sm:text-2xl">{title}</h2>
        {subtitle ? <p className="mt-1 max-w-2xl text-xs text-aura-muted sm:text-sm">{subtitle}</p> : null}
      </div>
      {to ? (
        <Link className="shrink-0 text-xs font-extrabold text-aura-red hover:underline" to={to}>
          View all
        </Link>
      ) : null}
    </div>
  );
}
