import { Coordinates } from "./tiles";

export type EntitySprites = {
  walking?: {
    down?: string,
    left?: string,
    right?: string,
    up?: string
  },
  idle?: string
};

export type Hitbox = {
  botLeft: Coordinates,
  botRight: Coordinates,
  topLeft: Coordinates,
  topRight: Coordinates
};