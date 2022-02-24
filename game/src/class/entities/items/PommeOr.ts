import Item from "./Item"
import Game from "../../Game";

export default class PommeOr extends Item {

 name = "Pomme dorée";
 currentSprite = "items/pommeOr.png";

    use(): void {
        if(  Game.playerEntity.life != 100){
            if( Game.playerEntity.life < 90){
                Game.playerEntity.life += 10;
            }else{
                Game.playerEntity.life = 100;
            }
        }
       
    }
}