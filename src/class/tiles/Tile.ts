import { tileType } from "../../enum/tileType";
import { Coordinates, TileProperties } from "../../../typing/tiles";

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

}