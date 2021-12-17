import { tileType } from "../../enum/tileType";
import { Tile } from "./Tile";
import { Coordinates } from "../../../typing/tiles";

export class Floor extends Tile {
  type = tileType.FLOOR;

  constructor({ posX, posY }: Coordinates) {
    super({ posX, posY, textRender: " " });
  }

}