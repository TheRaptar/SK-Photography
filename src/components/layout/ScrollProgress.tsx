import { motion, useScroll, useSpring } from 'framer-motion';

/**
 * A hairline gold thread across the top of the header that fills with
 * scroll progress — the kind of quiet, precise detail that reads as
 * "considered" rather than decorative. Pure CSS-transform driven (scaleX),
 * so it costs effectively nothing.
 */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 300, damping: 40, mass: 0.2 });

  return (
    <motion.div
      style={{ scaleX }}
      className="absolute bottom-0 left-0 right-0 h-px bg-accent origin-left"
      aria-hidden="true"
    />
  );
}
