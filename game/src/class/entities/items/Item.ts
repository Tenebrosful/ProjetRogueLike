import Game from "../../Game";
import { Coordinates } from "../../../typing/tiles";
import { entityType } from "../../../enum/entityType";
import Entity from "../Entity";

export default abstract class Item extends Entity {
  type = entityType.ITEM;
  movementSpeed = 0;
  canFly = false;

  abstract use() : void;
  }