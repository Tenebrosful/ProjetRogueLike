import IAMovementSquare from "../../ia/movement/IAMovementSquare";
import ThinkingEntity from "../ThinkingEntity";

export default class PainMechant extends ThinkingEntity {
  iaMovement = new IAMovementSquare;

  sprites = {
    idle: "enemies/painMechantIdle.ping",
    walking: {
      down: "enemies/painMechantD.png",
      left: "enemies/painMechantL.png",
      right: "enemies/painMechantR.png",
      up: "enemies/painMechantU.png"
    }
  };

  currentSprite = this.sprites.idle;
  movementSpeed = 2;
}