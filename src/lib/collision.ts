export interface AABB {
  minX: number;
  maxX: number;
  minZ: number;
  maxZ: number;
}

export interface Position2D {
  x: number;
  z: number;
}

export function resolveWallCollisions(
  x: number,
  z: number,
  walls: AABB[],
  radius: number
): Position2D {
  let rx = x;
  let rz = z;

  for (const wall of walls) {
    // 벽을 radius만큼 확장
    const eMinX = wall.minX - radius;
    const eMaxX = wall.maxX + radius;
    const eMinZ = wall.minZ - radius;
    const eMaxZ = wall.maxZ + radius;

    // 확장된 벽 안에 있는지 체크
    if (rx > eMinX && rx < eMaxX && rz > eMinZ && rz < eMaxZ) {
      // 4방향 침투 깊이 계산
      const penetrations = [
        { axis: "x" as const, depth: rx - eMinX, sign: -1 }, // 왼쪽으로 밀기
        { axis: "x" as const, depth: eMaxX - rx, sign: 1 }, // 오른쪽으로 밀기
        { axis: "z" as const, depth: rz - eMinZ, sign: -1 }, // 위로 밀기
        { axis: "z" as const, depth: eMaxZ - rz, sign: 1 }, // 아래로 밀기
      ];

      // 최소 침투 깊이 방향으로 밀어냄
      const min = penetrations.reduce((a, b) =>
        a.depth < b.depth ? a : b
      );

      if (min.axis === "x") {
        rx = min.sign === -1 ? eMinX : eMaxX;
      } else {
        rz = min.sign === -1 ? eMinZ : eMaxZ;
      }
    }
  }

  return { x: rx, z: rz };
}

export function clampToBounds(x: number, z: number, bounds: AABB): Position2D {
  return {
    x: Math.max(bounds.minX, Math.min(bounds.maxX, x)),
    z: Math.max(bounds.minZ, Math.min(bounds.maxZ, z)),
  };
}

export function isInsideAABB(x: number, z: number, box: AABB): boolean {
  return x >= box.minX && x <= box.maxX && z >= box.minZ && z <= box.maxZ;
}

export function applyCollision(
  newX: number,
  newZ: number,
  walls: AABB[],
  worldBounds: AABB,
  radius: number
): Position2D {
  const resolved = resolveWallCollisions(newX, newZ, walls, radius);
  return clampToBounds(resolved.x, resolved.z, worldBounds);
}
