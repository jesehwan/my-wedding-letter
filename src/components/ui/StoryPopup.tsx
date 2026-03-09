"use client";

import { DiscoveryPointData } from "@/types/discovery";

interface StoryPopupProps {
  point: DiscoveryPointData;
  onClose: () => void;
}

export function StoryPopup({ point, onClose }: StoryPopupProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="mx-4 max-w-md rounded-2xl bg-white p-6 shadow-xl">
        <h2 className="mb-3 text-xl font-semibold text-gray-800">
          {point.title}
        </h2>

        {point.imageUrl && (
          <img
            src={point.imageUrl}
            alt={point.title}
            className="mb-3 w-full rounded-lg object-cover"
          />
        )}

        <p className="mb-4 leading-relaxed text-gray-600">{point.content}</p>

        <button
          onClick={onClose}
          className="w-full rounded-full bg-rose-400 py-2 text-white transition-colors hover:bg-rose-500"
        >
          닫기
        </button>
      </div>
    </div>
  );
}
