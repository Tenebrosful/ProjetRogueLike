import { RandomSeed } from "random-seed";
import { Coordinates } from "../../typing/tiles";
import { Direction, InvertDirection } from "../enum/direction";
import { Room } from "./Room";

export class Stage {
  private static _baseRoomNumber = 8;
  private static _depthChanceInfluence = 1.5;
  private static _floorChanceInfluence = 0.1;

  private _maxRoomNumber: number;

  currentRoomNumber = 0;
  floor: number;
  isXL: boolean;
  rooms: Room[][] = [];

  constructor(params: { floor: number }, random: RandomSeed) {

    const start = Date.now();

    this.floor = Math.abs(params.floor);

    this.isXL = random.intBetween(1, 100) <= 10;

    this._maxRoomNumber = Math.floor(Stage._baseRoomNumber * (Math.max(this.floor / 3, 1)) * (this.isXL ? 2 : 1));

    console.log(`${Stage._baseRoomNumber} * ${(Math.max(this.floor / 3, 1))} * ${(this.isXL ? 2 : 1)} = ${this._maxRoomNumber}`);
    console.log(`Nombre de salle maximum : ${this._maxRoomNumber}${this.isXL ? " (XL)" : ""}`);

    const coordsSpawnRoom: Coordinates = {
      posX: Math.ceil(Math.sqrt(this._maxRoomNumber)),
      posY: Math.ceil(Math.sqrt(this._maxRoomNumber))
    };

    this.generateRoom(coordsSpawnRoom, null, 0, random);

    const stop = Date.now();

    console.log(stop - start, "ms");

    // console.log(this.rooms, this.rooms.length);
    console.log(this.renderTextStage());

  }

  static generateRandom(params: { floor: number }, seed: RandomSeed) {
    return new Stage(params, seed);
  }

  renderTextStage() {
    let res = "";
    for (let y = 0; y < this.rooms.length; y++) {
      if (!this.rooms[y]?.length) { res += " \n"; continue; }
      // @ts-ignore
      for (let x = 0; x < this.rooms[y].length; x++)
        res += this.rooms?.[y]?.[x] ? `[${x};${y}]` : "     ";
      res += "\n";
    }
    return res;
  }

  private generateNextRoom(coords: Coordinates, oldDirection: Direction | null, depth: number, rand: RandomSeed) {

    if (oldDirection !== Direction.NORTH && this.canGenerateMoreRoom()) {
      console.log(`[${coords.posX};${coords.posY}] trying to generate [${coords.posX};${coords.posY + 1}]`);
      this.generateNextRoomSpeceficDirection({ posX: coords.posX, posY: coords.posY + 1 }, Direction.NORTH, depth, rand);
    }
    if (oldDirection !== Direction.SOUTH && this.canGenerateMoreRoom() && coords.posY - 1 > 0) {
      console.log(`[${coords.posX};${coords.posY}] trying to generate [${coords.posX};${coords.posY - 1}]`);
      this.generateNextRoomSpeceficDirection({ posX: coords.posX, posY: coords.posY - 1 }, Direction.SOUTH, depth, rand);
    }
    if (oldDirection !== Direction.WEST && this.canGenerateMoreRoom() && coords.posX - 1 > 0) {
      console.log(`[${coords.posX};${coords.posY}] trying to generate [${coords.posX - 1};${coords.posY}]`);
      this.generateNextRoomSpeceficDirection({ posX: coords.posX - 1, posY: coords.posY }, Direction.WEST, depth, rand);
    }
    if (oldDirection !== Direction.EST && this.canGenerateMoreRoom()) {
      console.log(`[${coords.posX};${coords.posY}] trying to generate [${coords.posX + 1};${coords.posY}]`);
      this.generateNextRoomSpeceficDirection({ posX: coords.posX + 1, posY: coords.posY }, Direction.EST, depth, rand);
    }

  }

