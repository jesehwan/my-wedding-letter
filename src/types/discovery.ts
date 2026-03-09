export interface DiscoveryPointData {
  id: string;
  position: [number, number, number];
  title: string;
  content: string;
  imageUrl?: string;
}

export interface MovementInput {
  forward: boolean;
  backward: boolean;
  left: boolean;
  right: boolean;
}

export interface JoystickInput {
  x: number;
  y: number;
}
