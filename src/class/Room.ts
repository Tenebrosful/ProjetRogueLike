import { RandomSeed } from "random-seed";
import { tileType } from "../enum/tileType";
import { tileResolver } from "../resolver/TileResolver";
import { Tile } from "./tiles/Tile";
import * as rooms from "../../config/room.json";

export class Room {
  tiles: Tile[][];

  constructor(tiles: tileType[][]) {
    this.tiles = [];

    for (let posY = 0; posY < tiles.length; posY++) {
      this.tiles[posY] = [];
      /* @ts-ignore: tiles[posY] can't be undefined */
      for (let posX = 0; posX < tiles[posY].length; posX++)
        /* @ts-ignore: this.tiles[posY] and tiles[posY][posX] can't be undefined */
        this.tiles[posY].push(tileResolver(tiles[posY][posX], { posX, posY }));
    }
  }

  static generateRandom(random: RandomSeed) {
    return new Room(rooms[random.intBetween(0, rooms.length - 1)] as tileType[][]);
  }

  renderTextTiles() {
    let render = "";

    this.tiles.forEach(row => {
      row.forEach(tile => render += tile.textRender);
      render += "\n";
    });

    return render;
  }
}