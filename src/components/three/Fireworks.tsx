import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const BURST_COUNT = 6;
const PARTICLES_PER_BURST = 80;
const TOTAL = BURST_COUNT * PARTICLES_PER_BURST;

const LAUNCH_SPEED = 6;
const LAUNCH_DURATION = 0.8;
const EXPLODE_SPEED = 3;
const FADE_DURATION = 2.0;
const GRAVITY = -2.5;

const COLORS: [number, number, number][] = [
  [1, 0.3, 0.5],   // rose
  [1, 0.8, 0.2],   // gold
  [0.4, 0.8, 1],   // sky blue
  [1, 0.5, 0.8],   // pink
  [0.6, 1, 0.6],   // light green
  [1, 1, 0.4],     // yellow
];

interface BurstState {
  phase: "launch" | "explode" | "fade";
  origin: THREE.Vector3;
  target: THREE.Vector3;
  timer: number;
  color: [number, number, number];
  velocities: THREE.Vector3[];
}

function randomRange(min: number, max: number) {
  return min + Math.random() * (max - min);
}

function createBurst(delay: number): BurstState {
  const color = COLORS[Math.floor(Math.random() * COLORS.length)];
  const origin = new THREE.Vector3(randomRange(-4, 4), 0, randomRange(-9, -3));
  const target = new THREE.Vector3(
    origin.x + randomRange(-1, 1),
    randomRange(6, 12),
    origin.z + randomRange(-1, 1)
  );

  const velocities: THREE.Vector3[] = [];
  for (let i = 0; i < PARTICLES_PER_BURST; i++) {
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    const speed = EXPLODE_SPEED * (0.5 + Math.random() * 0.5);
    velocities.push(
      new THREE.Vector3(
        Math.sin(phi) * Math.cos(theta) * speed,
        Math.sin(phi) * Math.sin(theta) * speed,
        Math.cos(phi) * speed
      )
    );
  }

  return {
    phase: "launch",
    origin,
    target,
    timer: -delay,
    color,
    velocities,
  };
}

export function Fireworks() {
  const pointsRef = useRef<THREE.Points>(null);

  const { positions, colors, opacities, bursts } = useMemo(() => {
    const positions = new Float32Array(TOTAL * 3);
    const colors = new Float32Array(TOTAL * 3);
    const opacities = new Float32Array(TOTAL);

    const bursts: BurstState[] = [];
    for (let i = 0; i < BURST_COUNT; i++) {
      bursts.push(createBurst(i * 0.6));
    }

    return { positions, colors, opacities, bursts };
  }, []);

  useFrame((_, delta) => {
    const dt = Math.min(delta, 0.05);

    for (let b = 0; b < BURST_COUNT; b++) {
      const burst = bursts[b];
      burst.timer += dt;

      if (burst.timer < 0) {
        // waiting to launch — hide particles
        for (let i = 0; i < PARTICLES_PER_BURST; i++) {
          opacities[b * PARTICLES_PER_BURST + i] = 0;
        }
        continue;
      }

      const offset = b * PARTICLES_PER_BURST;

      if (burst.phase === "launch") {
        const t = Math.min(burst.timer / LAUNCH_DURATION, 1);
        const x = burst.origin.x + (burst.target.x - burst.origin.x) * t;
        const y = burst.origin.y + (burst.target.y - burst.origin.y) * t;
        const z = burst.origin.z + (burst.target.z - burst.origin.z) * t;

        for (let i = 0; i < PARTICLES_PER_BURST; i++) {
          const idx = (offset + i) * 3;
          positions[idx] = x;
          positions[idx + 1] = y;
          positions[idx + 2] = z;
          colors[idx] = 1;
          colors[idx + 1] = 1;
          colors[idx + 2] = 0.8;
          opacities[offset + i] = 0.9;
        }

        if (burst.timer >= LAUNCH_DURATION) {
          burst.phase = "explode";
          burst.timer = 0;
        }
      } else if (burst.phase === "explode" || burst.phase === "fade") {
        const t = burst.timer;
        const fadeStart = 0.3;

        if (t > fadeStart && burst.phase === "explode") {
          burst.phase = "fade";
        }

        for (let i = 0; i < PARTICLES_PER_BURST; i++) {
          const idx = (offset + i) * 3;
          const vel = burst.velocities[i];

          positions[idx] = burst.target.x + vel.x * t;
          positions[idx + 1] = burst.target.y + vel.y * t + 0.5 * GRAVITY * t * t;
          positions[idx + 2] = burst.target.z + vel.z * t;

          colors[idx] = burst.color[0];
          colors[idx + 1] = burst.color[1];
          colors[idx + 2] = burst.color[2];

          const fadeProgress = Math.max(0, (t - fadeStart) / FADE_DURATION);
          opacities[offset + i] = Math.max(0, 1 - fadeProgress);
        }

        if (t > fadeStart + FADE_DURATION) {
          // Respawn
          const newBurst = createBurst(0);
          burst.phase = newBurst.phase;
          burst.origin = newBurst.origin;
          burst.target = newBurst.target;
          burst.timer = newBurst.timer;
          burst.color = newBurst.color;
          burst.velocities = newBurst.velocities;
        }
      }
    }

    if (pointsRef.current) {
      const geom = pointsRef.current.geometry;
      geom.attributes.position.needsUpdate = true;
      geom.attributes.color.needsUpdate = true;
      geom.attributes.opacity.needsUpdate = true;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
        />
        <bufferAttribute
          attach="attributes-opacity"
          args={[opacities, 1]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.12}
        vertexColors
        transparent
        depthWrite={false}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}
