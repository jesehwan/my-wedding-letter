"use client";

import { useFrame, useThree } from "@react-three/fiber";
import { useRef } from "react";
import { Vector3 } from "three";

const CAMERA_RADIUS = 4;
const CAMERA_HEIGHT = 2.5;
const LERP_FACTOR = 0.13;

// angle 0 → (0, 2.5, 4), angle π → (0, 2.5, -4)
const ANGLE_DEFAULT = 0;
const ANGLE_FLIPPED = Math.PI;

interface CameraRigProps {
  flipped?: boolean;
}

export function CameraRig({ flipped = false }: CameraRigProps) {
  const { camera } = useThree();
  const targetPos = useRef(new Vector3());
  const currentAngle = useRef(ANGLE_DEFAULT);

  useFrame((state) => {
    const character = state.scene.getObjectByName("character");

    if (character) {
      const desiredAngle = flipped ? ANGLE_FLIPPED : ANGLE_DEFAULT;
      currentAngle.current += (desiredAngle - currentAngle.current) * LERP_FACTOR;

      const offsetX = Math.sin(currentAngle.current) * CAMERA_RADIUS;
      const offsetZ = Math.cos(currentAngle.current) * CAMERA_RADIUS;

      targetPos.current.set(
        character.position.x + offsetX,
        character.position.y + CAMERA_HEIGHT,
        character.position.z + offsetZ,
      );
      camera.position.lerp(targetPos.current, LERP_FACTOR);
      camera.lookAt(character.position);
    }
  });

  return null;
}
