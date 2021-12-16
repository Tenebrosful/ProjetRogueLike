import { Void } from "../Void";
import { TileFactory } from "./TileFactory";

export class VoidFactory implements TileFactory {
  createTile(params: {posX: number, posY: number}): Void {
    console.log(`Creating Void with at [${params.posX};${params.posY}]`);
    return new Void(params);
  }
}