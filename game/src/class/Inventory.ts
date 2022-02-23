import Game from "./Game";

export default abstract class Inventory {
    public static itemList = new Array(40);
    private static div = document.getElementById("inventory") as HTMLDivElement;
    public static visible = false as Boolean;


    static add(){
      if(this.itemList.length <= 40){
        // Inventory.itemList.push(item);
      Inventory.div.innerHTML += '<img src="/static/img/items/pommeOr.png"/>';
      return true;
      }
      return false;
    }

    static remove(){

    }

    static display(){
      Inventory.div.style.display = "inline";
      Inventory.add();
    }

    static hide(){
      Inventory.div.style.display = "none";
    }
  }