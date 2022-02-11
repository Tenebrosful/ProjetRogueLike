import { Direction, InvertDirection } from "../../enum/direction";
import { entityType } from "../../enum/entityType";
import { EntitySprites } from "../../typing/entitySprites";
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

  move(direction: Direction) {
    super.move(direction);
    this.handleDoorCollision();
  }

  handleDoorCollision(){
    const tileOneX = Math.trunc(this.coords.posX / GameRender.TILE_SIZE);
    const tileOneY = Math.trunc(this.coords.posY / GameRender.TILE_SIZE);
    const tileTwoX = Math.trunc((this.coords.posX + this.hitbox.size.width ) / GameRender.TILE_SIZE);
    const tileTwoY = Math.trunc((this.coords.posY + this.hitbox.size.height)/ GameRender.TILE_SIZE);
    const playerTopLeftCoords: Coordinates = { posX: tileOneX, posY: tileOneY } // point en haut à gauche 
    const playerBottomRightCoords: Coordinates = { posX: tileTwoX, posY: tileTwoY } // point en bas à droite (bien penser a changer le tileX et y selon la taille du perso)
    const tileOne = Game.currentRoom.getTile(playerTopLeftCoords);
    const tileTwo = Game.currentRoom.getTile(playerBottomRightCoords);
    if( tileOne?.isDoor()){
      this.callChangeRoom(tileOne)
      return;
    }
    if( tileTwo?.isDoor()){
      this.callChangeRoom(tileTwo)
      return;
    }
  }
  callChangeRoom(door :Door){
    let newRoom;
    switch (door.direction){
      case Direction.NORTH:
        newRoom = Game.currentStage.getRoom({ posX: Game.currentRoom.coords.posX, posY: Game.currentRoom.coords.posY - 1 });
        break;
      case Direction.SOUTH:
        newRoom = Game.currentStage.getRoom({ posX: Game.currentRoom.coords.posX, posY: Game.currentRoom.coords.posY + 1 });
        break;
      case Direction.EST:
        newRoom = Game.currentStage.getRoom({ posX: Game.currentRoom.coords.posX + 1, posY: Game.currentRoom.coords.posY });
        break;
      case Direction.WEST:
        newRoom = Game.currentStage.getRoom({ posX: Game.currentRoom.coords.posX - 1, posY: Game.currentRoom.coords.posY });
    }

    if (!newRoom) throw new Error;
    
    Game.changeRoom(newRoom, InvertDirection(door.direction));
  }
  canMoveTo(coordsDeplacementOne: Coordinates, coordsDeplacementDeux: Coordinates): boolean {
    if (Game.debug && Game.debug_player_noclip) return true;
    return super.canMoveTo(coordsDeplacementOne, coordsDeplacementDeux);
  }
}