import { tileType } from "../../enum/tileType";
import { Coordinates } from "../../typing/tiles";
import Entity from "../entities/Entity";
import Player from "../entities/Player";
import Game from "../Game";
import Tile from "./Tile";

export default class Portail extends Tile {
  type = tileType.PORTAIL;

  canFlyOver = true;
  canWalkThrough = true;

  opened = false;

  spriteName = "portailClosed.png";

  constructor(coords: Coordinates) {
    super(coords);
  }

  walkOn(entity: Entity): void {
    if (!this.opened || !(entity instanceof Player)) return;

    Game.newStage();
  }

  open() {
    this.opened = true;
    this.spriteName = "portailOpened.png";
  }

  close() {
    this.opened = false;
    this.spriteName = " portailClosed.png";
  }
}