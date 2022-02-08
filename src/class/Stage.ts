import { RandomSeed } from "random-seed";
import { Coordinates } from "../../typing/tiles";
import { Direction, InvertDirection } from "../enum/direction";
import { Logger } from "./Logger";
import { Room } from "./Room";

export class Stage {
  private static _baseRoomNumber = 8;
  private static _chanceToXL = 10;
  private static _depthChanceInfluence = 1.5;
  private static _floorChanceInfluence = 0.1;

  private _maxRoomNumber: number;

  currentRoomNumber = 0;
  floor: number;
  isXL: boolean;
  rooms: Room[][] = [];

  constructor(params: { floor: number }, random: RandomSeed) {

    Logger.log(`Generating floor ${params.floor}`, "STAGE");

    const start = Date.now();

    this.floor = Math.abs(params.floor);

    this.isXL = random.intBetween(1, 100) <= Stage._chanceToXL;

    this._maxRoomNumber = Math.floor(Stage._baseRoomNumber * (Math.max(this.floor / 3, 1)) * (this.isXL ? random.floatBetween(1.5, 1.5 * ((this.floor + 5) / 5)) : 1));

    Logger.log(`Nombre de salle maximum : ${this._maxRoomNumber}${this.isXL ? " (XL)" : ""}`, "STAGE");

    const coordsSpawnRoom: Coordinates = {
      posX: Math.ceil(Math.sqrt(this._maxRoomNumber)),
      posY: Math.ceil(Math.sqrt(this._maxRoomNumber))
    };

    this.generateRoom(coordsSpawnRoom, null, 0, random);

    this.convertAllUnlinkedDoorsToWalls();

    const stop = Date.now();

    Logger.log(`${stop - start} ms to generate floor ${this.floor}`, "STAGE");

  }

  static generateRandom(params: { floor: number }, seed: RandomSeed) {
    return new Stage(params, seed);
  }

  renderTextStage() {
    let res =
      `==== Étage ${this.floor} ====
    Rooms: ${this.currentRoomNumber} / ${this._maxRoomNumber}, XL: ${this.isXL}`;
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
      Logger.log(`[${coords.posX};${coords.posY}] trying to generate [${coords.posX};${coords.posY + 1}]`, "STAGE");
      this.generateNextRoomSpeceficDirection({ posX: coords.posX, posY: coords.posY + 1 }, Direction.NORTH, depth, rand);
    }
    if (oldDirection !== Direction.SOUTH && this.canGenerateMoreRoom() && coords.posY - 1 > 0) {
      Logger.log(`[${coords.posX};${coords.posY}] trying to generate [${coords.posX};${coords.posY - 1}]`, "STAGE");
      this.generateNextRoomSpeceficDirection({ posX: coords.posX, posY: coords.posY - 1 }, Direction.SOUTH, depth, rand);
    }
    if (oldDirection !== Direction.WEST && this.canGenerateMoreRoom() && coords.posX - 1 > 0) {
      Logger.log(`[${coords.posX};${coords.posY}] trying to generate [${coords.posX - 1};${coords.posY}]`, "STAGE");
      this.generateNextRoomSpeceficDirection({ posX: coords.posX - 1, posY: coords.posY }, Direction.WEST, depth, rand);
    }
    if (oldDirection !== Direction.EST && this.canGenerateMoreRoom()) {
      Logger.log(`[${coords.posX};${coords.posY}] trying to generate [${coords.posX + 1};${coords.posY}]`, "STAGE");
      this.generateNextRoomSpeceficDirection({ posX: coords.posX + 1, posY: coords.posY }, Direction.EST, depth, rand);
    }

  }

  private getProximityFactor(coords: Coordinates) {
    return 1 / (( // There is always a room next to 
      (this.rooms?.[coords.posY - 1]?.[coords.posX] ? 1 : 0) +
      (this.rooms?.[coords.posY + 1]?.[coords.posX] ? 1 : 0) +
      (this.rooms?.[coords.posY]?.[coords.posX - 1] ? 1 : 0) +
      (this.rooms?.[coords.posY]?.[coords.posX + 1] ? 1 : 0)
    ) * 2);
  }

  private getMissingRoomsFactor() {
    return Math.max((this._maxRoomNumber - this.currentRoomNumber) * 0.3, 1);
  }

  private generateNextRoomSpeceficDirection(coords: Coordinates, direction: Direction, depth: number, rand: RandomSeed) {
    if (this.rooms?.[coords.posX]?.[coords.posY]) { Logger.log(`Room [${coords.posX};${coords.posY}] already exist !`, "STAGE"); return; } // Room already exist

    Logger.log(`(depth: ${depth}, floor: ${this.floor}, proximityFactor: ${this.getProximityFactor(coords)}, missingRooms: ${this.getMissingRoomsFactor()}) ${this.getChanceToGenerate(depth, this.getProximityFactor(coords))}% to generate [${coords.posX};${coords.posY}]`
      , "STAGE");

    if (rand.intBetween(1, 100) > this.getChanceToGenerate(depth, this.getProximityFactor(coords))) return;

    this.generateRoom(coords, direction, depth, rand);
  }

  private getChanceToGenerate(depth: number, proximityFactor: number) {
    if (depth === 1) return 100; // 100% de chance si c'est la première salle

    return Math.min(
      (
        (Math.exp(-depth * Stage._depthChanceInfluence) * 60) // It's harder to generate a room when we are far from the spawn
        * (Math.log(this.floor) * Stage._floorChanceInfluence + 1) // It's easier to generate a room when we are high in floor number (Make larger stages)
        * this.getMissingRoomsFactor() // It's easier to generate a room when there is a lot more to generate next
        * proximityFactor) // It's harder to generate a room if there is already rooms near (favorise larger stages)
      * 100
      , 100);
  }

  private generateRoom(coords: Coordinates, direction: Direction | null, depth: number, rand: RandomSeed) {
    if (!this.rooms) this.rooms = [];

    if (!this.rooms[coords.posX]) this.rooms[coords.posX] = [];

    Logger.log(`Generate room [${coords.posX};${coords.posY}]`, "STAGE");

    // @ts-ignore
    this.rooms[coords.posX][coords.posY] = Room.generateRandom(rand);
    this.currentRoomNumber++;

    Logger.log(`Salles restantes à générer : ${this._maxRoomNumber - this.currentRoomNumber} / ${this._maxRoomNumber}`, "STAGE");

    if (this.canGenerateMoreRoom())
      this.generateNextRoom(coords, direction ? InvertDirection(direction) : null, depth + 1, rand);
  }

  private canGenerateMoreRoom() {
    return this.currentRoomNumber < this._maxRoomNumber;
  }

  private convertAllUnlinkedDoorsToWalls() {
    this.rooms.forEach((line, posY) => {
      line.forEach((room, posX) => {
        Logger.log(`Vérification de la salle [${posX};${posY}] pour la conversion de porte en mur`, "STAGE");

        if (!this.rooms[posY + 1]?.[posX]) room.convertNotLinkedDoor(Direction.NORTH);
        if (!this.rooms[posY - 1]?.[posX]) room.convertNotLinkedDoor(Direction.SOUTH);
        if (!this.rooms[posY]?.[posX + 1]) room.convertNotLinkedDoor(Direction.EST);
        if (!this.rooms[posY]?.[posX - 1]) room.convertNotLinkedDoor(Direction.WEST);
      });
    });
  }

}