import { tileType } from "../../enum/tileType";
import { Coordinates } from "../../typing/tiles";
import Logger from "../Logger";
import Portail from "./Portail";
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

  constructor(coords: Coordinates) {
    super(coords);
  }

  convertToPortail(): Portail {
    Logger.log(`Convert Floor to Portail at [${this.coords.posX};${this.coords.posY}]`, "ROOM");
    return new Portail(this.coords);
  }

}