import { weddingData } from "@/data/weddingData";
import { CoupleNames } from "./CoupleNames";
import { WeddingInfo } from "./WeddingInfo";
import { ExploreButton } from "./ExploreButton";

interface LandingSectionProps {
  onExplore: () => void;
}

export function LandingSection({ onExplore }: LandingSectionProps) {
  return (
    <section className="flex min-h-dvh flex-col items-center justify-center gap-6 bg-white px-4 py-12 sm:gap-8">
      <h1 className="text-sm uppercase tracking-widest text-gray-400">
        우리 결혼합니다
      </h1>
      <CoupleNames couple={weddingData.couple} />
      <WeddingInfo
        date={weddingData.date}
        time={weddingData.time}
        venue={weddingData.venue}
        address={weddingData.address}
      />
      <ExploreButton onClick={onExplore} />
    </section>
  );
}
