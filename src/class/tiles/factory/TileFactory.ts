import { Tile } from "../Tile";

export interface TileFactory {
  createTile(params: {posX: number, posY: number}): Tile;
}