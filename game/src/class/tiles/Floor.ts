import { tileType } from "../../enum/tileType";
import { Coordinates } from "../../typing/tiles";
import Tile from "./Tile";

export default class Floor extends Tile {
  type = tileType.FLOOR;

  /**
   * Collision properties
   */
  canWalkThrough = true;
  canFlyOver = true;

  textRender = " ";
  spriteName = "floor.png";

  constructor({ posX, posY }: Coordinates) {
    super({ posX, posY });
  }

}