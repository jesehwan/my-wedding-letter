"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Mesh } from "three";

interface DiscoveryPointProps {
  position: [number, number, number];
  discovered: boolean;
}

export function DiscoveryPoint({
  position,
  discovered,
}: DiscoveryPointProps) {
  const meshRef = useRef<Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current || discovered) return;
    const scale = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.2;
    meshRef.current.scale.setScalar(scale);
    meshRef.current.position.y =
      position[1] + Math.sin(state.clock.elapsedTime * 1.5) * 0.1;
  });

  return (
    <mesh ref={meshRef} position={position}>
      <sphereGeometry args={[0.2, 16, 16]} />
      <meshStandardMaterial
        color={discovered ? "#999" : "#ffd700"}
        emissive={discovered ? "#333" : "#ff8c00"}
        emissiveIntensity={discovered ? 0.1 : 0.5}
        transparent
        opacity={discovered ? 0.4 : 0.8}
      />
    </mesh>
  );
}
