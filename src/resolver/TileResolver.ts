import { tileType } from "../enum/tileType";
import { FloorFactory } from "../class/tiles/factory/FloorFactory";
import { ErrorFactory } from "../class/tiles/factory/ErrorFactory";
import { VoidFactory } from "../class/tiles/factory/VoidFactory";
import { WallFactory } from "../class/tiles/factory/WallFactory";
import { Tile } from "../class/tiles/Tile";

export function tileResolver(type: tileType, coords: { posX: number, posY: number }): Tile {
  return getTileFactory(type).createTile(coords);
}

function getTileFactory(type: tileType) {
  switch (type) {
    case tileType.FLOOR:
      return new FloorFactory;
    case tileType.WALL:
      return new WallFactory;
    case tileType.VOID:
      return new VoidFactory;
    default:
      return new ErrorFactory;
  }
}