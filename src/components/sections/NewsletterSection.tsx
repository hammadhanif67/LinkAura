import { MailCheck } from 'lucide-react';
import { FormEvent, useState } from 'react';
import toast from 'react-hot-toast';
import { saveNewsletterSubscription } from '../../utils/feedbackStore';

export function NewsletterSection() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      toast.error('Enter a valid email');
      return;
    }
    const result = saveNewsletterSubscription(email);
    setSubmitted(true);
    setEmail('');
    toast.success(result.created ? 'Subscribed' : 'You are already subscribed');
  };

  return (
    <section className="container-aura py-8 sm:py-10">
      <div className="panel grid gap-6 overflow-hidden bg-gradient-to-br from-white via-violet-50/60 to-red-50/50 p-6 md:grid-cols-[1fr_0.55fr] md:items-center md:p-8 dark:from-aura-card dark:via-violet-500/10 dark:to-red-500/10">
        <div>
          <h2 className="font-display text-2xl font-extrabold tracking-[-0.04em]">Get Useful Web Finds Weekly</h2>
          <p className="mt-2 max-w-xl text-sm text-aura-muted">
            Receive newly added websites, book sources, research tools, AI tools, travel platforms and productivity resources every week.
          </p>
          <form className="mt-6 flex max-w-lg flex-col gap-3 sm:flex-row" onSubmit={onSubmit}>
            <input
              className="field min-w-0 flex-1"
              value={email}
              type="email"
              placeholder="you@example.com"
              onChange={(event) => setEmail(event.target.value)}
            />
            <button className="primary-button" type="submit">
              Subscribe
            </button>
          </form>
          <div className="mt-4 flex flex-wrap gap-2">
            {['Books', 'Research', 'AI Tools', 'Travel', 'Jobs', 'Scholarships'].map((tag) => (
              <span key={tag} className="rounded-full bg-white/70 px-3 py-1.5 text-xs font-extrabold text-aura-muted shadow-sm dark:bg-white/10">
                {tag}
              </span>
            ))}
          </div>
          {submitted ? <p className="mt-3 text-sm font-bold text-emerald-600">Subscription saved.</p> : null}
        </div>
        <div className="grid place-items-center">
          <div className="grid aspect-[1.8] w-full max-w-xs place-items-center rounded-2xl border border-red-100 bg-white shadow-sm">
            <MailCheck className="text-aura-red" size={76} />
          </div>
        </div>
      </div>
    </section>
  );
}
