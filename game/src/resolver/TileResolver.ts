import DoorFactory from "../class/tiles/factory/DoorFactory";
import ErrorFactory from "../class/tiles/factory/ErrorFactory";
import FloorFactory from "../class/tiles/factory/FloorFactory";
import VoidFactory from "../class/tiles/factory/VoidFactory";
import WallFactory from "../class/tiles/factory/WallFactory";
import Tile from "../class/tiles/Tile";
import { Direction } from "../enum/direction";
import { tileType } from "../enum/tileType";

export default function tileResolver(type: tileType, params: { posX: number, posY: number, direction?: Direction }): Tile {
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
    case tileType.PORTAIL:
    default:
      return new ErrorFactory;
  }
}