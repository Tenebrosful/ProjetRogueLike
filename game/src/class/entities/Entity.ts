import { Direction } from "../../enum/direction";
import { EntitySprites } from "../../typing/entitySprites";
import { Coordinates } from "../../typing/tiles";

export default abstract class Entity {
  static DEFAULT_SPRITE = "entity_default.png";

  coords: Coordinates;
  sprites: EntitySprites;

  currentSprite: string;
  movementSpeed: number;

  constructor(coords: Coordinates = {posX: 0, posY: 0}) {
    this.coords = coords;
  }

  move(direction: Direction) {
    switch (direction) {
      case Direction.NORTH:
        this.coords.posY -= this.movementSpeed;
        this.currentSprite = this.sprites.walking?.up || Entity.DEFAULT_SPRITE;
        break;
      case Direction.SOUTH:
        this.coords.posY += this.movementSpeed;
        this.currentSprite = this.sprites.walking?.down || Entity.DEFAULT_SPRITE;
        break;
      case Direction.WEST:
        this.coords.posX -= this.movementSpeed;
        this.currentSprite = this.sprites.walking?.left || Entity.DEFAULT_SPRITE;
        break;
      case Direction.EST:
        this.coords.posX += this.movementSpeed;
        this.currentSprite = this.sprites.walking?.up || Entity.DEFAULT_SPRITE;
        break;
    }
  }

  idle() {
    this.currentSprite = this.sprites.idle || Entity.DEFAULT_SPRITE;
  }
}