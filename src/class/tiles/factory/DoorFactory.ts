import { Direction } from "../../../enum/direction";
import { Door } from "../Door";
import { TileFactory } from "./TileFactory";

export class DoorFactory implements TileFactory {
  /**
   * If direction is null, it's set to NORTH by default
   */
  createTile(params: {posX: number, posY: number, direction?: Direction}): Door {
    params.direction = params.direction ?? Direction.NORTH;

    console.log(`Creating Door with at [${params.posX};${params.posY}] ${params.direction}`);
    return new Door({posX: params.posX, posY: params.posY}, params.direction);
  }
}