import { Error } from "../Error";
import { TileFactory } from "./TileFactory";

export class ErrorFactory implements TileFactory {
  createTile(params: {posX: number, posY: number}): Error {
    console.log(`Creating Error with at [${params.posX};${params.posY}]`);
    return new Error(params);
  }
}