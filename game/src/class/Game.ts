import { randomBytes } from "crypto";
import * as random_seed from "random-seed";
import Controls from "./Controls";
import PainMechant from "./entities/enemies/PainMechant";
import PainMechantVolant from "./entities/enemies/PainMechantVolant";
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

  static debug = false;
  static debug_player_noclip = false;

  static newGame(seed: string = randomBytes(10).toString("hex")) {
    this.randomGenerator = random_seed.create(seed);

    this.playerEntity = new Player();

    this.currentFloor = 0;

    this.currentStage = this.newStage();

    this.currentRoom = this.currentStage.spawn;

    Logger.logObject(this.currentRoom, "GAME");
    Logger.log(this.currentRoom.renderTextTiles(), "GAME");

    this.playerEntity.coords.posX = this.currentRoom.width * GameRender.TILE_SIZE / 2;
    this.playerEntity.coords.posY = this.currentRoom.height * GameRender.TILE_SIZE / 2;
    this.currentRoom.entities.push(this.playerEntity);

    Logger.logObject(this.playerEntity, "GAME");

    this.currentRoom.entities.push(new PainMechant({ posX: 300, posY: 300 }));
    this.currentRoom.entities.push(new PainMechantVolant({ posX: 700, posY: 250 }));

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
    this.currentFloor++;
    const stage = Stage.generateRandom({ floor: this.currentFloor }, this.randomGenerator);

    Logger.log(`New Stage !\n${stage.renderTextStage()}`, "GAME");
    Logger.logObject(stage, "GAME");
    
    return stage;
  }
}