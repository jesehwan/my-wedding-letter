"use client";

interface TutorialProps {
  onClose: () => void;
}

export function Tutorial({ onClose }: TutorialProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="mx-4 max-w-md rounded-2xl bg-white p-6 shadow-xl">
        <h2 className="mb-4 text-center text-xl font-semibold text-gray-800">
          신혼집 탐험하기
        </h2>

        <img
          src="/image/tutorial-orb.png"
          alt="빛나는 구슬 예시"
          className="mb-4 w-full rounded-lg object-cover"
        />

        <div className="mb-4 text-center text-lg text-gray-600">
          <p>
            빛나는 구슬을 찾아 우리의 이야기를 발견하세요!
            <br />
            총 <span className="font-semibold text-rose-400">6개</span>의
            구슬이 숨겨져 있어요.
          </p>
        </div>

        <button
          onClick={onClose}
          className="w-full rounded-full bg-rose-400 py-2 text-white transition-colors hover:bg-rose-500"
        >
          시작하기
        </button>
      </div>
    </div>
  );
}
