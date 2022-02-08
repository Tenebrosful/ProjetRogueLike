import { tileType } from "../../enum/tileType";
import { Tile } from "./Tile";
import { Coordinates } from "../../../typing/tiles";
import { Door } from "./Door";
import { Direction } from "../../enum/direction";

export class Wall extends Tile {
  type = tileType.WALL;

  /**
  * Collision properties
  */
  canWalkThrough = false;
  canFlyOver = false;

  textRender = "+";

  constructor({ posX, posY }: Coordinates) {
    super({ posX, posY });
  }

  convertToDoor(direction: Direction): Door {
    console.log(`Convert Wall to Door at [${this.posX};${this.posY}] ${direction}`);
    return new Door({ posX: this.posX, posY: this.posY }, direction);
  }

}