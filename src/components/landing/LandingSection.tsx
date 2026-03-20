import { weddingData } from "@/data/weddingData";
import { CoupleNames } from "./CoupleNames";
import { PhotoSlider } from "./PhotoSlider";
import { WeddingInfo } from "./WeddingInfo";
import { ExploreCard } from "./ExploreCard";
import { FamilyInfo } from "./FamilyInfo";
import { DirectionsInfo } from "./DirectionsInfo";
import { AccountInfo } from "./AccountInfo";
import { BusInfo } from "./BusInfo";
import { NaverMap } from "./NaverMap";

interface LandingSectionProps {
  onExplore: () => void;
  side?: string | null;
}

export function LandingSection({ onExplore, side }: LandingSectionProps) {
  return (
    <section className="flex min-h-dvh flex-col items-center justify-center gap-6 bg-white px-4 py-12 sm:gap-8">
      <h1 className="text-sm uppercase tracking-widest text-gray-400">
        우리 결혼합니다
      </h1>
      <CoupleNames couple={weddingData.couple} />
      <PhotoSlider />
      <div className="flex items-center gap-3 text-gray-300">
        <span className="h-px w-12 bg-gray-300" />
        <span className="text-xs tracking-widest">&#10045;</span>
        <span className="h-px w-12 bg-gray-300" />
      </div>
      <p className="max-w-xs text-center text-sm leading-relaxed text-gray-500">
        같은 곳을 바라보다 눈이 마주친 두 사람,
        <br />
        웃음이 끊이지 않는 한 팀이 되었습니다.
        <br />
        <br />
        이 기쁜 소식을 함께 나누고 싶어
        <br />
        소중한 분들을 초대합니다.
      </p>
      <div className="mt-4 flex w-full flex-col items-center gap-2">
        <p className="text-xs text-gray-400">
          저희의 이야기를 소소하게 담아보았어요
        </p>
        <ExploreCard onClick={onExplore} />
      </div>
      <div className="flex items-center gap-3 text-gray-300">
        <span className="h-px w-12 bg-gray-300" />
        <span className="text-xs tracking-widest">&#10045;</span>
        <span className="h-px w-12 bg-gray-300" />
      </div>
      <FamilyInfo couple={weddingData.couple} />
      <div className="flex items-center gap-3 text-gray-300">
        <span className="h-px w-12 bg-gray-300" />
        <span className="text-xs tracking-widest">&#10045;</span>
        <span className="h-px w-12 bg-gray-300" />
      </div>
      <WeddingInfo
        date={weddingData.date}
        time={weddingData.time}
        venue={weddingData.venue}
        address={weddingData.address}
      />
      {side === "groom" && <BusInfo />}
      <NaverMap />
      <DirectionsInfo />
      <div className="flex items-center gap-3 text-gray-300">
        <span className="h-px w-12 bg-gray-300" />
        <span className="text-xs tracking-widest">&#10045;</span>
        <span className="h-px w-12 bg-gray-300" />
      </div>
      <AccountInfo />
    </section>
  );
}
