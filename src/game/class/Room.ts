import { RandomSeed } from "random-seed";
import { tileType } from "../enum/tileType";
import tileResolver from "../resolver/TileResolver";
import * as rooms from "../../../config/room.json";
import { Coordinates } from "../../../typing/tiles";
import { Direction } from "../enum/direction";
import Door from "./tiles/Door";
import Tile from "./tiles/Tile";

export default class Room {
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

  convertNotLinkedDoor(direction: Direction) {
    const doorToConvertIndex = this.doors.findIndex(door => door.direction === direction);

    if (doorToConvertIndex === -1) return;

    const doorToConvert = this.doors[doorToConvertIndex];

    if (!doorToConvert) return;

    this.doors.splice(doorToConvertIndex, 1);

    const wallConvertedFromDoor = doorToConvert?.convertToWall();

    /* @ts-ignore: this.tiles[wallConvertedFromDoor.posY] and tiles[wallConvertedFromDoor.posY][wallConvertedFromDoor.posX] shouldn't be undefined */
    this.tiles[wallConvertedFromDoor.posY][wallConvertedFromDoor.posX] = wallConvertedFromDoor;
  }
}