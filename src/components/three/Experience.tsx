"use client";

import { Canvas } from "@react-three/fiber";
import { AdaptiveDpr } from "@react-three/drei";
import { NoToneMapping } from "three";
import { Suspense, useState, useCallback, useRef, useEffect, useMemo } from "react";
import { InteriorScene } from "./InteriorScene";
import { Fireworks } from "./Fireworks";
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
  const [activeDiscovery, setActiveDiscovery] =
    useState<DiscoveryPointData | null>(null);
  const [discoveredIds, setDiscoveredIds] = useState<Set<string>>(new Set());
  const [showEnding, setShowEnding] = useState(false);
  const [endingPhase, setEndingPhase] = useState<"fireworks" | "popup" | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [cameraFlipped, setCameraFlipped] = useState(false);
  const [topDown, setTopDown] = useState(false);
  const joystickRef = useRef<JoystickInput>({ x: 0, y: 0 });
  const maxDpr = useMemo(() => (typeof window !== "undefined" && window.innerWidth < 768 ? 1.5 : 2), []);

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
          setEndingPhase("fireworks");
        }
        return next;
      });
      setActiveDiscovery(null);
    }
  }, [activeDiscovery]);

  useEffect(() => {
    if (endingPhase !== "fireworks") return;
    const timer = setTimeout(() => setEndingPhase("popup"), 4000);
    return () => clearTimeout(timer);
  }, [endingPhase]);

  return (
    <div className="fixed inset-0">
      {!isLoaded && <LoadingScreen />}

      <Canvas
        shadows
        camera={{ position: [0, 2.5, 4], fov: 60 }}
        onCreated={() => setIsLoaded(true)}
        dpr={[1, maxDpr]}
        gl={{ toneMapping: NoToneMapping }}
      >
        <AdaptiveDpr pixelated />
        <Suspense fallback={null}>
          <InteriorScene
            joystickRef={joystickRef}
            discoveredIds={discoveredIds}
            activePoint={activeDiscovery}
            onDiscover={handleDiscover}
            cameraFlipped={cameraFlipped}
            topDown={topDown}
            lookUpMode={endingPhase === "fireworks"}
          />
        </Suspense>
        {showEnding && <Fireworks />}
      </Canvas>

      <MobileJoystick joystickRef={joystickRef} />

      <button
        onClick={() => setCameraFlipped((prev) => !prev)}
        className="fixed bottom-6 right-6 z-40 rounded-full bg-white/80 p-3 text-xl shadow backdrop-blur transition-colors hover:bg-white"
        aria-label={cameraFlipped ? "카메라 원래대로" : "카메라 반전"}
      >
        {cameraFlipped ? "🔄" : "🔃"}
      </button>

      <button
        onClick={() => setTopDown((prev) => !prev)}
        className="fixed bottom-6 right-20 z-40 rounded-full bg-white/80 p-3 text-xl shadow backdrop-blur transition-colors hover:bg-white"
        aria-label={topDown ? "기본 시점" : "탑뷰"}
      >
        {topDown ? "👤" : "🔽"}
      </button>

      <div className="fixed right-4 top-4 z-40 rounded-full bg-white/80 px-4 py-2 text-sm text-gray-600 shadow backdrop-blur">
        {discoveredIds.size} / {discoveryPoints.length}
      </div>

      {activeDiscovery && (
        <StoryPopup point={activeDiscovery} onClose={handleClosePopup} />
      )}

      {endingPhase === "popup" && (
        <EndingScreen onClose={() => { setEndingPhase(null); }} />
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
