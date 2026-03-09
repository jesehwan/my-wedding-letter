"use client";

import { useProgress } from "@react-three/drei";

export function LoadingScreen() {
  const { progress } = useProgress();

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white">
      <p className="mb-4 text-lg text-gray-600">신혼집 준비 중...</p>
      <div className="h-2 w-48 overflow-hidden rounded-full bg-gray-200">
        <div
          className="h-full rounded-full bg-rose-400 transition-all duration-300"
          style={{ width: `${Math.min(progress, 100)}%` }}
          role="progressbar"
          aria-valuenow={progress}
          aria-valuemin={0}
          aria-valuemax={100}
        />
      </div>
      <p className="mt-2 text-sm text-gray-400">{Math.round(progress)}%</p>
    </div>
  );
}
