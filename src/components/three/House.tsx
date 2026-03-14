"use client";

import { useEffect } from "react";
import { useLoader } from "@react-three/fiber";
import { FBXLoader } from "three-stdlib";
import {
  Box3,
  Vector3,
  SRGBColorSpace,
  MeshStandardMaterial,
  TextureLoader,
  DoubleSide,
} from "three";

const HOUSE_OFFSET = new Vector3(0, -0.14, -6);

export function House() {
  const model = useLoader(FBXLoader, "/models/house_final.fbx", (loader) => {
    loader.setResourcePath("/models/tex/");
  });
  const posterTexture = useLoader(TextureLoader, "/models/tex/poster.png");
  const usTexture = useLoader(TextureLoader, "/models/tex/us.JPG");

  useEffect(() => {
    // 부모 group 없이 로컬 좌표만으로 센터링 (월드 좌표 간섭 방지)
    model.position.set(0, 0, 0);
    model.scale.set(0.01, 0.01, 0.01);
    model.updateMatrixWorld(true);

    const box = new Box3().setFromObject(model);
    const center = new Vector3();
    box.getCenter(center);
    model.position.sub(center);

    model.updateMatrixWorld(true);
    const newBox = new Box3().setFromObject(model);
    model.position.y -= newBox.min.y;

    // 원하는 오프셋 적용
    model.position.add(HOUSE_OFFSET);

    model.traverse((child: any) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;

        if (child.name === "Plane" || child.name === "plane") {
          posterTexture.colorSpace = SRGBColorSpace;
          child.material = new MeshStandardMaterial({
            map: posterTexture,
            side: DoubleSide,
            roughness: 1,
            metalness: 0,
          });
          return;
        }

        if (child.name === "Picture9_Colors_0") {
          return;
        }

        const mats = Array.isArray(child.material)
          ? child.material
          : [child.material];
        const converted = mats.map((mat: any) => {
          if (mat.map) {
            mat.map.colorSpace = SRGBColorSpace;
          }
          return new MeshStandardMaterial({
            color: mat.color,
            map: mat.map ?? null,
            transparent: mat.transparent,
            opacity: mat.opacity,
            roughness: 1,
            metalness: 0,
          });
        });
        child.material = converted.length === 1 ? converted[0] : converted;
      }
    });
  }, [model, posterTexture, usTexture]);

  return (
    <>
      <primitive object={model} />
      <mesh
        position={[-4.64, 1.327, -3.947]}
        rotation={[0, Math.PI / 2, 0]}
      >
        <planeGeometry args={[0.40, 0.30]} />
        <meshStandardMaterial
          map={usTexture}
          side={DoubleSide}
          roughness={1}
          metalness={0}
        />
      </mesh>
    </>
  );
}
