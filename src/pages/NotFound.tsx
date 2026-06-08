import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <main className="container-aura grid min-h-[60vh] place-items-center py-16 text-center">
      <div>
        <p className="eyebrow">404</p>
        <h1 className="mt-3 font-display text-4xl font-extrabold tracking-[-0.05em]">Page not found</h1>
        <p className="mt-3 text-aura-muted">The link you opened is not in the directory.</p>
        <Link className="primary-button mt-6" to="/">
          Back Home
        </Link>
      </div>
    </main>
  );
}
