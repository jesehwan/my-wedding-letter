import { render } from "@testing-library/react";
import { InteriorScene } from "../InteriorScene";

jest.mock("../House", () => ({
  House: () => null,
}));

describe("InteriorScene", () => {
  const defaultProps = {
    joystickRef: { current: { x: 0, y: 0 } },
    discoveredIds: new Set<string>(),
    activePoint: null,
    onDiscover: jest.fn(),
  };

  it("renders without crashing", () => {
    expect(() => render(<InteriorScene {...defaultProps} />)).not.toThrow();
  });
});
