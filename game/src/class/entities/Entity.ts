import { Direction } from "../../enum/direction";
import { entityType } from "../../enum/entityType";
import { EntitySprites } from "../../typing/entitySprites";
import { Coordinates } from "../../typing/tiles";
import Game from "../Game";
import GameRender from "../GameRender";
import Enemy from "./enemies/Enemy";
import Player from "./Player";

export default abstract class Entity {
  static DEFAULT_SPRITE = "entity_default.png";

  type: entityType;

  coords: Coordinates;
  sprites: EntitySprites;

  canFly: boolean;

  currentSprite: string;
  movementSpeed: number;

  hitbox: {
    offset: {
      x: number,
      y: number
    },
    size: {
      width: number,
      height: number
    }
  };

  constructor(coords: Coordinates = { posX: 0, posY: 0 }) {
    this.coords = coords;
  }

  move(direction: Direction) {
    // Top - Left
    const coordsHitboxTopLeft = {
      x: this.coords.posX,
      y: this.coords.posY + this.hitbox.offset.y
    };
    // Top - Right
    const coordsHitboxTopRight = {
      x: this.coords.posX + this.hitbox.size.width - this.hitbox.offset.x,
      y: this.coords.posY + this.hitbox.offset.y
    };
    // Bot - Left 
    const coordsHitboxBotLeft = {
      x: this.coords.posX,
      y: this.coords.posY + this.hitbox.size.height
    };
    // Bot - Right
    const coordsHitboxBotRight = {
      x: this.coords.posX + this.hitbox.size.width - this.hitbox.offset.x,
      y: this.coords.posY + this.hitbox.size.height
    };

    switch (direction) {
      case Direction.NORTH:
        if (!this.canMoveTo({ posX: coordsHitboxTopLeft.x, posY: coordsHitboxTopLeft.y - this.movementSpeed },
          { posX: coordsHitboxTopRight.x, posY: coordsHitboxTopRight.y - this.movementSpeed })) return;
        this.coords.posY -= this.movementSpeed;
        this.currentSprite = this.sprites.walking?.up || Entity.DEFAULT_SPRITE;
        break;
      case Direction.SOUTH:
        if (!this.canMoveTo({ posX: coordsHitboxBotLeft.x, posY: coordsHitboxBotLeft.y + this.movementSpeed },
          { posX: coordsHitboxBotRight.x, posY: coordsHitboxBotRight.y + this.movementSpeed })) return;
        this.coords.posY += this.movementSpeed;
        this.currentSprite = this.sprites.walking?.down || Entity.DEFAULT_SPRITE;
        break;
      case Direction.WEST:
        if (!this.canMoveTo({ posX: coordsHitboxTopLeft.x - this.movementSpeed, posY: coordsHitboxTopLeft.y },
          { posX: coordsHitboxBotLeft.x - this.movementSpeed, posY: coordsHitboxBotLeft.y })) return;
        this.coords.posX -= this.movementSpeed;
        this.currentSprite = this.sprites.walking?.left || Entity.DEFAULT_SPRITE;
        break;
      case Direction.EST:
        if (!this.canMoveTo({ posX: coordsHitboxTopRight.x + this.movementSpeed, posY: coordsHitboxTopRight.y },
          { posX: coordsHitboxBotRight.x + this.movementSpeed, posY: coordsHitboxBotRight.y })) return;
        this.coords.posX += this.movementSpeed;
        this.currentSprite = this.sprites.walking?.right || Entity.DEFAULT_SPRITE;
        break;
      case Direction.NORTH_WEST:
        if (!this.canMoveTo({ posX: coordsHitboxTopRight.x + this.movementSpeed * ((-Math.sqrt(2)) / 2), posY: coordsHitboxTopRight.y + this.movementSpeed * ((Math.sqrt(2)) / 2) },
          { posX: coordsHitboxBotRight.x + this.movementSpeed * ((-Math.sqrt(2)) / 2), posY: coordsHitboxBotRight.y + this.movementSpeed * ((Math.sqrt(2)) / 2) })) return;
        this.coords.posX += this.movementSpeed * ((-Math.sqrt(2)) / 2);
        this.coords.posY -= this.movementSpeed * ((Math.sqrt(2)) / 2);
        this.currentSprite = this.sprites.walking?.left || Entity.DEFAULT_SPRITE;
        break;
      case Direction.NORTH_EST:
        if (!this.canMoveTo({ posX: coordsHitboxTopRight.x + this.movementSpeed * ((Math.sqrt(2)) / 2), posY: coordsHitboxTopRight.y + this.movementSpeed * ((Math.sqrt(2)) / 2) },
          { posX: coordsHitboxBotRight.x + this.movementSpeed * ((Math.sqrt(2)) / 2), posY: coordsHitboxBotRight.y + this.movementSpeed * ((Math.sqrt(2)) / 2) })) return;
        this.coords.posX += this.movementSpeed * ((Math.sqrt(2)) / 2);
        this.coords.posY -= this.movementSpeed * ((Math.sqrt(2)) / 2);
        this.currentSprite = this.sprites.walking?.right || Entity.DEFAULT_SPRITE;
        break;
      case Direction.SOUTH_WEST:
        if (!this.canMoveTo({ posX: coordsHitboxTopRight.x + this.movementSpeed * ((-Math.sqrt(2)) / 2), posY: coordsHitboxTopRight.y + this.movementSpeed * ((-Math.sqrt(2)) / 2) },
          { posX: coordsHitboxBotRight.x + this.movementSpeed * ((-Math.sqrt(2)) / 2), posY: coordsHitboxBotRight.y + this.movementSpeed * ((-Math.sqrt(2)) / 2) })) return;
        this.coords.posX += this.movementSpeed * ((-Math.sqrt(2)) / 2);
        this.coords.posY -= this.movementSpeed * ((-Math.sqrt(2)) / 2);
        this.currentSprite = this.sprites.walking?.left || Entity.DEFAULT_SPRITE;
        break;
      case Direction.SOUTH_EST:
        if (!this.canMoveTo({ posX: coordsHitboxTopRight.x + this.movementSpeed * ((Math.sqrt(2)) / 2), posY: coordsHitboxTopRight.y + this.movementSpeed * ((-Math.sqrt(2)) / 2) },
          { posX: coordsHitboxBotRight.x + this.movementSpeed * ((Math.sqrt(2)) / 2), posY: coordsHitboxBotRight.y + this.movementSpeed * ((-Math.sqrt(2)) / 2) })) return;
        this.coords.posX += this.movementSpeed * ((Math.sqrt(2)) / 2);
        this.coords.posY -= this.movementSpeed * ((-Math.sqrt(2)) / 2);
        this.currentSprite = this.sprites.walking?.right || Entity.DEFAULT_SPRITE;
        break;
    }
  }

