export default class Controls {
  static controls = {
    walking: {
      down: "ArrowDown",
      left: "ArrowLeft",
      right: "ArrowRight",
      up: "ArrowUp"
    }
  };

  static currentState = {
    walking: {
      down: false,
      left: false,
      right: false,
      up: false
    }
  };

  static async setup() {

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
    };
  }
}