"use client";

import { useFrame, useThree } from "@react-three/fiber";
import { MutableRefObject, useRef } from "react";
import { Box3, Object3D, Ray, Vector3 } from "three";
import { HOUSE_WALLS } from "@/lib/collisionConfig";

const CAMERA_RADIUS = 4;
const CAMERA_HEIGHT = 2.5;
const CAMERA_TOP_DOWN_HEIGHT = 12;
const LERP_FACTOR = 0.13;
const WALL_HEIGHT = 3;

// angle 0 → (0, 2.5, 4), angle π → (0, 2.5, -4)
const ANGLE_DEFAULT = 0;
const ANGLE_FLIPPED = Math.PI;

// Candidate angle offsets to try when the current angle is blocked
const ANGLE_STEPS = [0.5, -0.5, 1.0, -1.0, 1.5, -1.5, Math.PI];

// Pre-compute wall Box3 from AABB data
const wallBoxes = HOUSE_WALLS.map(
  (w) =>
    new Box3(
      new Vector3(Math.min(w.minX, w.maxX), 0, Math.min(w.minZ, w.maxZ)),
      new Vector3(Math.max(w.minX, w.maxX), WALL_HEIGHT, Math.max(w.minZ, w.maxZ)),
    ),
);

// Reusable objects to avoid per-frame allocation
const _camPos = new Vector3();
const _direction = new Vector3();
const _ray = new Ray();

/** Check if a camera angle is blocked by any wall AABB */
export function isAngleBlocked(charPos: Vector3, angle: number): boolean {
  _camPos.set(
    charPos.x + Math.sin(angle) * CAMERA_RADIUS,
    charPos.y + CAMERA_HEIGHT,
    charPos.z + Math.cos(angle) * CAMERA_RADIUS,
  );
  _direction.subVectors(charPos, _camPos).normalize();
  _ray.origin.copy(_camPos);
  _ray.direction.copy(_direction);
  return wallBoxes.some((box) => _ray.intersectsBox(box));
}

const RAYCAST_INTERVAL = 4;

/** Find an unblocked angle, preferring the desired angle */
function findUnblockedAngle(charPos: Vector3, desiredAngle: number): number {
  if (!isAngleBlocked(charPos, desiredAngle)) {
    return desiredAngle;
  }
  for (const step of ANGLE_STEPS) {
    const candidate = desiredAngle + step;
    if (!isAngleBlocked(charPos, candidate)) {
      return candidate;
    }
  }
  return desiredAngle; // fallback: keep current angle
}

const LOOK_UP_EYE_HEIGHT = 1.5;
const LOOK_UP_SKY_HEIGHT = 20;

interface CameraRigProps {
  flipped?: boolean;
  topDown?: boolean;
  lookUpMode?: boolean;
  cameraAngleRef?: MutableRefObject<number>;
}

export function CameraRig({ flipped = false, topDown = false, lookUpMode = false, cameraAngleRef }: CameraRigProps) {
  const { camera } = useThree();
  const targetPos = useRef(new Vector3());
  const lookAtTarget = useRef(new Vector3());
  const currentAngle = useRef(ANGLE_DEFAULT);
  const characterRef = useRef<Object3D | null>(null);
  const frameCount = useRef(0);
  const cachedDesiredAngle = useRef(ANGLE_DEFAULT);

  useFrame((state) => {
    if (!characterRef.current) {
      characterRef.current = state.scene.getObjectByName("character") ?? null;
    }
    const character = characterRef.current;

    if (lookUpMode) {
      // 집 앞 멀리서 집+하늘을 함께 조망하는 위치
      targetPos.current.set(0, 5, 5);
      camera.position.lerp(targetPos.current, LERP_FACTOR);
      lookAtTarget.current.set(0, 6, -6);
      camera.lookAt(lookAtTarget.current);
      return;
    }

    if (character) {
      if (topDown) {
        targetPos.current.set(
          character.position.x,
          character.position.y + CAMERA_TOP_DOWN_HEIGHT,
          character.position.z,
        );
      } else {
        frameCount.current++;
        if (frameCount.current % RAYCAST_INTERVAL === 0) {
          const baseAngle = flipped ? ANGLE_FLIPPED : ANGLE_DEFAULT;
          cachedDesiredAngle.current = findUnblockedAngle(character.position, baseAngle);
        }
        currentAngle.current += (cachedDesiredAngle.current - currentAngle.current) * LERP_FACTOR;

        // Share current angle for camera-relative input
        if (cameraAngleRef) {
          cameraAngleRef.current = currentAngle.current;
        }

        const offsetX = Math.sin(currentAngle.current) * CAMERA_RADIUS;
        const offsetZ = Math.cos(currentAngle.current) * CAMERA_RADIUS;

        targetPos.current.set(
          character.position.x + offsetX,
          character.position.y + CAMERA_HEIGHT,
          character.position.z + offsetZ,
        );
      }
      camera.position.lerp(targetPos.current, LERP_FACTOR);

      if (topDown) {
        camera.rotation.set(-Math.PI / 2, 0, 0);
      } else {
        camera.lookAt(character.position);
      }
    }
  });

  return null;
}
