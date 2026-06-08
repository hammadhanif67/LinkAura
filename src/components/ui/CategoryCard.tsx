import * as Icons from 'lucide-react';
import { Link } from 'react-router-dom';
import type { Category } from '../../types/category.types';

interface CategoryCardProps {
  category: Category;
}

export function CategoryCard({ category }: CategoryCardProps) {
  const Icon = (Icons[category.icon as keyof typeof Icons] || Icons.Globe2) as Icons.LucideIcon;
  const to =
    category.slug === 'library'
      ? '/library'
      : category.slug === 'ai-tools'
        ? '/ai-tools'
        : category.slug === 'research-and-science'
          ? '/research'
          : category.slug === 'education-and-learning'
            ? '/education'
            : category.slug === 'travel-and-tourism'
              ? '/travel-transport'
              : category.slug === 'jobs-and-careers'
                ? '/jobs-careers'
                : category.slug === 'developer-tools'
                  ? '/developer-tools'
                  : category.slug === 'freelancing-and-remote-work'
                    ? '/freelancing'
                    : category.slug === 'finance-and-banking'
                      ? '/finance-banking'
                      : category.slug === 'health-and-medical'
                        ? '/health-medical'
                        : category.slug === 'scholarships-and-study-abroad'
                          ? '/scholarships'
                          : category.slug === 'utilities-and-bill-payment'
                            ? '/utilities'
                            : category.slug === 'entertainment-and-streaming'
                              ? '/entertainment'
                              : `/category/${category.slug}`;

  return (
    <Link
      className="panel group block min-h-[205px] p-5 transition duration-300 hover:border-red-200 hover:shadow-aura"
      to={to}
    >
      <div
        className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl text-white shadow-sm"
        style={{ background: `linear-gradient(135deg, ${category.color}, #0ea5e9)` }}
      >
        <Icon size={20} />
      </div>
      <h3 className="font-display text-sm font-extrabold tracking-[-0.02em]">{category.label}</h3>
      <p className="mt-2 line-clamp-3 text-xs leading-6 text-aura-muted">{category.description}</p>
      <p className="mt-4 inline-flex rounded-md bg-red-50 px-2.5 py-1.5 font-mono text-[0.68rem] font-bold text-aura-red dark:bg-red-500/10">
        {category.websiteCount} websites
      </p>
    </Link>
  );
}
