import { Logger } from "../../Logger";
import { Error } from "../Error";
import { TileFactory } from "./TileFactory";

export class ErrorFactory implements TileFactory {
  createTile(params: { posX: number, posY: number }): Error {
    Logger.log(`Creating Error with at [${params.posX};${params.posY}]`, "ROOM");
    return new Error(params);
  }
}