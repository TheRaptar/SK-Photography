import { useEffect } from 'react';
import Lenis from 'lenis';

/**
 * Site-wide smooth scroll. Renders nothing — just softens the native scroll
 * into something with a touch of weight to it, the way a well-damped
 * shutter dial feels vs. a cheap one. Skipped entirely for
 * prefers-reduced-motion and for touch-primary devices, where native scroll
 * is already the better, more predictable experience.
 */
export default function SmoothScroll() {
  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const coarsePointer = window.matchMedia('(pointer: coarse)').matches;
    if (reduceMotion || coarsePointer) return;

    const lenis = new Lenis({
      duration: 1.05,
      easing: (t: number) => 1 - Math.pow(1 - t, 3),
      smoothWheel: true,
    });

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return null;
}
