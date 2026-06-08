import categoriesData from '../../data/categories.json';
import { CategoryCard } from '../ui/CategoryCard';
import { SectionHeader } from './SectionHeader';
import type { Category } from '../../types/category.types';

const categories = categoriesData as Category[];

export function CategoryBrowser() {
  return (
    <section className="container-aura section-padding">
      <SectionHeader title="Browse by Categories" subtitle="35 organized paths into the web." to="/categories" />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {categories.slice(0, 4).map((category) => (
          <CategoryCard key={category.slug} category={category} />
        ))}
      </div>
    </section>
  );
}
