import { RandomSeed } from "random-seed";
import { Room } from "./Room";

export class Stage {
  rooms: Room[][];

  constructor(seed: RandomSeed) {
    // @TODO
  }

  static generateRandom(seed: RandomSeed) {
    return new Stage(seed);
  }
}