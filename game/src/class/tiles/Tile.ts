import { tileType } from "../../enum/tileType";
import { Coordinates, TileProperties } from "../../typing/tiles";
import Door from "./Door";
import Floor from "./Floor";
import Void from "./Void";
import Wall from "./Wall";

export default abstract class Tile {
  posX: number;
  posY: number;
  type: tileType;

  /**
   * Collision properties
   */
  canWalkThrough: boolean;
  canFlyOver: boolean;

  textRender: string;
  spriteName = "default.png"; // Should be in public/img/tiles

  constructor({ posX, posY }: Coordinates & TileProperties) {
    this.posX = posX; this.posY = posY;
  }

  isFloor(): this is Floor {
    return this.type === tileType.FLOOR;
  }

  isVoid(): this is Void {
    return this.type === tileType.VOID;
  }

  isWall(): this is Wall {
    return this.type === tileType.WALL;
  }

  isError(): this is Error {
    return this.type === tileType.ERROR || !(this.type in tileType);
  }

  isDoor(): this is Door {
    return this.type === tileType.DOOR;
  }

}