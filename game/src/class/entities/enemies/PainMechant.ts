import IAMovementSquare from "../../ia/movement/IAMovementSquare";
import Enemy from "./Enemy";

export default class PainMechant extends Enemy {
  iaMovement = new IAMovementSquare;

  sprites = {
    idle: "enemies/painMechant/painMechantIdle.png",
    walking: {
      down: "enemies/painMechant/painMechantR.png",
      left: "enemies/painMechant/painMechantL.png",
      right: "enemies/painMechant/painMechantR.png",
      up: "enemies/painMechant/painMechantL.png"
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
  movementSpeed = 2;
}