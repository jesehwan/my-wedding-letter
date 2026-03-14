"use client";

import { HOUSE_WALLS } from "@/lib/collisionConfig";

const WALL_HEIGHT = 3;
const WALL_COLOR = "#ff0000";
const WALL_OPACITY = 0.3;

export function DebugWalls() {
  return (
    <group name="debug-walls">
      {HOUSE_WALLS.map((wall, i) => {
        const minX = Math.min(wall.minX, wall.maxX);
        const maxX = Math.max(wall.minX, wall.maxX);
        const minZ = Math.min(wall.minZ, wall.maxZ);
        const maxZ = Math.max(wall.minZ, wall.maxZ);

        const width = maxX - minX;
        const depth = maxZ - minZ;
        const centerX = (minX + maxX) / 2;
        const centerZ = (minZ + maxZ) / 2;

        return (
          <mesh
            key={i}
            position={[centerX, WALL_HEIGHT / 2, centerZ]}
          >
            <boxGeometry args={[width, WALL_HEIGHT, depth]} />
            <meshBasicMaterial
              color={WALL_COLOR}
              transparent
              opacity={WALL_OPACITY}
              wireframe={false}
            />
          </mesh>
        );
      })}
    </group>
  );
}
