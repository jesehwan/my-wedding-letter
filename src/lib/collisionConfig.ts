import { AABB } from "./collision";

export const WORLD_BOUNDS: AABB = { minX: -8, maxX: 8, minZ: -14, maxZ: 8 };
export const CHARACTER_RADIUS = 0.3;

// 집 벽 AABB (house_final.fbx 기준, position=[0,0,-5], scale=0.01)
// npm run dev + 탑뷰로 확인 후 미세 조정 필요
export const HOUSE_WALLS: AABB[] = [
  // === 좌상단 방 (주방) ===
  // 북벽
  { minX: -5.5, maxX: -1.4, minZ: -11, maxZ: -9.5 },
  // 서벽
  { minX: -5.5, maxX: -3.8, minZ: -10.5, maxZ: -7 },

  // 북벽
  { minX: -3.5, maxX: 2, minZ: -15, maxZ: -12.5 },

  // === 우상단 방 ===
  // 북벽
  { minX: 1.5, maxX: 5, minZ: -11, maxZ: -10.5 },
  // 동벽
  { minX: 5, maxX: 5.5, minZ: -11, maxZ: -7 },


  // === 좌하단 방 (거실) ===
  // 서벽
  { minX: -5.5, maxX: -5, minZ: -4.5, maxZ: -0.5 },
  // 남벽
  { minX: -5.5, maxX: -1.5, minZ: -1.0, maxZ: -0.5 },


  // === 우하단 방 (서재) ===
  // 동벽
  { minX: 5.5, maxX: 5, minZ: -4.5, maxZ: -0.5 },
  // 남벽
  { minX: 1.2, maxX: 5, minZ: -1.0, maxZ: -0.5 },
];
