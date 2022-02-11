import { entityType } from "../../enum/entityType";
import iLifeEntity from "../../interface/iLifeEntity";
import { EntitySprites } from "../../typing/entitySprites";
import { Coordinates } from "../../typing/tiles";
import Game from "../Game";
import Logger from "../Logger";
import Entity from "./Entity";

export default class Player extends Entity implements iLifeEntity {
    
  type = entityType.PLAYER;

  sprites: EntitySprites = {
    walking: {
      down: "player/playerL.png",
      left: "player/playerL.png",
      right: "player/playerR.png",
      up: "player/playerR.png"
    }
  };

  hitbox = {
    offset: {
      x: 0,
      y: 30 // On positionne la hitbox au niveau des pieds du personnage
    },
    size: {
      height: 64,
      width: 47
    }
  };

  canFly = false;

  currentSprite = this.sprites.walking?.left || Entity.DEFAULT_SPRITE;
  life = 100;
  movementSpeed = 2;
  
  killedMonster = 0;
  coveredStage = 0;
  collectedItems = 0;
  date = new Date();
  

  canMoveTo(coordsDeplacementOne: Coordinates, coordsDeplacementDeux: Coordinates): boolean {
    if (Game.debug && Game.debug_player_noclip) return true;
    return super.canMoveTo(coordsDeplacementOne,  coordsDeplacementDeux);
  }
  getHurt(damage: number): void {
    this.life -= damage;
    Logger.log(`Points de vie : ${this.life}`,"GAME");
    if(!this.isStillALive())
      Game.end()
    ; 
  }
  isStillALive(): boolean {
    return this.life > 0;
  }
}
  