import IAMovement from "../ia/movement/IAMovement";
import IAInteract from "../ia/movement/IAInteract";
import Entity from "./Entity";

export default abstract class ThinkingEntity extends Entity {
  iaMovement: IAMovement;
  iaInteract: IAInteract;
}