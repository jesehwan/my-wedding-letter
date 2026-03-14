import { render } from "@testing-library/react";
import { Fireworks } from "../Fireworks";
import { useFrame } from "@react-three/fiber";

jest.mock("@react-three/fiber", () => ({
  useFrame: jest.fn(),
}));

describe("Fireworks", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders without crashing", () => {
    expect(() => render(<Fireworks />)).not.toThrow();
  });

  it("registers a useFrame callback", () => {
    render(<Fireworks />);
    expect(useFrame).toHaveBeenCalled();
  });
});
