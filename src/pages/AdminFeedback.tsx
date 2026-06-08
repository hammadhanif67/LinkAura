import { useEffect, useMemo, useState } from 'react';
import { FeedbackEntry, FeedbackRating, getFeedbackEntries, ratingLabels, ratingScores } from '../utils/feedbackStore';

const filters: Array<'all' | FeedbackRating> = ['all', 'love', 'good', 'okay', 'needs-work', 'problem'];

const formatDate = (value: string) =>
  new Intl.DateTimeFormat('en', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(value));

export default function AdminFeedback() {
  const [entries, setEntries] = useState<FeedbackEntry[]>(() => getFeedbackEntries());
  const [filter, setFilter] = useState<'all' | FeedbackRating>('all');

  useEffect(() => {
    const reload = () => setEntries(getFeedbackEntries());
    window.addEventListener('link-aura-feedback-updated', reload);
    window.addEventListener('storage', reload);
    return () => {
      window.removeEventListener('link-aura-feedback-updated', reload);
      window.removeEventListener('storage', reload);
    };
  }, []);

  const analytics = useMemo(() => {
    const rated = entries.filter((entry) => entry.rating);
    const totalScore = rated.reduce((total, entry) => total + ratingScores[entry.rating as FeedbackRating], 0);
    const month = new Date().toISOString().slice(0, 7);
    return {
      total: entries.length,
      average: rated.length ? (totalScore / rated.length).toFixed(1) : '0.0',
      love: entries.filter((entry) => entry.rating === 'love').length,
      good: entries.filter((entry) => entry.rating === 'good').length,
      okay: entries.filter((entry) => entry.rating === 'okay').length,
      needsWork: entries.filter((entry) => entry.rating === 'needs-work').length,
      problem: entries.filter((entry) => entry.rating === 'problem').length,
      monthly: entries.filter((entry) => entry.createdAt.slice(0, 7) === month).length,
    };
  }, [entries]);

  const filtered = filter === 'all' ? entries : entries.filter((entry) => entry.rating === filter);

  return (
    <main className="container-aura py-12">
      <p className="eyebrow">Admin</p>
      <h1 className="mt-3 font-display text-3xl font-extrabold tracking-[-0.05em] sm:text-4xl">Feedback</h1>
      <p className="mt-3 max-w-2xl text-sm leading-7 text-aura-muted">View feedback submissions, quick ratings, and LinkAura feedback analytics.</p>

      <section className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          ['Total Feedback', analytics.total],
          ['Average Rating', analytics.average],
          ['Love It Count', analytics.love],
          ['Good Count', analytics.good],
          ['Okay Count', analytics.okay],
          ['Needs Work Count', analytics.needsWork],
          ['Problem Count', analytics.problem],
          ['Monthly Feedback', analytics.monthly],
        ].map(([label, value]) => (
          <div key={label} className="panel p-4">
            <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-aura-muted">{label}</p>
            <strong className="mt-2 block font-display text-3xl font-extrabold tracking-[-0.05em]">{value}</strong>
          </div>
        ))}
      </section>

      <section className="panel mt-8 overflow-hidden">
        <div className="border-b border-aura-border p-4">
          <div className="flex flex-wrap gap-2">
            {filters.map((item) => (
              <button
                key={item}
                className={`rounded-full border px-3 py-1.5 text-xs font-extrabold transition ${
                  filter === item
                    ? 'border-red-500/30 bg-red-500/10 text-aura-red'
                    : 'border-aura-border bg-aura-card text-aura-muted hover:border-red-500/25 hover:text-aura-text'
                }`}
                type="button"
                onClick={() => setFilter(item)}
              >
                {item === 'all' ? 'All' : ratingLabels[item]}
              </button>
            ))}
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[820px] text-left text-sm">
            <thead className="bg-aura-hover text-xs uppercase tracking-[0.12em] text-aura-muted">
              <tr>
                <th className="px-4 py-3">Rating</th>
                <th className="px-4 py-3">Type</th>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">Message</th>
                <th className="px-4 py-3">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-aura-border">
              {filtered.map((entry) => (
                <tr key={entry.id} className="align-top">
                  <td className="px-4 py-3 font-extrabold">{entry.rating ? ratingLabels[entry.rating] : 'No rating'}</td>
                  <td className="px-4 py-3">{entry.feedbackType}</td>
                  <td className="px-4 py-3">{entry.name || '-'}</td>
                  <td className="px-4 py-3">{entry.email || '-'}</td>
                  <td className="max-w-sm px-4 py-3 text-aura-muted">{entry.message || entry.source}</td>
                  <td className="px-4 py-3 text-aura-muted">{formatDate(entry.createdAt)}</td>
                </tr>
              ))}
              {!filtered.length ? (
                <tr>
                  <td className="px-4 py-8 text-center text-aura-muted" colSpan={6}>
                    No feedback found for this filter.
                  </td>
                </tr>
              ) : null}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}
