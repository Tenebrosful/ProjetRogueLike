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

  constructor({ posX, posY }: Coordinates) {
    super({ posX, posY });
  }

  convertToDoor(direction: Direction): Door {
    Logger.log(`Convert Wall to Door at [${this.posX};${this.posY}]`, "ROOM");
    return new Door({ posX: this.posX, posY: this.posY }, direction);
  }

}