  canMoveTo(coordsDeplacementOne: Coordinates, coordsDeplacementDeux: Coordinates) {
    // Premier coin
    const tileOneX = Math.trunc(coordsDeplacementOne.posX / GameRender.TILE_SIZE);
    const tileOneY = Math.trunc(coordsDeplacementOne.posY / GameRender.TILE_SIZE);

    const tuileOne = Game.currentRoom.tiles[tileOneY]?.[tileOneX];
    if (!tuileOne) return false;
    if (!tuileOne.canWalkThrough && !(tuileOne.canFlyOver && this.canFly)) return false;

    // Deuxieme coin
    const tileTwoX = Math.trunc(coordsDeplacementDeux.posX / GameRender.TILE_SIZE);
    const tileTwoY = Math.trunc(coordsDeplacementDeux.posY / GameRender.TILE_SIZE);

    const tuileTwo = Game.currentRoom.tiles[tileTwoY]?.[tileTwoX];
    if (!tuileTwo) return false;
    if (!tuileTwo.canWalkThrough && !(tuileTwo.canFlyOver && this.canFly)) return false;

    return true;
  }

  idle() {
    this.currentSprite = this.sprites.idle || Entity.DEFAULT_SPRITE;
  }

  onContact(){}

  isPlayer(): this is Player {
    return this.type === entityType.PLAYER;
  }

  isEnemy(): this is Enemy {
    return this.type === entityType.ENEMY;
  }
}