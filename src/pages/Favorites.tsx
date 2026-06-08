import { Link } from 'react-router-dom';
import { WebsiteCard } from '../components/ui/WebsiteCard';
import { useFavorites } from '../hooks/useFavorites';

export default function Favorites() {
  const { favoriteWebsites, clearAll } = useFavorites();

  return (
    <main className="container-aura py-10 sm:py-12">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="eyebrow">Saved collection</p>
          <h1 className="mt-3 font-display text-3xl font-extrabold tracking-[-0.05em] sm:text-4xl">Favorites</h1>
          <p className="mt-3 text-sm text-aura-muted">Saved websites persist locally in your browser.</p>
        </div>
        {favoriteWebsites.length ? (
          <button className="muted-button" type="button" onClick={clearAll}>
            Clear All
          </button>
        ) : null}
      </div>
      {favoriteWebsites.length ? (
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {favoriteWebsites.map((website) => (
            <WebsiteCard key={website.id} website={website} />
          ))}
        </div>
      ) : (
        <div className="panel mt-10 p-10 text-center">
          <h2 className="font-display text-2xl font-extrabold tracking-[-0.04em]">No favorites yet</h2>
          <p className="mt-2 text-aura-muted">Open any website card and tap the heart to save it.</p>
          <Link className="primary-button mt-5" to="/categories">
            Browse Categories
          </Link>
        </div>
      )}
    </main>
  );
}
