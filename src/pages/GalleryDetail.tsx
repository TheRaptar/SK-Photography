import { useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { Share2, Check, ArrowLeft } from 'lucide-react';
import Seo from '../components/shared/Seo';
import GalleryGrid from '../components/portfolio/GalleryGrid';
import Lightbox from '../components/portfolio/Lightbox';
import PhotoMedia from '../components/shared/PhotoMedia';
import { galleries, photos } from '../data/content';
import { CATEGORY_LABELS } from '../types';
import { useUploadedPhotos, toPhoto } from '../hooks/useUploadedPhotos';

export default function GalleryDetail() {
  const { galleryId } = useParams();
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [copied, setCopied] = useState(false);
  const { uploadedPhotos } = useUploadedPhotos();
  const reduceMotion = useReducedMotion();

  const gallery = galleries.find((g) => g.id === galleryId);
  const galleryPhotos = useMemo(
    () => [
      ...photos.filter((p) => p.galleryId === galleryId),
      ...uploadedPhotos.filter((p) => p.galleryId === galleryId).map(toPhoto),
    ],
    [galleryId, uploadedPhotos]
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

      {/* Cinematic opening — the cover print unveils itself, like walking
          into a room and the lights coming up on the exhibition. */}
      <section className="relative h-[62vh] min-h-[420px] w-full overflow-hidden bg-ink">
        <motion.div
          initial={reduceMotion ? { opacity: 1 } : { opacity: 0, scale: 1.09 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.3, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0"
        >
          <PhotoMedia src={gallery.cover} alt={gallery.title} loading="eager" fetchPriority="high" />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/35" />

        <Link
          to="/portfolio"
          className="absolute top-28 left-6 lg:left-10 inline-flex items-center gap-1.5 text-[12px] tracking-[0.06em] uppercase text-white/80 hover:text-white transition-colors"
        >
          <ArrowLeft size={13} strokeWidth={1.6} /> Back to portfolio
        </Link>

        <div className="relative h-full max-w-7xl mx-auto px-6 lg:px-10 flex flex-col justify-end pb-12">
          <motion.p
            initial={reduceMotion ? undefined : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35 }}
            className="eyebrow text-[#e7d9c2] mb-4"
          >
            {CATEGORY_LABELS[gallery.category]}
          </motion.p>
          <span className="block overflow-hidden">
            <motion.h1
              initial={reduceMotion ? undefined : { y: '110%' }}
              animate={{ y: '0%' }}
              transition={{ duration: 0.9, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="font-display text-white text-[clamp(2rem,4.6vw,3.6rem)] leading-[1.05] text-balance max-w-2xl"
            >
              {gallery.title}
            </motion.h1>
          </span>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 lg:px-10 pt-10 pb-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="flex flex-wrap gap-x-6 gap-y-1 text-sm text-ink-dim">
            <span>{gallery.date}</span>
            <span>{gallery.location}</span>
            <span>{galleryPhotos.length} photos</span>
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
