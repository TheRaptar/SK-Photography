import { Suspense, lazy, useEffect, useState } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowDown } from 'lucide-react';
import PhotoMedia from '../shared/PhotoMedia';
import ApertureMark from './ApertureMark';
import Magnetic from '../shared/Magnetic';

const BokehField = lazy(() => import('./BokehField'));

const SLIDES = [
  { image: '/photos/weddings/sikh-wedding-ceremony-01.jpg', label: 'Weddings' },
  { image: '/photos/portraits/golden-hour-hyde-park-06.jpg', label: 'Portraits' },
  { image: '/photos/landscape/seven-sisters-coast-04.jpg', label: 'Landscape' },
  { image: '/photos/events/national-wedding-show-02.jpg', label: 'Events' },
  { image: '/photos/street/character-studies-03.jpg', label: 'Street' },
];

const SLIDE_DURATION = 5500;

const line = {
  hidden: { y: '110%' },
  show: (i: number) => ({
    y: '0%',
    transition: { duration: 1.1, ease: [0.22, 1, 0.36, 1] as const, delay: 0.15 + i * 0.1 },
  }),
};

const fadeUp = {
  hidden: { opacity: 0, y: 14 },
  show: (delay: number) => ({ opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' as const, delay } }),
};

export default function Hero() {
  const [index, setIndex] = useState(0);
  const [reduceMotion] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );

  // Cursor parallax on the photograph itself — a slow, heavy drift, like a
  // camera on a slider rig rather than anything that feels like a UI hover.
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const springConf = { stiffness: 40, damping: 18, mass: 1.4 };
  const sx = useSpring(px, springConf);
  const sy = useSpring(py, springConf);
  const photoX = useTransform(sx, [0, 1], ['-1.4%', '1.4%']);
  const photoY = useTransform(sy, [0, 1], ['-1.1%', '1.1%']);

  useEffect(() => {
    if (reduceMotion) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % SLIDES.length), SLIDE_DURATION);
    return () => clearInterval(id);
  }, [reduceMotion]);

  const handlePointerMove = (e: React.PointerEvent<HTMLElement>) => {
    if (reduceMotion) return;
    const rect = e.currentTarget.getBoundingClientRect();
    px.set((e.clientX - rect.left) / rect.width);
    py.set((e.clientY - rect.top) / rect.height);
  };

  return (
    <section
      onPointerMove={handlePointerMove}
      className="relative h-screen min-h-[640px] w-full overflow-hidden bg-ink"
    >
      <motion.div
        className="absolute -inset-[2%]"
        style={{ x: reduceMotion ? 0 : photoX, y: reduceMotion ? 0 : photoY }}
      >
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
      </motion.div>

      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/40" />

      {/* Three.js bokeh field — the one true 3D moment on the site, layered
          between the photo and the copy so the gold specks read as drifting
          light in front of the image, not a flat overlay. */}
      {!reduceMotion && (
        <Suspense fallback={null}>
          <BokehField />
        </Suspense>
      )}

      {/* Ambient gold glow — pure depth, no meaning, disabled with reduced motion via the animation rule in index.css */}
      <div className="glow-orb w-[38rem] h-[38rem] -top-32 -right-32 animate-float-slow" aria-hidden="true" />
      <div className="glow-orb w-[26rem] h-[26rem] bottom-0 -left-20 opacity-70 animate-float-slow" style={{ animationDelay: '-6s' }} aria-hidden="true" />

      <div className="relative h-full max-w-7xl mx-auto px-6 lg:px-10 flex flex-col justify-end pb-24 pt-32">
        <motion.p
          initial={reduceMotion ? undefined : 'hidden'}
          animate={reduceMotion ? undefined : 'show'}
          variants={fadeUp}
          custom={0}
          className="eyebrow text-[#e7d9c2] mb-5 inline-flex items-center gap-2.5"
        >
          <ApertureMark />
          Full-time photography studio — London &amp; beyond
        </motion.p>

        <h1 className="font-display text-white text-[clamp(2.6rem,7vw,5.5rem)] leading-[1.02] max-w-4xl text-balance">
          <span className="block overflow-hidden">
            <motion.span
              initial={reduceMotion ? undefined : 'hidden'}
              animate={reduceMotion ? undefined : 'show'}
              variants={line}
              custom={0}
              className="block"
            >
              Photographs that <span className="text-gold-gradient">hold up</span>
            </motion.span>
          </span>
          <span className="block overflow-hidden">
            <motion.span
              initial={reduceMotion ? undefined : 'hidden'}
              animate={reduceMotion ? undefined : 'show'}
              variants={line}
              custom={1}
              className="block"
            >
              long after the moment ends.
            </motion.span>
          </span>
        </h1>

        <motion.p
          initial={reduceMotion ? undefined : 'hidden'}
          animate={reduceMotion ? undefined : 'show'}
          variants={fadeUp}
          custom={0.55}
          className="mt-6 text-white/75 max-w-md text-[15px] leading-relaxed"
        >
          Weddings, portraits, and events — shot with the same care whether there
          are two people in the frame or two thousand.
        </motion.p>

        <motion.div
          initial={reduceMotion ? undefined : 'hidden'}
          animate={reduceMotion ? undefined : 'show'}
          variants={fadeUp}
          custom={0.75}
          className="mt-10 flex items-center gap-6"
        >
          <Magnetic>
            <Link
              to="/portfolio"
              className="btn-gold inline-flex items-center text-[13px] tracking-[0.08em] uppercase px-7 py-3.5"
            >
              View portfolio
            </Link>
          </Magnetic>
          <Link
            to="/contact"
            className="inline-flex items-center text-[13px] tracking-[0.08em] uppercase text-white border-b border-white/40 pb-1 hover:border-accent hover:text-accent-2 transition-colors"
          >
            Book a session
          </Link>
        </motion.div>
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
