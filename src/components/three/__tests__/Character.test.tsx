import { render } from "@testing-library/react";
import { Character } from "../Character";
import { useFBX, useAnimations } from "@react-three/drei";

jest.mock("@react-three/fiber", () => ({
  useFrame: jest.fn(),
}));

jest.mock("three", () => require("../../../../__mocks__/three"));

const mockFadeIn = jest.fn(() => ({ play: jest.fn() }));
const mockReset = jest.fn(() => ({ fadeIn: mockFadeIn }));
const mockFadeOut = jest.fn();

const mockActions = {
  idle: { reset: mockReset, fadeIn: mockFadeIn, fadeOut: mockFadeOut, play: jest.fn(), stop: jest.fn() },
  walk: { reset: mockReset, fadeIn: mockFadeIn, fadeOut: mockFadeOut, play: jest.fn(), stop: jest.fn() },
};

beforeEach(() => {
  jest.clearAllMocks();
  (useAnimations as jest.Mock).mockReturnValue({
    actions: mockActions,
    ref: { current: null },
  });
});

describe("Character", () => {
  it("renders without crashing", () => {
    expect(() => render(<Character />)).not.toThrow();
  });

  it("loads Idle.fbx and Walking.fbx via useFBX", () => {
    render(<Character />);
    expect(useFBX).toHaveBeenCalledWith("/models/Idle.fbx");
    expect(useFBX).toHaveBeenCalledWith("/models/Walking.fbx");
  });

  it("plays idle animation by default", () => {
    render(<Character />);
    expect(mockReset).toHaveBeenCalled();
    expect(mockFadeIn).toHaveBeenCalledWith(0.3);
  });

  it("crossfades to walk animation when animationState changes", () => {
    const { rerender } = render(<Character animationState="idle" />);
    jest.clearAllMocks();

    rerender(<Character animationState="walk" />);
    expect(mockFadeOut).toHaveBeenCalledWith(0.3);
    expect(mockReset).toHaveBeenCalled();
    expect(mockFadeIn).toHaveBeenCalledWith(0.3);
  });

  it("passes both clips to useAnimations", () => {
    render(<Character />);
    const clips = (useAnimations as jest.Mock).mock.calls[0][0];
    expect(clips).toHaveLength(2);
    expect(clips[0].name).toBe("idle");
    expect(clips[1].name).toBe("walk");
  });
});
