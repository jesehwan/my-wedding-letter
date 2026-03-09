"use client";

import { forwardRef } from "react";
import { Group } from "three";

export const Character = forwardRef<Group>(function Character(_, ref) {
  return (
    <group ref={ref}>
      {/* Body - capsule placeholder */}
      <mesh position={[0, 0.75, 0]} castShadow>
        <capsuleGeometry args={[0.25, 0.5, 8, 16]} />
        <meshStandardMaterial color="#f8a5c2" />
      </mesh>

      {/* Head */}
      <mesh position={[0, 1.4, 0]} castShadow>
        <sphereGeometry args={[0.25, 16, 16]} />
        <meshStandardMaterial color="#ffe0bd" />
      </mesh>

      {/* Eyes */}
      <mesh position={[-0.08, 1.45, 0.2]}>
        <sphereGeometry args={[0.04, 8, 8]} />
        <meshStandardMaterial color="#333" />
      </mesh>
      <mesh position={[0.08, 1.45, 0.2]}>
        <sphereGeometry args={[0.04, 8, 8]} />
        <meshStandardMaterial color="#333" />
      </mesh>
    </group>
  );
});
