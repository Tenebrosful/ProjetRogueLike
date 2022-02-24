import IAInteract from "../../ia/movement/IAInteract";
import IAMovementFollowPlayer from "../../ia/movement/IAMovementFollowPlayer";
import IAOnPlayerContact from "../../ia/movement/IAOnPlayerContact";
import Enemy from "./Enemy";

export default class PainMechantVolant extends Enemy {
  iaMovement = new IAMovementFollowPlayer(5);
  iaInteract = new IAOnPlayerContact(5);

  name = "PainMechantVolant";
  sprites = {
    idle: "enemies/painMechantVolant/painMechantVolantIdle.png",
    walking: {
      down: "enemies/painMechantVolant/painMechantVolantR.png",
      left: "enemies/painMechantVolant/painMechantVolantL.png",
      right: "enemies/painMechantVolant/painMechantVolantR.png",
      up: "enemies/painMechantVolant/painMechantVolantL.png"
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

  onContact(){
    console.log('CA MARCHE !')
  }

  canFly = true;

  currentSprite = this.sprites.idle;
  movementSpeed = 3.5;
}