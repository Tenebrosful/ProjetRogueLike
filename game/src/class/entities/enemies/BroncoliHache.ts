import IAMovementLigne from "../../ia/movement/IAMovementLigne";
import Enemy from "./Enemy";

export default class broncoliHache extends Enemy {
  iaMovement = new IAMovementLigne;

  sprites = {
    idle: "enemies/broncoli/broncoliHache.png",
    walking: {
      down: "enemies/broncoli/broncoliHache.png",
      left: "enemies/broncoli/broncoliHacheL.png",
      right: "enemies/broncoli/broncoliHacheR.png",
      up: "enemies/broncoli/broncoliHache.png"
    }
  };

  hitbox = {
    offset: {
      x: 4, // Réduction de 4px pour pas qu'il soit bloqué dans les couloir de 1 case de large
      y: 0
    },
    size: {
      height: 46,
      width: 64
    }
  };

  canFly = false;

  currentSprite = this.sprites.idle;
  movementSpeed = 1;
}