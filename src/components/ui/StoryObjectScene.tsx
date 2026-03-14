"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

function AutoRotate({ children }: { children: React.ReactNode }) {
  const ref = useRef<THREE.Group>(null);
  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * 0.8;
    }
  });
  return <group ref={ref}>{children}</group>;
}

const storyImageMap: Record<string, string> = {
  "first-met": "/models/tex/us.JPG",
  motto: "/models/tex/poster.png",
};

function GameController() {
  return (
    <group>
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[1.0, 0.15, 0.5]} />
        <meshStandardMaterial color="#333333" />
      </mesh>
      <mesh position={[-0.3, 0.12, 0]}>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshStandardMaterial color="#ff4444" />
      </mesh>
      <mesh position={[0.3, 0.12, 0]}>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshStandardMaterial color="#4444ff" />
      </mesh>
    </group>
  );
}

function CuttingBoardAndKnife() {
  return (
    <group>
      {/* 도마 */}
      <mesh position={[0, 0, 0]} rotation={[0, 0.2, 0]}>
        <boxGeometry args={[0.9, 0.08, 0.6]} />
        <meshStandardMaterial color="#c8a06e" />
      </mesh>
      {/* 도마 손잡이 구멍 */}
      <mesh position={[0.5, 0.05, 0]} rotation={[-Math.PI / 2, 0, 0.2]}>
        <torusGeometry args={[0.06, 0.02, 8, 16]} />
        <meshStandardMaterial color="#a07840" />
      </mesh>
      {/* 잘려진 당근 조각들 */}
      <mesh position={[-0.2, 0.07, -0.1]}>
        <cylinderGeometry args={[0.04, 0.04, 0.03, 12]} />
        <meshStandardMaterial color="#ed8936" />
      </mesh>
      <mesh position={[-0.1, 0.07, -0.08]}>
        <cylinderGeometry args={[0.04, 0.04, 0.03, 12]} />
        <meshStandardMaterial color="#ed8936" />
      </mesh>
      <mesh position={[0.0, 0.07, -0.12]}>
        <cylinderGeometry args={[0.04, 0.04, 0.03, 12]} />
        <meshStandardMaterial color="#ed8936" />
      </mesh>
      {/* 아직 안 잘린 당근 몸통 */}
      <mesh position={[-0.35, 0.08, -0.1]} rotation={[0, 0.2, Math.PI / 2]}>
        <cylinderGeometry args={[0.03, 0.05, 0.2, 12]} />
        <meshStandardMaterial color="#e07020" />
      </mesh>
      {/* 칼 (도마 위에 평평하게) */}
      <group position={[0.05, 0.06, 0.1]} rotation={[0, -0.3, 0]}>
        {/* 칼날 - 넓은 면이 위를 향하도록 (Y가 얇은 축) */}
        <mesh position={[-0.15, 0, 0]}>
          <boxGeometry args={[0.5, 0.02, 0.12]} />
          <meshStandardMaterial color="#d0d0d0" metalness={0.6} roughness={0.3} />
        </mesh>
        {/* 칼 손잡이 */}
        <mesh position={[0.25, 0, 0]}>
          <boxGeometry args={[0.22, 0.04, 0.06]} />
          <meshStandardMaterial color="#4a3520" />
        </mesh>
      </group>
    </group>
  );
}

function Books() {
  return (
    <group>
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[0.6, 0.12, 0.8]} />
        <meshStandardMaterial color="#8b4513" />
      </mesh>
      <mesh position={[0.05, 0.12, 0]}>
        <boxGeometry args={[0.55, 0.1, 0.78]} />
        <meshStandardMaterial color="#2e5090" />
      </mesh>
      <mesh position={[-0.03, 0.22, 0]}>
        <boxGeometry args={[0.58, 0.08, 0.75]} />
        <meshStandardMaterial color="#906030" />
      </mesh>
    </group>
  );
}

function LightBulb() {
  return (
    <group>
      <mesh position={[0, 0.2, 0]}>
        <sphereGeometry args={[0.3, 32, 32]} />
        <meshStandardMaterial color="#fff8dc" emissive="#ffdd44" emissiveIntensity={0.5} />
      </mesh>
      <mesh position={[0, -0.1, 0]}>
        <cylinderGeometry args={[0.12, 0.15, 0.2, 32]} />
        <meshStandardMaterial color="#888888" />
      </mesh>
    </group>
  );
}

function Stars() {
  return (
    <group>
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[0.2, 16, 16]} />
        <meshStandardMaterial color="#ffd700" emissive="#ffa500" emissiveIntensity={0.4} />
      </mesh>
      <mesh position={[0.5, 0.3, 0]}>
        <sphereGeometry args={[0.12, 16, 16]} />
        <meshStandardMaterial color="#ffd700" emissive="#ffa500" emissiveIntensity={0.4} />
      </mesh>
      <mesh position={[-0.4, 0.4, 0.2]}>
        <sphereGeometry args={[0.15, 16, 16]} />
        <meshStandardMaterial color="#ffd700" emissive="#ffa500" emissiveIntensity={0.4} />
      </mesh>
      <mesh position={[0.3, -0.3, -0.2]}>
        <sphereGeometry args={[0.1, 16, 16]} />
        <meshStandardMaterial color="#ffd700" emissive="#ffa500" emissiveIntensity={0.4} />
      </mesh>
    </group>
  );
}

const story3DMap: Record<string, React.FC> = {
  "play-together": GameController,
  kitchen: CuttingBoardAndKnife,
  study: Books,
  "light-switch": LightBulb,
  dream: Stars,
};

interface StoryObjectSceneProps {
  storyId: string;
}

export function StoryObjectScene({ storyId }: StoryObjectSceneProps) {
  const imageSrc = storyImageMap[storyId];
  if (imageSrc) {
    return (
      <div className="mb-3 flex h-80 w-full items-center justify-center rounded-lg bg-gradient-to-b from-gray-100 to-gray-200">
        <img
          src={imageSrc}
          alt={storyId}
          className="max-h-full max-w-full rounded object-contain"
        />
      </div>
    );
  }

  const ObjectComponent = story3DMap[storyId];
  if (!ObjectComponent) return null;

  return (
    <div className="mb-3 h-80 w-full rounded-lg bg-gradient-to-b from-gray-100 to-gray-200">
      <Canvas camera={{ position: [0, 0.5, 2.5], fov: 45 }}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[2, 3, 2]} intensity={0.8} />
        <AutoRotate>
          <ObjectComponent />
        </AutoRotate>
      </Canvas>
    </div>
  );
}
