import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowDown } from 'lucide-react';
import PhotoMedia from '../shared/PhotoMedia';

const SLIDES = [
  { image: '/photos/weddings/sikh-wedding-ceremony-01.jpg', label: 'Weddings' },
  { image: '/photos/portraits/golden-hour-hyde-park-06.jpg', label: 'Portraits' },
  { image: '/photos/landscape/seven-sisters-coast-04.jpg', label: 'Landscape' },
  { image: '/photos/events/national-wedding-show-02.jpg', label: 'Events' },
  { image: '/photos/street/character-studies-03.jpg', label: 'Street' },
];

const SLIDE_DURATION = 5500;

export default function Hero() {
  const [index, setIndex] = useState(0);
  const [reduceMotion] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );

  useEffect(() => {
    if (reduceMotion) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % SLIDES.length), SLIDE_DURATION);
    return () => clearInterval(id);
  }, [reduceMotion]);

  return (
    <section className="relative h-screen min-h-[640px] w-full overflow-hidden bg-ink">
      <AnimatePresence mode="sync">
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.4, ease: 'easeInOut' }}
          className="absolute inset-0"
        >
          <PhotoMedia src={SLIDES[index].image} alt={`${SLIDES[index].label} photography`} loading="eager" fetchPriority="high" />
        </motion.div>
      </AnimatePresence>

      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/40" />

      {/* Ambient gold glow — pure depth, no meaning, disabled with reduced motion via the animation rule in index.css */}
      <div className="glow-orb w-[38rem] h-[38rem] -top-32 -right-32 animate-float-slow" aria-hidden="true" />
      <div className="glow-orb w-[26rem] h-[26rem] bottom-0 -left-20 opacity-70 animate-float-slow" style={{ animationDelay: '-6s' }} aria-hidden="true" />

      <div className="relative h-full max-w-7xl mx-auto px-6 lg:px-10 flex flex-col justify-end pb-24 pt-32">
        <p className="eyebrow text-[#e7d9c2] mb-5">Full-time photography studio — London &amp; beyond</p>
        <h1 className="font-display text-white text-[clamp(2.6rem,7vw,5.5rem)] leading-[1.02] max-w-4xl text-balance">
          Photographs that <span className="text-gold-gradient">hold up</span> long after the moment ends.
        </h1>
        <p className="mt-6 text-white/75 max-w-md text-[15px] leading-relaxed">
          Weddings, portraits, and events — shot with the same care whether there
          are two people in the frame or two thousand.
        </p>

        <div className="mt-10 flex items-center gap-6">
          <Link
            to="/portfolio"
            className="btn-gold inline-flex items-center text-[13px] tracking-[0.08em] uppercase px-7 py-3.5"
          >
            View portfolio
          </Link>
          <Link
            to="/contact"
            className="inline-flex items-center text-[13px] tracking-[0.08em] uppercase text-white border-b border-white/40 pb-1 hover:border-accent hover:text-accent-2 transition-colors"
          >
            Book a session
          </Link>
        </div>
      </div>

      {/* Frame counter — a real, meaningful sequence indicator for the slideshow */}
      <div className="absolute bottom-8 right-6 lg:right-10 flex items-center gap-3 text-white/70">
        <span className="font-display text-sm">{String(index + 1).padStart(2, '0')}</span>
        <span className="w-10 h-px bg-white/30 relative overflow-hidden">
          <span
            className="absolute inset-y-0 left-0 bg-accent"
            style={{ width: `${((index + 1) / SLIDES.length) * 100}%`, transition: 'width 0.4s ease' }}
          />
        </span>
        <span className="font-display text-sm text-white/40">{String(SLIDES.length).padStart(2, '0')}</span>
      </div>

      <div className="absolute bottom-8 left-6 lg:left-10 hidden sm:flex items-center gap-2 text-white/60 text-[11px] tracking-[0.1em] uppercase animate-bounce">
        <ArrowDown size={13} strokeWidth={1.5} />
        Scroll
      </div>
    </section>
  );
}
