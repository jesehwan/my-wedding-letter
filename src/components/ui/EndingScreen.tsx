"use client";

import { weddingData } from "@/data/weddingData";

interface EndingScreenProps {
  onClose: () => void;
}

export function EndingScreen({ onClose }: EndingScreenProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="mx-4 max-h-[90vh] max-w-lg overflow-y-auto rounded-2xl bg-white p-8 shadow-2xl">
        <h2 className="mb-6 text-center text-2xl font-semibold text-gray-800">
          우리의 이야기, 들어주셔서 고마워요
        </h2>

        <div className="mb-6 space-y-4 text-gray-600 leading-relaxed">
          <p>
            저희 두 사람의 이야기를 끝까지 들어주셨군요.
          </p>
          <p>
            스타트업에서 만나 함께 도전하고, 함께 웃고, 때론 함께 울기도 했던
            저희가 이제 평생을 함께하기로 했습니다.
          </p>
          <p>
            &ldquo;받아들일 수 없다면, 들이받으세요&rdquo;
            라는 다짐처럼, 앞으로도 서로의 손을 잡고 신나게 살아보려 합니다.
          </p>
          <p>
            저희의 새로운 시작을 축하해주시면 정말 기쁘겠습니다.
          </p>
        </div>

        <div className="mb-6 rounded-xl bg-rose-50 p-5 text-center">
          <p className="mb-1 text-sm text-rose-400">Wedding Day</p>
          <p className="text-lg font-semibold text-gray-800">
            {weddingData.date} {weddingData.time}
          </p>
          <p className="mt-1 text-sm text-gray-500">
            {weddingData.venue}
          </p>
          <p className="text-xs text-gray-400">
            {weddingData.address}
          </p>
        </div>

        <button
          onClick={onClose}
          className="w-full rounded-full bg-rose-400 py-3 text-white transition-colors hover:bg-rose-500"
        >
          축하해주세요 💌
        </button>
      </div>
    </div>
  );
}
