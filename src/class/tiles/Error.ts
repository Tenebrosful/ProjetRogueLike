import { tileType } from "../../enum/tileType";
import { Tile } from "./Tile";
import { Coordinates } from "../../../typing/tiles";

export class Error extends Tile {
  type = tileType.ERROR;

  /**
   * Collision properties
   */
  canWalkThrough = true;
  canFlyOver = true;

  textRender = "?";

  constructor({ posX, posY }: Coordinates) {
    super({ posX, posY });
  }

}