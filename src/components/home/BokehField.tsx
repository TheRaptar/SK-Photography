import { useMemo, useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

/**
 * A field of drifting, out-of-focus gold light — the kind of bokeh you get
 * shooting wide open at golden hour. It's the one genuinely 3D moment on
 * the site: real depth-sorted particles in a perspective camera, tilting
 * gently toward the cursor like a lens racking focus.
 *
 * Deliberately restrained: soft, slow, additive, never competes with the
 * photograph or the headline. Mounted only when motion is allowed.
 */

const PARTICLE_COUNT = 90;

function makeSprite() {
  const size = 128;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d')!;
  const gradient = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  gradient.addColorStop(0, 'rgba(255, 255, 255, 0.9)');
  gradient.addColorStop(0.25, 'rgba(243, 220, 160, 0.55)');
  gradient.addColorStop(0.6, 'rgba(212, 175, 106, 0.18)');
  gradient.addColorStop(1, 'rgba(212, 175, 106, 0)');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, size, size);
  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

interface ParticleData {
  seed: number;
  speed: number;
  driftAmp: number;
  driftFreq: number;
  baseSize: number;
}

function BokehPoints() {
  const pointsRef = useRef<THREE.Points>(null);
  const groupRef = useRef<THREE.Group>(null);
  const sprite = useMemo(() => makeSprite(), []);

  const { positions, data } = useMemo(() => {
    const positions = new Float32Array(PARTICLE_COUNT * 3);
    const data: ParticleData[] = [];
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 14;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 9;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 6 - 1;
      data.push({
        seed: Math.random() * Math.PI * 2,
        speed: 0.12 + Math.random() * 0.22,
        driftAmp: 0.25 + Math.random() * 0.5,
        driftFreq: 0.15 + Math.random() * 0.25,
        baseSize: 0.55 + Math.random() * 1.7,
      });
    }
    return { positions, data };
  }, []);

  const sizes = useMemo(() => {
    const arr = new Float32Array(PARTICLE_COUNT);
    data.forEach((d, i) => (arr[i] = d.baseSize));
    return arr;
  }, [data]);

  useFrame((state, delta) => {
    const geom = pointsRef.current?.geometry;
    if (geom) {
      const posAttr = geom.attributes.position as THREE.BufferAttribute;
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        const d = data[i];
        let y = posAttr.getY(i) + d.speed * delta;
        if (y > 4.6) y = -4.6;
        const x = posAttr.getX(i) + Math.sin(state.clock.elapsedTime * d.driftFreq + d.seed) * 0.0022 * d.driftAmp;
        posAttr.setXY(i, x, y);
      }
      posAttr.needsUpdate = true;
    }

    // Gentle parallax: the whole field tilts a little toward the pointer,
    // like depth of field shifting as a lens racks focus.
    if (groupRef.current) {
      const targetX = state.pointer.y * 0.18;
      const targetY = state.pointer.x * 0.28;
      groupRef.current.rotation.x += (targetX - groupRef.current.rotation.x) * 0.03;
      groupRef.current.rotation.y += (targetY - groupRef.current.rotation.y) * 0.03;
    }
  });

  return (
    <group ref={groupRef}>
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
          <bufferAttribute attach="attributes-size" args={[sizes, 1]} />
        </bufferGeometry>
        <pointsMaterial
          map={sprite}
          size={0.42}
          sizeAttenuation
          transparent
          opacity={0.8}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          color={new THREE.Color('#f0d38a')}
        />
      </points>
    </group>
  );
}

function Rig() {
  const { camera } = useThree();
  useFrame(() => {
    camera.lookAt(0, 0, 0);
  });
  return null;
}

export default function BokehField() {
  return (
    <Canvas
      dpr={[1, 1.75]}
      gl={{ alpha: true, antialias: false, powerPreference: 'low-power' }}
      camera={{ position: [0, 0, 6], fov: 45 }}
      style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}
    >
      <Rig />
      <BokehPoints />
    </Canvas>
  );
}
