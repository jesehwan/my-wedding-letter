"use client";

import { useRef, useEffect } from "react";
import { SpotLight, Object3D } from "three";

interface RoomSpotlight {
  position: [number, number, number];
  target: [number, number, number];
}

export const ROOM_SPOTLIGHTS: RoomSpotlight[] = [
  // 좌상단 (주방)
  { position: [-3, 8, -9], target: [-3, 0, -9] },
  // 우상단
  { position: [3, 8, -9], target: [3, 0, -9] },
  // 좌하단 (거실)
  { position: [-3, 8, -2.5], target: [-3, 0, -2.5] },
  // 우하단 (서재)
  { position: [3.5, 8, -2.5], target: [3.5, 0, -2.5] },
  // 베란다
  { position: [0.35, 8, -12], target: [0.35, 0, -12] },

];

function RoomSpot({ position, target }: RoomSpotlight) {
  const lightRef = useRef<SpotLight>(null);
  const targetRef = useRef<Object3D>(null);

  useEffect(() => {
    if (lightRef.current && targetRef.current) {
      lightRef.current.target = targetRef.current;
    }
  }, []);

  return (
    <>
      <spotLight
        ref={lightRef}
        position={position}
        intensity={40}
        angle={Math.PI / 8}
        penumbra={1}
        decay={1.1}
        castShadow
        color="#f3dfb8"
      />
      <object3D ref={targetRef} position={target} />
    </>
  );
}

export function RoomSpotlights() {
  return (
    <>
      {ROOM_SPOTLIGHTS.map((spot, i) => (
        <RoomSpot key={i} {...spot} />
      ))}
    </>
  );
}
