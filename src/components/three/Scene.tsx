"use client";

import { ReactNode } from "react";
import { Stars } from "@react-three/drei";

interface SceneProps {
  children?: ReactNode;
  ambientIntensity?: number;
  directionalIntensity?: number;
  directionalColor?: string;
  showGroundPlane?: boolean;
}

export function Scene({
  children,
  ambientIntensity = 0.15,
  directionalIntensity = 0.3,
  directionalColor = "#b0c4de",
  showGroundPlane = true,
}: SceneProps) {
  return (
    <>
      {/* 밤하늘 배경 */}
      <color attach="background" args={["#0a0a2e"]} />
      <Stars radius={100} depth={50} count={3000} factor={4} fade speed={1} />

      {/* 야간 조명 */}
      <ambientLight intensity={ambientIntensity} />
      <directionalLight
        position={[10, 10, 5]}
        intensity={directionalIntensity}
        color={directionalColor}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />

      {/* Ground plane */}
      {showGroundPlane && (
        <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
          <planeGeometry args={[50, 50]} />
          <meshStandardMaterial color="#8fbc8f" />
        </mesh>
      )}

      {children}
    </>
  );
}
