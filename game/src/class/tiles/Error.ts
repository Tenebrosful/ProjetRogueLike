import { tileType } from "../../enum/tileType";
import { Coordinates } from "../../typing/tiles";
import Tile from "./Tile";

export default class Error extends Tile {
  type = tileType.ERROR;

  /**
   * Collision properties
   */
  canWalkThrough = true;
  canFlyOver = true;

  textRender = "?";

  constructor(coords: Coordinates) {
    super(coords);
  }

}