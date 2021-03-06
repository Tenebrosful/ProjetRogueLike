import { RandomSeed } from "random-seed";
import { tileType } from "../enum/tileType";
import tileResolver from "../resolver/TileResolver";
import * as rooms from "../../config/room.json";
import { Direction } from "../enum/direction";
import Door from "./tiles/Door";
import Tile from "./tiles/Tile";
import { Coordinates } from "../typing/tiles";
import Entity from "./entities/Entity";
import ThinkingEntity from "./entities/ThinkingEntity";
import Game from "./Game";
import GameRender from "./GameRender";
import Logger from "./Logger";
import Item from "./entities/items/Item";
import Enemy from "./entities/enemies/Enemy";

export default class Room {
  coords: Coordinates;
  tiles: Tile[][];
  doors: Door[];
  entities: Entity[];

  middle: Coordinates;

  width: number;
  height: number;

  constructor(tiles: tileType[][], coords: Coordinates = { posX: 0, posY: 0 }) {
    this.coords = coords;
    this.tiles = [];
    this.doors = [];
    this.entities = [];

    this.width = tiles[0]?.length as number;
    this.height = tiles.length;

    this.middle = {
      posX: Math.floor(this.width / 2),
      posY: Math.floor(this.height / 2)
    };

    let doorDirection = 0;

    for (let posY = 0; posY < tiles.length; posY++) {
      this.tiles[posY] = [];
      /* @ts-ignore: tiles[posY] can't be undefined */
      for (let posX = 0; posX < tiles[posY].length; posX++) {
        /* @ts-ignore: this.tiles[posY] and tiles[posY][posX] can't be undefined */
        if (tiles[posY][posX] === tileType.DOOR) {
          /* @ts-ignore: this.tiles[posY] and tiles[posY][posX] can't be undefined */
          const door = tileResolver(tiles[posY][posX], { direction: doorDirection++, posX, posY }) as Door;
          /* @ts-ignore: this.tiles[posY] and tiles[posY][posX] can't be undefined */
          this.tiles[posY].push(door);
          this.doors.push(door);
          continue;
        }

        /* @ts-ignore: this.tiles[posY] and tiles[posY][posX] can't be undefined */
        this.tiles[posY].push(tileResolver(tiles[posY][posX], { posX, posY }));
      }
    }
  }

  static generateRandom(random: RandomSeed, coords: Coordinates = { posX: 0, posY: 0 }) {
    return new Room(rooms[random.intBetween(0, rooms.length - 1)] as tileType[][], coords);
  }

  renderTextTiles() {
    let render = "";

    this.tiles.forEach(row => {
      row.forEach(tile => render += tile.textRender);
      render += "\n";
    });

    return render;
  }

  convertNotLinkedDoor(direction: Direction) {
    const doorToConvertIndex = this.doors.findIndex(door => door.direction === direction);

    if (doorToConvertIndex === -1) return;

    const doorToConvert = this.doors[doorToConvertIndex];

    if (!doorToConvert) return;

    this.doors.splice(doorToConvertIndex, 1);

    const wallConvertedFromDoor = doorToConvert.convertToWall();

    /* @ts-ignore: this.tiles[wallConvertedFromDoor.posY] and tiles[wallConvertedFromDoor.posY][wallConvertedFromDoor.posX] shouldn't be undefined */
    this.tiles[wallConvertedFromDoor.coords.posY][wallConvertedFromDoor.coords.posX] = wallConvertedFromDoor;
  }

  moveAllEntities() {
    (this.entities.filter(entity => entity instanceof ThinkingEntity) as ThinkingEntity[])
      .forEach(entity => entity.iaMovement.think(entity));
  }

  checkEntitiesCollisionsWithHeros() {
    this.entities.forEach(entity => {
      if(entity.checkCollisionsWithHeros()){
        if(entity.type === 2){
          // Monstre
            Game.startFight();
            // GameRender -> afficher l'interface de combat
            // Jouer le combat
            Logger.log(`Fight !${entity.type}, ${entity.name}`);
            GameRender.displayFightInterface(entity as Enemy);
            // Game.currentRoom.removeEntity(entity);
            
            // Game.endFight();
        }else if(entity.type === 3){
          // Item
          const item = entity as Item;
          if (Game.playerEntity.inventory.canAddItem()){
            Game.playerEntity.inventory.add(item);
            Game.currentRoom.removeEntity(item);
          }
        }
        Logger.log(`On a une collision !${entity.type}, ${entity.name}`);
        return;
      }
    });
  }

  getTile(coords: Coordinates) {
    return this.tiles[coords.posY]?.[coords.posX];
  }

  replaceTile(newTile: Tile) {
    if (!this.tiles[newTile.coords.posY]?.[newTile.coords.posX]) throw new Error();

    /* @ts-ignore: this.tiles[wallConvertedFromDoor.posY] and tiles[wallConvertedFromDoor.posY][wallConvertedFromDoor.posX] shouldn't be undefined */
    this.tiles[newTile.coords.posY][newTile.coords.posX] = newTile;
  }

  getTilePixelCoords(coords: Coordinates) {
    return this.tiles[Math.trunc(coords.posY / GameRender.TILE_SIZE)]?.[Math.trunc(coords.posX / GameRender.TILE_SIZE)];
  }

  addPlayer() {
    this.entities.push(Game.playerEntity);
  }

  removeEntity(entity: Entity){
    const index = this.entities.indexOf(entity);
    if(index === -1) return;

    console.log("Entity Preremoved",entity,index);
    console.log("Entit??es", this.entities);

    this.entities.splice(index, 1);
    
    console.log("Entity Removed",entity,index);
    console.log("Entit??es", this.entities);
  }
  removePlayer() {
    this.entities.splice(this.entities.findIndex(entite => entite.isPlayer()), 1);
  }
}