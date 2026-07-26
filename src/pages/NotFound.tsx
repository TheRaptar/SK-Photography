import { Link } from 'react-router-dom';
import Seo from '../components/shared/Seo';

export default function NotFound() {
  return (
    <>
      <Seo title="Page not found" description="The page you're looking for doesn't exist." path="/404" />
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-6">
        <p className="font-display text-7xl mb-6 text-accent">404</p>
        <p className="font-display text-2xl mb-4">This frame didn't make the cut.</p>
        <p className="text-ink-dim mb-10">The page you're looking for doesn't exist or has moved.</p>
        <Link
          to="/"
          className="inline-flex items-center text-[13px] tracking-[0.08em] uppercase border border-line-strong px-7 py-3.5 hover:bg-ink hover:text-bg hover:border-ink transition-colors"
        >
          Back to home
        </Link>
      </div>
    </>
  );
}
