import Debug from "./Debug";
import Enemy from "./entities/enemies/Enemy";
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
      `Debug Mod (Pressez ${Debug.debugKeys.help} pour les contrôles)`,
      0, this._canvasHeight - 10, this._canvasWidth);

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

  static clearFightInterface(){
    const fightContainer = document.getElementById("fightContainer");
    if (!fightContainer) return;
    document.body.removeChild(fightContainer);
  }

  static displayFightInterface(entity : Enemy){
    const fightContainer = document.createElement("div");
      fightContainer.style.width = this._canvas.width.toString();
      fightContainer.style.height = this._canvas.height.toString();
      fightContainer.id = "fightContainer"

    const fighterImgContainer = document.createElement("div");
    fighterImgContainer.id = "fighterImgContainer";
      const playerImg = document.createElement("img");
        playerImg.id = "playerImg"
        playerImg.src = "/static/img/player/playerR.png";
      const monsterImg = document.createElement("img");
        monsterImg.id = "monsterImg"
      if(entity.sprites.walking?.left){
        monsterImg.src = "/static/img/" + entity.sprites.walking.left;
      }else{
        monsterImg.src = "/static/img/enemies/K_Roi_ssant_gauche.png";
      }
      
        
    // deux images

    const buttonsContainer = document.createElement("div");
      buttonsContainer.id = "buttonsContainer"
    // Pierre 
    const imgPierre = document.createElement("img");
      imgPierre.src = "/static/img/fightImg/pierre.png"
      imgPierre.addEventListener("click", function() {
        let result = Game.fight("pierre")
        if (result)
        GameRender.doDamage(entity,result)
      });
    // Feuille
    const imgFeuille = document.createElement("img");
      imgFeuille.src = "/static/img/fightImg/feuille.png"
      imgFeuille.addEventListener("click", function() {
        let result = Game.fight("feuille")
        if (result)
        GameRender.doDamage(entity,result)
      });
    // Ciseaux 
    const imgCiseaux = document.createElement("img");
      imgCiseaux.src = "/static/img/fightImg/ciseaux.png"
      imgCiseaux.addEventListener("click", function() {
        let result = Game.fight("ciseaux")
        if (result)
        GameRender.doDamage(entity,result)
      });
    // Fuir
    const imgFuir = document.createElement("img");
      imgFuir.src = "/static/img/fightImg/exit.png"
      imgFuir.addEventListener("click", function() {
        Game.playerEntity.getHurt(10);
        //let _entity = entity as Entity
        Game.currentRoom.removeEntity(entity);
        GameRender.clearFightInterface();
        Game.endFight();
      });


    const resultImgContainer = document.createElement("div")
      resultImgContainer.id = "resultImgContainer"
      // Images de résultats du combat
    const imgChoixDuMonstre = document.createElement("img");
      imgChoixDuMonstre.id = "imgChoixDuMonstre"

    const imgChoixJoueur = document.createElement("img");
      imgChoixJoueur.id = "imgChoixJoueur"

    
      fighterImgContainer.appendChild(playerImg)
      fighterImgContainer.appendChild(monsterImg);
    fightContainer.appendChild(fighterImgContainer);
      
    //buttonsContainer
      buttonsContainer.appendChild(imgPierre);
      buttonsContainer.appendChild(imgFeuille);
      buttonsContainer.appendChild(imgCiseaux);
      buttonsContainer.appendChild(imgFuir);
    fightContainer.appendChild(buttonsContainer);

    // Images de résultats du combat
      resultImgContainer.appendChild(imgChoixJoueur)
      resultImgContainer.appendChild(imgChoixDuMonstre)
    fightContainer.appendChild(resultImgContainer)
    document.body.appendChild(fightContainer);
  }

  static doDamage(_entity:Enemy, result:String){
    let degats = 10
    const index = Game.currentRoom.entities.indexOf(_entity);
    if(index === -1) return;
    const enemy = Game.currentRoom.entities[index] as Enemy ;
    if (result === "victoire" && enemy){
      enemy.getHurt(degats)
      if (true){ // Si l'enemie a plus de point de vie, on le supprime et on arrete le combat
        Game.currentRoom.removeEntity(enemy);
        Game.playerEntity.killedMonster++;
        GameRender.clearFightInterface();
        Game.endFight();
      }
    }else if (result === "perdu"){
      Game.playerEntity.getHurt(10)
    }
  }

  static displayChoices(choixJoueur:String,choixDuMonstre:String){
    let imgChoixJoueur = document.getElementById('imgChoixJoueur') as HTMLImageElement
    let imgChoixDuMonstre = document.getElementById('imgChoixDuMonstre') as HTMLImageElement
    if (!imgChoixJoueur || !imgChoixDuMonstre){
      return
    }
    else {
      imgChoixJoueur.src= `/static/img/fightImg/${choixJoueur}.png`
      imgChoixDuMonstre.src= `/static/img/fightImg/${choixDuMonstre}.png`
    }
  }

  static displayEndGame(){
    const resultContainer = document.createElement("div");
    resultContainer.classList.add("container");
    
    const replayLink = document.createElement("a");
    replayLink.classList.add("btn");
    replayLink.classList.add("btn-primary");
    replayLink.classList.add("mt-3");
    replayLink.href="/play";
    replayLink.innerText="Rejouer";   
    
    const resultH1 = document.createElement("h1");
    resultH1.innerText = "Vous êtes mort";
    
    const resultUl = document.createElement("ul");
      resultUl.classList.add("list-group");

    const liCollectedItems = document.createElement("li");
      liCollectedItems.classList.add("list-group-item");
      liCollectedItems.classList.add("list-group-item-secondary");
      liCollectedItems.innerText = `Objets ramassés : ${Game.playerEntity.collectedItems}`;

    const liKilledMonster = document.createElement("li");
      liKilledMonster.classList.add("list-group-item");
      liKilledMonster.classList.add("list-group-item-secondary");
      liKilledMonster.innerText = `Monstres tués : ${Game.playerEntity.killedMonster}`;

    const liCoveredStages = document.createElement("li");
      liCoveredStages.classList.add("list-group-item");
      liCoveredStages.classList.add("list-group-item-secondary");
      liCoveredStages.innerText = `Etages parcourus : ${Game.playerEntity.coveredStage}`;
      
    resultContainer.appendChild(resultH1);
    resultContainer.appendChild(resultUl);
    resultContainer.appendChild(replayLink);  

    const token = localStorage.getItem("token");
    if (token){
      const historyLink = document.createElement("a");
    historyLink.classList.add("btn");
    historyLink.classList.add("btn-secondary");
    historyLink.classList.add("mt-3");
    historyLink.classList.add("ms-3");
    historyLink.href="/history";
    historyLink.innerText="Historique des dernières parties";
    
    resultContainer.appendChild(historyLink);
    }  
    
    resultUl.appendChild(liCollectedItems);
    resultUl.appendChild(liKilledMonster);
    resultUl.appendChild(liCoveredStages);
    document.body.appendChild(resultContainer);
  }

}