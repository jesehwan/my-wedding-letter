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
  ambientIntensity = 3,
  directionalIntensity = 0.6,
  directionalColor = "#f4eee4",
  showGroundPlane = true,
}: SceneProps) {
  return (
    <>
      {/* 밤하늘 배경 */}
      <color attach="background" args={["#0a0a2e"]} />
      <fog attach="fog" args={["#0a0a2e", 15, 40]} />
      <Stars radius={100} depth={50} count={1500} factor={4} fade speed={1} />

      {/* 야간 조명 */}
      <ambientLight intensity={ambientIntensity} />
      <directionalLight
        position={[10, 10, 5]}
        intensity={directionalIntensity}
        color={directionalColor}
        castShadow
        shadow-mapSize-width={512}
        shadow-mapSize-height={512}
      />

      {/* Ground plane */}
      {showGroundPlane && (
        <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
          <planeGeometry args={[200, 200]} />
          <meshStandardMaterial color="#828588" />
        </mesh>
      )}

      {children}
    </>
  );
}
