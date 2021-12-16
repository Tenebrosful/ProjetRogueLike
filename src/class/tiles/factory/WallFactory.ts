import { Wall } from "../Wall";
import { TileFactory } from "./TileFactory";

export class WallFactory implements TileFactory {
  createTile(params: {posX: number, posY: number}): Wall {
    console.log(`Creating Wall with at [${params.posX};${params.posY}]`);
    return new Wall(params);
  }
}