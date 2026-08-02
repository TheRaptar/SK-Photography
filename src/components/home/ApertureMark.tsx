import { motion, useReducedMotion } from 'framer-motion';
import { Aperture } from 'lucide-react';

/**
 * A tiny live detail baked directly into the hero copy, the way anime.js's
 * homepage bakes a small working demo into nearly every block of text
 * rather than treating animation as separate decoration. Here: a camera
 * aperture that racks open on load, then keeps a barely-perceptible slow
 * rotation — like it's still metering the scene.
 */
export default function ApertureMark() {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return <Aperture size={18} strokeWidth={1.4} className="text-accent" />;
  }

  return (
    <motion.span
      initial={{ rotate: -70, scale: 0.4, opacity: 0 }}
      animate={{ rotate: 0, scale: 1, opacity: 1 }}
      transition={{ duration: 0.9, ease: [0.34, 1.56, 0.64, 1], delay: 0.1 }}
      className="inline-block"
    >
      <motion.span
        animate={{ rotate: 360 }}
        transition={{ duration: 48, ease: 'linear', repeat: Infinity }}
        className="inline-block"
      >
        <Aperture size={18} strokeWidth={1.4} className="text-accent" />
      </motion.span>
    </motion.span>
  );
}
