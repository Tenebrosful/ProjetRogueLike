import Entity from "../../entities/Entity";

export default abstract class IAMovement {
  abstract think(self: Entity): void;
}