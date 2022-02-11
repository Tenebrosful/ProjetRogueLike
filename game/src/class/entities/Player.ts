import { Direction, InvertDirection } from "../../enum/direction";
import { entityType } from "../../enum/entityType";
import { EntitySprites } from "../../typing/entity";
import { Coordinates } from "../../typing/tiles";
import Game from "../Game";
import GameRender from "../GameRender";
import Logger from "../Logger";
import Stage from "../Stage";
import Door from "../tiles/Door";
import Tile from "../tiles/Tile";
import Entity from "./Entity";

export default class Player extends Entity {
  static DEFAULT_MOVESPEED = 5;
  static NO_CLIP_MOVESPEED = 15;

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
  movementSpeed = 5;
  
  canMoveTo(coordsDeplacementOne: Coordinates): boolean {
    if (Game.debug && Game.debug_player_noclip) return true;
    return super.canMoveTo(coordsDeplacementOne);
  }
}