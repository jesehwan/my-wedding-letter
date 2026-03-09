import { CoupleInfo } from "@/types/wedding";

interface CoupleNamesProps {
  couple: CoupleInfo;
}

export function CoupleNames({ couple }: CoupleNamesProps) {
  return (
    <div className="flex items-center justify-center gap-3 text-2xl font-light tracking-wider sm:gap-4 sm:text-3xl">
      <span>{couple.groomName}</span>
      <span className="text-rose-400">♥</span>
      <span>{couple.brideName}</span>
    </div>
  );
}
