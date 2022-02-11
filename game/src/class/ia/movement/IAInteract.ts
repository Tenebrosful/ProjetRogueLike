import Entity from "../../entities/Entity";

export default abstract class IAInteract {
  abstract think(self: Entity): void;
}