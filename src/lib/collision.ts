export interface AABB {
  minX: number;
  maxX: number;
  minZ: number;
  maxZ: number;
}

export function clampToBounds(
  x: number,
  z: number,
  bounds: AABB
): { x: number; z: number } {
  return {
    x: Math.max(bounds.minX, Math.min(bounds.maxX, x)),
    z: Math.max(bounds.minZ, Math.min(bounds.maxZ, z)),
  };
}

export function isInsideBounds(x: number, z: number, bounds: AABB): boolean {
  return (
    x >= bounds.minX && x <= bounds.maxX && z >= bounds.minZ && z <= bounds.maxZ
  );
}

export function distance2D(
  x1: number,
  z1: number,
  x2: number,
  z2: number
): number {
  const dx = x1 - x2;
  const dz = z1 - z2;
  return Math.sqrt(dx * dx + dz * dz);
}
