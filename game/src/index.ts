import Game from "./class/Game";
import Logger from "./class/Logger";

Logger.enable(["STAGE", "GAME", "OTHER", "ENTITY"]);

Game.newGame();