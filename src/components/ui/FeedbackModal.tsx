import { motion } from 'framer-motion';
import { FormEvent, useState } from 'react';
import toast from 'react-hot-toast';
import { Modal } from './Modal';
import { FeedbackRating, ratingLabels, saveFeedbackEntry } from '../../utils/feedbackStore';

interface FeedbackModalProps {
  isOpen: boolean;
  rating?: FeedbackRating;
  onClose: () => void;
  onSubmitted?: () => void;
}

const feedbackTypes = [
  'General Feedback',
  'Bug Report',
  'Suggest Website',
  'Request Category',
  'Report Broken Link',
  'Feature Request',
];

export function FeedbackModal({ isOpen, rating, onClose, onSubmitted }: FeedbackModalProps) {
  const [feedbackType, setFeedbackType] = useState(feedbackTypes[0]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState(false);

  const reset = () => {
    setFeedbackType(feedbackTypes[0]);
    setName('');
    setEmail('');
    setMessage('');
  };

  const submit = (event: FormEvent) => {
    event.preventDefault();
    const trimmedMessage = message.trim();

    if (!rating && !trimmedMessage) {
      toast.error('Select a rating or write a message.');
      return;
    }
    if (trimmedMessage && trimmedMessage.length < 10) {
      toast.error('Message must be at least 10 characters.');
      return;
    }
    if (trimmedMessage.length > 1000) {
      toast.error('Message must be 1000 characters or less.');
      return;
    }
    if (email.trim() && !/^\S+@\S+\.\S+$/.test(email.trim())) {
      toast.error('Enter a valid email or leave it blank.');
      return;
    }

    saveFeedbackEntry({
      name: name.trim() || undefined,
      email: email.trim() || undefined,
      message: trimmedMessage || undefined,
      rating,
      feedbackType,
      source: 'detailed-feedback',
    });
    setSuccess(true);
    toast.success('Thank you for your feedback.');
    onSubmitted?.();
    reset();
  };

  return (
    <Modal
      isOpen={isOpen}
      title={success ? 'Thank you for your feedback' : 'Send Feedback'}
      onClose={() => {
        setSuccess(false);
        onClose();
      }}
    >
      {success ? (
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="py-8 text-center">
          <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-emerald-500 text-2xl font-extrabold text-white">✓</div>
          <h3 className="mt-5 font-display text-2xl font-extrabold tracking-[-0.04em]">Thank you for your feedback.</h3>
          <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-aura-muted">Your feedback helps improve LinkAura.</p>
          <button
            className="primary-button mt-6"
            type="button"
            onClick={() => {
              setSuccess(false);
              onClose();
            }}
          >
            Done
          </button>
        </motion.div>
      ) : (
        <form className="grid gap-4" onSubmit={submit}>
          <label className="grid gap-2 text-sm font-extrabold">
            Feedback Type
            <select className="field" value={feedbackType} onChange={(event) => setFeedbackType(event.target.value)}>
              {feedbackTypes.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </label>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="grid gap-2 text-sm font-extrabold">
              Name <span className="text-xs font-bold text-aura-muted">Optional</span>
              <input className="field" value={name} placeholder="Your name" onChange={(event) => setName(event.target.value)} />
            </label>
            <label className="grid gap-2 text-sm font-extrabold">
              Email <span className="text-xs font-bold text-aura-muted">Optional</span>
              <input className="field" value={email} type="email" placeholder="you@example.com" onChange={(event) => setEmail(event.target.value)} />
            </label>
          </div>
          <label className="grid gap-2 text-sm font-extrabold">
            Message
            <textarea
              className="field min-h-36 resize-y"
              value={message}
              maxLength={1000}
              placeholder="Tell us what worked, what broke, or what you want LinkAura to add..."
              onChange={(event) => setMessage(event.target.value)}
            />
            <span className="text-xs font-bold text-aura-muted">{message.length}/1000 characters. Minimum 10 characters when writing a message.</span>
          </label>
          <div className="rounded-2xl border border-aura-border bg-aura-hover px-4 py-3 text-sm font-bold text-aura-muted">
            Selected Rating: <span className="text-aura-text">{rating ? ratingLabels[rating] : 'None selected'}</span>
          </div>
          <button className="primary-button w-fit" type="submit">
            Submit Feedback
          </button>
        </form>
      )}
    </Modal>
  );
}
