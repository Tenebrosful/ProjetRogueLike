import Item from "./Item";
import IAOnPlayerContact from "../../ia/movement/IAPlayerTouch";

export default class Fruit extends Item {
  iaMovement = new IAOnPlayerContact(10);

  sprites = {
    idle: "enemies/painMechant/painMechantIdle.png",
  };

  hitbox = {
    offset: {
      x: 0,
      y: 0
    },
    size: {
      height: 46,
      width: 64
    }
  };

  onContact(){
    console.log("An Item !");
  }

  canFly = false;
  currentSprite = this.sprites.idle;
}