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
    title: "우리가 만난 곳",
    content:
      "세환이 창업한 스타트업에 지은이 합류하면서 만났어요. 처음엔 그저 같은 팀 동료였지만, 밤늦게까지 함께 일하고 고민을 나누다 보니 어느새 서로에게 특별한 사람이 되어 있었죠.",
  },
  {
    id: "motto",
    position: [-1, 0.5, -3],
    title: "받아들일 수 없다면, 들이받으세요",
    content:
      "도전을 두려워하지 않는 두 사람. 힘든 일이 생기면 서로 \"들이받자!\"라고 외치며 용기를 북돋아줬어요. 포기하고 싶을 때마다 옆에서 손 잡아주는 사람이 있다는 건 정말 큰 힘이에요.",
  },
  {
    id: "play-together",
    position: [2, 0.5, -1],
    title: "같이 놀자!",
    content:
      "원래 밖에서 노는 걸 좋아하던 지은이, 세환과 함께하면서 거실에서 게임하고 영화 보는 재미에 빠졌어요. 소파에 나란히 앉아 컨트롤러를 잡고 있으면, 밖에 나가지 않아도 세상에서 제일 즐거워요.",
  },
  {
    id: "kitchen",
    position: [3, 0.5, 2],
    title: "세환의 주방",
    content:
      "요리를 좋아하는 세환이 주방을 책임지고 있어요. 맛에 꽤 엄격해서 간이 안 맞으면 처음부터 다시 만들기도 해요. 지은은요? 주방 출입 금지! 대신 맛있게 먹는 역할을 완벽하게 해내고 있답니다.",
  },
  {
    id: "study",
    position: [-3, 0.5, 2],
    title: "지은의 비밀 공간",
    content:
      "기록하고 정리하는 걸 좋아하는 지은만의 서재예요. 다이어리, 스크랩북, 정리된 책장... 이 작은 공간에서 지은은 하루를 돌아보고, 내일을 계획해요. 세환은 가끔 몰래 들어와서 쪽지를 남기곤 해요.",
  },
  {
    id: "light-switch",
    position: [0, 0.5, 3],
    title: "불 좀 꺼줘!",
    content:
      "모든 불을 켜놓고 다니는 세환. \"거실 불! 화장실 불! 베란다 불!\" 지은의 잔소리가 오늘도 울려퍼져요. 요즘은 방을 나갈 때 습관처럼 불을 끄는 세환... 사랑의 힘은 위대합니다.",
  },
  {
    id: "dream",
    position: [0, 0.5, -5],
    title: "우리의 꿈",
    content:
      "\"평범하게 살지 말고, 한번 사는 인생 한탕 크게 하자!\" 베란다에 나란히 서서 바깥을 바라보며 나눈 약속이에요. 무엇이든 함께라면 해낼 수 있다고 믿어요. 이제 그 여정을 정식으로 시작합니다.",
  },
];
