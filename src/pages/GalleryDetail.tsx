import { useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Share2, Check, ArrowLeft } from 'lucide-react';
import Seo from '../components/shared/Seo';
import GalleryGrid from '../components/portfolio/GalleryGrid';
import Lightbox from '../components/portfolio/Lightbox';
import { galleries, photos } from '../data/content';
import { CATEGORY_LABELS } from '../types';

export default function GalleryDetail() {
  const { galleryId } = useParams();
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [copied, setCopied] = useState(false);

  const gallery = galleries.find((g) => g.id === galleryId);
  const galleryPhotos = useMemo(
    () => photos.filter((p) => p.galleryId === galleryId),
    [galleryId]
  );

  if (!gallery) {
    return (
      <div className="pt-40 pb-32 text-center max-w-xl mx-auto px-6">
        <p className="font-display text-2xl mb-4">Gallery not found.</p>
        <Link to="/portfolio" className="text-accent text-sm underline underline-offset-4">
          Back to portfolio
        </Link>
      </div>
    );
  }

  const handleShare = async () => {
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({ title: gallery.title, url });
        return;
      } catch {
        // user cancelled — fall through to clipboard
      }
    }
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <Seo
        title={gallery.title}
        description={gallery.description}
        path={`/portfolio/${gallery.id}`}
      />

      <div className="pt-32 pb-16 max-w-7xl mx-auto px-6 lg:px-10">
        <Link
          to="/portfolio"
          className="inline-flex items-center gap-1.5 text-[12px] tracking-[0.06em] uppercase text-ink-dim hover:text-ink transition-colors mb-10"
        >
          <ArrowLeft size={13} strokeWidth={1.6} /> Back to portfolio
        </Link>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-4">
          <div>
            <p className="eyebrow mb-4">{CATEGORY_LABELS[gallery.category]}</p>
            <h1 className="font-display text-[clamp(2rem,4.6vw,3.6rem)] text-balance max-w-2xl">
              {gallery.title}
            </h1>
            <div className="flex flex-wrap gap-x-6 gap-y-1 mt-4 text-sm text-ink-dim">
              <span>{gallery.date}</span>
              <span>{gallery.location}</span>
              <span>{galleryPhotos.length} photos</span>
            </div>
          </div>

          <button
            type="button"
            onClick={handleShare}
            className="inline-flex items-center gap-2 text-[12px] tracking-[0.06em] uppercase border border-line-strong px-5 py-3 hover:bg-ink hover:text-bg hover:border-ink transition-colors shrink-0 self-start"
          >
            {copied ? <Check size={14} strokeWidth={1.6} /> : <Share2 size={14} strokeWidth={1.6} />}
            {copied ? 'Link copied' : 'Share with client'}
          </button>
        </div>

        <p className="text-ink-dim max-w-2xl leading-relaxed mt-6">{gallery.description}</p>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-10 pb-28">
        <GalleryGrid photos={galleryPhotos} onOpen={(i) => setLightboxIndex(i)} />
      </div>

      {lightboxIndex !== null && (
        <Lightbox
          photos={galleryPhotos}
          index={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onNavigate={setLightboxIndex}
        />
      )}
    </>
  );
}
