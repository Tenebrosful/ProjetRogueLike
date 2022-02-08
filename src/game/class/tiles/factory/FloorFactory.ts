import { Logger } from "../../Logger";
import { Floor } from "../Floor";
import { TileFactory } from "./TileFactory";

export class FloorFactory implements TileFactory {
  createTile(params: { posX: number, posY: number }): Floor {
    Logger.log(`Creating Floor with at [${params.posX};${params.posY}]`, "ROOM");
    return new Floor(params);
  }
}