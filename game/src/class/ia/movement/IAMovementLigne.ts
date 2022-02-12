import { Direction } from "../../../enum/direction";
import Entity from "../../entities/Entity";
import IAMovement from "./IAMovement";

export default class IAMovementLigne extends IAMovement {
  private _movementState = 0;

  think(self: Entity) {
    if (this._movementState <= 400) self.move(Direction.WEST);
    else if (this._movementState <= 800) self.move(Direction.EST);
    else { this._movementState = 0; self.idle(); return; }

    this._movementState += 2;
  }
}