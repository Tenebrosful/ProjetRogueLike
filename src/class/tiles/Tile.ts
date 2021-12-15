import { tileType } from "../../enum/tileType";

export abstract class Tile {
  posX: number;
  posY: number;
  type: tileType;
  canWalkThrough: boolean;
  canFlyOver: boolean;

  constructor(params: {posX: number, posY: number, canWalkThrough: boolean, canFlyOver: boolean}) {
    this.posX = params.posX; this.posY = params.posY; this.canWalkThrough = params.canWalkThrough; this.canFlyOver = params.canFlyOver;
  }

}