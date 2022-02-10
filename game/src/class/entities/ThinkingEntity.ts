import IAMovement from "../ia/movement/IAMovement";
import Entity from "./Entity";

export default abstract class ThinkingEntity extends Entity {
  iaMovement: IAMovement;
}