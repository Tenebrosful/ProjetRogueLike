import { Direction } from "../../../enum/direction";
import { Logger } from "../../Logger";
import { Door } from "../Door";
import { TileFactory } from "./TileFactory";

export class DoorFactory implements TileFactory {
  /**
   * If direction is null, it's set to NORTH by default
   */
  createTile(params: { posX: number, posY: number, direction?: Direction }): Door {
    params.direction = params.direction ?? Direction.NORTH;

    Logger.log(`Creating Door with at [${params.posX};${params.posY}] ${params.direction}`, "ROOM");
    return new Door({ posX: params.posX, posY: params.posY }, params.direction);
  }
}