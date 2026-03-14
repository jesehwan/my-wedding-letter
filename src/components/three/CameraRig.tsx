"use client";

import { useFrame, useThree } from "@react-three/fiber";
import { useRef } from "react";
import { Vector3 } from "three";

const CAMERA_OFFSET = new Vector3(0, 2.5, 4);
const LERP_FACTOR = 0.1;

export function CameraRig() {
  const { camera } = useThree();
  const targetPos = useRef(new Vector3());

  useFrame((state) => {
    const character = state.scene.getObjectByName("character");

    if (character) {
      targetPos.current.copy(character.position).add(CAMERA_OFFSET);
      camera.position.lerp(targetPos.current, LERP_FACTOR);
      camera.lookAt(character.position);
    }
  });

  return null;
}
