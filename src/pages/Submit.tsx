import { FormEvent, useState } from 'react';
import toast from 'react-hot-toast';
import categoriesData from '../data/categories.json';
import type { Category } from '../types/category.types';

const categories = categoriesData as Category[];

export default function Submit() {
  const [submitted, setSubmitted] = useState(false);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const url = String(form.get('websiteUrl') || '');
    try {
      const parsed = new URL(url);
      if (parsed.protocol !== 'https:') throw new Error('HTTPS required');
      setSubmitted(true);
      toast.success('Website submitted for review');
      event.currentTarget.reset();
    } catch {
      toast.error('Enter a valid HTTPS URL');
    }
  };

  return (
    <main className="container-aura py-10 sm:py-12">
      <p className="eyebrow">Review queue</p>
      <h1 className="mt-3 font-display text-3xl font-extrabold tracking-[-0.05em] sm:text-4xl">Submit a Website</h1>
      <p className="mt-3 max-w-2xl text-sm text-aura-muted">Send a verified, safe, useful website for review. Adult, piracy, gambling, scam, malware, hate, and illegal content is rejected.</p>
      <form className="panel mt-8 grid gap-4 p-5 md:grid-cols-2 md:p-6" onSubmit={onSubmit}>
        <input className="field" name="websiteName" placeholder="Website name" required />
        <input className="field" name="websiteUrl" placeholder="https://example.com" required />
        <select className="field" name="category" required>
          {categories.map((category) => (
            <option key={category.slug} value={category.slug}>
              {category.label}
            </option>
          ))}
        </select>
        <input className="field" type="email" name="submitterEmail" placeholder="Your email" required />
        <input className="field md:col-span-2" name="tags" placeholder="Tags, comma separated" required />
        <textarea className="field min-h-32 md:col-span-2" name="description" placeholder="Short description" required />
        <textarea className="field min-h-32 md:col-span-2" name="reason" placeholder="Why should this be listed?" required />
        <button className="primary-button md:col-span-2" type="submit">
          Submit for Review
        </button>
      </form>
      {submitted ? <p className="mt-4 font-bold text-emerald-600">Submission saved locally for review workflow.</p> : null}
    </main>
  );
}
