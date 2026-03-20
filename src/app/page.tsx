"use client";

import { useState, useCallback, lazy, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { LandingSection } from "@/components/landing/LandingSection";
import { LoadingScreen } from "@/components/ui/LoadingScreen";

const Experience = lazy(() => import("@/components/three/Experience"));

function HomeContent() {
  const searchParams = useSearchParams();
  const side = searchParams.get("side");
  const [showExperience, setShowExperience] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleExplore = useCallback(() => {
    setIsTransitioning(true);
    setTimeout(() => {
      setShowExperience(true);
      setIsTransitioning(false);
    }, 400);
  }, []);

  const handleBack = useCallback(() => {
    setIsTransitioning(true);
    setTimeout(() => {
      setShowExperience(false);
      setIsTransitioning(false);
    }, 400);
  }, []);

  return (
    <>
      {/* Fade overlay for transitions */}
      {isTransitioning && (
        <div className="fixed inset-0 z-[100] animate-fade-in bg-white" />
      )}

      {showExperience ? (
        <div className="animate-fade-in">
          <Suspense fallback={<LoadingScreen />}>
            <Experience onBack={handleBack} />
          </Suspense>
        </div>
      ) : (
        <div className={isTransitioning ? "animate-fade-out" : "animate-fade-in"}>
          <LandingSection onExplore={handleExplore} side={side} />
        </div>
      )}
    </>
  );
}

export default function Home() {
  return (
    <Suspense>
      <HomeContent />
    </Suspense>
  );
}
