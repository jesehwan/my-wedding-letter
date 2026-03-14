"use client";

import { useRef, useEffect, MutableRefObject } from "react";
import { useFrame } from "@react-three/fiber";
import { Group, Vector3 } from "three";
import { AABB, applyCollision } from "@/lib/collision";
import {
  HOUSE_WALLS,
  WORLD_BOUNDS,
  CHARACTER_RADIUS,
} from "@/lib/collisionConfig";

const MOVE_SPEED = 3;
const ROTATION_LERP = 0.15;

export type MoveState = "idle" | "moving";

export interface JoystickInput {
  x: number;
  y: number;
}

interface UseKeyboardMovementOptions {
  joystickRef?: MutableRefObject<JoystickInput>;
  walls?: AABB[];
  worldBounds?: AABB;
  characterRadius?: number;
  flipped?: boolean;
}

const CODE_MAP: Record<string, string> = {
  KeyW: "w",
  KeyA: "a",
  KeyS: "s",
  KeyD: "d",
  ArrowUp: "w",
  ArrowDown: "s",
  ArrowLeft: "a",
  ArrowRight: "d",
};

export function useKeyboardMovement(options?: UseKeyboardMovementOptions) {
  const groupRef = useRef<Group>(null);
  const keysRef = useRef<Set<string>>(new Set());
  const moveStateRef = useRef<MoveState>("idle");
  const dirVec = useRef(new Vector3());

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      const key = CODE_MAP[e.code];
      if (key) {
        e.preventDefault();
        keysRef.current.add(key);
      }
    };
    const onKeyUp = (e: KeyboardEvent) => {
      const key = CODE_MAP[e.code];
      if (key) keysRef.current.delete(key);
    };

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("keyup", onKeyUp);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("keyup", onKeyUp);
    };
  }, []);

  useFrame((_, delta) => {
    if (!groupRef.current) return;

    const keys = keysRef.current;
    let dx = 0;
    let dz = 0;

    // Keyboard input
    if (keys.has("w")) dz -= 1;
    if (keys.has("s")) dz += 1;
    if (keys.has("a")) dx -= 1;
    if (keys.has("d")) dx += 1;

    // Joystick input (overrides keyboard if active)
    const joy = options?.joystickRef?.current;
    if (joy && (joy.x !== 0 || joy.y !== 0)) {
      dx = joy.x;
      dz = -joy.y;
    }

    if (options?.flipped) {
      dx = -dx;
      dz = -dz;
    }

    const isMoving = dx !== 0 || dz !== 0;
    moveStateRef.current = isMoving ? "moving" : "idle";

    if (!isMoving) return;

    dirVec.current.set(dx, 0, dz).normalize();

    const step = MOVE_SPEED * delta;
    const newX = groupRef.current.position.x + dirVec.current.x * step;
    const newZ = groupRef.current.position.z + dirVec.current.z * step;
    const resolved = applyCollision(
      newX,
      newZ,
      options?.walls ?? HOUSE_WALLS,
      options?.worldBounds ?? WORLD_BOUNDS,
      options?.characterRadius ?? CHARACTER_RADIUS,
    );
    groupRef.current.position.x = resolved.x;
    groupRef.current.position.z = resolved.z;

    // Rotate toward movement direction
    const targetAngle = Math.atan2(dirVec.current.x, dirVec.current.z);
    const currentAngle = groupRef.current.rotation.y;
    let angleDiff = targetAngle - currentAngle;
    while (angleDiff > Math.PI) angleDiff -= Math.PI * 2;
    while (angleDiff < -Math.PI) angleDiff += Math.PI * 2;
    groupRef.current.rotation.y += angleDiff * ROTATION_LERP;
  });

  return { groupRef, moveStateRef };
}
