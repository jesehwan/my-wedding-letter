"use client";

import { Canvas } from "@react-three/fiber";
import { AdaptiveDpr } from "@react-three/drei";
import { Suspense, useState, useCallback } from "react";
import { Scene } from "./Scene";
import { House } from "./House";
import { CharacterController } from "./CharacterController";
import { CameraRig } from "./CameraRig";
import { DiscoveryManager } from "./DiscoveryManager";
import { LoadingScreen } from "../ui/LoadingScreen";
import { StoryPopup } from "../ui/StoryPopup";
import { MobileJoystick } from "../ui/MobileJoystick";
import { DiscoveryPointData, JoystickInput } from "@/types/discovery";

interface ExperienceProps {
  onBack?: () => void;
}

export default function Experience({ onBack }: ExperienceProps) {
  const [activeDiscovery, setActiveDiscovery] =
    useState<DiscoveryPointData | null>(null);
  const [discoveredIds, setDiscoveredIds] = useState<Set<string>>(new Set());
  const [joystickInput, setJoystickInput] = useState<JoystickInput>({
    x: 0,
    y: 0,
  });
  const [isLoaded, setIsLoaded] = useState(false);

  const handleDiscover = useCallback((point: DiscoveryPointData) => {
    setActiveDiscovery(point);
  }, []);

  const handleClosePopup = useCallback(() => {
    if (activeDiscovery) {
      setDiscoveredIds((prev) => new Set(prev).add(activeDiscovery.id));
      setActiveDiscovery(null);
    }
  }, [activeDiscovery]);

  const isPaused = activeDiscovery !== null;

  return (
    <div className="fixed inset-0">
      {!isLoaded && <LoadingScreen />}

      <Canvas
        shadows
        camera={{ position: [0, 4, 6], fov: 60 }}
        onCreated={() => setIsLoaded(true)}
        dpr={[1, 2]}
      >
        <AdaptiveDpr pixelated />
        <Suspense fallback={null}>
          <Scene>
            <House />
            <CharacterController
              paused={isPaused}
              joystickInput={joystickInput}
            />
            <CameraRig />
            <DiscoveryManager
              discoveredIds={discoveredIds}
              onDiscover={handleDiscover}
            />
          </Scene>
        </Suspense>
      </Canvas>

      {/* HTML Overlays */}
      {activeDiscovery && (
        <StoryPopup point={activeDiscovery} onClose={handleClosePopup} />
      )}

      {!isPaused && <MobileJoystick onMove={setJoystickInput} />}

      {/* Back button */}
      {onBack && (
        <button
          onClick={onBack}
          className="fixed left-4 top-4 z-40 rounded-full bg-white/80 px-4 py-2 text-sm text-gray-600 shadow backdrop-blur transition-colors hover:bg-white"
        >
          돌아가기
        </button>
      )}
    </div>
  );
}
