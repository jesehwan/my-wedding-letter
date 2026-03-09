import { clampToBounds, isInsideBounds, distance2D, AABB } from "../collision";

describe("collision", () => {
  const bounds: AABB = { minX: -5, maxX: 5, minZ: -5, maxZ: 5 };

  describe("clampToBounds", () => {
    it("returns same position when inside bounds", () => {
      expect(clampToBounds(2, 3, bounds)).toEqual({ x: 2, z: 3 });
    });

    it("clamps x to min", () => {
      expect(clampToBounds(-10, 0, bounds)).toEqual({ x: -5, z: 0 });
    });

    it("clamps x to max", () => {
      expect(clampToBounds(10, 0, bounds)).toEqual({ x: 5, z: 0 });
    });

    it("clamps z to min", () => {
      expect(clampToBounds(0, -10, bounds)).toEqual({ x: 0, z: -5 });
    });

    it("clamps z to max", () => {
      expect(clampToBounds(0, 10, bounds)).toEqual({ x: 0, z: 5 });
    });

    it("clamps both axes", () => {
      expect(clampToBounds(20, -20, bounds)).toEqual({ x: 5, z: -5 });
    });
  });

  describe("isInsideBounds", () => {
    it("returns true for point inside", () => {
      expect(isInsideBounds(0, 0, bounds)).toBe(true);
    });

    it("returns true for point on edge", () => {
      expect(isInsideBounds(5, 5, bounds)).toBe(true);
    });

    it("returns false for point outside", () => {
      expect(isInsideBounds(6, 0, bounds)).toBe(false);
    });
  });

  describe("distance2D", () => {
    it("returns 0 for same point", () => {
      expect(distance2D(1, 2, 1, 2)).toBe(0);
    });

    it("returns correct distance", () => {
      expect(distance2D(0, 0, 3, 4)).toBe(5);
    });

    it("returns correct distance for negative coords", () => {
      expect(distance2D(-3, 0, 0, 4)).toBe(5);
    });
  });
});
