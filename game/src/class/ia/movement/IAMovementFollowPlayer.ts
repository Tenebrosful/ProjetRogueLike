import { Direction } from "../../../enum/direction";
import Entity from "../../entities/Entity";
import Game from "../../Game";
import IAMovement from "./IAMovement";

export default class IAMovementFollowPlayer extends IAMovement {

  distanceFromPlayer: number;

  constructor(distanceFromPlayer: number) {
    super();
    this.distanceFromPlayer = distanceFromPlayer;
  }

  think(self: Entity) {
    const currentDistanceFromPlayer = Math.sqrt(
      Math.pow(self.coords.posX - Game.playerEntity.coords.posX, 2) +
      Math.pow(self.coords.posY - Game.playerEntity.coords.posY, 2));

    if (this.distanceFromPlayer >= currentDistanceFromPlayer) { self.idle(); return; }

    const deltaX = self.coords.posX - Game.playerEntity.coords.posX;
    const deltaY = self.coords.posY - Game.playerEntity.coords.posY;

    const degres = Math.atan2(deltaX, deltaY) * (180 / Math.PI);

    if (degres >= -10 && degres <= 10)
      self.move(Direction.NORTH);
    else if (degres > 10 && degres < 80)
      self.move(Direction.NORTH);
    else if (degres >= 80 && degres <= 100)
      self.move(Direction.WEST);
    else if (degres > 100 && degres < 170)
      self.move(Direction.WEST);
    else if (degres >= 170 || degres <= -170)
      self.move(Direction.SOUTH);
    else if (degres < -10 && degres > -80)
      self.move(Direction.EST);
    else if (degres <= -80 && degres >= -100)
      self.move(Direction.EST);
    else if (degres < -100 && degres > -170)
      self.move(Direction.SOUTH);

  }
}