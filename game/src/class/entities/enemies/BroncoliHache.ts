import IAMovementLigne from "../../ia/movement/IAMovementLigne";
import Enemy from "./Enemy";

export default class BroncoliHache extends Enemy {
  iaMovement = new IAMovementLigne;

  name = "BroncoliHache";
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
      x: 0, // Réduction de 4px pour pas qu'il soit bloqué dans les couloir de 1 case de large
      y: 0
    },
    size: {
      height: 64,
      width: 38
    }
  };

  canFly = false;

  currentSprite = this.sprites.idle;
  movementSpeed = 1;
}