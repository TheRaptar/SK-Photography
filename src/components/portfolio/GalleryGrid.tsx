import { motion } from 'framer-motion';
import type { Photo } from '../../types';
import { CATEGORY_LABELS } from '../../types';
import PhotoMedia from '../shared/PhotoMedia';

interface GalleryGridProps {
  photos: Photo[];
  onOpen: (index: number) => void;
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
        <motion.button
          key={photo.id}
          type="button"
          onClick={() => onOpen(i)}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.45, delay: (i % 6) * 0.05 }}
          className="group relative block w-full mb-4 break-inside-avoid overflow-hidden text-left"
          style={{ aspectRatio: `${photo.width} / ${photo.height}` }}
          aria-label={`Open ${photo.title} in lightbox`}
        >
          <div className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-[1.04]">
            <PhotoMedia src={photo.src} alt={photo.alt} />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="absolute inset-x-0 bottom-0 p-4 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
            <p className="text-white text-sm font-medium">{photo.title}</p>
            <p className="text-white/65 text-[11px] tracking-[0.06em] uppercase mt-0.5">
              {CATEGORY_LABELS[photo.category]}
            </p>
          </div>
        </motion.button>
      ))}
    </div>
  );
}
