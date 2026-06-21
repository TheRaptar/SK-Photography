import { motion } from 'framer-motion';

export default function Intro() {
  return (
    <section className="py-28 lg:py-36 border-b border-line">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 grid lg:grid-cols-12 gap-10">
        <div className="lg:col-span-4">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6 }}
            className="eyebrow"
          >
            About the studio
          </motion.p>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="lg:col-span-8"
        >
          <p className="font-display text-[clamp(1.6rem,3.4vw,2.6rem)] leading-[1.3] text-ink text-balance">
            I'm a full-time photographer working across weddings, portraits, events, and
            commercial campaigns — based in London, available across the UK. My approach
            stays the same no matter the brief: spend the time it takes to earn an honest
            frame, and never settle for the convenient one.
          </p>
          <p className="mt-8 text-ink-dim leading-relaxed max-w-2xl">
            Over a decade behind the camera, the work has ranged from three-day wedding
            coverage at gurdwaras and country gardens to product campaigns shot entirely in studio. What
            ties it together is patience — for light, for the right moment, and for getting
            it right rather than getting it fast.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
