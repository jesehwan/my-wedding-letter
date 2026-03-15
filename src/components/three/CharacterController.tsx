"use client";

import { useKeyboardMovement, JoystickInput } from "@/hooks/useKeyboardMovement";
import { Character, AnimationState } from "./Character";
import { useFrame } from "@react-three/fiber";
import { MutableRefObject, useRef, useState, useEffect } from "react";
import { AABB } from "@/lib/collision";

interface CharacterControllerProps {
  joystickRef?: MutableRefObject<JoystickInput>;
  walls?: AABB[];
  worldBounds?: AABB;
  characterRadius?: number;
  initialPosition?: [number, number, number];
  cameraAngleRef?: MutableRefObject<number>;
  topDown?: boolean;
  frozen?: boolean;
}

export function CharacterController({
  joystickRef,
  walls,
  worldBounds,
  characterRadius,
  initialPosition,
  cameraAngleRef,
  topDown,
  frozen,
}: CharacterControllerProps) {
  const { groupRef, moveStateRef } = useKeyboardMovement({
    joystickRef,
    walls,
    worldBounds,
    characterRadius,
    cameraAngleRef,
    topDown,
  });
  const [animationState, setAnimationState] = useState<AnimationState>("idle");
  const prevAnimRef = useRef<AnimationState>("idle");

  useEffect(() => {
    if (groupRef.current?.position && initialPosition) {
      groupRef.current.position.set(...initialPosition);
    }
  }, []);

  useFrame(() => {
    if (frozen) {
      if (prevAnimRef.current !== "idle") {
        prevAnimRef.current = "idle";
        setAnimationState("idle");
      }
      return;
    }
    const next: AnimationState = moveStateRef.current === "moving" ? "walk" : "idle";
    if (prevAnimRef.current !== next) {
      prevAnimRef.current = next;
      setAnimationState(next);
    }
  });

  return <Character ref={groupRef} animationState={animationState} />;
}
