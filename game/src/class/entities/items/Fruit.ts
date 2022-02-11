import Item from "./Item";

export default class PainMechant extends Item {
  sprites = {
    idle: "enemies/painMechant/painMechantIdle.png",
  };

  hitbox = {
    offset: {
      x: 0,
      y: 16
    },
    size: {
      height: 30,
      width: 64
    }
  };

  canFly = false;
  currentSprite = this.sprites.idle;
}