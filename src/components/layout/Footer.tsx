import { Github, Instagram, Link2, Linkedin, Twitter } from 'lucide-react';
import { FormEvent, useState } from 'react';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { FeedbackModal } from '../ui/FeedbackModal';
import { FeedbackRating, ratingLabels, saveFeedbackEntry, saveNewsletterSubscription } from '../../utils/feedbackStore';

const socialLinks = [
  { label: 'GitHub', icon: Github, href: 'https://github.com' },
  { label: 'LinkedIn', icon: Linkedin, href: 'https://linkedin.com' },
  { label: 'X / Twitter', icon: Twitter, href: 'https://x.com' },
  { label: 'Instagram', icon: Instagram, href: 'https://instagram.com' },
];

const columns = [
  {
    title: 'Quick Links',
    links: [
      ['Home', '/'],
      ['All Categories', '/categories'],
      ['Popular Websites', '/top-rated'],
      ['Newly Added', '/new'],
      ['Submit Website', '/submit'],
      ['Favorites', '/favorites'],
    ],
  },
  {
    title: 'Resources',
    links: [
      ['Library', '/library'],
      ['Research Papers', '/research'],
      ['AI Tools', '/ai-tools'],
      ['Education', '/education'],
      ['Scholarships', '/scholarships'],
      ['Jobs', '/jobs-careers'],
      ['Travel Booking', '/travel-transport'],
      ['Developer Tools', '/developer-tools'],
    ],
  },
  {
    title: 'Support',
    links: [
      ['Help Center', '/help'],
      ['Contact Us', '/contact'],
      ['Feedback', '/feedback'],
      ['Admin Feedback', '/admin/feedback'],
      ['Report Broken Link', '/feedback'],
      ['Request Category', '/feedback'],
      ['Advertise', '/advertise'],
    ],
  },
  {
    title: 'Legal',
    links: [
      ['Privacy Policy', '/privacy'],
      ['Terms & Conditions', '/terms'],
      ['Cookies Policy', '/cookies'],
      ['DMCA', '/dmca'],
      ['Disclaimer', '/disclaimer'],
    ],
  },
];

const ratings: { key: FeedbackRating; icon: string; label: string }[] = [
  { key: 'love', icon: 'Love', label: 'Love It' },
  { key: 'good', icon: 'Good', label: 'Good' },
  { key: 'okay', icon: 'Okay', label: 'Okay' },
  { key: 'needs-work', icon: 'Work', label: 'Needs Work' },
  { key: 'problem', icon: 'Issue', label: 'Problem' },
];

