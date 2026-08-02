import { useRef, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { motion, useMotionValue, animate, useReducedMotion } from 'framer-motion';

interface DragFilmstripProps {
  children: ReactNode[];
}

/**
 * A click-and-drag filmstrip with real momentum and a spring snap to the
 * nearest frame on release — the same drag/spring/snap language as
 * anime.js's Draggable demos, applied to something a photography site
 * actually needs: flicking through sessions like a contact sheet.
 * Falls back to plain native scroll for reduced motion, where native
 * scrolling is already the better, more predictable behavior.
 */
export default function DragFilmstrip({ children }: DragFilmstripProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const [maxDrag, setMaxDrag] = useState(0);
  const [itemStep, setItemStep] = useState(0);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const recompute = () => {
      const containerWidth = containerRef.current?.offsetWidth ?? 0;
      const track = trackRef.current;
      const trackWidth = track?.scrollWidth ?? 0;
      setMaxDrag(Math.max(0, trackWidth - containerWidth));
      const first = track?.children[0] as HTMLElement | undefined;
      const second = track?.children[1] as HTMLElement | undefined;
      if (first && second) {
        setItemStep(second.offsetLeft - first.offsetLeft);
      } else if (first) {
        setItemStep(first.offsetWidth + 16);
      }
    };
    recompute();
    window.addEventListener('resize', recompute);
    return () => window.removeEventListener('resize', recompute);
  }, [children.length]);

  if (reduceMotion) {
    return (
      <div className="flex gap-4 overflow-x-auto pb-4 -mx-1 px-1 [scrollbar-width:thin]">
        {children}
      </div>
    );
  }

  const snapToNearest = () => {
    if (itemStep <= 0) return;
    const current = x.get();
    const target = Math.round(current / itemStep) * itemStep;
    const clamped = Math.min(0, Math.max(-maxDrag, target));
    animate(x, clamped, { type: 'spring', stiffness: 300, damping: 32 });
  };

  return (
    <div ref={containerRef} className="overflow-hidden -mx-1 px-1">
      <motion.div
        ref={trackRef}
        drag={maxDrag > 0 ? 'x' : false}
        dragConstraints={{ left: -maxDrag, right: 0 }}
        dragElastic={0.12}
        dragTransition={{ bounceStiffness: 420, bounceDamping: 40 }}
        onDragEnd={snapToNearest}
        style={{ x }}
        className={`flex gap-4 pb-4 ${maxDrag > 0 ? 'cursor-grab active:cursor-grabbing' : ''}`}
      >
        {children}
      </motion.div>
    </div>
  );
}
