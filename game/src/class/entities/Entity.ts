import { Direction } from "../../enum/direction";
import { EntitySprites } from "../../typing/entitySprites";
import { Coordinates } from "../../typing/tiles";
import Game from "../Game";
import Logger from "../Logger";

export default abstract class Entity {
  static DEFAULT_SPRITE = "entity_default.png";

  coords: Coordinates;
  sprites: EntitySprites;

  currentSprite: string;
  movementSpeed: number;

  hitbox : {
    offset : {
      x: number,
      y: number
    },
    size : {
      width : number,
      height : number
    }
  }

  constructor(coords: Coordinates = {posX: 0, posY: 0}) {
    this.coords = coords;
  }

  move(direction: Direction) {
    Logger.log(`Je seuis en : ${this.coords.posX} , ${this.coords.posY}`, 'GAME');
    let tileX = Math.trunc(this.coords.posX / 64) ;
    let tileY = Math.trunc(this.coords.posY / 64) ;
    Logger.log(`La case correspondante est la ${tileX},${tileY}`);
    switch (direction) {
      case Direction.NORTH:
        if(!this.canMove({posX:this.coords.posX, posY:this.coords.posY - this.movementSpeed}))return;
        this.coords.posY -= this.movementSpeed;
        this.currentSprite = this.sprites.walking?.up || Entity.DEFAULT_SPRITE;
        break;
      case Direction.SOUTH:
        if(!this.canMove({posX:this.coords.posX, posY:this.coords.posY + this.movementSpeed}))return;
        this.coords.posY += this.movementSpeed;
        this.currentSprite = this.sprites.walking?.down || Entity.DEFAULT_SPRITE;
        break;
      case Direction.WEST:
        if(!this.canMove({posX:this.coords.posX - this.movementSpeed, posY:this.coords.posY}))return;
        this.coords.posX -= this.movementSpeed;
        this.currentSprite = this.sprites.walking?.left || Entity.DEFAULT_SPRITE;
        break;
      case Direction.EST:
        if(!this.canMove({posX:this.coords.posX + this.movementSpeed, posY:this.coords.posY}))return;
        this.coords.posX += this.movementSpeed;
        this.currentSprite = this.sprites.walking?.right || Entity.DEFAULT_SPRITE;
        break;
    }
  }

  canMove(coordsDeplacement:Coordinates){
    Logger.log(`Je tente d'aller en : ${coordsDeplacement.posX} , ${coordsDeplacement.posY}`, 'GAME');
    let tileX = Math.trunc(coordsDeplacement.posX / 64) ;
    let tileY = Math.trunc(coordsDeplacement.posY / 64) ;
    Logger.log(`La case correspondante est la ${tileX},${tileY}`);
    let tuile = Game.currentRoom.tiles[tileY]?.[tileX];
    if (!tuile) return false;
    Logger.log(`Le type de case : ${tuile.type}`);
    if (!tuile.canWalkThrough)return false;

    return true;
  }

  idle() {
    this.currentSprite = this.sprites.idle || Entity.DEFAULT_SPRITE;
  }
}