export function Footer() {
  const [selectedRating, setSelectedRating] = useState<FeedbackRating | undefined>();
  const [feedbackOpen, setFeedbackOpen] = useState(false);
  const [newsletterEmail, setNewsletterEmail] = useState('');

  const submitQuickFeedback = (rating: FeedbackRating) => {
    setSelectedRating(rating);
    saveFeedbackEntry({
      rating,
      feedbackType: 'Quick Feedback',
      source: 'quick-feedback',
    });
    toast.success('Thanks for your feedback.');
  };

  const subscribe = (event: FormEvent) => {
    event.preventDefault();
    if (!/^\S+@\S+\.\S+$/.test(newsletterEmail.trim())) {
      toast.error('Enter a valid email.');
      return;
    }
    const result = saveNewsletterSubscription(newsletterEmail);
    setNewsletterEmail('');
    toast.success(result.created ? 'Subscribed successfully.' : 'You are already subscribed.');
  };

  return (
    <footer className="container-aura mt-14 pb-6">
      <div className="overflow-hidden rounded-t-[32px] bg-[radial-gradient(circle_at_12%_10%,rgba(236,72,153,0.22),transparent_24rem),radial-gradient(circle_at_84%_4%,rgba(124,58,237,0.28),transparent_26rem),linear-gradient(135deg,#0b1020,#24124d)] text-white shadow-[0_-18px_70px_rgba(15,23,42,0.18)]">
        <div className="grid gap-8 px-5 pb-8 pt-10 sm:px-8 md:pt-14 lg:grid-cols-[1.35fr_repeat(4,1fr)] lg:px-10 lg:pb-10 lg:pt-16">
          <div>
            <Link className="flex items-center gap-2.5" to="/">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-[linear-gradient(135deg,#ec4899,#8b5cf6)] text-white shadow-[0_12px_30px_rgba(139,92,246,0.28)]">
                <Link2 size={19} />
              </span>
              <span className="font-display text-lg font-extrabold tracking-[-0.03em] sm:text-xl">
                <span className="text-white">Link</span><span className="text-aura-red">Aura</span>
              </span>
            </Link>
            <p className="mt-5 max-w-sm text-sm leading-7 text-slate-300">
              A curated directory of useful websites, tools, digital libraries, research sources, travel platforms, learning resources, and services from around the world.
            </p>
            <div className="mt-6 flex flex-nowrap items-center gap-2.5">
              {socialLinks.map((item) => (
                <a
                  key={item.label}
                  className="grid h-11 w-11 place-items-center rounded-full border border-white/10 bg-white/[0.08] text-slate-200 transition hover:-translate-y-0.5 hover:border-pink-300/50 hover:bg-white/[0.16] hover:text-white"
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={item.label}
                  title={item.label}
                >
                  <item.icon size={17} />
                </a>
              ))}
            </div>
          </div>

          {columns.map((column) => (
            <div key={column.title}>
              <h3 className="text-sm font-extrabold text-white">{column.title}</h3>
              <div className="mt-5 grid gap-3 text-sm font-semibold text-slate-300">
                {column.links.map(([label, to], index) => (
                  <Link key={label} className={`transition hover:translate-x-0.5 hover:text-pink-200 ${index > 3 ? 'hidden md:block' : ''}`} to={to}>
                    {label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mx-5 rounded-3xl border border-white/10 bg-white/[0.08] p-5 shadow-[0_20px_60px_rgba(0,0,0,0.18)] sm:mx-8 sm:p-6 lg:mx-10">
          <div className="grid gap-6 lg:grid-cols-[1fr_0.75fr] lg:items-start">
            <div>
              <h3 className="font-display text-xl font-extrabold tracking-[-0.04em]">We Value Your Feedback</h3>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-300">
                Help us improve LinkAura for students, professionals, researchers and everyday users.
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {ratings.map((item) => (
                  <button
                    key={item.key}
                    className={`rounded-full border px-3 py-1.5 text-xs font-extrabold transition hover:-translate-y-0.5 ${
                      selectedRating === item.key
                        ? 'border-pink-300/70 bg-pink-300/20 text-white shadow-[0_12px_28px_rgba(236,72,153,0.22)]'
                        : 'border-white/10 bg-white/[0.08] text-slate-200 hover:border-pink-300/40 hover:text-white'
                    }`}
                    type="button"
                    aria-pressed={selectedRating === item.key}
                    title={ratingLabels[item.key]}
                    onClick={() => submitQuickFeedback(item.key)}
                  >
                    {item.icon} {item.label}
                  </button>
                ))}
              </div>
              <button className="mt-5 inline-flex items-center justify-center rounded-2xl bg-white px-5 py-3 text-sm font-extrabold text-slate-950 shadow-[0_16px_36px_rgba(255,255,255,0.16)] transition hover:-translate-y-0.5 hover:bg-pink-100" type="button" onClick={() => setFeedbackOpen(true)}>
                Send Feedback
              </button>
            </div>

            <div className="hidden gap-4 md:grid">
              <div className="rounded-2xl border border-white/10 bg-white/[0.08] p-4">
                <h3 className="font-display text-lg font-extrabold tracking-[-0.04em]">Join LinkAura Community</h3>
                <p className="mt-1 text-sm font-bold text-pink-100">15K+ Members</p>
                <Link className="mt-4 inline-flex rounded-xl border border-white/15 px-4 py-2 text-sm font-extrabold text-white transition hover:border-pink-300/50 hover:bg-white/[0.1]" to="/community">
                  Join Community
                </Link>
              </div>
              <form className="rounded-2xl border border-white/10 bg-white/[0.08] p-4" onSubmit={subscribe}>
                <h3 className="font-display text-lg font-extrabold tracking-[-0.04em]">Newsletter</h3>
                <p className="mt-1 text-sm text-slate-300">Get useful web finds weekly.</p>
                <div className="mt-4 flex flex-col gap-2 sm:flex-row">
                  <input
                    className="min-w-0 flex-1 rounded-xl border border-white/10 bg-white/[0.1] px-3 py-2 text-sm text-white outline-none transition placeholder:text-slate-400 focus:border-pink-300/60 focus:ring-4 focus:ring-pink-300/10"
                    value={newsletterEmail}
                    type="email"
                    placeholder="you@example.com"
                    onChange={(event) => setNewsletterEmail(event.target.value)}
                  />
                  <button className="rounded-xl bg-white px-4 py-2 text-sm font-extrabold text-slate-950 transition hover:bg-pink-100" type="submit">
                    Subscribe
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-white/10 px-5 py-5 sm:px-8 lg:mt-10 lg:px-10">
          <div className="flex flex-col gap-3 text-sm font-semibold text-slate-300 lg:flex-row lg:items-center lg:justify-between">
            <p>Copyright 2026 LinkAura. All rights reserved.</p>
            <p className="hidden md:block">Made with care for students, professionals and everyone.</p>
            <div className="flex flex-wrap items-center gap-4">
              <span className="hidden sm:inline">Pakistan</span>
              <span className="hidden sm:inline">English</span>
              <span className="hidden sm:inline">PKR</span>
              <button className="font-extrabold text-white transition hover:text-pink-200" type="button" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                Back to Top
              </button>
            </div>
          </div>
        </div>
      </div>
      <FeedbackModal isOpen={feedbackOpen} rating={selectedRating} onClose={() => setFeedbackOpen(false)} />
    </footer>
  );
}
