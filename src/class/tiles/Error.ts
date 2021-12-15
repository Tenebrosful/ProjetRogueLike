import { tileType } from "../../enum/tileType";
import { Tile } from "./Tile";

export class Error extends Tile{
  type = tileType.ERROR;

  constructor(params: {posX: number, posY: number}) {
    super({...params, canFlyOver: true, canWalkThrough: true, textRender: "?"});
  }
  
}