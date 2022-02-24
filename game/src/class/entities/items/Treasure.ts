import Item from "./Item"
import Game from "../../Game";

export default class Treasure extends Item {

 name = "Pomme dorée";
 currentSprite = "items/treasure.png";

    use(): void {
       console.log("gold +100");
    }
}