import {
  resolveWallCollisions,
  clampToBounds,
  applyCollision,
  isInsideAABB,
  AABB,
} from "../collision";

describe("resolveWallCollisions", () => {
  const wall: AABB = { minX: 2, maxX: 4, minZ: 2, maxZ: 4 };
  const radius = 0.3;

  it("벽 밖 위치는 변경 없음", () => {
    const result = resolveWallCollisions(0, 0, [wall], radius);
    expect(result).toEqual({ x: 0, z: 0 });
  });

  it("X축 침투가 최소일 때 X축으로 밀어냄", () => {
    // 벽 왼쪽 경계(2) - radius(0.3) = 1.7 안쪽으로 살짝 들어감
    const result = resolveWallCollisions(1.8, 3, [wall], radius);
    expect(result.x).toBeCloseTo(1.7);
    expect(result.z).toBeCloseTo(3);
  });

  it("Z축 침투가 최소일 때 Z축으로 밀어냄", () => {
    const result = resolveWallCollisions(3, 1.8, [wall], radius);
    expect(result.x).toBeCloseTo(3);
    expect(result.z).toBeCloseTo(1.7);
  });

  it("characterRadius가 충돌 영역을 확장", () => {
    // radius=0이면 (1.9, 3)은 벽 밖 → 변경 없음
    const noRadius = resolveWallCollisions(1.9, 3, [wall], 0);
    expect(noRadius).toEqual({ x: 1.9, z: 3 });

    // radius=0.3이면 (1.9, 3)은 확장된 벽(minX=1.7) 안 → 밀어냄
    const withRadius = resolveWallCollisions(1.9, 3, [wall], 0.3);
    expect(withRadius.x).toBeCloseTo(1.7);
  });

  it("여러 벽 중 충돌하는 벽만 영향", () => {
    const walls: AABB[] = [
      { minX: -5, maxX: -3, minZ: -5, maxZ: -3 }, // 먼 벽
      wall, // 가까운 벽
    ];
    const result = resolveWallCollisions(1.8, 3, walls, radius);
    expect(result.x).toBeCloseTo(1.7);
    expect(result.z).toBeCloseTo(3);
  });

  it("오른쪽에서 벽에 접근 시 오른쪽으로 밀어냄", () => {
    const result = resolveWallCollisions(4.2, 3, [wall], radius);
    expect(result.x).toBeCloseTo(4.3);
    expect(result.z).toBeCloseTo(3);
  });
});

describe("clampToBounds", () => {
  const bounds: AABB = { minX: -8, maxX: 8, minZ: -10, maxZ: 8 };

  it("경계 안 위치는 변경 없음", () => {
    expect(clampToBounds(0, 0, bounds)).toEqual({ x: 0, z: 0 });
  });

  it("X축 경계 초과 시 클램핑", () => {
    expect(clampToBounds(10, 0, bounds)).toEqual({ x: 8, z: 0 });
    expect(clampToBounds(-10, 0, bounds)).toEqual({ x: -8, z: 0 });
  });

  it("Z축 경계 초과 시 클램핑", () => {
    expect(clampToBounds(0, 12, bounds)).toEqual({ x: 0, z: 8 });
    expect(clampToBounds(0, -12, bounds)).toEqual({ x: 0, z: -10 });
  });
});

describe("applyCollision", () => {
  const wall: AABB = { minX: 2, maxX: 4, minZ: 2, maxZ: 4 };
  const bounds: AABB = { minX: -8, maxX: 8, minZ: -10, maxZ: 8 };
  const radius = 0.3;

  it("벽 충돌 해소 + 월드 경계 클램핑 모두 적용", () => {
    const result = applyCollision(1.8, 3, [wall], bounds, radius);
    expect(result.x).toBeCloseTo(1.7);
    expect(result.z).toBeCloseTo(3);
  });

  it("벽 충돌 해소 후 경계 밖이면 클램핑", () => {
    const result = applyCollision(20, 0, [], bounds, radius);
    expect(result.x).toBe(8);
    expect(result.z).toBe(0);
  });
});

describe("isInsideAABB", () => {
  const box: AABB = { minX: -1, maxX: 1, minZ: -1, maxZ: 1 };

  it("영역 내부 좌표 → true", () => {
    expect(isInsideAABB(0, 0, box)).toBe(true);
  });

  it("영역 경계 좌표 → true", () => {
    expect(isInsideAABB(1, 1, box)).toBe(true);
    expect(isInsideAABB(-1, -1, box)).toBe(true);
  });

  it("영역 외부 좌표 → false", () => {
    expect(isInsideAABB(2, 0, box)).toBe(false);
    expect(isInsideAABB(0, -2, box)).toBe(false);
  });
});
