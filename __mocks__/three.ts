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
export class Scene extends Object3D {}
export class Camera extends Object3D {}

export class AmbientLight extends Object3D {}
export class DirectionalLight extends Object3D {}

export class BoxGeometry {}
export class SphereGeometry {}
export class CapsuleGeometry {}
export class PlaneGeometry {}
export class MeshStandardMaterial {}
export class MeshBasicMaterial {}

export const DoubleSide = 2;
export const FrontSide = 0;
