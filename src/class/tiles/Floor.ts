import { tileType } from "../../enum/tileType";
import { Tile } from "./Tile";

export class Floor extends Tile{
  type = tileType.FLOOR;

  constructor(params: {posX: number, posY: number}) {
    super({...params, canFlyOver: true, canWalkThrough: true, textRender: " "});
  }
  
}