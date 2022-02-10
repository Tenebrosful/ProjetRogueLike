import { Direction } from "../enum/direction";
import Game from "./Game";

export default class Controls {
  static controls = {
    debug: "KeyR",
    walking: {
      down: "ArrowDown",
      left: "ArrowLeft",
      right: "ArrowRight",
      up: "ArrowUp"
    },
  };

  static currentState = {
    walking: {
      down: false,
      left: false,
      right: false,
      up: false
    }
  };

  static setup() {

    window.onkeydown = (e) => {
      e.preventDefault();

      if (e.code === this.controls.walking.up)
        this.currentState.walking.up = true;
      else if (e.code === this.controls.walking.down)
        this.currentState.walking.down = true;
      else if (e.code === this.controls.walking.left)
        this.currentState.walking.left = true;
      else if (e.code === this.controls.walking.right)
        this.currentState.walking.right = true;
    };

    window.onkeyup = (e) => {
      e.preventDefault();

      if (e.code === this.controls.walking.up)
        this.currentState.walking.up = false;
      else if (e.code === this.controls.walking.down)
        this.currentState.walking.down = false;
      else if (e.code === this.controls.walking.left)
        this.currentState.walking.left = false;
      else if (e.code === this.controls.walking.right)
        this.currentState.walking.right = false;
      else if (e.code === this.controls.debug)
        Game.debug = !Game.debug;
    };
  }

  static handlePlayerMove() {
    if (this.currentState.walking.up) Game.playerEntity.move(Direction.NORTH);
    if (this.currentState.walking.down) Game.playerEntity.move(Direction.SOUTH);
    if (this.currentState.walking.left) Game.playerEntity.move(Direction.WEST);
    if (this.currentState.walking.right) Game.playerEntity.move(Direction.EST);
  }
}