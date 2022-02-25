import Item from "./Item";

export default class Treasure extends Item {

 name = "Pomme dorée";
 currentSprite = "items/treasure.png";

 hitbox = {
   offset: {
     x: 4,
     y: 20
   },
   size: {
     height: 64,
     width: 60
   }
 };

    use(): void {
       console.log("gold +100");
    }
}