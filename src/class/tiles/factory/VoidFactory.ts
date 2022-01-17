import { LogType } from "../../../enum/logType";
import { Logger } from "../../Logger";
import { Void } from "../Void";
import { TileFactory } from "./TileFactory";

export class VoidFactory implements TileFactory {
  createTile(params: {posX: number, posY: number}): Void {
    Logger.log(`Creating Void with at [${params.posX};${params.posY}]`, LogType.ROOM_GENERATION);
    return new Void(params);
  }
}