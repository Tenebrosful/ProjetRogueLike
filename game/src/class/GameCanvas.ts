import Room from "./Room";
import Tile from "./tiles/Tile";

export default class GameCanvas {
  static TILE_SIZE = 64;
  static TILE_ROOT_PATH = "/static/img/tiles/";

  static _salle2D = document.getElementById("salle_2d") as HTMLDivElement;

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
    room.tiles.forEach(line => line.forEach(tile => this.renderTile(tile)));
  }
}