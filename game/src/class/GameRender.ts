import Controls from "./Controls";
import Entity from "./entities/Entity";
import Game from "./Game";
import Logger from "./Logger";
import Room from "./Room";
import Tile from "./tiles/Tile";

export default abstract class GameRender {
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
    this._ctx.font = "20px Arial";
  }

  static renderTile(tile: Tile) {
    const renderTile = document.createElement("div");

    renderTile.style.display = "inline-block";
    renderTile.style.height = `${this.TILE_SIZE}px`;
    renderTile.style.width = `${this.TILE_SIZE}px`;
    renderTile.style.position = "absolute";
    renderTile.style.top = `${tile.coords.posY * this.TILE_SIZE}px`;
    renderTile.style.left = `${tile.coords.posX * this.TILE_SIZE}px`;
    renderTile.style.backgroundImage = `url(${this.TILE_ROOT_PATH}${tile.spriteName})`;

    this._salle2D.appendChild(renderTile);
  }

  static renderRoom(room: Room) {
    Logger.log(`Render room [${room.coords.posX};${room.coords.posY}]`, "RENDER");

    this._salle2D.innerHTML = "";

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

    this._ctx.drawImage(entitySprite, entity.coords.posX, entity.coords.posY);
  }

  static renderRoomEntities(room: Room) {
    Logger.log(`Render all entities of room [${room.coords.posX};${room.coords.posY}]`, "RENDER");

    room.entities.filter(entity => !entity.isPlayer()).forEach(entity => this.renderEntity(entity));
    this.renderEntity(Game.playerEntity);
  }

  static renderDebug() {
    if (!Game.debug) return;

    this._ctx.fillText(
      `Seed: ${Game.seed} Étage: ${Game.currentFloor} Salle: [${Game.currentRoom.coords.posX};${Game.currentRoom.coords.posY}]`, 0, 25);

    this._ctx.fillText(
      `Debug: NextStage = ${Controls.controls.debugKeys.nextStage} | Noclip = ${Controls.controls.debugKeys.noclip} | Spawn Pain = ${Controls.controls.debugKeys.spawnPain} (+ AltG flying ver.) | Spawn Portail = ${Controls.controls.debugKeys.spawnPortailMiddle} | Open Portail = ${Controls.controls.debugKeys.openPortail}`,
      0, this._canvasHeight - 10);

    if (Game.debug_player_noclip)
      this._ctx.fillText("Noclip ON", this._canvasWidth - 100, 25, 95);

    Game.currentRoom.entities.forEach(entity => {
      this._ctx.fillRect(entity.coords.posX + entity.hitbox.offset.x,
        entity.coords.posY + entity.hitbox.offset.y,
        entity.hitbox.size.width - entity.hitbox.offset.x,
        entity.hitbox.size.height - entity.hitbox.offset.y);
      this._ctx.fillText(`[${entity.coords.posX.toFixed(0)};${entity.coords.posY.toFixed(0)}] / [${Math.trunc(entity.coords.posX / this.TILE_SIZE)};${Math.trunc(entity.coords.posY / this.TILE_SIZE)}]`, entity.coords.posX, entity.coords.posY - 20);
    });
  }

  static renderAll() {
    this.setupCanvas();
    this.renderRoom(Game.currentRoom);
    this.renderAllDynamic();
  }

  static renderAllDynamic() {
    this.renderCanvas();
    this.renderDebug();
    this.renderRoomEntities(Game.currentRoom);
  }

  static clearGameContainer(){
    const gameContainer = document.getElementById("gameContainer");
    if (!gameContainer) return;
    gameContainer.innerHTML = "";
  }

  static displayEndGame(){
    const resultContainer = document.createElement("div");
    resultContainer.classList.add("container");
    
    const replayLink = document.createElement("a");
    replayLink.href="/play";
    replayLink.innerText="Rejouer";
    
    const resultH1 = document.createElement("h1");
    resultH1.innerText = "Vous êtes morts";
    
    const resultUl = document.createElement("ul");
    const liKilledMonster = document.createElement("li");
    liKilledMonster.innerText = `Vous avez tué ${Game.playerEntity.killedMonster} monstres`;
      
    resultContainer.appendChild(resultH1);
    resultContainer.appendChild(resultUl);
    resultContainer.appendChild(replayLink);
    resultUl.appendChild(liKilledMonster);
    document.body.appendChild(resultContainer);
  }

}