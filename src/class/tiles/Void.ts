import { tileType } from "../../enum/tileType";
import { Tile } from "./Tile";
import { Coordinates } from "../../../typing/tiles";

export class Void extends Tile {
  type = tileType.VOID;

  constructor({ posX, posY }: Coordinates) {
    super({ canFlyOver: true, canWalkThrough: false, posX, posY, textRender: "." });
  }

}