import { tileType } from "../../enum/tileType";
import { Coordinates } from "../../typing/tiles";
import { Direction } from "../../enum/direction";
import Door from "./Door";
import Tile from "./Tile";
import Logger from "../Logger";

export default class Wall extends Tile {
  type = tileType.WALL;

  /**
  * Collision properties
  */
  canWalkThrough = false;
  canFlyOver = false;

  textRender = "+";
  spriteName = "wall.png";

  constructor(coords: Coordinates) {
    super(coords);
  }

  convertToDoor(direction: Direction): Door {
    Logger.log(`Convert Wall to Door at [${this.coords.posX};${this.coords.posY}]`, "ROOM");
    return new Door(this.coords, direction);
  }

}