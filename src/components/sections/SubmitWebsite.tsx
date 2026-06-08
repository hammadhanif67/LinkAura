import { Link } from 'react-router-dom';

export function SubmitWebsite() {
  return (
    <section className="container-aura py-8">
      <div className="panel flex flex-col items-start justify-between gap-5 bg-gradient-to-br from-white to-slate-50 p-6 sm:flex-row sm:items-center md:p-8 dark:from-aura-card dark:to-red-500/10">
        <div>
          <h2 className="font-display text-xl font-extrabold tracking-[-0.04em]">Know a website worth listing?</h2>
          <p className="mt-2 text-sm text-aura-muted">Submit it for review with category, tags, and a reason it belongs here.</p>
        </div>
        <Link className="primary-button" to="/submit">
          Submit Website
        </Link>
      </div>
    </section>
  );
}
