import PainMechant from "./entities/enemies/PainMechant";
import PainMechantVolant from "./entities/enemies/PainMechantVolant";
import Player from "./entities/Player";
import Game from "./Game";
import GameRender from "./GameRender";
import Floor from "./tiles/Floor";

export default abstract class Debug {
  static debugKeys = {
    enterSeed: "Insert",
    nextStage: "KeyN",
    noclip: "KeyV",
    openPortail: "KeyO",
    spawnPain: "KeyU",
    spawnPortailMiddle: "KeyP",
    suicid: "KeyS",
  };

  static debugControls(e: KeyboardEvent) {
    if (e.code === Debug.debugKeys.spawnPain)
      if (e.altKey)
        Game.currentRoom.entities.push(new PainMechantVolant({ posX: Game.playerEntity.coords.posX, posY: Game.playerEntity.coords.posY }));
      else
        Game.currentRoom.entities.push(new PainMechant({ posX: Game.playerEntity.coords.posX, posY: Game.playerEntity.coords.posY }));
    else if (e.code === Debug.debugKeys.noclip) {
      Game.debug_player_noclip = !Game.debug_player_noclip;
      Game.playerEntity.movementSpeed = (Game.debug_player_noclip ? Player.NO_CLIP_MOVESPEED : Player.DEFAULT_MOVESPEED);
    }
    else if (e.code === Debug.debugKeys.nextStage)
      Game.newStage();
    else if (e.code === Debug.debugKeys.spawnPortailMiddle) {
      const middleTile = Game.currentRoom.getTile(Game.currentRoom.middle) as Floor;
      Game.currentRoom.replaceTile(middleTile.convertToPortail());
      GameRender.renderRoom(Game.currentRoom);
    }
    else if (e.code === Debug.debugKeys.openPortail) {
      Game.currentRoom.tiles.forEach(line => line.forEach(tile => { if (tile.isPortail()) tile.open(); }));
      GameRender.renderRoom(Game.currentRoom);
    }
    else if (e.code === Debug.debugKeys.suicid)
      Game.playerEntity.getHurt(Infinity);
    else if (e.code === Debug.debugKeys.enterSeed) {
      const input = prompt("Veuillez rentrer la graine de génération", "seed");

      if (!input || input === "") return;

      Game.newGame(input);
    }
  }
}