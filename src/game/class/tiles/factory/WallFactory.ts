import Logger from "../../Logger";
import Wall from "../Wall";
import TileFactory from "./TileFactory";

export default class WallFactory implements TileFactory {
  createTile(params: { posX: number, posY: number }): Wall {
    Logger.log(`Creating Wall with at [${params.posX};${params.posY}]`, "ROOM");
    return new Wall(params);
  }
}