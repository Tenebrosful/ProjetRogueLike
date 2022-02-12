import { randomBytes } from "crypto";
import * as random_seed from "random-seed";
import { Direction } from "../enum/direction";
import Controls from "./Controls";
import broncoliHache from "./entities/enemies/BroncoliHache";
import PainMechant from "./entities/enemies/PainMechant";
import PainMechantVolant from "./entities/enemies/PainMechantVolant";
import Player from "./entities/Player";
import GameRender from "./GameRender";
import Logger from "./Logger";
import Room from "./Room";
import Stage from "./Stage";
import GenerateEntity from "./entities/GenerateEntity";
import { RandomSeed } from "random-seed";

export default abstract class Game {
  private static _fps = 60;

  static currentRoom: Room;
  static currentStage: Stage;

  static currentFloor: number;

  static playerEntity: Player;

  static seed: string;
  static rngStage: RandomSeed;
  static rngEnemies: RandomSeed;
  static rngLoots: RandomSeed;

  static debug = false;
  static debug_player_noclip = false;

  static gameLoopInterval?: NodeJS.Timer;

  static newGame(seed: string = randomBytes(10).toString("hex")) {
    if (this.gameLoopInterval) { clearInterval(this.gameLoopInterval); delete this.gameLoopInterval; }

    this.seed = seed;

    this.rngStage = random_seed.create(seed);
    this.rngEnemies = random_seed.create(seed);
    this.rngLoots = random_seed.create(seed);

    this.playerEntity = new Player();

    this.currentFloor = 0;

    this.newStage();

    Logger.logObject(this.playerEntity, "GAME");
 
    const entity = new GenerateEntity();
    entity.monsters.forEach(element =>{
      this.currentRoom.entities.push(element);
    });

  
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
    this.currentStage = Stage.generateRandom({ floor: this.currentFloor }, this.rngStage);

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
  static end() {
    if (this.gameLoopInterval) clearInterval(this.gameLoopInterval);
    // Recuperer les data de la partie
    // Les enregistrer en bdd
    GameRender.clearGameContainer();
    GameRender.displayEndGame();
    return;
  }
}