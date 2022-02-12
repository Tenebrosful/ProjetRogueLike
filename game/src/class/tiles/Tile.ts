import { tileType } from "../../enum/tileType";
import { Coordinates } from "../../typing/tiles";
import Entity from "../entities/Entity";
import GameRender from "../GameRender";
import Door from "./Door";
import Floor from "./Floor";
import Portail from "./Portail";
import Void from "./Void";
import Wall from "./Wall";

export default abstract class Tile {
  coords: Coordinates;
  type: tileType;

  /**
   * Collision properties
   */
  canWalkThrough: boolean;
  canFlyOver: boolean;

  textRender: string;
  spriteName = "default.png"; // Should be in public/img/tiles

  constructor(coords: Coordinates) {
    this.coords = coords;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  walkOn(entity: Entity) {
    return;
  }

  getPixelCoords(): Coordinates {
    return { posX: this.coords.posX * GameRender.TILE_SIZE, posY: this.coords.posY * GameRender.TILE_SIZE };
  }

  isFloor(): this is Floor {
    return this.type === tileType.FLOOR;
  }

  isVoid(): this is Void {
    return this.type === tileType.VOID;
  }

  isWall(): this is Wall {
    return this.type === tileType.WALL;
  }

  isError(): this is Error {
    return this.type === tileType.ERROR || !(this.type in tileType);
  }

  isDoor(): this is Door {
    return this.type === tileType.DOOR;
  }

  isPortail(): this is Portail {
    return this.type === tileType.PORTAIL;
  }

}