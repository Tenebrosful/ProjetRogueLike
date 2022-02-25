import { Direction } from "../../enum/direction";
import { entityType } from "../../enum/entityType";
import { EntitySprites, Hitbox } from "../../typing/entity";
import { Coordinates } from "../../typing/tiles";
import Game from "../Game";
import Logger from "../Logger";
import Enemy from "./enemies/Enemy";
import Player from "./Player";

export default abstract class Entity {
  static DEFAULT_SPRITE = "entity_default.png";

  type: entityType;

  coords: Coordinates;
  name: string;
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
      topRight: {
        posX: this.coords.posX + this.hitbox.size.width + this.hitbox.offset.x,
        posY: this.coords.posY + this.hitbox.offset.y
      },
      topLeft: {
        posX: this.coords.posX + this.hitbox.offset.x,
        posY: this.coords.posY + this.hitbox.offset.y
      },
      botRight: {
        posX: this.coords.posX + this.hitbox.size.width + this.hitbox.offset.x,
        posY: this.coords.posY + this.hitbox.size.height
      },
      botLeft: {
        posX: this.coords.posX + this.hitbox.offset.x,
        posY: this.coords.posY + this.hitbox.size.height
      },
    };
  }

  checkCollisionsWithHeros(){
    if(this.isPlayer())return false
    let collision = false
    let box = this.getHitbox()
    let herosBox = Game.playerEntity.getHitbox()
    // Si l'un des 4points de ma hitBox se situe entre le point haut gauche et point bas droite du héros, je suis en collision avec lui

    // Top left
    Logger.log(`Héros Top Left : ${herosBox.topLeft.posX},${herosBox.topLeft.posY}`)
    Logger.log(`Héros Top Right : ${herosBox.topRight.posX},${herosBox.topRight.posY}`)
    Logger.log(`Héros Bot Left : ${herosBox.botLeft.posX},${herosBox.botLeft.posY}`)
    Logger.log(`Héros Bot Right : ${herosBox.botRight.posX},${herosBox.botRight.posY}`)
    Logger.log(`Entity Top Left : ${box.topLeft.posX},${box.topLeft.posY}`)
    Logger.log(`Entity Top Right : ${box.topRight.posX},${box.topRight.posY}`)
    Logger.log(`Entity Bot Left : ${box.botLeft.posX},${box.botLeft.posY}`)
    Logger.log(`Entity Bot Right : ${box.botRight.posX},${box.botRight.posY}`)
    if (herosBox.topLeft.posX <= box.topLeft.posX && box.topLeft.posX <= herosBox.botRight.posX &&
        herosBox.topLeft.posY <= box.topLeft.posY && box.topLeft.posY <= herosBox.botRight.posY)
      {
        Logger.log("Collision avec top left")
        collision = true;
      }
    else 
    // Top Right
    if (herosBox.topLeft.posX <= box.topRight.posX && box.topRight.posX <= herosBox.botRight.posX &&
        herosBox.topLeft.posY <= box.topRight.posY && box.topRight.posY <= herosBox.botRight.posY)
        {
          Logger.log("Collision avec top right")
          collision = true;
        }
    else
    // Bot Left
    if (herosBox.topLeft.posX <= box.botLeft.posX && box.botLeft.posX <= herosBox.botRight.posX &&
        herosBox.topLeft.posY <= box.botLeft.posY && box.botLeft.posY <= herosBox.botRight.posY)
        {
          Logger.log("Collision avec bot left")
          collision = true;
        }
    else
    // Bot Right
    if (herosBox.topLeft.posX <= box.botRight.posX && box.botRight.posX <= herosBox.botRight.posX &&
        herosBox.topLeft.posY <= box.botRight.posY && box.botRight.posY <= herosBox.botRight.posY)
        {
          Logger.log("Collision avec bot right")
          collision = true;
        }
    return collision
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

    hitbox = this.getHitbox();

    const tilesIn = new Set([
      Game.currentRoom.getTilePixelCoords(hitbox.topLeft),
      Game.currentRoom.getTilePixelCoords(hitbox.topRight),
      Game.currentRoom.getTilePixelCoords(hitbox.botLeft),
      Game.currentRoom.getTilePixelCoords(hitbox.botRight)
    ]);

    //Logger.log(`${this.name} walking on`, "ENTITY");
    //Logger.logObject(tilesIn, "ENTITY");

    tilesIn.forEach(tile => {
      if (!tile) return;

      tile.walkOn(this);
    });
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