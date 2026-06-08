import { useLocation } from 'react-router-dom';
import { scholarships } from '../data/scholarships';
import { ScholarshipCard } from '../components/ui/ScholarshipCard';

const collectionConfig = {
  '/study-abroad': {
    eyebrow: 'Study Abroad Resources',
    title: 'Study Abroad Guides',
    subtitle: 'Official country guides, admissions resources, and planning portals for international students.',
    filter: (subcategory: string) => subcategory === 'Study Abroad Resources' || subcategory === 'Admissions Portals',
  },
  '/fellowships': {
    eyebrow: 'Fellowships',
    title: 'Fellowships & Research Funding',
    subtitle: 'Prestigious fellowships, research funding, doctoral, and postgraduate opportunities.',
    filter: (subcategory: string) => subcategory === 'Fellowships' || subcategory === 'Research Funding',
  },
  '/student-visas': {
    eyebrow: 'Student Visa Resources',
    title: 'Official Student Visa Resources',
    subtitle: 'Verified government visa and study permit pages for major study destinations.',
    filter: (subcategory: string) => subcategory === 'Student Visa Resources',
  },
};

export default function ScholarshipCollection() {
  const { pathname } = useLocation();
  const config = collectionConfig[pathname as keyof typeof collectionConfig] || collectionConfig['/study-abroad'];
  const results = scholarships.filter((item) => config.filter(item.subcategory));

  return (
    <main className="container-aura py-10 sm:py-12">
      <p className="eyebrow">{config.eyebrow}</p>
      <h1 className="mt-3 font-display text-3xl font-extrabold tracking-[-0.05em] sm:text-4xl">{config.title}</h1>
      <p className="mt-3 max-w-2xl text-sm text-aura-muted">{config.subtitle}</p>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {results.map((item) => (
          <ScholarshipCard key={item.id} scholarship={item} />
        ))}
      </div>
    </main>
  );
}
