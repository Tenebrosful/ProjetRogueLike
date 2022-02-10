import Entity from "./entities/Entity";
import Game from "./Game";
import Logger from "./Logger";
import Room from "./Room";
import Tile from "./tiles/Tile";

export default class GameRender {
  static TILE_SIZE = 64;
  static TILE_ROOT_PATH = "/static/img/tiles/";

  private static _salle2D = document.getElementById("salle_2d") as HTMLDivElement;
  private static _canvas = document.getElementById("canvas") as HTMLCanvasElement;
  private static _ctx = GameRender._canvas.getContext("2d") as CanvasRenderingContext2D;

  private static _canvasWidth: number;
  private static _canvasHeight: number;
  private static _canvasRatio: number;

  static setupCanvas() {
    this._canvasWidth = Game.currentRoom.width * this.TILE_SIZE;
    this._canvasHeight = Game.currentRoom.height * this.TILE_SIZE;
    this._canvasRatio = 1;

    this._canvas.width = this._canvasWidth * 1;
    this._canvas.height = this._canvasHeight * 1;
    this._canvas.style.width = `${this._canvasWidth}px`;
    this._canvas.style.height = `${this._canvasHeight}px`;

    this._ctx.fillStyle = "red";
  }

  static renderTile(tile: Tile) {
    const renderTile = document.createElement("div");

    renderTile.style.display = "inline-block";
    renderTile.style.height = `${this.TILE_SIZE}px`;
    renderTile.style.width = `${this.TILE_SIZE}px`;
    renderTile.style.position = "absolute";
    renderTile.style.top = `${tile.posY * this.TILE_SIZE}px`;
    renderTile.style.left = `${tile.posX * this.TILE_SIZE}px`;
    renderTile.style.backgroundImage = `url(${this.TILE_ROOT_PATH}${tile.spriteName})`;

    this._salle2D.appendChild(renderTile);
  }

  static renderRoom(room: Room) {
    Logger.log(`Render room [${room.coords.posX};${room.coords.posY}]`, "RENDER");
    room.tiles.forEach(line => line.forEach(tile => this.renderTile(tile)));
  }

  static renderCanvas() {
    Logger.log(`Render Canvas (width: ${this._canvasWidth}, heigh: ${this._canvasHeight})`, "RENDER");
    this._ctx.clearRect(0, 0, this._canvasWidth, this._canvasHeight);
  }

  static renderEntity(entity: Entity) {
    Logger.log(`Render Entity ${typeof entity} at [${entity.coords.posX};${entity.coords.posY}]`, "RENDER");

    const entitySprite = new Image();
    entitySprite.src = `/static/img/${entity.currentSprite}`;

    if (Game.debug) this._ctx.fillRect(entity.coords.posX + entity.hitbox.offset.x, entity.coords.posY + entity.hitbox.offset.y, entity.hitbox.size.width, entity.hitbox.size.height);

    this._ctx.drawImage(entitySprite, entity.coords.posX, entity.coords.posY);
  }

  static renderRoomEntities(room: Room) {
    Logger.log(`Render all entities of room [${room.coords.posX};${room.coords.posY}]`, "RENDER");
    room.entities.forEach(entity => this.renderEntity(entity));
  }

  static renderAll() {
    this.setupCanvas();
    this.renderRoom(Game.currentRoom);
    this.renderAllDynamic();
  }

  static renderAllDynamic() {
    this.renderCanvas();
    this.renderRoomEntities(Game.currentRoom);
  }

}