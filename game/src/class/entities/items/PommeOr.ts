import Item from "./Item";
import Game from "../../Game";
import Logger from "../../Logger";

export default class PommeOr extends Item {

  name = "Pomme dorée";
  currentSprite = "items/pommeOr.png";

  healValue = 10;

  hitbox = {
    offset: {
      x: 6,
      y: 16
    },
    size: {
      height: 64,
      width: 58
    }
  };

  use(): boolean {
   
    if (Game.playerEntity.life !== Game.playerEntity.maxLife) 
      if (Game.playerEntity.life <= Game.playerEntity.maxLife- this.healValue) {
        Game.playerEntity.life += this.healValue;
        Game.playerEntity.updateLifeBar();
        Logger.log("On a mangé une pomme");
        return true;
      }else{
        Game.playerEntity.life = Game.playerEntity.maxLife;
        Game.playerEntity.updateLifeBar();
        Logger.log("On a mangé une pomme");
        return true;
      }
      Logger.log("Votre vie est au maximum !");
       return false;
  }
}