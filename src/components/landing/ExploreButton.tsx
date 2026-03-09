interface ExploreButtonProps {
  onClick: () => void;
}

export function ExploreButton({ onClick }: ExploreButtonProps) {
  return (
    <button
      onClick={onClick}
      className="rounded-full bg-rose-400 px-8 py-3 text-lg text-white transition-all hover:bg-rose-500 hover:shadow-lg"
    >
      살펴보기
    </button>
  );
}
