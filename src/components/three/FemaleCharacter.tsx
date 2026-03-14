"use client";

import { forwardRef, useEffect, useMemo, useRef } from "react";
import { Group, KeyframeTrack, SRGBColorSpace, MeshStandardMaterial } from "three";
import { useFBX, useAnimations } from "@react-three/drei";

export type FemaleAnimationState = "idle" | "walk" | "dance1" | "dance2";

const WALK_ANIMATION_SPEED = 1.8;

interface FemaleCharacterProps {
  animationState?: FemaleAnimationState;
}

export const FemaleCharacter = forwardRef<Group, FemaleCharacterProps>(
  function FemaleCharacter({ animationState = "idle" }, ref) {
    const innerRef = useRef<Group>(null);
    const prevStateRef = useRef<FemaleAnimationState>("idle");

    const idleModel = useFBX("/models/female_Idle.fbx");
    const walkModel = useFBX("/models/Female_Walk.fbx");
    const dance1Model = useFBX("/models/female_Dancing_1.fbx");
    const dance2Model = useFBX("/models/female_Dancing_2.fbx");

    const clips = useMemo(() => {
      const idleClip = idleModel.animations[0].clone();
      idleClip.name = "idle";

      const walkClip = walkModel.animations[0].clone();
      walkClip.name = "walk";
      walkClip.tracks.forEach((track: KeyframeTrack) => {
        if (track.name.endsWith(".position")) {
          const values = track.values;
          for (let i = 0; i < values.length; i += 3) {
            values[i] = 0;
            values[i + 2] = 0;
          }
        }
      });

      const dance1Clip = dance1Model.animations[0].clone();
      dance1Clip.name = "dance1";

      const dance2Clip = dance2Model.animations[0].clone();
      dance2Clip.name = "dance2";

      return [idleClip, walkClip, dance1Clip, dance2Clip];
    }, [idleModel, walkModel, dance1Model, dance2Model]);

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
      const prev = actions[prevStateRef.current];

      if (prev && prev !== current) {
        prev.fadeOut(0.3);
      }
      if (current) {
        current.timeScale = animationState === "walk" ? WALK_ANIMATION_SPEED : 1;
        current.reset().fadeIn(0.3).play();
      }
      prevStateRef.current = animationState;
    }, [animationState, actions]);

    return (
      <group ref={ref} name="female-character">
        <group ref={innerRef} scale={[0.00317, 0.00317, 0.00317]}>
          <primitive object={idleModel} />
        </group>
      </group>
    );
  }
);
