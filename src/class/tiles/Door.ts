import { tileType } from "../../enum/tileType";
import { Tile } from "./Tile";
import { Coordinates } from "../../../typing/tiles";
import { Direction } from "../../enum/direction";
import { Wall } from "./Wall";

export class Door extends Tile {
  direction: Direction;

  type = tileType.DOOR;

  constructor({ posX, posY }: Coordinates, direction: Direction) {
    super({ posX, posY, textRender: "¤" });
    this.direction = direction;
  }

  convertToWall(): Wall {
    console.log(`Convert Door to Wall at [${this.posX};${this.posY}]`);
    return new Wall({ posX: this.posX, posY: this.posY });
  }

}