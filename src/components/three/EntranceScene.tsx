"use client";

import { useFrame } from "@react-three/fiber";
import { Scene } from "./Scene";
import { CharacterController } from "./CharacterController";
import { CameraRig } from "./CameraRig";
import { MutableRefObject, useRef } from "react";
import { JoystickInput } from "@/hooks/useKeyboardMovement";
import { isInsideAABB } from "@/lib/collision";
import {
  ENTRANCE_WALLS,
  ENTRANCE_WORLD_BOUNDS,
  DOOR_TRIGGER_ZONE,
} from "@/lib/entranceCollisionConfig";

interface EntranceSceneProps {
  joystickRef: MutableRefObject<JoystickInput>;
  onReachDoor: () => void;
}

function DoorTrigger({ onReachDoor }: { onReachDoor: () => void }) {
  const firedRef = useRef(false);

  useFrame((state) => {
    if (firedRef.current) return;
    const character = state.scene.getObjectByName("character");
    if (!character) return;
    const { x, z } = character.position;
    if (isInsideAABB(x, z, DOOR_TRIGGER_ZONE)) {
      firedRef.current = true;
      onReachDoor();
    }
  });

  return null;
}

export function EntranceScene({ joystickRef, onReachDoor }: EntranceSceneProps) {
  return (
    <Scene showGroundPlane={false}>
      {/* 바닥 */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]} receiveShadow>
        <planeGeometry args={[24, 24]} />
        <meshStandardMaterial color="#a8d5a2" />
      </mesh>

      {/* 집 외벽 - 뒷벽 */}
      <mesh position={[0, 1, -3.75]} castShadow>
        <boxGeometry args={[6, 2, 0.5]} />
        <meshStandardMaterial color="#d4a373" />
      </mesh>

      {/* 집 외벽 - 왼벽 */}
      <mesh position={[-2.75, 1, -2]} castShadow>
        <boxGeometry args={[0.5, 2, 4]} />
        <meshStandardMaterial color="#d4a373" />
      </mesh>

      {/* 집 외벽 - 오른벽 */}
      <mesh position={[2.75, 1, -2]} castShadow>
        <boxGeometry args={[0.5, 2, 4]} />
        <meshStandardMaterial color="#d4a373" />
      </mesh>

      {/* 앞벽 좌 (문 왼쪽) */}
      <mesh position={[-1.8, 1, -0.25]} castShadow>
        <boxGeometry args={[2.4, 2, 0.5]} />
        <meshStandardMaterial color="#d4a373" />
      </mesh>

      {/* 앞벽 우 (문 오른쪽) */}
      <mesh position={[1.8, 1, -0.25]} castShadow>
        <boxGeometry args={[2.4, 2, 0.5]} />
        <meshStandardMaterial color="#d4a373" />
      </mesh>

      {/* 지붕 */}
      <mesh position={[0, 2.5, -2]} castShadow>
        <boxGeometry args={[7, 0.3, 5.5]} />
        <meshStandardMaterial color="#8b4513" />
      </mesh>

      <CharacterController
        joystickRef={joystickRef}
        walls={ENTRANCE_WALLS}
        worldBounds={ENTRANCE_WORLD_BOUNDS}
        initialPosition={[0, 0, 8]}
      />
      <CameraRig />
      <DoorTrigger onReachDoor={onReachDoor} />
    </Scene>
  );
}
