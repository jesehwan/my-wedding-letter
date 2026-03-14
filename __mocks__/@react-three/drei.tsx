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
  scene: { clone: () => ({ traverse: () => {} }) },
  nodes: {},
  materials: {},
  animations: [
    { name: "idle", duration: 1 },
    { name: "walk", duration: 1 },
  ],
})) as jest.Mock & { preload: jest.Mock };
useGLTF.preload = jest.fn();

export const useFBX = jest.fn((path: string) => {
  const animName = path.includes("Walking") ? "mixamo_walk" : "mixamo_idle";
  return {
    animations: [{ name: animName, duration: 1, clone: () => ({ name: animName, duration: 1, tracks: [] }) }],
    traverse: jest.fn(),
    clone: jest.fn(() => ({
      traverse: jest.fn(),
      animations: [{ name: animName, duration: 1 }],
    })),
    children: [],
    position: { set: jest.fn() },
    scale: { set: jest.fn(), setScalar: jest.fn() },
    rotation: { set: jest.fn() },
  };
});

export const useAnimations = jest.fn(() => ({
  actions: {
    idle: {
      reset: () => ({ fadeIn: () => ({ play: () => {} }) }),
      fadeOut: () => ({ stop: () => {} }),
      play: () => {},
      stop: () => {},
    },
    walk: {
      reset: () => ({ fadeIn: () => ({ play: () => {} }) }),
      fadeOut: () => ({ stop: () => {} }),
      play: () => {},
      stop: () => {},
    },
  },
  ref: { current: null },
}));
export const AdaptiveDpr = () => null;
export const Stars = () => null;
