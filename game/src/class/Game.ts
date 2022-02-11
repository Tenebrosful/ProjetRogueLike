import { randomBytes } from "crypto";
import * as random_seed from "random-seed";
import { Direction } from "../enum/direction";
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

  static gameLoopInterval : NodeJS.Timer;

  static newGame(seed: string = randomBytes(10).toString("hex")) {
    this.seed = seed;

    this.randomGenerator = random_seed.create(seed);

    this.playerEntity = new Player();

    this.currentFloor = 0;

    this.newStage();

    Controls.setup();
    GameRender.renderAll();
    this.gameLoopInterval = setInterval(Game.gameLoop, 1000 / this._fps);

  }

  static changeRoom(newRoom: Room,direction: Direction){
    this.currentRoom.removePlayer();
    this.currentRoom = newRoom;
    const coordsDoor = this.currentRoom.doors.find(door => door.direction === direction);
    if (!coordsDoor)throw new Error;
    
    switch (direction){
      case Direction.NORTH: 
        this.playerEntity.coords.posX = coordsDoor.coords.posX;
        this.playerEntity.coords.posY = coordsDoor.coords.posY + 1;
        break;

      case Direction.EST: 
        this.playerEntity.coords.posX = coordsDoor.coords.posX - 1;
        this.playerEntity.coords.posY = coordsDoor.coords.posY;
        break;
      case Direction.SOUTH: 
        this.playerEntity.coords.posX = coordsDoor.coords.posX;
        this.playerEntity.coords.posY = coordsDoor.coords.posY - 1 ;
        break;
      case Direction.WEST: 
        this.playerEntity.coords.posX = coordsDoor.coords.posX + 1 ;
        this.playerEntity.coords.posY = coordsDoor.coords.posY;
        break;
    }
    this.playerEntity.coords.posX *= 64 ;
    this.playerEntity.coords.posY *= 64;
    this.currentRoom.addPlayer();
    GameRender.renderAll();
  }

  static gameLoop() {
    Controls.handlePlayerMove();
    Game.currentRoom.moveAllEntities();
    GameRender.renderAllDynamic();
  }

  static newStage() {
    this.currentFloor++;
    this.currentStage = Stage.generateRandom({ floor: this.currentFloor }, this.randomGenerator);

    Logger.log(`New Stage !\n${this.currentStage.renderTextStage()}`, "GAME");
    Logger.logObject(this.currentStage, "GAME");
    
    this.currentRoom = this.currentStage.spawn;

    Logger.logObject(this.currentRoom, "GAME");
    Logger.log(this.currentRoom.renderTextTiles(), "GAME");

    this.playerEntity.coords.posX = this.currentRoom.width * GameRender.TILE_SIZE / 2;
    this.playerEntity.coords.posY = this.currentRoom.height * GameRender.TILE_SIZE / 2;
    this.currentRoom.addPlayer();
    // this.currentRoom.entities.push(this.playerEntity);

    Logger.logObject(this.playerEntity, "GAME");

    /**
     * TEMPORARY
     */
    this.currentRoom.entities.push(new PainMechant({ posX: 300, posY: 300 }));
    this.currentRoom.entities.push(new PainMechantVolant({ posX: 700, posY: 250 }));

    GameRender.renderAll();
  }
  static end(){
    clearInterval(this.gameLoopInterval);
    // Recuperer les data de la partie
    // Les enregistrer en bdd
    GameRender.clearGameContainer();
    GameRender.displayEndGame();
    return;
  }
}