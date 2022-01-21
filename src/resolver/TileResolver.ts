import { tileType } from "../enum/tileType";
import { FloorFactory } from "../class/tiles/factory/FloorFactory";
import { ErrorFactory } from "../class/tiles/factory/ErrorFactory";
import { VoidFactory } from "../class/tiles/factory/VoidFactory";
import { WallFactory } from "../class/tiles/factory/WallFactory";
import { Tile } from "../class/tiles/Tile";
import { DoorFactory } from "../class/tiles/factory/DoorFactory";
import { Direction } from "../enum/direction";

export function tileResolver(type: tileType, params: { posX: number, posY: number, direction?: Direction }): Tile {
  return getTileFactory(type).createTile(params);
}

function getTileFactory(type: tileType) {
  switch (type) {
    case tileType.FLOOR:
      return new FloorFactory;
    case tileType.WALL:
      return new WallFactory;
    case tileType.VOID:
      return new VoidFactory;
    case tileType.DOOR:
      return new DoorFactory;
    default:
      return new ErrorFactory;
  }
}