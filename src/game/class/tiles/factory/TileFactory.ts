import { Direction } from "../../../enum/direction";
import Tile from "../Tile";

export default interface TileFactory {
  createTile(params: { posX: number, posY: number, direction?: Direction }): Tile;
}