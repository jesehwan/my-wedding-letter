"use client";

import { ReactNode } from "react";

interface SceneProps {
  children?: ReactNode;
}

export function Scene({ children }: SceneProps) {
  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.5} />
      <directionalLight
        position={[10, 10, 5]}
        intensity={1}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />

      {/* Ground plane */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[50, 50]} />
        <meshStandardMaterial color="#8fbc8f" />
      </mesh>

      {children}
    </>
  );
}
