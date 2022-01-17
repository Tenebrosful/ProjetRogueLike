import { LogType } from "../../../enum/logType";
import { Logger } from "../../Logger";
import { Wall } from "../Wall";
import { TileFactory } from "./TileFactory";

export class WallFactory implements TileFactory {
  createTile(params: { posX: number, posY: number }): Wall {
    Logger.log(`Creating Wall with at [${params.posX};${params.posY}]`, LogType.ROOM_GENERATION);
    return new Wall(params);
  }
}