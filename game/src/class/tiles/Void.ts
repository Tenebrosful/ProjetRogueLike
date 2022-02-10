import { tileType } from "../../enum/tileType";
import { Coordinates } from "../../typing/tiles";
import Tile from "./Tile";

export default class Void extends Tile {
  type = tileType.VOID;

  /**
  * Collision properties
  */
  canWalkThrough = false;
  canFlyOver = true;

  textRender = ".";
  spriteName = "void.png";

  constructor({ posX, posY }: Coordinates) {
    super({ posX, posY });
  }

}