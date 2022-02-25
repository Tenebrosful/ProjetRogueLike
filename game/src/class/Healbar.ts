import Game from "./Game";

export default abstract class Healbar {

    private static bar = document.getElementById("progress-bar") as HTMLProgressElement;

    static update(){
        this.bar.value = Game.playerEntity.life;
    }

  }