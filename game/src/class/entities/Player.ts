import { Direction, InvertDirection } from "../../enum/direction";
import { entityType } from "../../enum/entityType";
import { EntitySprites } from "../../typing/entitySprites";
import { Coordinates } from "../../typing/tiles";
import Game from "../Game";
import GameRender from "../GameRender";
import Logger from "../Logger";
import Stage from "../Stage";
import Entity from "./Entity";

export default class Player extends Entity {
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

  move(direction: Direction){
    super.move(direction);
    this.handleDoorCollision();
  }

  handleDoorCollision(){
    const tileX = Math.trunc(this.coords.posX / GameRender.TILE_SIZE);
    const tileY = Math.trunc(this.coords.posY / GameRender.TILE_SIZE);
    const playerCoords: Coordinates = { posX: tileX, posY: tileY } // point en haut à gauche 
    const tile = Game.currentRoom.getTile(playerCoords);
    if(! tile?.isDoor())return;
    let newRoom;
    switch (tile.direction){
      case Direction.NORTH:
        newRoom = Game.currentStage.rooms[Game.currentRoom.coords.posY + 1 ]?.[Game.currentRoom.coords.posX]
        break;
      case Direction.SOUTH:
        newRoom = Game.currentStage.rooms[Game.currentRoom.coords.posY - 1 ]?.[Game.currentRoom.coords.posX]
        break;
      case Direction.EST:
        newRoom = Game.currentStage.rooms[Game.currentRoom.coords.posY ]?.[Game.currentRoom.coords.posX + 1]
        Logger.logObject(Game.currentStage.rooms,'GAME');
        break;
      case Direction.WEST:
        newRoom = Game.currentStage.rooms[Game.currentRoom.coords.posY ]?.[Game.currentRoom.coords.posX - 1]
        break;
    }
    if (!newRoom) throw new Error;
    Game.changeRoom(newRoom, InvertDirection(tile.direction))
    //changer de salle
  }
  canMoveTo(coordsDeplacementOne: Coordinates, coordsDeplacementDeux: Coordinates): boolean {
    if (Game.debug && Game.debug_player_noclip) return true;
    return super.canMoveTo(coordsDeplacementOne,  coordsDeplacementDeux);
  }
}