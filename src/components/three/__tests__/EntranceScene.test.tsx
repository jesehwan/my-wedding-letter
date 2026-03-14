import { render } from "@testing-library/react";
import { EntranceScene } from "../EntranceScene";

describe("EntranceScene", () => {
  const joystickRef = { current: { x: 0, y: 0 } };
  const onReachDoor = jest.fn();

  it("renders without crashing", () => {
    expect(() =>
      render(<EntranceScene joystickRef={joystickRef} onReachDoor={onReachDoor} />)
    ).not.toThrow();
  });
});
