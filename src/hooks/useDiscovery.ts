"use client";

import { useRef, useCallback } from "react";
import { useFrame } from "@react-three/fiber";
import { Group } from "three";
import { DiscoveryPointData } from "@/types/discovery";
import { distance2D } from "@/lib/collision";
import { discoveryPoints } from "@/data/weddingData";

const DISCOVERY_RADIUS = 1.5;

export function useDiscovery(
  characterRef: React.RefObject<Group | null>,
  discoveredIds: Set<string>,
  onDiscover: (point: DiscoveryPointData) => void
) {
  const lastTriggeredRef = useRef<string | null>(null);

  useFrame(() => {
    if (!characterRef.current) return;

    const charPos = characterRef.current.position;

    for (const point of discoveryPoints) {
      if (discoveredIds.has(point.id)) continue;
      if (lastTriggeredRef.current === point.id) continue;

      const dist = distance2D(charPos.x, charPos.z, point.position[0], point.position[2]);

      if (dist < DISCOVERY_RADIUS) {
        lastTriggeredRef.current = point.id;
        onDiscover(point);
        return;
      }
    }

    // Reset trigger lock when character moves away
    if (lastTriggeredRef.current) {
      const lastPoint = discoveryPoints.find(
        (p) => p.id === lastTriggeredRef.current
      );
      if (lastPoint) {
        const dist = distance2D(
          charPos.x,
          charPos.z,
          lastPoint.position[0],
          lastPoint.position[2]
        );
        if (dist > DISCOVERY_RADIUS * 1.5) {
          lastTriggeredRef.current = null;
        }
      }
    }
  });

  const getNearbyPoint = useCallback(
    (x: number, z: number): DiscoveryPointData | null => {
      for (const point of discoveryPoints) {
        if (discoveredIds.has(point.id)) continue;
        const dist = distance2D(x, z, point.position[0], point.position[2]);
        if (dist < DISCOVERY_RADIUS) return point;
      }
      return null;
    },
    [discoveredIds]
  );

  return { getNearbyPoint };
}
