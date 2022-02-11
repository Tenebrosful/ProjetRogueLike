import Entity from "../../entities/Entity";
import Game from "../../Game";
import IAInteract from "./IAInteract";

export default class IAOnPlayerContact extends IAInteract {

  distanceFromPlayer: number;

  constructor(distanceFromPlayer: number) {
    super();
    this.distanceFromPlayer = distanceFromPlayer;
  }

  think(self: Entity) {
    const currentDistanceFromPlayer = Math.sqrt(
      Math.pow(self.coords.posX - Game.playerEntity.coords.posX, 2) +
      Math.pow(self.coords.posY - Game.playerEntity.coords.posY, 2));

    if (this.distanceFromPlayer >= currentDistanceFromPlayer) { self.onContact(); return; }
  }
}