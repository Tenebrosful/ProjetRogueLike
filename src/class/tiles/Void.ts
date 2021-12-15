import { tileType } from "../../enum/tileType";
import { Tile } from "./Tile";

export class Void extends Tile{
  type = tileType.VOID;

  constructor(params: {posX: number, posY: number}) {
    super({...params, canFlyOver: true, canWalkThrough: false, textRender: "."});
  }
  
}