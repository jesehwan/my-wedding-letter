import { render } from "@testing-library/react";
import { DiscoveryPoint } from "../DiscoveryPoint";

jest.mock("@react-three/fiber", () => ({
  useFrame: jest.fn(),
}));

jest.mock("three", () => ({
  Mesh: jest.fn(),
}));

describe("DiscoveryPoint", () => {
  it("renders without error when not discovered", () => {
    expect(() =>
      render(<DiscoveryPoint position={[0, 0.5, 0]} discovered={false} />)
    ).not.toThrow();
  });

  it("renders without error when discovered", () => {
    expect(() =>
      render(<DiscoveryPoint position={[0, 0.5, 0]} discovered={true} />)
    ).not.toThrow();
  });
});
