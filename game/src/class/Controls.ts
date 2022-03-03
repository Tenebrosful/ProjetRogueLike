import { Direction } from "../enum/direction";
import Debug from "./Debug";
import Item from "./entities/items/Item";
import Game from "./Game";
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
      e.preventDefault();

      if (e.code === this.controls.walking.up)
        if(!Inventory.visible)
        this.currentState.walking.up = false;
        else{
          if(Inventory.posSelector -10 >= 0 ){
            let emplacement = Inventory.InventoryImgs[Inventory.posSelector] as HTMLElement;
            emplacement.style.border = "none";
            Inventory.posSelector -= 10;
            console.log(Inventory.posSelector);
            emplacement = Inventory.InventoryImgs[Inventory.posSelector] as HTMLElement;
            emplacement.style.border = "solid";
          }
        }
      
      else if (e.code === this.controls.walking.down)
        if(!Inventory.visible)
        this.currentState.walking.down = false;
         else{
          if(Inventory.posSelector + 10 < Game.playerEntity.inventory.itemList.length ){
            let emplacement = Inventory.InventoryImgs[Inventory.posSelector] as HTMLElement;
            emplacement.style.border = "none";
            Inventory.posSelector+= 10;
            console.log(Inventory.posSelector);
            emplacement = Inventory.InventoryImgs[Inventory.posSelector] as HTMLElement;
            emplacement.style.border = "solid";
          }
        }
      else if (e.code === this.controls.walking.left)
        if(!Inventory.visible)
        this.currentState.walking.left = false;
        else{
          if(Inventory.posSelector > 0){
            let emplacement = Inventory.InventoryImgs[Inventory.posSelector] as HTMLElement;
            emplacement.style.border = "none";
            Inventory.posSelector--;
            console.log(Inventory.posSelector);
            emplacement = Inventory.InventoryImgs[Inventory.posSelector] as HTMLElement;
            emplacement.style.border = "solid";
          }
        }
      else if (e.code === this.controls.walking.right)
        if(!Inventory.visible)
        this.currentState.walking.right = false;
        else{
          if(Inventory.posSelector < Game.playerEntity.inventory.itemList.length -1){
            let emplacement = Inventory.InventoryImgs[Inventory.posSelector] as HTMLElement;
            emplacement.style.border = "none";
            Inventory.posSelector++;
            console.log(Inventory.posSelector);
            emplacement = Inventory.InventoryImgs[Inventory.posSelector] as HTMLElement;
            emplacement.style.border = "solid";
          }
        }
      else if (e.code === "F5")
        location.reload();
      else if (e.code === this.controls.debug)
        Game.debug = !Game.debug;
      else if (Game.debug)
        Debug.debugControls(e); // Must be in last
      else if (e.code === this.controls.inventory)
      {
        this.currentState.walking.up = false;
        this.currentState.walking.down = false;
        this.currentState.walking.right = false;
        this.currentState.walking.left = false;
        if(Game.playerEntity.inventory.itemList[0] !== null){
          let emplacement = Inventory.InventoryImgs[Inventory.posSelector] as HTMLElement;
          emplacement.style.border = "none";
          Inventory.posSelector = 0;
          emplacement = Inventory.InventoryImgs[Inventory.posSelector] as HTMLElement;
          emplacement.style.border = "solid";
        }
        if(!Inventory.visible){
          Inventory.display();
          Inventory.visible = true ;
        }else{
          Inventory.hide();
          Inventory.visible = false;
        }
      }
      else if (e.code === "Space")
        if(Inventory.visible){
          const item = Game.playerEntity.inventory.itemList[Inventory.posSelector] as Item;
          if(Game.playerEntity.inventory.itemList[Inventory.posSelector] !== null)
            if(item.use()){
              let emplacement = Inventory.InventoryImgs[Inventory.posSelector] as HTMLElement;
              emplacement.remove();
              console.log(Game.playerEntity.inventory.itemList);
              Game.playerEntity.inventory.itemList.splice(Inventory.posSelector, 1);
              console.log(Inventory.posSelector, "Pos selector");
              console.log(Game.playerEntity.life, "hp du perso");
              console.log(Game.playerEntity.inventory.itemList);
              if(Inventory.posSelector > 0){
                Inventory.posSelector -= 1;
                emplacement = Inventory.InventoryImgs[Inventory.posSelector] as HTMLElement;
                emplacement.style.border = "solid";
              }
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