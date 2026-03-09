"use client";

import { useRef, useCallback, useEffect, useState } from "react";
import { JoystickInput } from "@/types/discovery";

interface MobileJoystickProps {
  onMove: (input: JoystickInput) => void;
}

export function MobileJoystick({ onMove }: MobileJoystickProps) {
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const baseRef = useRef<HTMLDivElement>(null);
  const knobRef = useRef<HTMLDivElement>(null);
  const activeTouch = useRef<number | null>(null);

  useEffect(() => {
    setIsTouchDevice("ontouchstart" in window || navigator.maxTouchPoints > 0);
  }, []);

  const handleTouchStart = useCallback(
    (e: React.TouchEvent) => {
      if (activeTouch.current !== null) return;
      const touch = e.touches[0];
      activeTouch.current = touch.identifier;
    },
    []
  );

  const handleTouchMove = useCallback(
    (e: React.TouchEvent) => {
      if (!baseRef.current || activeTouch.current === null) return;

      const touch = Array.from(e.touches).find(
        (t) => t.identifier === activeTouch.current
      );
      if (!touch) return;

      const rect = baseRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const maxRadius = rect.width / 2;
      let dx = touch.clientX - centerX;
      let dy = touch.clientY - centerY;

      const distance = Math.sqrt(dx * dx + dy * dy);
      if (distance > maxRadius) {
        dx = (dx / distance) * maxRadius;
        dy = (dy / distance) * maxRadius;
      }

      if (knobRef.current) {
        knobRef.current.style.transform = `translate(${dx}px, ${dy}px)`;
      }

      onMove({ x: dx / maxRadius, y: -dy / maxRadius });
    },
    [onMove]
  );

  const handleTouchEnd = useCallback(() => {
    activeTouch.current = null;
    if (knobRef.current) {
      knobRef.current.style.transform = "translate(0px, 0px)";
    }
    onMove({ x: 0, y: 0 });
  }, [onMove]);

  if (!isTouchDevice) return null;

  return (
    <div
      ref={baseRef}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      className="fixed bottom-8 left-8 z-40 flex h-28 w-28 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm"
      style={{ touchAction: "none" }}
    >
      <div
        ref={knobRef}
        className="h-12 w-12 rounded-full bg-white/60 shadow-lg transition-transform"
      />
    </div>
  );
}
