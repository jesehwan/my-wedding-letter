"use client";

import { useCharacterMovement } from "@/hooks/useCharacterMovement";
import { Character } from "./Character";
import { JoystickInput } from "@/types/discovery";

interface CharacterControllerProps {
  paused: boolean;
  joystickInput: JoystickInput;
}

export function CharacterController({
  paused,
  joystickInput,
}: CharacterControllerProps) {
  const groupRef = useCharacterMovement(paused, joystickInput);

  return <Character ref={groupRef} />;
}
