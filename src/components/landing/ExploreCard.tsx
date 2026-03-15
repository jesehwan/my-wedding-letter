interface ExploreCardProps {
  onClick: () => void;
}

export function ExploreCard({ onClick }: ExploreCardProps) {
  return (
    <div
      className="relative w-full max-w-[320px] aspect-video overflow-hidden rounded-2xl shadow-lg"
      style={{
        backgroundImage: "url('/image/card_bg.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <span className="absolute top-3 left-3 rounded-full bg-black/50 px-3 py-1 text-xs text-white">
        체험형 게임
      </span>
      <button
        onClick={onClick}
        className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-rose-400 px-6 py-2 text-white transition-all hover:bg-rose-500 hover:shadow-lg"
      >
        신혼집 구경하기
      </button>
    </div>
  );
}
