import { tileType } from "../enum/tileType";
import { tileResolver } from "../resolver/TileResolver";
import { Tile } from "./tiles/Tile";

export class Room {
  tiles: Tile[][];

  constructor(tiles: tileType[][]) {
    console.log(tiles, `${tiles.length}x${tiles[0]?.length}`);

    this.tiles = [];

    for (let posY = 0; posY < tiles.length; posY++) {
      this.tiles[posY] = [];
      /* @ts-ignore */
      for (let posX = 0; posX < tiles[posY].length; posX++) 
        /* @ts-ignore */
        this.tiles[posY].push(new (tileResolver(tiles[posY][posX]))({ posX, posY }));
    }
  }
}