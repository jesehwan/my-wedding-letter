"use client";

export function House() {
  const wallColor = "#f5f0e8";
  const wallHeight = 2.5;
  const wallThickness = 0.2;

  return (
    <group>
      {/* Floor */}
      <mesh position={[0, 0.01, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[10, 10]} />
        <meshStandardMaterial color="#deb887" />
      </mesh>

      {/* Back wall */}
      <mesh position={[0, wallHeight / 2, -5]} castShadow>
        <boxGeometry args={[10, wallHeight, wallThickness]} />
        <meshStandardMaterial color={wallColor} />
      </mesh>

      {/* Left wall */}
      <mesh position={[-5, wallHeight / 2, 0]} castShadow>
        <boxGeometry args={[wallThickness, wallHeight, 10]} />
        <meshStandardMaterial color={wallColor} />
      </mesh>

      {/* Right wall */}
      <mesh position={[5, wallHeight / 2, 0]} castShadow>
        <boxGeometry args={[wallThickness, wallHeight, 10]} />
        <meshStandardMaterial color={wallColor} />
      </mesh>

      {/* Front wall left */}
      <mesh position={[-3, wallHeight / 2, 5]} castShadow>
        <boxGeometry args={[4, wallHeight, wallThickness]} />
        <meshStandardMaterial color={wallColor} />
      </mesh>

      {/* Front wall right */}
      <mesh position={[3, wallHeight / 2, 5]} castShadow>
        <boxGeometry args={[4, wallHeight, wallThickness]} />
        <meshStandardMaterial color={wallColor} />
      </mesh>

      {/* Simple furniture placeholders */}
      {/* Sofa */}
      <mesh position={[-3, 0.4, -3]} castShadow>
        <boxGeometry args={[2, 0.8, 0.8]} />
        <meshStandardMaterial color="#8b7355" />
      </mesh>

      {/* Table */}
      <mesh position={[0, 0.35, 0]} castShadow>
        <boxGeometry args={[1.2, 0.7, 0.8]} />
        <meshStandardMaterial color="#a0522d" />
      </mesh>

      {/* Bed */}
      <mesh position={[3, 0.3, -3]} castShadow>
        <boxGeometry args={[2, 0.6, 1.5]} />
        <meshStandardMaterial color="#f0e6d3" />
      </mesh>
    </group>
  );
}
