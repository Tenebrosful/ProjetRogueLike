import { tileType } from "../enum/tileType";
import { TileFactory } from "../class/tiles/factory/TileFactory";
import { FloorFactory } from "../class/tiles/factory/FloorFactory";
import { ErrorFactory } from "../class/tiles/factory/ErrorFactory";
import { VoidFactory } from "../class/tiles/factory/VoidFactory";
import { WallFactory } from "../class/tiles/factory/WallFactory";
import { Tile } from "../class/tiles/Tile";

export function tileResolver(type: tileType, coords: {posX: number, posY: number}): Tile {
  let factory: TileFactory;
  switch (type) {
    case tileType.FLOOR:
      factory = new FloorFactory;
      break;
    case tileType.WALL:
      factory = new WallFactory;
      break;
    case tileType.VOID:
      factory = new VoidFactory;
      break;
    default:
      factory = new ErrorFactory;
      break;
  }

  return factory.createTile(coords);
}