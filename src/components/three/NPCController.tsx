"use client";

import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Group } from "three";
import { FemaleCharacter, FemaleAnimationState } from "./FemaleCharacter";
import { applyCollision } from "@/lib/collision";
import {
  HOUSE_WALLS,
  WORLD_BOUNDS,
  CHARACTER_RADIUS,
} from "@/lib/collisionConfig";

const MOVE_SPEED = 1.5;
const ROTATION_LERP = 0.15;
const ARRIVAL_THRESHOLD = 0.3;
const DANCE_DURATION_MIN = 3;
const DANCE_DURATION_MAX = 5;

const WAYPOINTS: [number, number][] = [
  [0, -5],
  [-2, -8],
  [3, -9],
  [3, -3],
  [-3, -3],
];

type NPCState = "walking" | "dancing";

export function NPCController() {
  const groupRef = useRef<Group>(null);
  const [animationState, setAnimationState] = useState<FemaleAnimationState>("walk");

  const stateRef = useRef<NPCState>("walking");
  const waypointIndexRef = useRef(0);
  const danceTimerRef = useRef(0);
  const danceDurationRef = useRef(0);
  const danceToggleRef = useRef(false);

  useFrame((_, delta) => {
    const group = groupRef.current;
    if (!group) return;

    const clampedDelta = Math.min(delta, 0.1);

    if (stateRef.current === "walking") {
      const [targetX, targetZ] = WAYPOINTS[waypointIndexRef.current];
      const dx = targetX - group.position.x;
      const dz = targetZ - group.position.z;
      const dist = Math.sqrt(dx * dx + dz * dz);

      if (dist < ARRIVAL_THRESHOLD) {
        // Arrived — switch to dancing
        stateRef.current = "dancing";
        danceTimerRef.current = 0;
        danceDurationRef.current =
          DANCE_DURATION_MIN +
          Math.random() * (DANCE_DURATION_MAX - DANCE_DURATION_MIN);
        const danceAnim = danceToggleRef.current ? "dance2" : "dance1";
        danceToggleRef.current = !danceToggleRef.current;
        setAnimationState(danceAnim as FemaleAnimationState);
        return;
      }

      // Move toward waypoint
      const dirX = dx / dist;
      const dirZ = dz / dist;

      const newX = group.position.x + dirX * MOVE_SPEED * clampedDelta;
      const newZ = group.position.z + dirZ * MOVE_SPEED * clampedDelta;

      const resolved = applyCollision(
        newX,
        newZ,
        HOUSE_WALLS,
        WORLD_BOUNDS,
        CHARACTER_RADIUS
      );

      group.position.x = resolved.x;
      group.position.z = resolved.z;

      // Rotate toward movement direction
      const targetAngle = Math.atan2(dirX, dirZ);
      let angleDiff = targetAngle - group.rotation.y;
      // Normalize to [-PI, PI]
      while (angleDiff > Math.PI) angleDiff -= Math.PI * 2;
      while (angleDiff < -Math.PI) angleDiff += Math.PI * 2;
      group.rotation.y += angleDiff * ROTATION_LERP;
    } else {
      // Dancing
      danceTimerRef.current += clampedDelta;
      if (danceTimerRef.current >= danceDurationRef.current) {
        // Done dancing — move to next waypoint
        stateRef.current = "walking";
        waypointIndexRef.current =
          (waypointIndexRef.current + 1) % WAYPOINTS.length;
        setAnimationState("walk");
      }
    }
  });

  return (
    <FemaleCharacter
      ref={groupRef}
      animationState={animationState}
    />
  );
}
