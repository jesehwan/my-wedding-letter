import { render } from "@testing-library/react";
import { useFrame, useThree } from "@react-three/fiber";
import { CameraRig } from "../CameraRig";
import { Vector3 } from "three";

const mockCamera = {
  position: new Vector3(0, 0, 0),
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

  it("moves camera toward character with offset", () => {
    render(<CameraRig />);

    frameCallback({
      scene: { getObjectByName: (name: string) => name === "character" ? mockCharacter : undefined },
    });

    expect(mockCamera.position.z).toBeGreaterThan(0);
    expect(mockCamera.lookAt).toHaveBeenCalled();
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
});
