import { tileType } from "../../enum/tileType";
import { Tile } from "./Tile";
import { Coordinates } from "../../../typing/tiles";
import { Direction } from "../../enum/direction";
import { Wall } from "./Wall";

export class Door extends Tile {
  direction: Direction;

  type = tileType.DOOR;

  constructor({ posX, posY }: Coordinates, direction: Direction) {
    super({ posX, posY, textRender: getDirectionTextRender(direction) });
    this.direction = direction;
  }

  convertToWall(): Wall {
    console.log(`Convert Door to Wall at [${this.posX};${this.posY}]`);
    return new Wall({ posX: this.posX, posY: this.posY });
  }

}

function getDirectionTextRender(direction: Direction){
  switch(direction){
    case Direction.NORTH:
      return "N";
    case Direction.WEST:
      return "W";
    case Direction.EST:
      return "E";
    case Direction.SOUTH:
      return "S";
  }
}