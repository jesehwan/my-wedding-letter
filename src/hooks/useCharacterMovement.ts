"use client";

import { useRef, useEffect, useCallback } from "react";
import { useFrame } from "@react-three/fiber";
import { Group } from "three";
import { MovementInput, JoystickInput } from "@/types/discovery";
import { clampToBounds, AABB } from "@/lib/collision";

const MOVE_SPEED = 3;
const ROTATION_LERP = 0.1;

const WORLD_BOUNDS: AABB = { minX: -8, maxX: 8, minZ: -8, maxZ: 8 };

export interface MovementDelta {
  dx: number;
  dz: number;
}

export function calculateMovement(
  input: MovementInput,
  joystick: JoystickInput,
  speed: number,
  delta: number
): MovementDelta {
  let dx = 0;
  let dz = 0;

  // Keyboard input
  if (input.forward) dz -= 1;
  if (input.backward) dz += 1;
  if (input.left) dx -= 1;
  if (input.right) dx += 1;

  // Joystick input (overrides keyboard if active)
  if (Math.abs(joystick.x) > 0.1 || Math.abs(joystick.y) > 0.1) {
    dx = joystick.x;
    dz = -joystick.y;
  }

  // Normalize diagonal movement
  const length = Math.sqrt(dx * dx + dz * dz);
  if (length > 0) {
    dx = (dx / length) * speed * delta;
    dz = (dz / length) * speed * delta;
  }

  return { dx, dz };
}

export function useCharacterMovement(
  paused: boolean,
  joystickInput: JoystickInput
) {
  const groupRef = useRef<Group>(null);
  const keysRef = useRef<MovementInput>({
    forward: false,
    backward: false,
    left: false,
    right: false,
  });

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    switch (e.key) {
      case "w":
      case "W":
      case "ArrowUp":
        keysRef.current.forward = true;
        break;
      case "s":
      case "S":
      case "ArrowDown":
        keysRef.current.backward = true;
        break;
      case "a":
      case "A":
      case "ArrowLeft":
        keysRef.current.left = true;
        break;
      case "d":
      case "D":
      case "ArrowRight":
        keysRef.current.right = true;
        break;
    }
  }, []);

  const handleKeyUp = useCallback((e: KeyboardEvent) => {
    switch (e.key) {
      case "w":
      case "W":
      case "ArrowUp":
        keysRef.current.forward = false;
        break;
      case "s":
      case "S":
      case "ArrowDown":
        keysRef.current.backward = false;
        break;
      case "a":
      case "A":
      case "ArrowLeft":
        keysRef.current.left = false;
        break;
      case "d":
      case "D":
      case "ArrowRight":
        keysRef.current.right = false;
        break;
    }
  }, []);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [handleKeyDown, handleKeyUp]);

  useFrame((_, delta) => {
    if (paused || !groupRef.current) return;

    const { dx, dz } = calculateMovement(
      keysRef.current,
      joystickInput,
      MOVE_SPEED,
      delta
    );

    if (dx === 0 && dz === 0) return;

    const pos = groupRef.current.position;
    const clamped = clampToBounds(pos.x + dx, pos.z + dz, WORLD_BOUNDS);
    pos.x = clamped.x;
    pos.z = clamped.z;

    // Rotate character to face movement direction
    const targetRotation = Math.atan2(dx, dz);
    groupRef.current.rotation.y +=
      (targetRotation - groupRef.current.rotation.y) * ROTATION_LERP;
  });

  return groupRef;
}
