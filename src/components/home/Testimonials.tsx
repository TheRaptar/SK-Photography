import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Quote } from 'lucide-react';
import { testimonials } from '../../data/content';

export default function Testimonials() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % testimonials.length), 6500);
    return () => clearInterval(id);
  }, []);

  const current = testimonials[index];

  return (
    <section className="py-28 lg:py-36 border-b border-line bg-surface">
      <div className="max-w-3xl mx-auto px-6 lg:px-10 text-center">
        <Quote size={28} strokeWidth={1.2} className="text-accent mx-auto mb-8" />

        <div className="min-h-[180px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.5 }}
            >
              <p className="font-display italic text-[clamp(1.3rem,2.6vw,1.9rem)] leading-[1.4] text-balance">
                "{current.quote}"
              </p>
              <p className="mt-7 text-[13px] tracking-[0.06em] uppercase text-ink-dim">
                {current.name} — {current.role}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex items-center justify-center gap-2 mt-10">
          {testimonials.map((t, i) => (
            <button
              key={t.id}
              type="button"
              aria-label={`Show testimonial ${i + 1}`}
              onClick={() => setIndex(i)}
              className={`h-1.5 rounded-full transition-all ${
                i === index ? 'w-6 bg-accent' : 'w-1.5 bg-line-strong'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
