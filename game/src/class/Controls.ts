import { Direction } from "../enum/direction";
import Debug from "./Debug";
import Game from "./Game";
import Healbar from "./Healbar";
import Inventory from "./Inventory";

export default abstract class Controls {
  static controls = {
    debug: "KeyR",
    inventory: "KeyI",
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
    },

  };

  static setup() {

    window.onkeydown = (e) => {
      e.preventDefault();
      if (e.code === this.controls.walking.up  && !Inventory.visible)
        this.currentState.walking.up = true;
      else if (e.code === this.controls.walking.down  && !Inventory.visible)
        this.currentState.walking.down = true;
      else if (e.code === this.controls.walking.left  && !Inventory.visible)
        this.currentState.walking.left = true;
      else if (e.code === this.controls.walking.right  && !Inventory.visible)
        this.currentState.walking.right = true;
    };

    window.onkeyup = (e) => {
      e.preventDefault()

      if (e.code === this.controls.walking.up){
        if(!Inventory.visible)
        this.currentState.walking.up = false;
        else
        console.log("Inventaire haut");
      }
      else if (e.code === this.controls.walking.down){
        if(!Inventory.visible)
        this.currentState.walking.down = false;
        else
        console.log("Inventaire bas");
      }
      else if (e.code === this.controls.walking.left){
        if(!Inventory.visible)
        this.currentState.walking.left = false;
        else
        console.log("Inventaire gauche");
      }
      else if (e.code === this.controls.walking.right){
        if(!Inventory.visible)
        this.currentState.walking.right = false;
        else
        console.log("Inventaire droite");
      }
        
      else if (e.code === "F5")
        location.reload();
      else if (e.code === this.controls.debug)
        Game.debug = !Game.debug;
      else if (Game.debug)
        Debug.debugControls(e); // Must be in last
      else if (e.code === this.controls.inventory){
        if(!Inventory.visible){
          Inventory.display();
          Inventory.visible = true ;
        }else{
          Inventory.hide();
          Inventory.visible = false;
        }
      }
    };
  }

  static handlePlayerMove() {
    if (this.currentState.walking.up) Game.playerEntity.move(Direction.NORTH);
    if (this.currentState.walking.down) Game.playerEntity.move(Direction.SOUTH);
    if (this.currentState.walking.left) Game.playerEntity.move(Direction.WEST);
    if (this.currentState.walking.right) Game.playerEntity.move(Direction.EST);
  }
}