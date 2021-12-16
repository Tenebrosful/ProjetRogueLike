import { Floor } from "../Floor";
import { TileFactory } from "./TileFactory";

export class FloorFactory implements TileFactory {
  createTile(params: {posX: number, posY: number}): Floor {
    console.log(`Creating Floor with at [${params.posX};${params.posY}]`);
    return new Floor(params);
  }
}