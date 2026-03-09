import React from "react";

export const Environment = () => null;
export const OrbitControls = () => null;
export const useProgress = jest.fn(() => ({
  progress: 100,
  loaded: 1,
  total: 1,
}));
export const Html = ({ children }: { children: React.ReactNode }) => (
  <div>{children}</div>
);
export const useGLTF = jest.fn(() => ({
  scene: {},
  nodes: {},
  materials: {},
}));
export const AdaptiveDpr = () => null;
