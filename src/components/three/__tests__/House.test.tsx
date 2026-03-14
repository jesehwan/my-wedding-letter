import { render } from "@testing-library/react";
import { useLoader } from "@react-three/fiber";

jest.mock("three-stdlib", () => ({
  FBXLoader: class FBXLoader {},
}));

import { House } from "../House";

const mockSetResourcePath = jest.fn();
const mockTraverse = jest.fn();
const mockSub = jest.fn();

const mockModel = {
  traverse: mockTraverse,
  position: { set: jest.fn(), sub: mockSub, add: jest.fn(), y: 0 },
  scale: { set: jest.fn() },
  updateMatrixWorld: jest.fn(),
};

beforeEach(() => {
  jest.clearAllMocks();
  mockModel.position.y = 0;
  (useLoader as jest.Mock).mockImplementation((Loader, path, extensions) => {
    if (extensions) {
      const mockLoader = { setResourcePath: mockSetResourcePath };
      extensions(mockLoader);
    }
    return mockModel;
  });
});

describe("House", () => {
  it("renders without crashing", () => {
    expect(() => render(<House />)).not.toThrow();
  });

  it("loads house_final.fbx via useLoader with FBXLoader", () => {
    render(<House />);
    expect(useLoader).toHaveBeenCalledWith(
      expect.any(Function),
      "/models/house_final.fbx",
      expect.any(Function)
    );
  });

  it("sets resourcePath to /models/tex/ via extensions callback", () => {
    render(<House />);
    expect(mockSetResourcePath).toHaveBeenCalledWith("/models/tex/");
  });

  it("sets castShadow and receiveShadow on mesh children", () => {
    const meshChild = { isMesh: true, castShadow: false, receiveShadow: false, material: { name: "test" } };
    mockTraverse.mockImplementation((fn: (child: any) => void) => {
      fn(meshChild);
    });

    render(<House />);

    expect(meshChild.castShadow).toBe(true);
    expect(meshChild.receiveShadow).toBe(true);
  });

  it("converts all materials to MeshStandardMaterial including those without texture", () => {
    const originalMaterial = { name: "OriginalMat", color: 0xff0000, transparent: false, opacity: 1 };
    const meshChild = {
      isMesh: true,
      material: originalMaterial,
      castShadow: false,
      receiveShadow: false,
    };
    mockTraverse.mockImplementation((fn: (child: any) => void) => {
      fn(meshChild);
    });

    render(<House />);

    expect(meshChild.material).not.toBe(originalMaterial);
    expect(meshChild.material).toBeInstanceOf(
      require("three").MeshStandardMaterial
    );
  });
});
