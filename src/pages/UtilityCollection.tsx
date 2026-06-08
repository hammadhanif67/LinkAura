import { useLocation } from 'react-router-dom';
import { utilities } from '../data/utilities';
import { UtilityCard } from '../components/ui/UtilityCard';

const config = {
  '/electricity': ['Electricity', 'Electricity Distribution Companies'],
  '/gas': ['Gas Utilities', 'Gas Utility Providers'],
  '/telecom': ['Telecom Providers', 'Top Telecom Companies'],
  '/internet': ['Internet Service Providers (ISP)', 'Best Internet Providers in Pakistan'],
  '/bill-payments': ['Bill Payment Platforms', 'Online Bill Payment Platforms'],
};

export default function UtilityCollection() {
  const { pathname } = useLocation();
  const [subcategory, title] = config[pathname as keyof typeof config] || config['/electricity'];
  const results = utilities.filter((item) => item.subcategory === subcategory);

  return (
    <main className="container-aura py-10 sm:py-12">
      <p className="eyebrow">Utilities & Bill Payment</p>
      <h1 className="mt-3 font-display text-3xl font-extrabold tracking-[-0.05em] sm:text-4xl">{title}</h1>
      <p className="mt-3 max-w-2xl text-sm text-aura-muted">Verified official utility services and customer portals.</p>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {results.map((item) => <UtilityCard key={item.id} utility={item} />)}
      </div>
    </main>
  );
}
