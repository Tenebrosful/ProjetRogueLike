import { RandomSeed } from "random-seed";
import { tileType } from "../enum/tileType";
import { tileResolver } from "../resolver/TileResolver";
import { Tile } from "./tiles/Tile";
import * as rooms from "../../config/room.json";
import { Door } from "./tiles/Door";
import { Coordinates } from "../../typing/tiles";

export class Room {
  coords: Coordinates;
  tiles: Tile[][];
  doors: Door[];

  constructor(tiles: tileType[][], coords: Coordinates = { posX: 0, posY: 0 }) {
    this.coords = coords;
    this.tiles = [];
    this.doors = [];
    let doorDirection = 0;

    for (let posY = 0; posY < tiles.length; posY++) {
      this.tiles[posY] = [];
      /* @ts-ignore: tiles[posY] can't be undefined */
      for (let posX = 0; posX < tiles[posY].length; posX++) {
        /* @ts-ignore: this.tiles[posY] and tiles[posY][posX] can't be undefined */
        if (tiles[posY][posX] === tileType.DOOR) {
          /* @ts-ignore: this.tiles[posY] and tiles[posY][posX] can't be undefined */
          const door = tileResolver(tiles[posY][posX], { direction: doorDirection++, posX, posY }) as Door;
          /* @ts-ignore: this.tiles[posY] and tiles[posY][posX] can't be undefined */
          this.tiles[posY].push(door);
          this.doors.push(door);
          continue;
        }

        /* @ts-ignore: this.tiles[posY] and tiles[posY][posX] can't be undefined */
        this.tiles[posY].push(tileResolver(tiles[posY][posX], { posX, posY }));
      }
    }
  }

  static generateRandom(random: RandomSeed, coords: Coordinates = { posX: 0, posY: 0 }) {
    return new Room(rooms[random.intBetween(0, rooms.length - 1)] as tileType[][], coords);
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