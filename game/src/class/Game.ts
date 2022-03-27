import { randomBytes } from "crypto";
import * as random_seed from "random-seed";
import { Direction } from "../enum/direction";
import Controls from "./Controls";
import Player from "./entities/Player";
import GameRender from "./GameRender";
import Logger from "./Logger";
import Room from "./Room";
import Stage from "./Stage";
import { RandomSeed } from "random-seed";
import EnemyDictionary from "../dictionary/EnemyDictionary";
import Enemy from "./entities/enemies/Enemy";
import Item from "./entities/items/Item";
import Tile from "./tiles/Tile";
import ItemDictionary from "../dictionary/ItemDictionary";
import Inventory from "./Inventory";
import { tileType } from "../enum/tileType";

export default abstract class Game {
  private static _fps = 60;

  static currentRoom: Room;
  static currentStage: Stage;

  static currentFloor: number;

  static playerEntity: Player;

  static seed: string;
  static rngStage: RandomSeed;
  static rngEnemies: RandomSeed;
  static rngItems: RandomSeed;
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
    this.playerEntity.inventory = new Inventory([]);
    this.playerEntity.updateLifeBar();
    this.currentFloor = 0;

    this.newStage();

    Logger.logObject(this.playerEntity, "GAME");

    Controls.setup();
    GameRender.renderAll();
    this.gameLoopInterval = setInterval(Game.gameLoop, 1000 / this._fps);

  }

  static changeRoom(newRoom: Room, direction: Direction) {
    this.currentRoom.removePlayer();
    this.currentRoom = newRoom;

    const coordsDoor = this.currentRoom.doors.find(door => door.direction === direction);

    if (!coordsDoor) throw new Error;

    this.playerEntity.coords = coordsDoor.getPixelCoords();

    switch (direction) {
      case Direction.NORTH:
        this.playerEntity.coords.posY += GameRender.TILE_SIZE;
        break;
      case Direction.EST:
        this.playerEntity.coords.posX -= GameRender.TILE_SIZE;
        break;
      case Direction.SOUTH:
        this.playerEntity.coords.posY -= GameRender.TILE_SIZE;
        break;
      case Direction.WEST:
        this.playerEntity.coords.posX += GameRender.TILE_SIZE;
        break;
    }

    this.currentRoom.addPlayer();

    GameRender.renderAll();
  }

  static gameLoop() {
    Controls.handlePlayerMove();
    Game.currentRoom.checkEntitiesCollisionsWithHeros();
    Game.currentRoom.moveAllEntities();
    GameRender.renderAllDynamic();
  }

  static newStage() {
    this.currentFloor++;
    this.playerEntity.coveredStage++;

    this.currentStage = Stage.generateRandom({ floor: this.currentFloor }, this.rngStage);
    this.currentStage.getBossRoom();
    this.currentStage.bossRoom.tiles.forEach(line => line.forEach(tile => { if (tile.isPortail()) tile.open(); }));

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

    this.currentStage.rooms.flat().filter(room => room !== this.currentStage.spawn)
      .forEach(room => { this.generateEnemies(room), this.generateItems(room); });

    GameRender.renderAll();
  }

  static generateEnemies(room: Room) {
    const nbrEnemies = this.rngEnemies.intBetween(0, 5);

    Logger.log(`${nbrEnemies} ennemis générés pour la salle [${room.coords.posX};${room.coords.posY}]`, "ENEMY_GENERATION");

    if (nbrEnemies === 0) return;

    const enemies: Enemy[] = [];

    for (let i = 0; i < nbrEnemies; i++)
      enemies.push(this.createRandomEnemy(this.rngEnemies) as Enemy);

    const possibleTiles = room.tiles.flat().filter(tile => (tile.canFlyOver || tile.canWalkThrough) && !tile.isDoor());

    Logger.logObject(possibleTiles, "ENEMY_GENERATION");

    enemies.forEach(enemy => {
      const tiles = possibleTiles.filter(tile => (enemy.canFly && tile.canFlyOver) || tile.canWalkThrough);

      Logger.logObject(tiles, "ENEMY_GENERATION");

      if (tiles.length === 0) { Logger.log(`Pas assez de place pour placer ${enemy.name}`, "ENEMY_GENERATION"); return; }

      const tileIndex = this.rngEnemies.intBetween(0, tiles.length - 1);

      const tile = tiles[tileIndex] as Tile;

      enemy.coords = tile.getPixelCoords();
      possibleTiles.slice(possibleTiles.findIndex(t => t === tile), 1);

      room.entities.push(enemy);
    });
  }

  static createRandomEnemy(rand: RandomSeed) {
    const enemyIndex = rand.intBetween(0, 2);

    const enemy = EnemyDictionary.createByIndex(enemyIndex);

    Logger.logObject(enemy, "ENEMY_GENERATION");

    return enemy;
  }

  static generateItems(room: Room) {
    const nbrItems = this.rngLoots.intBetween(1, 3);


    if (nbrItems === 0) return;

    const items: Item[] = [];

    for (let i = 0; i < nbrItems; i++)
      items.push(this.createRandomItems(this.rngLoots) as Item);

    const possibleTiles = room.tiles.flat().filter(tile => (tile.canWalkThrough) && !tile.isDoor());
    console.log(items);
    items.forEach(item => {
      const tiles = possibleTiles.filter(tile => (tile.canWalkThrough));
      console.log(item);
      Logger.logObject(tiles, "ENEMY_GENERATION");

      if (tiles.length === 0) { console.log("pas assez de place pour item"); return; }

      const tileIndex = this.rngLoots.intBetween(0, tiles.length - 1);

      const tile = tiles[tileIndex] as Tile;
      item.coords = tile.getPixelCoords();
      possibleTiles.slice(possibleTiles.findIndex(t => t === tile), 1);

      room.entities.push(item);
    });
  }

  static createRandomItems(rand: RandomSeed) {
    const itemIndex = rand.intBetween(0, 1);

    const item = ItemDictionary.createByIndex(itemIndex);

    return item;
  }

  static postGameData() {
    sendXHR();
    async function sendXHR() {
      const collectedItems = Game.playerEntity.collectedItems.toString();
      const coveredStage = Game.playerEntity.coveredStage.toString();
      const killedMonster = Game.playerEntity.killedMonster.toString();

      const token = localStorage.getItem("token");

      const result = await fetch("/end", {
        body: JSON.stringify({
          collectedItems,
          coveredStage,
          killedMonster,
          token
        }),
        headers: {
          "Content-Type": "application/json"
        },
        method: "POST"
      }).then((res) => res.json());

      if (result.status !== "ok")
        alert("erreur de sauvegarde de la partie");

    }
  }

  static startFight() {
    if (this.gameLoopInterval) clearInterval(this.gameLoopInterval);
    // Bloquer l'ouverture de l'inventaire
    // Penser a fermer l'inventaire si un monstre entre en collision avec nous ou stopper la gameloop pendant l'ouverture de l'inventaire
  }
  static endFight() {
    if(this.gameLoopInterval) 
    clearInterval(this.gameLoopInterval);
    this.gameLoopInterval = setInterval(Game.gameLoop, 1000 / this._fps);
  }
  static fight(choixJoueur: string) {
    const choixDuMonstre = this.getChoixDuMonstre();
    Logger.log("Choix du monstre: " + choixDuMonstre);
    if (!choixDuMonstre) return;
    GameRender.displayChoices(choixJoueur, choixDuMonstre);
    let resultat;
    const nul = "nul"; const perdu = "perdu"; const victoire = "victoire";
    if (choixDuMonstre === choixJoueur) {
      resultat = nul;
      return resultat;
    }
    // Pierre
    if (choixJoueur === "pierre") 
      if (choixDuMonstre === "ciseaux") 
        resultat = victoire;
       else if (choixDuMonstre === "feuille") 
        resultat = perdu;
      
    
    // Feuille 
    if (choixJoueur === "feuille") 
      if (choixDuMonstre === "pierre") 
        resultat = victoire;
       else if (choixDuMonstre === "ciseaux") 
        resultat = perdu;
      
    
    // Ciseaux
    if (choixJoueur === "ciseaux") 
      if (choixDuMonstre === "feuille") 
        resultat = victoire;
       else if (choixDuMonstre === "pierre") 
        resultat = perdu;
      
    
    return resultat;
  }
  static getChoixDuMonstre() {
    const nbChoix = 3;
    const listeChoix =
      [
        "pierre",
        "feuille",
        "ciseaux"
      ];

    const randomNumber = Math.floor(Math.random() * nbChoix);
    return listeChoix[randomNumber];
  }

  static end() {
    if (this.gameLoopInterval) clearInterval(this.gameLoopInterval);
    Game.postGameData(); // Récupère les données de la partie puis les sauvegarde
    GameRender.clearGameContainer(); // Vide la div contenant l'affichage du jeu
    GameRender.displayEndGame(); // Affichage du message de fin de partie avec lien pour relancer une partie
    return;
  }
}