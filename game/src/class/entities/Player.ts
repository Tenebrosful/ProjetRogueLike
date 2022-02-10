import { EntitySprites } from "../../typing/entitySprites";
import Entity from "./Entity";

export default class Player extends Entity {
  sprites: EntitySprites = {
    walking: {
      down: "player/playerD.png",
      left: "player/playerL.png",
      right: "player/playerR.png",
      up: "player/playerU.png"
    }
  };

  currentSprite = this.sprites.walking?.left || Entity.DEFAULT_SPRITE;
  movementSpeed = 5;
}