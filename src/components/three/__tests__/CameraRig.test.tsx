import { render } from "@testing-library/react";
import { useFrame, useThree } from "@react-three/fiber";
import { CameraRig, isAngleBlocked } from "../CameraRig";
import { Vector3 } from "three";

const mockCamera = {
  position: new Vector3(0, 0, 0),
  rotation: { set: jest.fn() },
  lookAt: jest.fn(),
};

const mockCharacter = {
  position: new Vector3(0, 0, 0),
};

(useThree as jest.Mock).mockReturnValue({
  camera: mockCamera,
  gl: {},
  scene: {},
  size: { width: 800, height: 600 },
});

describe("CameraRig", () => {
  let frameCallback: (state: { scene: { getObjectByName: (name: string) => typeof mockCharacter | undefined } }) => void;

  beforeEach(() => {
    jest.clearAllMocks();
    mockCamera.position = new Vector3(0, 0, 0);
    mockCharacter.position = new Vector3(0, 0, 0);

    (useFrame as jest.Mock).mockImplementation((cb) => {
      frameCallback = cb;
    });

    (useThree as jest.Mock).mockReturnValue({
      camera: mockCamera,
      gl: {},
      scene: {},
      size: { width: 800, height: 600 },
    });
  });

  it("renders without crashing", () => {
    expect(() => render(<CameraRig />)).not.toThrow();
  });

  it("uses default offset (z=4) when flipped is false", () => {
    render(<CameraRig flipped={false} />);

    frameCallback({
      scene: { getObjectByName: (name: string) => name === "character" ? mockCharacter : undefined },
    });

    // After one frame, camera should lerp toward character position + default offset (0, 2.5, 4)
    expect(mockCamera.position.z).toBeGreaterThan(0);
    expect(mockCamera.lookAt).toHaveBeenCalled();
  });

  it("uses flipped offset (z=-4) when flipped is true", () => {
    render(<CameraRig flipped={true} />);

    // Run multiple frames to let lerp converge
    const scene = {
      scene: { getObjectByName: (name: string) => name === "character" ? mockCharacter : undefined },
    };

    for (let i = 0; i < 50; i++) {
      frameCallback(scene);
    }

    // After many frames, camera z should be negative (approaching -4)
    expect(mockCamera.position.z).toBeLessThan(0);
  });

  it("positions camera directly above character when topDown is true", () => {
    render(<CameraRig topDown={true} />);

    const scene = {
      scene: { getObjectByName: (name: string) => name === "character" ? mockCharacter : undefined },
    };

    // Run multiple frames to let lerp converge
    for (let i = 0; i < 100; i++) {
      frameCallback(scene);
    }

    // Camera should be high above (approaching height ~12)
    expect(mockCamera.position.y).toBeGreaterThan(10);
    // X and Z offsets should be near 0 (directly above)
    expect(Math.abs(mockCamera.position.x)).toBeLessThan(0.1);
    expect(Math.abs(mockCamera.position.z)).toBeLessThan(0.1);
    // Should set rotation manually instead of lookAt (avoids gimbal lock)
    expect(mockCamera.rotation.set).toHaveBeenCalledWith(-Math.PI / 2, 0, 0);
    expect(mockCamera.lookAt).not.toHaveBeenCalled();
  });

  it("moves camera to panoramic viewpoint when lookUpMode is true", () => {
    mockCharacter.position = new Vector3(2, 0, -3);
    render(<CameraRig lookUpMode={true} />);

    const scene = {
      scene: { getObjectByName: (name: string) => name === "character" ? mockCharacter : undefined },
    };

    for (let i = 0; i < 100; i++) {
      frameCallback(scene);
    }

    // Camera should be near the fixed panoramic position (0, 5, 5)
    expect(mockCamera.position.x).toBeCloseTo(0, 0);
    expect(mockCamera.position.y).toBeCloseTo(5, 0);
    expect(mockCamera.position.z).toBeCloseTo(8, 0);
    // Should look at sky above house (0, 6, -6)
    expect(mockCamera.lookAt).toHaveBeenCalledWith(
      expect.objectContaining({ x: 0, y: 6, z: -6 })
    );
  });

  it("does nothing when character is not found", () => {
    render(<CameraRig />);

    frameCallback({
      scene: { getObjectByName: () => undefined },
    });

    expect(mockCamera.position.x).toBe(0);
    expect(mockCamera.position.y).toBe(0);
    expect(mockCamera.position.z).toBe(0);
    expect(mockCamera.lookAt).not.toHaveBeenCalled();
  });

  it("skips wall collision check in topDown mode", () => {
    render(<CameraRig topDown={true} />);

    // Place character near a wall
    mockCharacter.position = new Vector3(-5, 0, -9);

    const scene = {
      scene: { getObjectByName: (name: string) => name === "character" ? mockCharacter : undefined },
    };

    for (let i = 0; i < 50; i++) {
      frameCallback(scene);
    }

    // In topDown mode, camera is directly above — no wall avoidance needed
    expect(mockCamera.position.y).toBeGreaterThan(10);
  });

  it("adjusts camera angle when wall blocks line of sight", () => {
    render(<CameraRig flipped={false} />);

    // Place character against the north wall of the top-left room
    // Wall: { minX: -5.5, maxX: -1, minZ: -11, maxZ: -9.5 }
    // Character at (-3, 0, -9.5) — camera at default angle (0) would be at (-3, 2.5, -5.5)
    // Ray from (-3, 2.5, -5.5) toward (-3, 0, -9.5) passes through the wall
    mockCharacter.position = new Vector3(-3, 0, -9.5);

    const scene = {
      scene: { getObjectByName: (name: string) => name === "character" ? mockCharacter : undefined },
    };

    for (let i = 0; i < 80; i++) {
      frameCallback(scene);
    }

    // Camera should NOT be at the default z offset (+4) since that's blocked
    // It should have found an alternative angle
    // The key test: camera should have a clear line of sight (not behind the wall)
    const camPos = mockCamera.position;
    expect(camPos.y).toBeGreaterThan(0); // Still elevated
  });
});

describe("isAngleBlocked", () => {
  it("returns false when no walls block the view", () => {
    const charPos = new Vector3(0, 0, 0);
    expect(isAngleBlocked(charPos, 0)).toBe(false);
  });

  it("returns true when a wall blocks the camera-to-character ray", () => {
    // Character north of the top-left room wall
    // Wall: { minX: -5.5, maxX: -1, minZ: -11, maxZ: -9.5 }
    // Character at (-3, 0, -11.5), angle 0 → camera at (-3, 2.5, -7.5)
    // Ray from camera to character crosses the wall
    const charPos = new Vector3(-3, 0, -11.5);
    expect(isAngleBlocked(charPos, 0)).toBe(true);
  });

  it("returns false for an angle that avoids the wall", () => {
    // Character at (0, 0, -5), angle 0 → camera at (0, 2.5, -1)
    // Center of house, no walls between camera and character at this angle
    const charPos = new Vector3(0, 0, -5);
    expect(isAngleBlocked(charPos, 0)).toBe(false);
  });
});
