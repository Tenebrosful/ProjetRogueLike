import { entityType } from "../../../enum/entityType";
import Entity from "../Entity";

export default abstract class Item extends Entity {
  type = entityType.ITEM;
  movementSpeed = 0;
  canFly = false;

  abstract use() : void;
  }