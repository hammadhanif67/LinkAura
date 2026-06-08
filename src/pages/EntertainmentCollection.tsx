import { useLocation } from 'react-router-dom';
import { entertainmentPlatforms } from '../data/entertainment';
import { EntertainmentCard } from '../components/ui/EntertainmentCard';

const config = {
  '/movie-streaming': ['Movie Streaming', 'Best Movie Streaming Platforms'],
  '/anime': ['Anime Streaming', 'Top Anime Websites'],
  '/music-streaming': ['Music Streaming', 'Best Music Streaming Apps'],
  '/sports-streaming': ['Sports Streaming', 'Top Sports Streaming Services'],
  '/live-tv': ['Live TV', 'Live TV Platforms'],
};

export default function EntertainmentCollection() {
  const { pathname } = useLocation();
  const [subcategory, title] = config[pathname as keyof typeof config] || config['/movie-streaming'];
  const results = entertainmentPlatforms.filter((item) => item.subcategory === subcategory);

  return (
    <main className="container-aura py-10 sm:py-12">
      <p className="eyebrow">Entertainment & Streaming</p>
      <h1 className="mt-3 font-display text-3xl font-extrabold tracking-[-0.05em] sm:text-4xl">{title}</h1>
      <p className="mt-3 max-w-2xl text-sm text-aura-muted">Verified official entertainment platforms and media resources.</p>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {results.map((item) => <EntertainmentCard key={item.id} platform={item} />)}
      </div>
    </main>
  );
}
