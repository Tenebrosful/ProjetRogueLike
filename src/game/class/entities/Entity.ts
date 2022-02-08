import { EntitySprites } from "../../../../typing/entitySprites";
import { Coordinates } from "../../../../typing/tiles";

export default abstract class Entity {
  coords: Coordinates;
  sprites: EntitySprites;

  constructor(coords: Coordinates) {
    this.coords = coords;
  }
}