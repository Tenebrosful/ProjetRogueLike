import { tileType } from "../../enum/tileType";
import { Tile } from "./Tile";
import { Coordinates } from "../../../../typing/tiles";

export class Void extends Tile {
  type = tileType.VOID;

  /**
  * Collision properties
  */
  canWalkThrough = false;
  canFlyOver = true;

  textRender = ".";

  constructor({ posX, posY }: Coordinates) {
    super({ posX, posY });
  }

}