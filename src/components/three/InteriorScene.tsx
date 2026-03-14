"use client";

import { MutableRefObject, useRef } from "react";
import { Scene } from "./Scene";
import { House } from "./House";
import { CharacterController } from "./CharacterController";
import { CameraRig } from "./CameraRig";
import { DiscoveryManager } from "./DiscoveryManager";
import { RoomSpotlights } from "./RoomSpotlights";
import { DebugWalls } from "./DebugWalls";
import { DiscoveryPointData } from "@/types/discovery";
import { JoystickInput } from "@/hooks/useKeyboardMovement";

interface InteriorSceneProps {
  joystickRef: MutableRefObject<JoystickInput>;
  discoveredIds: Set<string>;
  activePoint: DiscoveryPointData | null;
  onDiscover: (point: DiscoveryPointData) => void;
  cameraFlipped?: boolean;
  topDown?: boolean;
  lookUpMode?: boolean;
}

export function InteriorScene({
  joystickRef,
  discoveredIds,
  activePoint,
  onDiscover,
  cameraFlipped,
  topDown,
  lookUpMode,
}: InteriorSceneProps) {
  const cameraAngleRef = useRef(0);

  return (
    <Scene ambientIntensity={0.08}>
      <House />
      <RoomSpotlights />
      <DebugWalls />
      <CharacterController
        joystickRef={joystickRef}
        initialPosition={[0, 0, -2.5]}
        cameraAngleRef={cameraAngleRef}
        topDown={topDown}
      />
      <CameraRig flipped={cameraFlipped} topDown={topDown} lookUpMode={lookUpMode} cameraAngleRef={cameraAngleRef} />
      <DiscoveryManager
        discoveredIds={discoveredIds}
        activePoint={activePoint}
        onDiscover={onDiscover}
      />
    </Scene>
  );
}
