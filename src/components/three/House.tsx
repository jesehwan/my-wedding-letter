"use client";

import { useEffect } from "react";
import { useFBX } from "@react-three/drei";
import { Box3, Vector3 } from "three";

export function House() {
  const model = useFBX("/models/hause2.fbx");

  useEffect(() => {
    // 원점 보정: 모델 중심을 원점으로 이동
    const box = new Box3().setFromObject(model);
    const center = new Vector3();
    box.getCenter(center);
    model.position.sub(center);
    // 바닥을 y=0에 맞춤
    const newBox = new Box3().setFromObject(model);
    model.position.y -= newBox.min.y;

    model.traverse((child: any) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
  }, [model]);

  return (
    <group position={[0, 0, -5]}>
      <primitive object={model} scale={[0.01, 0.01, 0.01]} />
    </group>
  );
}
