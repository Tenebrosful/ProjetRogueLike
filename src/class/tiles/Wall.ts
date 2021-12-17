import { tileType } from "../../enum/tileType";
import { Tile } from "./Tile";
import { Coordinates } from "../../../typing/tiles";

export class Wall extends Tile {
  type = tileType.WALL;

  constructor({ posX, posY }: Coordinates) {
    super({ canFlyOver: false, canWalkThrough: false, posX, posY, textRender: "+" });
  }

}