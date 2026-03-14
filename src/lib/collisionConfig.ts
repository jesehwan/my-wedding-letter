import { AABB } from "./collision";

export const WORLD_BOUNDS: AABB = { minX: -8, maxX: 8, minZ: -10, maxZ: 8 };
export const CHARACTER_RADIUS = 0.3;

// 집 벽 AABB (hause2.fbx 기준, position=[0,0,-5], scale=0.01)
// npm run dev로 확인 후 미세 조정 필요
export const HOUSE_WALLS: AABB[] = [
  // 뒷벽
  { minX: -2.5, maxX: 2.5, minZ: -7.5, maxZ: -7.0 },
  // 왼벽
  { minX: -2.5, maxX: -2.0, minZ: -7.5, maxZ: -3.0 },
  // 오른벽
  { minX: 2.0, maxX: 2.5, minZ: -7.5, maxZ: -3.0 },
  // 앞벽 좌 (문 왼쪽)
  { minX: -2.5, maxX: -0.8, minZ: -3.5, maxZ: -3.0 },
  // 앞벽 우 (문 오른쪽)
  { minX: 0.8, maxX: 2.5, minZ: -3.5, maxZ: -3.0 },
];
