"use client";

import { useRef } from "react";
import { Group } from "three";
import { useDiscovery } from "@/hooks/useDiscovery";
import { DiscoveryPoint } from "./DiscoveryPoint";
import { DiscoveryPointData } from "@/types/discovery";
import { discoveryPoints } from "@/data/weddingData";

interface DiscoveryManagerProps {
  discoveredIds: Set<string>;
  onDiscover: (point: DiscoveryPointData) => void;
}

export function DiscoveryManager({
  discoveredIds,
  onDiscover,
}: DiscoveryManagerProps) {
  // We need a reference to the character — find it via parent scene
  // The CharacterController's group ref is what we need
  // For now, we pass a dummy ref and let useDiscovery find the character
  const dummyRef = useRef<Group>(null);

  useDiscovery(dummyRef, discoveredIds, onDiscover);

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
