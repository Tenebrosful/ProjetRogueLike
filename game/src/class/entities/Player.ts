import { EntitySprites } from "../../typing/entitySprites";
import Entity from "./Entity";

export default class Player extends Entity {
  sprites: EntitySprites = {
    walking: {
      //down: "player/playerL.png",
      left: "player/playerL.png",
      right: "player/playerR.png",
      //up: "player/playerR.png"
    }
  };

  hitbox = {
    offset: {
      x: 0,
      y: 0
    },
    size: {
      height: 64,
      width: 47
    }
  };

  currentSprite = this.sprites.walking?.left || Entity.DEFAULT_SPRITE;
  movementSpeed = 2;
}