import { tileType } from "../../enum/tileType";
import { Coordinates } from "../../typing/tiles";
import { Direction } from "../../enum/direction";
import Tile from "./Tile";
import Wall from "./Wall";
import Logger from "../Logger";

export default class Door extends Tile {
  direction: Direction;

  /**
   * Collision properties
   */
  canFlyOver = true;
  canWalkThrough = true;

  type = tileType.DOOR;

  constructor(coords: Coordinates, direction: Direction) {
    super(coords);
    this.direction = direction;
    this.textRender = getDirectionTextRender(direction);
    this.spriteName = getDirectionSpriteName(direction);
  }

  convertToWall(): Wall {
    Logger.log(`Convert Door to Wall at [${this.coords.posX};${this.coords.posY}]`, "ROOM");
    return new Wall(this.coords);
  }

}

function getDirectionTextRender(direction: Direction) {
  switch (direction) {
    case Direction.NORTH:
      return "N";
    case Direction.WEST:
      return "W";
    case Direction.EST:
      return "E";
    case Direction.SOUTH:
      return "S";
    default:
      return "?";
  }
}

function getDirectionSpriteName(direction: Direction) {
  switch(direction) {
    case Direction.NORTH:
      return "doorN.png";
    case Direction.WEST:
      return "doorW.png";
    case Direction.EST:
      return "doorE.png";
    case Direction.SOUTH:
      return "doorS.png";
    default:
      return "default.png";
  }
}