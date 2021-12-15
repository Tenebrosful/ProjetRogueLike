import { tileType } from "../../enum/tileType";
import { Tile } from "./Tile";

export class Wall extends Tile{
  type = tileType.WALL;

  constructor(params: {posX: number, posY: number}) {
    super({...params, canFlyOver: false, canWalkThrough: false, textRender: "+"});
  }
  
}