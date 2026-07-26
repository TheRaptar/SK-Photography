import { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  /** Max tilt in degrees. Kept subtle by default. */
  maxTilt?: number;
  /** Slight lift + shadow on hover in addition to the tilt. */
  lift?: boolean;
  style?: React.CSSProperties;
}

/**
 * Wraps children in a card that tilts gently in 3D toward the cursor.
 * Disabled automatically for touch input and prefers-reduced-motion,
 * so it only ever adds polish — never gets in the way of usability.
 */
export default function TiltCard({
  children,
  className = '',
  maxTilt = 8,
  lift = true,
  style,
}: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion =
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const springConf = { stiffness: 220, damping: 22, mass: 0.6 };
  const sx = useSpring(px, springConf);
  const sy = useSpring(py, springConf);

  const rotateX = useTransform(sy, [0, 1], [maxTilt, -maxTilt]);
  const rotateY = useTransform(sx, [0, 1], [-maxTilt, maxTilt]);
  const translateZ = useSpring(useMotionValue(0), springConf);
  const liftScale = useTransform(translateZ, [0, 1], [1, 1.015]);

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (reduceMotion || e.pointerType === 'touch') return;
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    px.set((e.clientX - rect.left) / rect.width);
    py.set((e.clientY - rect.top) / rect.height);
    if (lift) translateZ.set(1);
  };

  const handlePointerLeave = () => {
    px.set(0.5);
    py.set(0.5);
    translateZ.set(0);
  };

  return (
    <div style={{ perspective: 1200 }} className={className}>
      <motion.div
        ref={ref}
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        style={{
          rotateX: reduceMotion ? 0 : rotateX,
          rotateY: reduceMotion ? 0 : rotateY,
          transformStyle: 'preserve-3d',
          scale: lift ? liftScale : 1,
          ...style,
        }}
        className="will-change-transform"
      >
        {children}
      </motion.div>
    </div>
  );
}
