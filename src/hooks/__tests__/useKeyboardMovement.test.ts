import { renderHook, act } from "@testing-library/react";
import { useFrame } from "@react-three/fiber";
import { useKeyboardMovement } from "../useKeyboardMovement";
import { Vector3 } from "three";

// Mock react-three fiber
jest.mock("@react-three/fiber", () => ({
  useFrame: jest.fn(),
}));

describe("useKeyboardMovement camera-relative input", () => {
  let frameCallback: (state: any, delta: number) => void;

  beforeEach(() => {
    jest.clearAllMocks();
    (useFrame as jest.Mock).mockImplementation((cb) => {
      frameCallback = cb;
    });
  });

  function setupHook(cameraAngle: number) {
    const cameraAngleRef = { current: cameraAngle };
    const { result } = renderHook(() =>
      useKeyboardMovement({ cameraAngleRef })
    );
    return result;
  }

  function pressKey(code: string) {
    document.dispatchEvent(new KeyboardEvent("keydown", { code }));
  }

  function releaseKey(code: string) {
    document.dispatchEvent(new KeyboardEvent("keyup", { code }));
  }

  it("at angle 0, W moves in -z (default forward)", () => {
    const result = setupHook(0);
    // Attach a mock group
    const mockGroup = { position: new Vector3(0, 0, 0), rotation: { y: 0 } };
    (result.current.groupRef as any).current = mockGroup;

    act(() => pressKey("KeyW"));
    act(() => frameCallback({}, 1));

    expect(mockGroup.position.z).toBeLessThan(0);
    expect(Math.abs(mockGroup.position.x)).toBeLessThan(0.01);

    act(() => releaseKey("KeyW"));
  });

  it("at angle π (flipped), W moves in +z", () => {
    const result = setupHook(Math.PI);
    const mockGroup = { position: new Vector3(0, 0, 0), rotation: { y: 0 } };
    (result.current.groupRef as any).current = mockGroup;

    act(() => pressKey("KeyW"));
    act(() => frameCallback({}, 1));

    expect(mockGroup.position.z).toBeGreaterThan(0);
    expect(Math.abs(mockGroup.position.x)).toBeLessThan(0.01);

    act(() => releaseKey("KeyW"));
  });

  it("at angle π/2, W moves in -x", () => {
    const result = setupHook(Math.PI / 2);
    const mockGroup = { position: new Vector3(0, 0, 0), rotation: { y: 0 } };
    (result.current.groupRef as any).current = mockGroup;

    act(() => pressKey("KeyW"));
    act(() => frameCallback({}, 1));

    expect(mockGroup.position.x).toBeLessThan(0);
    expect(Math.abs(mockGroup.position.z)).toBeLessThan(0.01);

    act(() => releaseKey("KeyW"));
  });

  it("at angle π, D moves in -x (right from flipped perspective)", () => {
    const result = setupHook(Math.PI);
    const mockGroup = { position: new Vector3(0, 0, 0), rotation: { y: 0 } };
    (result.current.groupRef as any).current = mockGroup;

    act(() => pressKey("KeyD"));
    act(() => frameCallback({}, 1));

    expect(mockGroup.position.x).toBeLessThan(0);
    expect(Math.abs(mockGroup.position.z)).toBeLessThan(0.01);

    act(() => releaseKey("KeyD"));
  });

  it("without cameraAngleRef, defaults to angle 0 behavior", () => {
    const { result } = renderHook(() => useKeyboardMovement());
    const mockGroup = { position: new Vector3(0, 0, 0), rotation: { y: 0 } };
    (result.current.groupRef as any).current = mockGroup;

    act(() => pressKey("KeyW"));
    act(() => frameCallback({}, 1));

    expect(mockGroup.position.z).toBeLessThan(0);

    act(() => releaseKey("KeyW"));
  });

  it("joystick input is also rotated by camera angle", () => {
    const joystickRef = { current: { x: 0, y: 1 } }; // push forward
    const cameraAngleRef = { current: Math.PI };
    const { result } = renderHook(() =>
      useKeyboardMovement({ joystickRef, cameraAngleRef })
    );
    const mockGroup = { position: new Vector3(0, 0, 0), rotation: { y: 0 } };
    (result.current.groupRef as any).current = mockGroup;

    act(() => frameCallback({}, 1));

    // Forward on joystick + flipped camera → +z movement
    expect(mockGroup.position.z).toBeGreaterThan(0);

    joystickRef.current = { x: 0, y: 0 };
  });
});
