import Item from "./entities/items/Item";

export default class Inventory {
    maxPlace = 40
    itemList;
    private static div = document.getElementById("inventory") as HTMLDivElement;
    public static visible = false as boolean;

    constructor(itemList: Array<Item>) {
      this.itemList = itemList;
    }

    canAddItem(){
      if(this.itemList.length <= this.maxPlace){
        return true
      }
      return false
    }
    add(item: Item){
      this.itemList.push(item);
      Inventory.div.innerHTML += '<img src="/static/img/items/pommeOr.png"/>'; 
      //Mettre un ID sur l'image pour la retirer
      //En cas d'utilisation
    }

    /* static remove(){

    }*/

    static display(){
      Inventory.div.style.display = "inline";
      //Inventory.add();
    }

    static hide(){
      Inventory.div.style.display = "none";
    }
  }