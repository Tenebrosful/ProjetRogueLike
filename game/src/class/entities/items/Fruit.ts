import Item from "./Item";
import IAOnPlayerContact from "../../ia/movement/IAOnPlayerContact";
import IAInteract from "../../ia/movement/IAInteract";

export default class Fruit extends Item {
  iaInteract = new IAOnPlayerContact(10);

  sprites = {
    idle: "enemies/painMechant/painMechantIdle.png",
    wake: "enemies/painMechant/painMechantL.png",
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
    this.currentSprite = this.sprites.wake;
  }

  canFly = false;
  currentSprite = this.sprites.idle;
}