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

  getHitbox(): Hitbox {
    return {
      botLeft: {
        posX: this.coords.posX,
        posY: this.coords.posY + this.hitbox.size.height
      },
      botRight: {
        posX: this.coords.posX + this.hitbox.size.width - this.hitbox.offset.x,
        posY: this.coords.posY + this.hitbox.offset.y
      },
      topLeft: {
        posX: this.coords.posX,
        posY: this.coords.posY + this.hitbox.offset.y
      },
      topRight: {
        posX: this.coords.posX + this.hitbox.size.width - this.hitbox.offset.x,
        posY: this.coords.posY + this.hitbox.offset.y
      }
    };
  }

  move(direction: Direction) {
    let hitbox = this.getHitbox();

    switch (direction) {
      case Direction.NORTH:
        if (!this.canMoveTo({ posX: hitbox.topLeft.posX, posY: hitbox.topLeft.posY - this.movementSpeed }) ||
          !this.canMoveTo({ posX: hitbox.topRight.posX, posY: hitbox.topRight.posY - this.movementSpeed })) return;

        this.coords.posY -= this.movementSpeed;
        this.currentSprite = this.sprites.walking?.up || Entity.DEFAULT_SPRITE;
        break;

      case Direction.SOUTH:
        if (!this.canMoveTo({ posX: hitbox.botLeft.posX, posY: hitbox.botLeft.posY + this.movementSpeed }) ||
          !this.canMoveTo({ posX: hitbox.botRight.posX, posY: hitbox.botRight.posY + this.movementSpeed })) return;

        this.coords.posY += this.movementSpeed;
        this.currentSprite = this.sprites.walking?.down || Entity.DEFAULT_SPRITE;
        break;

      case Direction.WEST:
        if (!this.canMoveTo({ posX: hitbox.topLeft.posX - this.movementSpeed, posY: hitbox.topLeft.posY }) ||
          !this.canMoveTo({ posX: hitbox.botLeft.posX - this.movementSpeed, posY: hitbox.botLeft.posY })) return;

        this.coords.posX -= this.movementSpeed;
        this.currentSprite = this.sprites.walking?.left || Entity.DEFAULT_SPRITE;
        break;

      case Direction.EST:
        if (!this.canMoveTo({ posX: hitbox.topRight.posX + this.movementSpeed, posY: hitbox.topRight.posY }) ||
          !this.canMoveTo({ posX: hitbox.botRight.posX + this.movementSpeed, posY: hitbox.botRight.posY })) return;

        this.coords.posX += this.movementSpeed;
        this.currentSprite = this.sprites.walking?.right || Entity.DEFAULT_SPRITE;
        break;

      case Direction.NORTH_WEST:
        if (!this.canMoveTo({ posX: hitbox.topLeft.posX + this.movementSpeed * ((-Math.sqrt(2)) / 2), posY: hitbox.topLeft.posY + this.movementSpeed * ((Math.sqrt(2)) / 2) }) ||
          !this.canMoveTo({ posX: hitbox.botLeft.posX + this.movementSpeed * ((-Math.sqrt(2)) / 2), posY: hitbox.botLeft.posY + this.movementSpeed * ((Math.sqrt(2)) / 2) }) ||
          !this.canMoveTo({ posX: hitbox.topRight.posX + this.movementSpeed * ((-Math.sqrt(2)) / 2), posY: hitbox.topRight.posY + this.movementSpeed * ((Math.sqrt(2)) / 2) })) return;

        this.coords.posX += this.movementSpeed * ((-Math.sqrt(2)) / 2);
        this.coords.posY -= this.movementSpeed * ((Math.sqrt(2)) / 2);
        this.currentSprite = this.sprites.walking?.left || Entity.DEFAULT_SPRITE;
        break;

      case Direction.NORTH_EST:
        if (!this.canMoveTo({ posX: hitbox.topRight.posX + this.movementSpeed * ((Math.sqrt(2)) / 2), posY: hitbox.topRight.posY + this.movementSpeed * ((Math.sqrt(2)) / 2) }) ||
          !this.canMoveTo({ posX: hitbox.botRight.posX + this.movementSpeed * ((Math.sqrt(2)) / 2), posY: hitbox.botRight.posY + this.movementSpeed * ((Math.sqrt(2)) / 2) }) ||
          !this.canMoveTo({ posX: hitbox.topLeft.posX + this.movementSpeed * ((Math.sqrt(2)) / 2), posY: hitbox.topLeft.posY + this.movementSpeed * ((Math.sqrt(2)) / 2) })) return;

        this.coords.posX += this.movementSpeed * ((Math.sqrt(2)) / 2);
        this.coords.posY -= this.movementSpeed * ((Math.sqrt(2)) / 2);
        this.currentSprite = this.sprites.walking?.right || Entity.DEFAULT_SPRITE;
        break;

      case Direction.SOUTH_WEST:
        if (!this.canMoveTo({ posX: hitbox.topLeft.posX + this.movementSpeed * ((-Math.sqrt(2)) / 2), posY: hitbox.topLeft.posY + this.movementSpeed * ((-Math.sqrt(2)) / 2) }) ||
          !this.canMoveTo({ posX: hitbox.botRight.posX + this.movementSpeed * ((-Math.sqrt(2)) / 2), posY: hitbox.botRight.posY + this.movementSpeed * ((-Math.sqrt(2)) / 2) }) ||
          !this.canMoveTo({ posX: hitbox.botLeft.posX + this.movementSpeed * ((-Math.sqrt(2)) / 2), posY: hitbox.botLeft.posY + this.movementSpeed * ((-Math.sqrt(2)) / 2) })) return;

        this.coords.posX += this.movementSpeed * ((-Math.sqrt(2)) / 2);
        this.coords.posY -= this.movementSpeed * ((-Math.sqrt(2)) / 2);
        this.currentSprite = this.sprites.walking?.left || Entity.DEFAULT_SPRITE;
        break;

      case Direction.SOUTH_EST:
        if (!this.canMoveTo({ posX: hitbox.topRight.posX + this.movementSpeed * ((Math.sqrt(2)) / 2), posY: hitbox.topRight.posY + this.movementSpeed * ((-Math.sqrt(2)) / 2) }) ||
          !this.canMoveTo({ posX: hitbox.botRight.posX + this.movementSpeed * ((Math.sqrt(2)) / 2), posY: hitbox.botRight.posY + this.movementSpeed * ((-Math.sqrt(2)) / 2) }) ||
          !this.canMoveTo({ posX: hitbox.botLeft.posX + this.movementSpeed * ((Math.sqrt(2)) / 2), posY: hitbox.botLeft.posY + this.movementSpeed * ((-Math.sqrt(2)) / 2) })) return;

        this.coords.posX += this.movementSpeed * ((Math.sqrt(2)) / 2);
        this.coords.posY -= this.movementSpeed * ((-Math.sqrt(2)) / 2);
        this.currentSprite = this.sprites.walking?.right || Entity.DEFAULT_SPRITE;
        break;
    }




  canMoveTo(coords: Coordinates) {
    const tile = Game.currentRoom.getTilePixelCoords(coords);
    
    if (!tile) return false;
    if (!tile.canWalkThrough && !(tile.canFlyOver && this.canFly)) return false;

    return true;
  }

  idle() {
    this.currentSprite = this.sprites.idle || Entity.DEFAULT_SPRITE;
  }

  isPlayer(): this is Player {
    return this.type === entityType.PLAYER;
  }

  isEnemy(): this is Enemy {
    return this.type === entityType.ENEMY;
  }
}