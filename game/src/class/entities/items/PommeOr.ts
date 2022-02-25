import Item from "./Item";
import Game from "../../Game";
import Logger from "../../Logger";

export default class PommeOr extends Item {

  name = "Pomme dorée";
  currentSprite = "items/pommeOr.png";

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

  use(): void {
    Logger.log("On a mangé une pomme");
    if (Game.playerEntity.life !== 100) 
      if (Game.playerEntity.life < 90) 
        Game.playerEntity.life += 10;
      
      else
        Game.playerEntity.life = 100;
    

  }
}