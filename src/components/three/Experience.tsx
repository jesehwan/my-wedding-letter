"use client";

import { Canvas } from "@react-three/fiber";
import { AdaptiveDpr } from "@react-three/drei";
import { Suspense, useState, useCallback, useRef } from "react";
import { EntranceScene } from "./EntranceScene";
import { InteriorScene } from "./InteriorScene";
import { LoadingScreen } from "../ui/LoadingScreen";
import { StoryPopup } from "../ui/StoryPopup";
import { EndingScreen } from "../ui/EndingScreen";
import { MobileJoystick } from "../ui/MobileJoystick";
import { DiscoveryPointData } from "@/types/discovery";
import { discoveryPoints } from "@/data/weddingData";
import { JoystickInput } from "@/hooks/useKeyboardMovement";

interface ExperienceProps {
  onBack?: () => void;
}

export default function Experience({ onBack }: ExperienceProps) {
  const [currentScene, setCurrentScene] = useState<"entrance" | "interior">("entrance");
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [activeDiscovery, setActiveDiscovery] =
    useState<DiscoveryPointData | null>(null);
  const [discoveredIds, setDiscoveredIds] = useState<Set<string>>(new Set());
  const [showEnding, setShowEnding] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [cameraFlipped, setCameraFlipped] = useState(false);
  const joystickRef = useRef<JoystickInput>({ x: 0, y: 0 });

  const handleReachDoor = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentScene("interior");
      setIsTransitioning(false);
    }, 400);
  }, [isTransitioning]);

  const handleDiscover = useCallback(
    (point: DiscoveryPointData) => {
      if (activeDiscovery) return;
      setActiveDiscovery(point);
    },
    [activeDiscovery]
  );

  const handleClosePopup = useCallback(() => {
    if (activeDiscovery) {
      setDiscoveredIds((prev) => {
        const next = new Set(prev).add(activeDiscovery.id);
        if (next.size === discoveryPoints.length) {
          setShowEnding(true);
        }
        return next;
      });
      setActiveDiscovery(null);
    }
  }, [activeDiscovery]);

  return (
    <div className="fixed inset-0">
      {!isLoaded && <LoadingScreen />}

      {isTransitioning && (
        <div className="fixed inset-0 z-50 bg-white transition-opacity duration-300" />
      )}

      <Canvas
        shadows
        camera={{ position: [0, 2.5, 4], fov: 60 }}
        onCreated={() => setIsLoaded(true)}
        dpr={[1, 2]}
      >
        <AdaptiveDpr pixelated />
        <Suspense fallback={null}>
          {currentScene === "entrance" ? (
            <EntranceScene
              joystickRef={joystickRef}
              onReachDoor={handleReachDoor}
              cameraFlipped={cameraFlipped}
            />
          ) : (
            <InteriorScene
              joystickRef={joystickRef}
              discoveredIds={discoveredIds}
              activePoint={activeDiscovery}
              onDiscover={handleDiscover}
              cameraFlipped={cameraFlipped}
            />
          )}
        </Suspense>
      </Canvas>

      <MobileJoystick joystickRef={joystickRef} />

      <button
        onClick={() => setCameraFlipped((prev) => !prev)}
        className="fixed bottom-6 right-6 z-40 rounded-full bg-white/80 p-3 text-xl shadow backdrop-blur transition-colors hover:bg-white"
        aria-label={cameraFlipped ? "카메라 원래대로" : "카메라 반전"}
      >
        {cameraFlipped ? "🔄" : "🔃"}
      </button>

      {currentScene === "interior" && (
        <>
          <div className="fixed right-4 top-4 z-40 rounded-full bg-white/80 px-4 py-2 text-sm text-gray-600 shadow backdrop-blur">
            {discoveredIds.size} / {discoveryPoints.length}
          </div>

          {activeDiscovery && (
            <StoryPopup point={activeDiscovery} onClose={handleClosePopup} />
          )}

          {showEnding && (
            <EndingScreen onClose={() => setShowEnding(false)} />
          )}
        </>
      )}

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
