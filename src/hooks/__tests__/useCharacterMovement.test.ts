import { calculateMovement } from "../useCharacterMovement";
import { MovementInput, JoystickInput } from "@/types/discovery";

describe("calculateMovement", () => {
  const noKeys: MovementInput = {
    forward: false,
    backward: false,
    left: false,
    right: false,
  };
  const noJoystick: JoystickInput = { x: 0, y: 0 };
  const speed = 3;
  const delta = 1 / 60;

  it("returns zero when no input", () => {
    const result = calculateMovement(noKeys, noJoystick, speed, delta);
    expect(result.dx).toBe(0);
    expect(result.dz).toBe(0);
  });

  it("moves forward (negative Z) when forward key pressed", () => {
    const keys = { ...noKeys, forward: true };
    const result = calculateMovement(keys, noJoystick, speed, delta);
    expect(result.dx).toBe(0);
    expect(result.dz).toBeLessThan(0);
  });

  it("moves backward (positive Z) when backward key pressed", () => {
    const keys = { ...noKeys, backward: true };
    const result = calculateMovement(keys, noJoystick, speed, delta);
    expect(result.dx).toBe(0);
    expect(result.dz).toBeGreaterThan(0);
  });

  it("moves left (negative X) when left key pressed", () => {
    const keys = { ...noKeys, left: true };
    const result = calculateMovement(keys, noJoystick, speed, delta);
    expect(result.dx).toBeLessThan(0);
    expect(result.dz).toBe(0);
  });

  it("moves right (positive X) when right key pressed", () => {
    const keys = { ...noKeys, right: true };
    const result = calculateMovement(keys, noJoystick, speed, delta);
    expect(result.dx).toBeGreaterThan(0);
    expect(result.dz).toBe(0);
  });

  it("normalizes diagonal movement", () => {
    const keys = { ...noKeys, forward: true, right: true };
    const result = calculateMovement(keys, noJoystick, speed, delta);

    const singleDir = calculateMovement(
      { ...noKeys, forward: true },
      noJoystick,
      speed,
      delta
    );

    const diagonalSpeed = Math.sqrt(
      result.dx * result.dx + result.dz * result.dz
    );
    const straightSpeed = Math.abs(singleDir.dz);

    expect(diagonalSpeed).toBeCloseTo(straightSpeed, 5);
  });

  it("uses joystick input when significant", () => {
    const joystick: JoystickInput = { x: 0.5, y: 0.5 };
    const result = calculateMovement(noKeys, joystick, speed, delta);
    expect(result.dx).toBeGreaterThan(0);
    expect(result.dz).toBeLessThan(0); // joystick y is inverted
  });

  it("ignores joystick when below deadzone", () => {
    const joystick: JoystickInput = { x: 0.05, y: 0.05 };
    const result = calculateMovement(noKeys, joystick, speed, delta);
    expect(result.dx).toBe(0);
    expect(result.dz).toBe(0);
  });

  it("scales with speed and delta", () => {
    const keys = { ...noKeys, forward: true };
    const result1 = calculateMovement(keys, noJoystick, 3, 1 / 60);
    const result2 = calculateMovement(keys, noJoystick, 6, 1 / 60);
    expect(Math.abs(result2.dz)).toBeCloseTo(Math.abs(result1.dz) * 2, 5);
  });
});
