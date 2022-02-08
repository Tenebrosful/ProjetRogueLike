import { EntitySprites } from "../../../typing/entitySprites";
import { Coordinates } from "../../../typing/tiles";

export abstract class Entity {
  coords: Coordinates;
  sprites: EntitySprites;

  constructor(coords: Coordinates) {
    this.coords = coords;
  }
}