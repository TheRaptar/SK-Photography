import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { galleries } from '../../data/content';
import { CATEGORY_LABELS, type Category } from '../../types';
import PhotoMedia from '../shared/PhotoMedia';

const FEATURED: { category: Category; image: string }[] = [
  { category: 'weddings', image: '/photos/weddings/sikh-wedding-ceremony-01.jpg' },
  { category: 'portraits', image: '/photos/portraits/tower-bridge-sessions-04.jpg' },
  { category: 'street', image: '/photos/street/character-studies-01.jpg' },
  { category: 'landscape', image: '/photos/landscape/seven-sisters-coast-03.jpg' },
  { category: 'events', image: '/photos/events/national-wedding-show-01.jpg' },
  { category: 'commercial', image: 'linear-gradient(150deg,#7a6a4e,#15120d)' },
];

export default function FeaturedCategories() {
  return (
    <section className="py-28 lg:py-36 border-b border-line">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="flex items-end justify-between mb-14 gap-6">
          <div>
            <p className="eyebrow mb-4">The work</p>
            <h2 className="font-display text-[clamp(1.8rem,3.6vw,3rem)] text-balance">
              Six disciplines, one standard.
            </h2>
          </div>
          <Link
            to="/portfolio"
            className="hidden sm:inline-flex items-center gap-1.5 text-[13px] tracking-[0.08em] uppercase text-ink-dim hover:text-ink transition-colors shrink-0"
          >
            View full portfolio <ArrowUpRight size={14} strokeWidth={1.6} />
          </Link>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-line">
          {FEATURED.map((item, i) => {
            const count = galleries.filter((g) => g.category === item.category).length;
            return (
              <motion.div
                key={item.category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="bg-bg"
              >
                <Link
                  to={`/portfolio?category=${item.category}`}
                  className="group block relative aspect-[4/5] overflow-hidden"
                >
                  <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-105">
                    <PhotoMedia src={item.image} alt={CATEGORY_LABELS[item.category]} />
                  </div>
                  <div className="absolute inset-0 bg-black/15 group-hover:bg-black/5 transition-colors duration-500" />
                  <div className="absolute inset-x-0 bottom-0 p-6">
                    <p className="font-display text-white text-xl mb-1">
                      {CATEGORY_LABELS[item.category]}
                    </p>
                    <p className="text-[11px] tracking-[0.08em] uppercase text-white/70">
                      {count} {count === 1 ? 'gallery' : 'galleries'}
                    </p>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
