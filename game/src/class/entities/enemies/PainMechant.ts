import IAMovementSquare from "../../ia/movement/IAMovementSquare";
import ThinkingEntity from "../ThinkingEntity";

export default class PainMechant extends ThinkingEntity {
  iaMovement = new IAMovementSquare;

  sprites = {
    idle: "enemies/painMechant/painMechantIdle.png",
    walking: {
      down: "enemies/painMechant/painMechantD.png",
      left: "enemies/painMechant/painMechantL.png",
      right: "enemies/painMechant/painMechantR.png",
      up: "enemies/painMechant/painMechantU.png"
    }
  };

  currentSprite = this.sprites.idle;
  movementSpeed = 1;
}