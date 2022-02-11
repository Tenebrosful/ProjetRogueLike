import { entityType } from "../../../enum/entityType";
import ThinkingEntity from "../ThinkingEntity";

export default abstract class Item extends ThinkingEntity {

  distanceFromPlayer: number;

  type = entityType.ITEM;
}