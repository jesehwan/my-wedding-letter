import { AABB } from "./collision";

export const ENTRANCE_WORLD_BOUNDS: AABB = {
  minX: -12,
  maxX: 12,
  minZ: -12,
  maxZ: 12,
};

// 집 외벽 4면 (앞면 중앙에 문 틈)
export const ENTRANCE_WALLS: AABB[] = [
  // 뒷벽
  { minX: -3, maxX: 3, minZ: -4, maxZ: -3.5 },
  // 왼벽
  { minX: -3, maxX: -2.5, minZ: -4, maxZ: 0 },
  // 오른벽
  { minX: 2.5, maxX: 3, minZ: -4, maxZ: 0 },
  // 앞벽 좌 (문 왼쪽)
  { minX: -3, maxX: -0.6, minZ: -0.5, maxZ: 0 },
  // 앞벽 우 (문 오른쪽)
  { minX: 0.6, maxX: 3, minZ: -0.5, maxZ: 0 },
];

// 문 앞 트리거 영역
export const DOOR_TRIGGER_ZONE: AABB = {
  minX: -0.6,
  maxX: 0.6,
  minZ: -0.8,
  maxZ: 0.2,
};
