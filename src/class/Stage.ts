import { RandomSeed } from "random-seed";
import { Coordinates } from "../../typing/tiles";
import { Direction, InvertDirection } from "../enum/direction";
import { Room } from "./Room";

export class Stage {
  private static _baseRoomNumber = 8;
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

    const baseChanceToGenerate: ChanceToGenerateNextRoom = {
      down: 50,
      left: 50,
      right: 50,
      up: 50
    };

    this.generateRoom(coordsSpawnRoom, null, baseChanceToGenerate, random);

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

  private generateNextRoom(coords: Coordinates, oldDirection: Direction | null, chanceToGenerateNextRoom: ChanceToGenerateNextRoom, rand: RandomSeed) {
    if (oldDirection && !chanceNotNullToGenerateDirection(oldDirection, chanceToGenerateNextRoom)) return;

    if (oldDirection !== Direction.NORTH && this.canGenerateMoreRoom()) {
      console.log(`[${coords.posX};${coords.posY}] trying to generate [${coords.posX};${coords.posY + 1}]`);
      this.generateNextRoomSpeceficDirection({ posX: coords.posX, posY: coords.posY + 1 }, Direction.NORTH, chanceToGenerateNextRoom, rand);
    }
    if (oldDirection !== Direction.SOUTH && this.canGenerateMoreRoom() && coords.posY - 1 > 0) {
      console.log(`[${coords.posX};${coords.posY}] trying to generate [${coords.posX};${coords.posY - 1}]`);
      this.generateNextRoomSpeceficDirection({ posX: coords.posX, posY: coords.posY - 1 }, Direction.SOUTH, chanceToGenerateNextRoom, rand);
    }
    if (oldDirection !== Direction.WEST && this.canGenerateMoreRoom() && coords.posX - 1 > 0) {
      console.log(`[${coords.posX};${coords.posY}] trying to generate [${coords.posX - 1};${coords.posY}]`);
      this.generateNextRoomSpeceficDirection({ posX: coords.posX - 1, posY: coords.posY }, Direction.WEST, chanceToGenerateNextRoom, rand);
    }
    if (oldDirection !== Direction.EST && this.canGenerateMoreRoom()) {
      console.log(`[${coords.posX};${coords.posY}] trying to generate [${coords.posX + 1};${coords.posY}]`);
      this.generateNextRoomSpeceficDirection({ posX: coords.posX + 1, posY: coords.posY }, Direction.EST, chanceToGenerateNextRoom, rand);
    }

  }

  private generateNextRoomSpeceficDirection(coords: Coordinates, direction: Direction, chanceToGenerateDirection: ChanceToGenerateNextRoom, rand: RandomSeed) {
    const chanceToGenerate = resolveChanceDirection(direction, chanceToGenerateDirection);
    if (chanceToGenerate === 0) return;
    if (this.rooms?.[coords.posX]?.[coords.posY]) return; // Room already exist

    if (rand.intBetween(1, 100) > chanceToGenerate) return;

    this.generateRoom(coords, direction, chanceToGenerateDirection, rand);
  }

  private generateRoom(coords: Coordinates, direction: Direction | null, chanceToGenerateDirection: ChanceToGenerateNextRoom, rand: RandomSeed) {
    if (!this.rooms) this.rooms = [];

    if (!this.rooms[coords.posX]) this.rooms[coords.posX] = [];

    console.log(`Generate room [${coords.posX};${coords.posY}]`);

    // @ts-ignore
    this.rooms[coords.posX][coords.posY] = Room.generateRandom(rand);
    this.currentRoomNumber++;

    console.log(`Salles restantes à générer : ${this._maxRoomNumber - this.currentRoomNumber} / ${this._maxRoomNumber}`);

    if (this.canGenerateMoreRoom())
      this.generateNextRoom(coords, direction ? InvertDirection(direction) : null, chanceToGenerateDirection, rand);
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
