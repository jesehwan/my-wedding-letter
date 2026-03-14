"use client";

import { MutableRefObject } from "react";
import { Scene } from "./Scene";
import { House } from "./House";
import { CharacterController } from "./CharacterController";
import { CameraRig } from "./CameraRig";
import { DiscoveryManager } from "./DiscoveryManager";
import { DiscoveryPointData } from "@/types/discovery";
import { JoystickInput } from "@/hooks/useKeyboardMovement";

interface InteriorSceneProps {
  joystickRef: MutableRefObject<JoystickInput>;
  discoveredIds: Set<string>;
  activePoint: DiscoveryPointData | null;
  onDiscover: (point: DiscoveryPointData) => void;
  cameraFlipped?: boolean;
}

export function InteriorScene({
  joystickRef,
  discoveredIds,
  activePoint,
  onDiscover,
  cameraFlipped,
}: InteriorSceneProps) {
  return (
    <Scene ambientIntensity={0.3}>
      <House />
      <CharacterController
        joystickRef={joystickRef}
        initialPosition={[0, 0, -2.5]}
        flipped={cameraFlipped}
      />
      <CameraRig flipped={cameraFlipped} />
      <DiscoveryManager
        discoveredIds={discoveredIds}
        activePoint={activePoint}
        onDiscover={onDiscover}
      />
    </Scene>
  );
}