  private getProximityFactor(coords: Coordinates) {
    return 1 / (( // There is always a room next to 
      (this.rooms?.[coords.posX - 1]?.[coords.posY] ? 1 : 0) +
      (this.rooms?.[coords.posX + 1]?.[coords.posY] ? 1 : 0) +
      (this.rooms?.[coords.posX]?.[coords.posY - 1] ? 1 : 0) +
      (this.rooms?.[coords.posX]?.[coords.posY + 1] ? 1 : 0)
    ) * 2);
  }

  private generateNextRoomSpeceficDirection(coords: Coordinates, direction: Direction, depth: number, rand: RandomSeed) {
    if (this.rooms?.[coords.posX]?.[coords.posY]) { console.log(`Room [${coords.posX};${coords.posY}] already exist !`); return; } // Room already exist

    console.log(`(depth: ${depth}, floor: ${this.floor}, proximityFactor: ${this.getProximityFactor(coords)}) ${this.getChanceToGenerate(depth, this.getProximityFactor(coords))}% to generate [${coords.posX};${coords.posY}]`);

    if (rand.intBetween(1, 100) > this.getChanceToGenerate(depth, this.getProximityFactor(coords))) return;

    this.generateRoom(coords, direction, depth, rand);
  }

  private getChanceToGenerate(depth: number, proximityFactor: number) {
    if (depth === 1) return 100; // 100% de chance si c'est la première salle

    // console.log(`((1 / (${depth} * ${Stage._depthChanceInfluence})) * (${this.floor} * ${Stage._floorChanceInfluence})) * 100`);
    return Math.min(
      (
        (Math.exp(-depth * Stage._depthChanceInfluence) * 60)
        * (Math.log(this.floor) * Stage._floorChanceInfluence + 1)
        * proximityFactor)
      * 100
      , 100);
  }

  private generateRoom(coords: Coordinates, direction: Direction | null, depth: number, rand: RandomSeed) {
    if (!this.rooms) this.rooms = [];

    if (!this.rooms[coords.posX]) this.rooms[coords.posX] = [];

    console.log(`Generate room [${coords.posX};${coords.posY}]`);

    // @ts-ignore
    this.rooms[coords.posX][coords.posY] = Room.generateRandom(rand);
    this.currentRoomNumber++;

    console.log(`Salles restantes à générer : ${this._maxRoomNumber - this.currentRoomNumber} / ${this._maxRoomNumber}`);

    if (this.canGenerateMoreRoom())
      this.generateNextRoom(coords, direction ? InvertDirection(direction) : null, depth + 1, rand);
  }

  private canGenerateMoreRoom() {
    return this.currentRoomNumber < this._maxRoomNumber;
  }

}

function resolveChanceDirection(direction: Direction, chanceToGenerateNextRoom: ChanceToGenerateNextRoom) {
  switch (direction) {
    case Direction.NORTH:
      return chanceToGenerateNextRoom.up;
    case Direction.SOUTH:
      return chanceToGenerateNextRoom.down;
    case Direction.WEST:
      return chanceToGenerateNextRoom.left;
    case Direction.EST:
      return chanceToGenerateNextRoom.right;
  }
}

function chanceNotNullToGenerateDirection(oldDirection: Direction, chanceToGenerateNextRoom: ChanceToGenerateNextRoom) {
  switch (oldDirection) {
    case Direction.NORTH:
      return chanceToGenerateNextRoom.down > 0 || chanceToGenerateNextRoom.left > 0 || chanceToGenerateNextRoom.right > 0;
    case Direction.SOUTH:
      return chanceToGenerateNextRoom.up > 0 || chanceToGenerateNextRoom.left > 0 || chanceToGenerateNextRoom.right > 0;
    case Direction.WEST:
      return chanceToGenerateNextRoom.right > 0 || chanceToGenerateNextRoom.up > 0 || chanceToGenerateNextRoom.down > 0;
    case Direction.EST:
      return chanceToGenerateNextRoom.left > 0 || chanceToGenerateNextRoom.up > 0 || chanceToGenerateNextRoom.down > 0;
  }
}

type ChanceToGenerateNextRoom = { left: number, up: number, down: number, right: number };
