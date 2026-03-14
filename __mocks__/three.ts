export class Vector3 {
  x: number;
  y: number;
  z: number;

  constructor(x = 0, y = 0, z = 0) {
    this.x = x;
    this.y = y;
    this.z = z;
  }

  set(x: number, y: number, z: number) {
    this.x = x;
    this.y = y;
    this.z = z;
    return this;
  }

  copy(v: Vector3) {
    this.x = v.x;
    this.y = v.y;
    this.z = v.z;
    return this;
  }

  add(v: Vector3) {
    this.x += v.x;
    this.y += v.y;
    this.z += v.z;
    return this;
  }

  sub(v: Vector3) {
    this.x -= v.x;
    this.y -= v.y;
    this.z -= v.z;
    return this;
  }

  multiplyScalar(s: number) {
    this.x *= s;
    this.y *= s;
    this.z *= s;
    return this;
  }

  length() {
    return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
  }

  normalize() {
    const len = this.length();
    if (len > 0) {
      this.x /= len;
      this.y /= len;
      this.z /= len;
    }
    return this;
  }

  distanceTo(v: Vector3) {
    const dx = this.x - v.x;
    const dy = this.y - v.y;
    const dz = this.z - v.z;
    return Math.sqrt(dx * dx + dy * dy + dz * dz);
  }

  clone() {
    return new Vector3(this.x, this.y, this.z);
  }

  subVectors(a: Vector3, b: Vector3) {
    this.x = a.x - b.x;
    this.y = a.y - b.y;
    this.z = a.z - b.z;
    return this;
  }

  lerpVectors(a: Vector3, b: Vector3, alpha: number) {
    this.x = a.x + (b.x - a.x) * alpha;
    this.y = a.y + (b.y - a.y) * alpha;
    this.z = a.z + (b.z - a.z) * alpha;
    return this;
  }

  lerp(v: Vector3, alpha: number) {
    this.x += (v.x - this.x) * alpha;
    this.y += (v.y - this.y) * alpha;
    this.z += (v.z - this.z) * alpha;
    return this;
  }
}

export class Box3 {
  min: Vector3;
  max: Vector3;

  constructor(min = new Vector3(), max = new Vector3()) {
    this.min = min;
    this.max = max;
  }

  setFromObject(_obj: any) {
    return this;
  }

  getCenter(target: Vector3) {
    target.x = (this.min.x + this.max.x) / 2;
    target.y = (this.min.y + this.max.y) / 2;
    target.z = (this.min.z + this.max.z) / 2;
    return target;
  }

  containsPoint(point: Vector3) {
    return (
      point.x >= this.min.x &&
      point.x <= this.max.x &&
      point.y >= this.min.y &&
      point.y <= this.max.y &&
      point.z >= this.min.z &&
      point.z <= this.max.z
    );
  }
}

export class Ray {
  origin: Vector3;
  direction: Vector3;

  constructor(origin = new Vector3(), direction = new Vector3()) {
    this.origin = origin;
    this.direction = direction;
  }

  intersectsBox(box: Box3): boolean {
    // Slab method for ray-AABB intersection
    const invDirX = this.direction.x !== 0 ? 1 / this.direction.x : Infinity;
    const invDirY = this.direction.y !== 0 ? 1 / this.direction.y : Infinity;
    const invDirZ = this.direction.z !== 0 ? 1 / this.direction.z : Infinity;

    let tmin = ((invDirX >= 0 ? box.min.x : box.max.x) - this.origin.x) * invDirX;
    let tmax = ((invDirX >= 0 ? box.max.x : box.min.x) - this.origin.x) * invDirX;
    const tymin = ((invDirY >= 0 ? box.min.y : box.max.y) - this.origin.y) * invDirY;
    const tymax = ((invDirY >= 0 ? box.max.y : box.min.y) - this.origin.y) * invDirY;

    if (tmin > tymax || tymin > tmax) return false;
    if (tymin > tmin) tmin = tymin;
    if (tymax < tmax) tmax = tymax;

    const tzmin = ((invDirZ >= 0 ? box.min.z : box.max.z) - this.origin.z) * invDirZ;
    const tzmax = ((invDirZ >= 0 ? box.max.z : box.min.z) - this.origin.z) * invDirZ;

    if (tmin > tzmax || tzmin > tmax) return false;
    if (tzmin > tmin) tmin = tzmin;
    if (tzmax < tmax) tmax = tzmax;

    return tmax >= 0;
  }
}

export class Euler {
  x: number;
  y: number;
  z: number;
  constructor(x = 0, y = 0, z = 0) {
    this.x = x;
    this.y = y;
    this.z = z;
  }
}

export class Quaternion {
  x = 0;
  y = 0;
  z = 0;
  w = 1;
}

export class Color {
  r = 1;
  g = 1;
  b = 1;
  constructor(_color?: string | number) {}
}

export class MathUtils {
  static lerp(a: number, b: number, t: number) {
    return a + (b - a) * t;
  }
}

export class Object3D {
  position = new Vector3();
  rotation = new Euler();
  quaternion = new Quaternion();
}

export class Group extends Object3D {}
export class Mesh extends Object3D {}
export class SkinnedMesh extends Mesh {}
export class Bone extends Object3D {}
export class Skeleton {
  bones: Bone[] = [];
}
export class Scene extends Object3D {
  children: Object3D[] = [];
  traverse(callback: (obj: Object3D) => void) {
    callback(this);
    this.children.forEach((child) => child instanceof Scene ? child.traverse(callback) : callback(child));
  }
  clone() {
    return new Scene();
  }
}
export class Camera extends Object3D {}

export class AmbientLight extends Object3D {}
export class DirectionalLight extends Object3D {}

export class BoxGeometry {}
export class SphereGeometry {}
export class CapsuleGeometry {}
export class PlaneGeometry {}
export class MeshStandardMaterial {}
export class MeshBasicMaterial {}

export class AnimationClip {
  name: string;
  duration: number;
  constructor(name = "", duration = 0) {
    this.name = name;
    this.duration = duration;
  }
}

export class AnimationMixer {
  _root: Object3D;
  constructor(root: Object3D) {
    this._root = root;
  }
  clipAction(_clip: AnimationClip) {
    return {
      reset: () => ({ fadeIn: () => ({ play: () => {} }) }),
      fadeIn: () => ({ play: () => {} }),
      fadeOut: () => ({ stop: () => {} }),
      play: () => {},
      stop: () => {},
      crossFadeTo: () => {},
    };
  }
  update(_delta: number) {}
}

export class Points extends Object3D {
  geometry = { attributes: { position: { needsUpdate: false }, color: { needsUpdate: false }, opacity: { needsUpdate: false } } };
}
export class BufferGeometry {
  setAttribute() { return this; }
  attributes: Record<string, any> = {};
}
export class BufferAttribute {
  constructor(_array?: any, _itemSize?: number) {}
  needsUpdate = false;
}
export class PointsMaterial {}

export const AdditiveBlending = 2;
export const DoubleSide = 2;
export const FrontSide = 0;
export const SRGBColorSpace = "srgb";
export const NoToneMapping = 0;

export class KeyframeTrack {
  name: string;
  values: number[];
  constructor(name = "", times: number[] = [], values: number[] = []) {
    this.name = name;
    this.values = values;
  }
}
