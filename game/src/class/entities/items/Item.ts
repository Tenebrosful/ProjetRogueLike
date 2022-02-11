import { entityType } from "../../../enum/entityType";
import Entity from "../Entity";

export default abstract class Item extends Entity {

  distanceFromPlayer: number;

  type = entityType.ITEM;
}