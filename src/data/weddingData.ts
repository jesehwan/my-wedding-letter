import { WeddingInfoData } from "@/types/wedding";
import { DiscoveryPointData } from "@/types/discovery";

export const weddingData: WeddingInfoData = {
  date: "2026년 5월 23일 토요일",
  time: "오후 2시",
  venue: "더채플앳청담",
  address: "서울특별시 강남구 청담동 123-45",
  couple: {
    groomName: "김신랑",
    brideName: "이신부",
    groomFamilyName: "김",
    brideFamilyName: "이",
  },
};

export const discoveryPoints: DiscoveryPointData[] = [
  {
    id: "first-met",
    position: [-3, 0.5, -2],
    title: "우리가 처음 만난 날",
    content: "2020년 봄, 친구의 소개로 처음 만났어요.",
  },
  {
    id: "proposal",
    position: [3, 0.5, -2],
    title: "프로포즈",
    content: "별이 빛나던 밤, 영원을 약속했어요.",
  },
  {
    id: "favorite-spot",
    position: [0, 0.5, -4],
    title: "우리의 아지트",
    content: "매주 토요일마다 함께 찾던 카페.",
  },
  {
    id: "travel",
    position: [-3, 0.5, 2],
    title: "첫 여행",
    content: "제주도에서 보낸 첫 번째 여행.",
  },
  {
    id: "new-home",
    position: [3, 0.5, 2],
    title: "우리의 새 보금자리",
    content: "함께 꾸며갈 우리의 첫 번째 집이에요.",
  },
];
