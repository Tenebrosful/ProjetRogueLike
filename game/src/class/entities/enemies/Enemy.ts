import { entityType } from "../../../enum/entityType";
import ThinkingEntity from "../ThinkingEntity";

export default abstract class Enemy extends ThinkingEntity {
  type = entityType.ENEMY;
}