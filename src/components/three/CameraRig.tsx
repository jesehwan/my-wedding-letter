"use client";

import { useFrame, useThree } from "@react-three/fiber";
import { useRef } from "react";
import { Vector3 } from "three";

const CAMERA_OFFSET = new Vector3(0, 4, 6);
const LERP_FACTOR = 0.05;

export function CameraRig() {
  const { camera } = useThree();
  const targetPos = useRef(new Vector3());

  useFrame((state) => {
    // Find the character group (first child that moves)
    const scene = state.scene;
    const character = scene.children.find(
      (child) =>
        child.type === "Group" &&
        (child.position.x !== 0 || child.position.z !== 0)
    );

    if (character) {
      targetPos.current.copy(character.position).add(CAMERA_OFFSET);
      camera.position.lerp(targetPos.current, LERP_FACTOR);
      camera.lookAt(character.position);
    }
  });

  return null;
}
