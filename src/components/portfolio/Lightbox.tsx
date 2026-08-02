import { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, ZoomIn, ZoomOut, Maximize, Minimize } from 'lucide-react';
import type { Photo } from '../../types';
import PhotoMedia from '../shared/PhotoMedia';

interface LightboxProps {
  photos: Photo[];
  index: number;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

const slideVariants = {
  enter: (direction: number) => ({ opacity: 0, x: direction * 46, scale: 0.98 }),
  center: { opacity: 1, x: 0, scale: 1 },
  exit: (direction: number) => ({ opacity: 0, x: direction * -46, scale: 0.98 }),
};

export default function Lightbox({ photos, index, onClose, onNavigate }: LightboxProps) {
  const [zoomed, setZoomed] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const direction = useRef(1);
  const reduceMotion = useReducedMotion();
  const photo = photos[index];

  const goNext = useCallback(() => {
    direction.current = 1;
    setZoomed(false);
    onNavigate((index + 1) % photos.length);
  }, [index, photos.length, onNavigate]);

  const goPrev = useCallback(() => {
    direction.current = -1;
    setZoomed(false);
    onNavigate((index - 1 + photos.length) % photos.length);
  }, [index, photos.length, onNavigate]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') goNext();
      if (e.key === 'ArrowLeft') goPrev();
    };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose, goNext, goPrev]);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen?.();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen?.();
      setIsFullscreen(false);
    }
  };

  if (!photo) return null;

  return createPortal(
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
        animate={{ opacity: 1, backdropFilter: 'blur(6px)' }}
        exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
        transition={{ duration: 0.3 }}
        className="fixed inset-0 z-[100] bg-black/95 flex flex-col"
        role="dialog"
        aria-modal="true"
        aria-label={photo.title}
      >
        <div className="flex items-center justify-between px-5 py-4 text-white/80">
          <div className="font-display text-sm">
            {String(index + 1).padStart(2, '0')} / {String(photos.length).padStart(2, '0')}
          </div>
          <div className="flex items-center gap-2">
            <button type="button" onClick={() => setZoomed((z) => !z)} aria-label={zoomed ? 'Zoom out' : 'Zoom in'} className="w-10 h-10 grid place-items-center hover:text-white transition-colors">
              {zoomed ? <ZoomOut size={18} strokeWidth={1.5} /> : <ZoomIn size={18} strokeWidth={1.5} />}
            </button>
            <button type="button" onClick={toggleFullscreen} aria-label="Toggle fullscreen" className="w-10 h-10 grid place-items-center hover:text-white transition-colors">
              {isFullscreen ? <Minimize size={18} strokeWidth={1.5} /> : <Maximize size={18} strokeWidth={1.5} />}
            </button>
            <button type="button" onClick={onClose} aria-label="Close" className="w-10 h-10 grid place-items-center hover:text-white transition-colors">
              <X size={20} strokeWidth={1.5} />
            </button>
          </div>
        </div>

        <div className="relative flex-1 flex items-center justify-center px-4 overflow-hidden">
          <button
            type="button"
            onClick={goPrev}
            aria-label="Previous image"
            className="absolute left-2 sm:left-6 z-10 w-11 h-11 grid place-items-center rounded-full bg-white/5 text-white hover:bg-white/15 hover:scale-105 transition-all"
          >
            <ChevronLeft size={20} strokeWidth={1.5} />
          </button>

          <AnimatePresence mode="wait" custom={direction.current} initial={false}>
            <motion.div
              key={photo.id}
              custom={direction.current}
              variants={reduceMotion ? undefined : slideVariants}
              initial={reduceMotion ? { opacity: 0 } : 'enter'}
              animate={reduceMotion ? { opacity: 1 } : 'center'}
              exit={reduceMotion ? { opacity: 0 } : 'exit'}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              onClick={() => setZoomed((z) => !z)}
              className={`relative max-h-[80vh] max-w-[90vw] w-full sm:w-auto cursor-zoom-in transition-transform duration-300 ${
                zoomed ? 'scale-125 cursor-zoom-out' : ''
              }`}
              style={{
                aspectRatio: `${photo.width} / ${photo.height}`,
                height: '70vh',
                maxWidth: '90vw',
              }}
            >
              {/* Exhibition mat — a thin border and deep drop shadow so the
                  print reads as an object floating in the room, not a flat
                  screen fill. */}
              <div className="absolute -inset-3 border border-white/10 pointer-events-none" aria-hidden="true" />
              <div className="w-full h-full overflow-hidden shadow-[0_40px_100px_-20px_rgba(0,0,0,0.7)]">
                <PhotoMedia src={photo.src} alt={photo.alt} loading="eager" />
              </div>
            </motion.div>
          </AnimatePresence>

          <button
            type="button"
            onClick={goNext}
            aria-label="Next image"
            className="absolute right-2 sm:right-6 z-10 w-11 h-11 grid place-items-center rounded-full bg-white/5 text-white hover:bg-white/15 hover:scale-105 transition-all"
          >
            <ChevronRight size={20} strokeWidth={1.5} />
          </button>
        </div>

        <motion.div
          key={`${photo.id}-caption`}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.1 }}
          className="px-5 py-5 text-center"
        >
          <p className="text-white font-display text-base">{photo.title}</p>
          <p className="text-white/50 text-[11px] tracking-[0.08em] uppercase mt-1">{photo.alt}</p>
        </motion.div>
      </motion.div>
    </AnimatePresence>,
    document.body
  );
}
