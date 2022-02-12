/* eslint-disable no-case-declarations */
import BroncoliHache from "./entities/enemies/BroncoliHache";
import PainMechant from "./entities/enemies/PainMechant";
import PainMechantVolant from "./entities/enemies/PainMechantVolant";
import Player from "./entities/Player";
import Game from "./Game";
import GameRender from "./GameRender";
import Floor from "./tiles/Floor";

export default abstract class Debug {
  static debugKeys = {
    enterSeed: "Insert",
    help: "KeyH",
    nextStage: "KeyN",
    noclip: "KeyV",
    openPortail: "KeyO",
    spawnBroncoliHache: "Numpad2",
    spawnPainMechant: "Numpad0",
    spawnPainMechantVolant: "Numpad1",
    spawnPortailMiddle: "KeyP",
    suicid: "KeyS",
  };

  static debugControls(e: KeyboardEvent) {
    switch (e.code) {
      case this.debugKeys.help:
        alert(
`       ==== Debug Controls ====
        Noclip: ${this.debugKeys.noclip}
        NextStage: ${this.debugKeys.nextStage}
        EnterSeed: ${this.debugKeys.enterSeed}
        Suicide: ${this.debugKeys.suicid}
        SpawnPortail: ${this.debugKeys.spawnPortailMiddle}
        OpenPortail: ${this.debugKeys.openPortail}
        
        ==== Spawn Enemy ====
        PainMechant: ${this.debugKeys.spawnPainMechant}
        PainMechantVolant: ${this.debugKeys.spawnPainMechantVolant}
        BroncoliHache: ${this.debugKeys.spawnBroncoliHache}`);
        break;
      case this.debugKeys.spawnPainMechant:
        Game.currentRoom.entities.push(new PainMechant({ posX: Game.playerEntity.coords.posX, posY: Game.playerEntity.coords.posY }));
        break;
      case this.debugKeys.spawnPainMechantVolant:
        Game.currentRoom.entities.push(new PainMechantVolant({ posX: Game.playerEntity.coords.posX, posY: Game.playerEntity.coords.posY }));
        break;
      case this.debugKeys.spawnBroncoliHache:
        Game.currentRoom.entities.push(new BroncoliHache({ posX: Game.playerEntity.coords.posX, posY: Game.playerEntity.coords.posY }));
        break;
      case this.debugKeys.noclip:
        Game.debug_player_noclip = !Game.debug_player_noclip;
        Game.playerEntity.movementSpeed = (Game.debug_player_noclip ? Player.NO_CLIP_MOVESPEED : Player.DEFAULT_MOVESPEED);
        break;
      case this.debugKeys.nextStage:
        Game.newStage();
        break;
      case this.debugKeys.spawnPortailMiddle:
        const middleTile = Game.currentRoom.getTile(Game.currentRoom.middle) as Floor;
        Game.currentRoom.replaceTile(middleTile.convertToPortail());
        GameRender.renderRoom(Game.currentRoom);
        break;
      case this.debugKeys.openPortail:
        Game.currentRoom.tiles.forEach(line => line.forEach(tile => { if (tile.isPortail()) tile.open(); }));
        GameRender.renderRoom(Game.currentRoom);
        break;
      case this.debugKeys.suicid:
        Game.playerEntity.getHurt(Infinity);
        break;
      case this.debugKeys.enterSeed:
        const input = prompt("Veuillez rentrer la graine de génération", "seed");
        if (!input || input === "") return;
        Game.newGame(input);
        break;
    }
  }
}