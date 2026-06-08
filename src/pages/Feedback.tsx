import { MessageSquareHeart } from 'lucide-react';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { FeedbackModal } from '../components/ui/FeedbackModal';
import { FeedbackRating, ratingLabels, saveFeedbackEntry } from '../utils/feedbackStore';

const ratings: { key: FeedbackRating; icon: string; label: string }[] = [
  { key: 'love', icon: 'Love', label: 'Love It' },
  { key: 'good', icon: 'Good', label: 'Good' },
  { key: 'okay', icon: 'Okay', label: 'Okay' },
  { key: 'needs-work', icon: 'Work', label: 'Needs Work' },
  { key: 'problem', icon: 'Issue', label: 'Problem' },
];

export default function Feedback() {
  const [selectedRating, setSelectedRating] = useState<FeedbackRating | undefined>();
  const [modalOpen, setModalOpen] = useState(false);

  const quickSave = (rating: FeedbackRating) => {
    setSelectedRating(rating);
    saveFeedbackEntry({
      rating,
      feedbackType: 'Quick Feedback',
      source: 'quick-feedback',
    });
    toast.success('Thanks for your feedback.');
  };

  return (
    <main className="container-aura py-12">
      <div className="panel mx-auto max-w-3xl p-6 sm:p-8">
        <div className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-violet-500 to-pink-500 text-white">
          <MessageSquareHeart size={22} />
        </div>
        <h1 className="mt-5 font-display text-3xl font-extrabold tracking-[-0.05em]">Share Your Feedback</h1>
        <p className="mt-3 text-sm leading-7 text-aura-muted">
          Help us improve LinkAura by sharing your opinion, reporting broken links, suggesting new websites, or requesting a category.
        </p>
        <div className="mt-6 flex flex-wrap gap-2">
          {ratings.map((item) => (
            <button
              key={item.key}
              className={`rounded-full border px-4 py-2 text-sm font-extrabold transition hover:-translate-y-0.5 ${
                selectedRating === item.key
                  ? 'border-red-500/30 bg-red-500/10 text-aura-red shadow-sm'
                  : 'border-aura-border bg-aura-card text-aura-muted hover:border-red-500/25 hover:text-aura-text'
              }`}
              type="button"
              aria-pressed={selectedRating === item.key}
              title={ratingLabels[item.key]}
              onClick={() => quickSave(item.key)}
            >
              {item.icon} {item.label}
            </button>
          ))}
        </div>
        <div className="mt-7 flex flex-wrap gap-3">
          <button className="primary-button" type="button" onClick={() => setModalOpen(true)}>
            Write Detailed Feedback
          </button>
        </div>
      </div>
      <FeedbackModal isOpen={modalOpen} rating={selectedRating} onClose={() => setModalOpen(false)} />
    </main>
  );
}
