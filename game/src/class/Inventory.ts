import Item from "./entities/items/Item";
import Game from "./Game";

export default class Inventory {
    maxPlace = 40;
    itemList;
    public static posSelector = 0;
    public static div = document.getElementById("inventory") as HTMLDivElement;
    public static visible = false as boolean;
    public static InventoryImgs = Inventory.div.children;

    constructor(itemList: Array<Item>) {
      this.itemList = itemList;
    }

    canAddItem(){
      if(this.itemList.length + 1 <= this.maxPlace) // + 1 Pour corriger le fait qu'un tableau commence à 0
        return true;
      
      return false;
    }
    add(item: Item){
      this.itemList.push(item);
      Inventory.div.innerHTML += "<img \" src=\"/static/img/" + item.currentSprite +  "\"/>"; 
      Game.playerEntity.collectedItems++ ;
      // Mettre un ID sur l'image pour la retirer
      // En cas d'utilisation
    }

    /* static remove(){

    }*/

    static display(){
      Inventory.div.style.display = "inline";
      // Inventory.add();
    }

    static hide(){
      Inventory.div.style.display = "none";
    }
  }