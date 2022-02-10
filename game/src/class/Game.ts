import { randomBytes } from "crypto";
import * as random_seed from "random-seed";
import Controls from "./Controls";
import PainMechant from "./entities/enemies/PainMechant";
import Player from "./entities/Player";
import GameRender from "./GameRender";
import Logger from "./Logger";
import Room from "./Room";
import Stage from "./Stage";

export default abstract class Game {
  private static _fps = 60;

  static currentRoom: Room;
  static currentStage: Stage;

  static currentFloor: number;

  static playerEntity: Player;

  static seed: string;
  static randomGenerator: random_seed.RandomSeed;

  static newGame(seed: string = randomBytes(10).toString("hex")) {
    this.randomGenerator = random_seed.create(seed);

    this.playerEntity = new Player();


    this.currentFloor = 1;

    this.currentStage = this.newStage();

    Logger.log(this.currentStage.renderTextStage(), "GAME");

    this.currentRoom = this.currentStage.spawn;

    Logger.log(this.currentRoom.renderTextTiles(), "GAME");

    this.playerEntity.coords.posX = this.currentRoom.width * GameRender.TILE_SIZE / 2;
    this.playerEntity.coords.posY = this.currentRoom.height * GameRender.TILE_SIZE / 2;
    this.currentRoom.entities.push(this.playerEntity);
    Logger.log(JSON.stringify(this.playerEntity), "GAME");

    this.currentRoom.entities.push(new PainMechant({ posX: 300, posY: 300 }));

    Controls.setup();
    GameRender.renderAll();
    setInterval(Game.gameLoop, 1 / this._fps);

  }

  static gameLoop() {
    Controls.handlePlayerMove();
    Game.currentRoom.moveAllEntities();
    GameRender.renderAllDynamic();
  }

  static newStage() {
    const stage = Stage.generateRandom({ floor: this.currentFloor }, this.randomGenerator);
    this.currentFloor++;
    return stage;
  }
}