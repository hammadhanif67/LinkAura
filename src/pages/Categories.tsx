import categoriesData from '../data/categories.json';
import { CategoryCard } from '../components/ui/CategoryCard';
import type { Category } from '../types/category.types';

const categories = categoriesData as Category[];

export default function Categories() {
  return (
    <main className="container-aura py-10 sm:py-12">
      <p className="eyebrow">Directory map</p>
      <h1 className="mt-3 font-display text-3xl font-extrabold tracking-[-0.05em] sm:text-4xl">Categories</h1>
      <p className="mt-3 max-w-2xl text-sm text-aura-muted">Explore all organized website categories.</p>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {categories.map((category) => (
          <CategoryCard key={category.slug} category={category} />
        ))}
      </div>
    </main>
  );
}
