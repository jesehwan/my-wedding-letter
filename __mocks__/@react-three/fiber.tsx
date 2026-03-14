import React from "react";

export const Canvas = ({ children }: { children: React.ReactNode }) => (
  <div data-testid="r3f-canvas">{children}</div>
);

export const useFrame = jest.fn();
export const useThree = jest.fn(() => ({
  camera: { position: { x: 0, y: 0, z: 0 } },
  gl: {},
  scene: {},
  size: { width: 800, height: 600 },
}));

export const extend = jest.fn();
export const useLoader = jest.fn();
