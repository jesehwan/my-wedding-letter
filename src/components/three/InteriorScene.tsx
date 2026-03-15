"use client";

import { MutableRefObject, useRef } from "react";
import { Scene } from "./Scene";
import { House } from "./House";
import { CharacterController } from "./CharacterController";
import { CameraRig } from "./CameraRig";
import { DiscoveryManager } from "./DiscoveryManager";
import { RoomSpotlights } from "./RoomSpotlights";
import { NPCController } from "./NPCController";
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
  frozen?: boolean;
}

export function InteriorScene({
  joystickRef,
  discoveredIds,
  activePoint,
  onDiscover,
  cameraFlipped,
  topDown,
  lookUpMode,
  frozen,
}: InteriorSceneProps) {
  const cameraAngleRef = useRef(0);

  return (
    <Scene ambientIntensity={0.08}>
      <House />
      <RoomSpotlights />
      <CharacterController
        joystickRef={joystickRef}
        initialPosition={[0, 0, 3]}
        cameraAngleRef={cameraAngleRef}
        topDown={topDown}
        frozen={frozen}
      />
      <CameraRig flipped={cameraFlipped} topDown={topDown} lookUpMode={lookUpMode} cameraAngleRef={cameraAngleRef} />
      <NPCController />
      <DiscoveryManager
        discoveredIds={discoveredIds}
        activePoint={activePoint}
        onDiscover={onDiscover}
      />
    </Scene>
  );
}
