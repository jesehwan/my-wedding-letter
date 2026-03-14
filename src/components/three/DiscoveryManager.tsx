"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Vector3 } from "three";
import { DiscoveryPoint } from "./DiscoveryPoint";
import { DiscoveryPointData } from "@/types/discovery";
import { discoveryPoints } from "@/data/weddingData";

const TRIGGER_DISTANCE = 0.8;

interface DiscoveryManagerProps {
  discoveredIds: Set<string>;
  activePoint: DiscoveryPointData | null;
  onDiscover: (point: DiscoveryPointData) => void;
}

export function DiscoveryManager({
  discoveredIds,
  activePoint,
  onDiscover,
}: DiscoveryManagerProps) {
  const pointPos = useRef(new Vector3());

  useFrame((state) => {
    if (activePoint) return;

    const character = state.scene.getObjectByName("character");
    if (!character) return;

    for (const point of discoveryPoints) {
      if (discoveredIds.has(point.id)) continue;

      pointPos.current.set(...point.position);
      const dist = character.position.distanceTo(pointPos.current);

      if (dist < TRIGGER_DISTANCE) {
        onDiscover(point);
        break;
      }
    }
  });

  return (
    <>
      {discoveryPoints.map((point) => (
        <DiscoveryPoint
          key={point.id}
          position={point.position}
          discovered={discoveredIds.has(point.id)}
        />
      ))}
    </>
  );
}
