import { render } from "@testing-library/react";
import { InteriorScene } from "../InteriorScene";
import { ROOM_SPOTLIGHTS } from "../RoomSpotlights";

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

describe("ROOM_SPOTLIGHTS", () => {
  it("has 5 spotlights, one for each room plus veranda", () => {
    expect(ROOM_SPOTLIGHTS).toHaveLength(5);
  });

  it("all spotlights point downward from above", () => {
    for (const light of ROOM_SPOTLIGHTS) {
      expect(light.position[1]).toBeGreaterThan(0);
      expect(light.target[1]).toBe(0);
      expect(light.target[0]).toBe(light.position[0]);
      expect(light.target[2]).toBe(light.position[2]);
    }
  });
});
