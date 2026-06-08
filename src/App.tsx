import { lazy, Suspense, useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import { Route, Routes } from 'react-router-dom';
import { Footer } from './components/layout/Footer';
import { Navbar } from './components/layout/Navbar';
import { ScrollToTop } from './components/ui/ScrollToTop';
import { SkeletonCard } from './components/ui/SkeletonCard';
import { useThemeStore } from './store/useThemeStore';

const Home = lazy(() => import('./pages/Home'));
const Categories = lazy(() => import('./pages/Categories'));
const Category = lazy(() => import('./pages/Category'));
const Trending = lazy(() => import('./pages/Trending'));
const NewWebsites = lazy(() => import('./pages/NewWebsites'));
const TopRated = lazy(() => import('./pages/TopRated'));
const Tools = lazy(() => import('./pages/Tools'));
const Favorites = lazy(() => import('./pages/Favorites'));
const Search = lazy(() => import('./pages/Search'));
const Submit = lazy(() => import('./pages/Submit'));
const Feedback = lazy(() => import('./pages/Feedback'));
const AdminFeedback = lazy(() => import('./pages/AdminFeedback'));
const Universities = lazy(() => import('./pages/Universities'));
const UniversityDetail = lazy(() => import('./pages/UniversityDetail'));
const Scholarships = lazy(() => import('./pages/Scholarships'));
const ScholarshipCollection = lazy(() => import('./pages/ScholarshipCollection'));
const ScholarshipDetail = lazy(() => import('./pages/ScholarshipDetail'));
const Utilities = lazy(() => import('./pages/Utilities'));
const UtilityCollection = lazy(() => import('./pages/UtilityCollection'));
const UtilityDetail = lazy(() => import('./pages/UtilityDetail'));
const Entertainment = lazy(() => import('./pages/Entertainment'));
const EntertainmentCollection = lazy(() => import('./pages/EntertainmentCollection'));
const EntertainmentDetail = lazy(() => import('./pages/EntertainmentDetail'));
const NotFound = lazy(() => import('./pages/NotFound'));

function Loader() {
  return (
    <div className="container-aura grid min-h-[50vh] gap-5 py-12 sm:grid-cols-2 lg:grid-cols-4">
      {Array.from({ length: 8 }).map((_, index) => (
        <SkeletonCard key={index} />
      ))}
    </div>
  );
}

export default function App() {
  const theme = useThemeStore((state) => state.theme);

  useEffect(() => {
    document.documentElement.classList.toggle('light', theme === 'light');
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  return (
    <>
      <Navbar />
      <div className="pt-[76px]">
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/category/:slug" element={<Category />} />
            <Route path="/ai-tools" element={<Category slugOverride="ai-tools" />} />
            <Route path="/books-libraries" element={<Category slugOverride="library" />} />
            <Route path="/library" element={<Category slugOverride="library" />} />
            <Route path="/research" element={<Category slugOverride="research-and-science" />} />
            <Route path="/education" element={<Category slugOverride="education-and-learning" />} />
            <Route path="/travel-transport" element={<Category slugOverride="travel-and-tourism" />} />
            <Route path="/jobs-careers" element={<Category slugOverride="jobs-and-careers" />} />
            <Route path="/developer-tools" element={<Category slugOverride="developer-tools" />} />
            <Route path="/freelancing" element={<Category slugOverride="freelancing-and-remote-work" />} />
            <Route path="/finance-banking" element={<Category slugOverride="finance-and-banking" />} />
            <Route path="/health-medical" element={<Category slugOverride="health-and-medical" />} />
            <Route path="/trending" element={<Trending />} />
            <Route path="/new" element={<NewWebsites />} />
            <Route path="/top-rated" element={<TopRated />} />
            <Route path="/tools" element={<Tools />} />
            <Route path="/scholarships" element={<Scholarships />} />
            <Route path="/study-abroad" element={<ScholarshipCollection />} />
            <Route path="/fellowships" element={<ScholarshipCollection />} />
            <Route path="/student-visas" element={<ScholarshipCollection />} />
            <Route path="/scholarships/:slug" element={<ScholarshipDetail />} />
            <Route path="/scholarship/:slug" element={<ScholarshipDetail />} />
            <Route path="/utilities" element={<Utilities />} />
            <Route path="/electricity" element={<UtilityCollection />} />
            <Route path="/gas" element={<UtilityCollection />} />
            <Route path="/telecom" element={<UtilityCollection />} />
            <Route path="/internet" element={<UtilityCollection />} />
            <Route path="/bill-payments" element={<UtilityCollection />} />
            <Route path="/utilities/:slug" element={<UtilityDetail />} />
            <Route path="/entertainment" element={<Entertainment />} />
            <Route path="/movie-streaming" element={<EntertainmentCollection />} />
            <Route path="/anime" element={<EntertainmentCollection />} />
            <Route path="/music-streaming" element={<EntertainmentCollection />} />
            <Route path="/sports-streaming" element={<EntertainmentCollection />} />
            <Route path="/live-tv" element={<EntertainmentCollection />} />
            <Route path="/entertainment/:slug" element={<EntertainmentDetail />} />
            <Route path="/universities" element={<Universities />} />
            <Route path="/university/:slug" element={<UniversityDetail />} />
            <Route path="/universities/:slug" element={<UniversityDetail />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/search" element={<Search />} />
            <Route path="/submit" element={<Submit />} />
            <Route path="/feedback" element={<Feedback />} />
            <Route path="/admin/feedback" element={<AdminFeedback />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </div>
      <Footer />
      <ScrollToTop />
      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            background: 'var(--bg-card)',
            color: 'var(--text-primary)',
            border: '1px solid var(--border)',
          },
        }}
      />
    </>
  );
}
