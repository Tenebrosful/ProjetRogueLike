import { entityType } from "../../enum/entityType";
import iLifeBar from "../../interface/iLifeBar";
import { EntitySprites } from "../../typing/entity";
import { Coordinates } from "../../typing/tiles";
import Game from "../Game";
import GameRender from "../GameRender";
import Inventory from "../Inventory";
import Logger from "../Logger";
import Entity from "./Entity";

export default class Player extends Entity implements iLifeBar {
  static DEFAULT_MOVESPEED = 5;
  static NO_CLIP_MOVESPEED = 15;

  type = entityType.PLAYER;

  name = "Joueur";
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
  inventory: Inventory;

  movementSpeed = 5;
  maxLife = 100;
  life = 71;
  gold = 0;

  killedMonster = 0;
  coveredStage = 0;
  collectedItems = 0;
  
  date = new Date();

  updateLifeBar(): void {
    const lifeBar = document.getElementById("progress-bar") as HTMLProgressElement;
    if(!lifeBar) return;
    lifeBar.value = Game.playerEntity.life;
  }

  canMoveTo(coordsDeplacementOne: Coordinates): boolean {
    if (Game.debug && Game.debug_player_noclip) return true;
    return super.canMoveTo(coordsDeplacementOne);
  }

  getHurt(damage: number): void {
    this.life -= damage;
    Logger.log(`Points de vie du joueur: ${this.life}`, "GAME");
    if (!this.isStillALive()){
      Game.end();
      GameRender.clearFightInterface(); 
    }
    this.updateLifeBar();
  }
  isStillALive(): boolean {
    return this.life > 0;
  }
}
