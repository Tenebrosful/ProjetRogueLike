import Logger from "../../Logger";
import Void from "../Void";
import TileFactory from "./TileFactory";

export default class VoidFactory implements TileFactory {
  createTile(params: { posX: number, posY: number }): Void {
    Logger.log(`Creating Void with at [${params.posX};${params.posY}]`, "ROOM");
    return new Void(params);
  }
}