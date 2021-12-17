import { tileType } from "../../enum/tileType";
import { Coordinates, TileProperties } from "../../../typing/tiles";
import { Floor } from "./Floor";
import { Void } from "./Void";
import { Wall } from "./Wall";
import { Error } from "./Error";

export abstract class Tile {
  posX: number;
  posY: number;
  type: tileType;
  canWalkThrough: boolean;
  canFlyOver: boolean;
  textRender: string;

  constructor({ posX, posY, canWalkThrough = true, canFlyOver = true, textRender = "?" }: Coordinates & TileProperties) {
    this.posX = posX; this.posY = posY; this.canWalkThrough = canWalkThrough; this.canFlyOver = canFlyOver; this.textRender = textRender;
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

}