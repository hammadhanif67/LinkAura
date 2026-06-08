export type FeedbackRating = 'love' | 'good' | 'okay' | 'needs-work' | 'problem';

export interface FeedbackEntry {
  id: string;
  name?: string;
  email?: string;
  message?: string;
  rating?: FeedbackRating;
  feedbackType: string;
  source: 'quick-feedback' | 'detailed-feedback';
  createdAt: string;
}

export interface NewsletterSubscription {
  id: string;
  email: string;
  createdAt: string;
}

const FEEDBACK_KEY = 'link-aura-feedback';
const NEWSLETTER_KEY = 'link-aura-newsletter-subscriptions';

export const ratingLabels: Record<FeedbackRating, string> = {
  love: 'Love It',
  good: 'Good',
  okay: 'Okay',
  'needs-work': 'Needs Work',
  problem: 'Problem',
};

export const ratingScores: Record<FeedbackRating, number> = {
  love: 5,
  good: 4,
  okay: 3,
  'needs-work': 2,
  problem: 1,
};

const readJson = <T>(key: string, fallback: T): T => {
  try {
    return JSON.parse(localStorage.getItem(key) || '') as T;
  } catch {
    return fallback;
  }
};

export const getFeedbackEntries = () => readJson<FeedbackEntry[]>(FEEDBACK_KEY, []);

export const saveFeedbackEntry = (entry: Omit<FeedbackEntry, 'id' | 'createdAt'>) => {
  const next: FeedbackEntry = {
    ...entry,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
  };
  localStorage.setItem(FEEDBACK_KEY, JSON.stringify([next, ...getFeedbackEntries()]));
  window.dispatchEvent(new Event('link-aura-feedback-updated'));
  return next;
};

export const getNewsletterSubscriptions = () => readJson<NewsletterSubscription[]>(NEWSLETTER_KEY, []);

export const saveNewsletterSubscription = (email: string) => {
  const subscriptions = getNewsletterSubscriptions();
  const normalized = email.trim().toLowerCase();
  const existing = subscriptions.find((item) => item.email.toLowerCase() === normalized);
  if (existing) return { subscription: existing, created: false };

  const subscription: NewsletterSubscription = {
    id: crypto.randomUUID(),
    email: normalized,
    createdAt: new Date().toISOString(),
  };
  localStorage.setItem(NEWSLETTER_KEY, JSON.stringify([subscription, ...subscriptions]));
  window.dispatchEvent(new Event('link-aura-newsletter-updated'));
  return { subscription, created: true };
};
