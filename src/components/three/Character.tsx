"use client";

import { forwardRef, useEffect, useMemo, useRef } from "react";
import { Group, KeyframeTrack, SRGBColorSpace, MeshStandardMaterial } from "three";
import { useFBX, useAnimations } from "@react-three/drei";

export type AnimationState = "idle" | "walk";

const WALK_ANIMATION_SPEED = 1.8;

interface CharacterProps {
  animationState?: AnimationState;
}

export const Character = forwardRef<Group, CharacterProps>(function Character(
  { animationState = "idle" },
  ref
) {
  const innerRef = useRef<Group>(null);

  const idleModel = useFBX("/models/Idle.fbx");
  const walkModel = useFBX("/models/Walking.fbx");

  const clips = useMemo(() => {
    const idleClip = idleModel.animations[0].clone();
    idleClip.name = "idle";
    const walkClip = walkModel.animations[0].clone();
    walkClip.name = "walk";
    walkClip.tracks.forEach((track: KeyframeTrack) => {
      if (track.name.endsWith(".position")) {
        const values = track.values;
        for (let i = 0; i < values.length; i += 3) {
          values[i] = 0;     // X (horizontal)
          values[i + 2] = 0; // Z (horizontal)
        }
      }
    });
    return [idleClip, walkClip];
  }, [idleModel, walkModel]);

  const { actions } = useAnimations(clips, innerRef);

  useEffect(() => {
    idleModel.traverse((child: any) => {
      if (child.isMesh) {
        child.castShadow = true;
        const mats = Array.isArray(child.material)
          ? child.material
          : [child.material];
        const converted = mats.map((mat: any) => {
          if (mat.map) {
            mat.map.colorSpace = SRGBColorSpace;
          }
          return new MeshStandardMaterial({
            color: mat.color,
            map: mat.map ?? null,
            transparent: mat.transparent,
            opacity: mat.opacity,
            roughness: 1,
            metalness: 0,
          });
        });
        child.material = converted.length === 1 ? converted[0] : converted;
      }
    });
  }, [idleModel]);

  useEffect(() => {
    const current = actions[animationState];
    const previous = animationState === "idle" ? actions["walk"] : actions["idle"];

    if (previous) {
      previous.fadeOut(0.3);
    }
    if (current) {
      current.timeScale = animationState === "walk" ? WALK_ANIMATION_SPEED : 1;
      current.reset().fadeIn(0.3).play();
    }
  }, [animationState, actions]);

  return (
    <group ref={ref} name="character">
      <group ref={innerRef} scale={[0.009, 0.009, 0.009]}>
        <primitive object={idleModel} />
      </group>
    </group>
  );
});
