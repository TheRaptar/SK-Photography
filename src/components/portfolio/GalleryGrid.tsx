import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import type { Photo } from '../../types';
import { CATEGORY_LABELS } from '../../types';
import PhotoMedia from '../shared/PhotoMedia';
import TiltCard from '../shared/TiltCard';

interface GalleryGridProps {
  photos: Photo[];
  onOpen: (index: number) => void;
}

/** Per-column drift rate — the middle column stays put, outer columns
 * drift opposite directions on scroll, like prints hung at slightly
 * different depths on a gallery wall. Purely decorative, disabled for
 * reduced motion. */
const COLUMN_PARALLAX = [-1, 0, 1];

function GalleryTile({ photo, i, onOpen }: { photo: Photo; i: number; onOpen: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const rate = COLUMN_PARALLAX[i % 3] * 26;
  const y = useTransform(scrollYProgress, [0, 1], [rate, -rate]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay: (i % 6) * 0.06, ease: [0.22, 1, 0.36, 1] }}
      style={{ y: reduceMotion ? 0 : y }}
      className="w-full mb-4 break-inside-avoid"
    >
      <TiltCard maxTilt={6} className="block w-full">
        <button
          type="button"
          onClick={onOpen}
          className="group/tile relative block w-full overflow-hidden text-left bg-surface-2"
          style={{ aspectRatio: `${photo.width} / ${photo.height}` }}
          aria-label={`Open ${photo.title} in lightbox`}
        >
          {/* Curtain reveal — the image slides up from behind a mask the
              first time it enters view, like a print being unveiled. */}
          <motion.div
            initial={{ clipPath: 'inset(100% 0 0 0)' }}
            whileInView={{ clipPath: 'inset(0% 0 0 0)' }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.9, delay: (i % 6) * 0.06 + 0.05, ease: [0.65, 0, 0.15, 1] }}
            className="absolute inset-0"
          >
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute inset-0 ken-burns-idle group-hover/tile:[animation-play-state:paused]">
                <PhotoMedia src={photo.src} alt={photo.alt} />
              </div>
            </div>
          </motion.div>

          {/* Soft cursor-following sheen — a glass-over-print glare, not a spotlight */}
          <div
            className="pointer-events-none absolute inset-0 opacity-0 group-hover/tile:opacity-100 transition-opacity duration-500"
            style={{
              background:
                'linear-gradient(115deg, transparent 30%, rgba(255,255,255,0.14) 48%, transparent 66%)',
            }}
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/0 to-black/0 opacity-0 group-hover/tile:opacity-100 transition-opacity duration-300" />
          <div className="absolute inset-x-0 bottom-0 p-4 translate-y-2 opacity-0 group-hover/tile:translate-y-0 group-hover/tile:opacity-100 transition-all duration-300">
            <p className="text-white text-sm font-medium">{photo.title}</p>
            <p className="text-white/65 text-[11px] tracking-[0.06em] uppercase mt-0.5">
              {CATEGORY_LABELS[photo.category]}
            </p>
          </div>

          {/* Fine hairline frame — appears on hover, like a print catching gallery light */}
          <div className="absolute inset-0 ring-1 ring-inset ring-white/0 group-hover/tile:ring-white/25 transition-all duration-500 pointer-events-none" />
        </button>
      </TiltCard>
    </motion.div>
  );
}

export default function GalleryGrid({ photos, onOpen }: GalleryGridProps) {
  if (photos.length === 0) {
    return (
      <div className="py-32 text-center">
        <p className="font-display text-2xl mb-2">No photos match that search.</p>
        <p className="text-ink-dim text-sm">Try a different category or search term.</p>
      </div>
    );
  }

  return (
    <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 [column-fill:_balance]">
      {photos.map((photo, i) => (
        <GalleryTile key={photo.id} photo={photo} i={i} onOpen={() => onOpen(i)} />
      ))}
    </div>
  );
}
