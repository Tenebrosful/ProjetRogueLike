import Game from "../Game";
import GameRender from "../GameRender";
import broncoliHache from "./enemies/BroncoliHache";
import Enemy from "./enemies/Enemy";
import PainMechant from "./enemies/PainMechant";
import PainMechantVolant from "./enemies/PainMechantVolant";

export default class GenerateEntity{
    monsters: Enemy[] ;

    constructor(){
        this.monsters = [];
        const monsterNumb = Math.round(Math.random() * (5 - 1) + 1);
        console.log(monsterNumb);

       for (let index = 0; index < monsterNumb; index++) {
            const monsterType = Math.round(Math.random() * (3 - 1) + 1);
            const tiles = Game.currentRoom.tiles.flat().filter(tile => tile.canWalkThrough);
            const randomTile =  Math.round(Math.random() * (tiles.length - 0) + 0);
            switch (monsterType) {
                case 1:
                    this.monsters.push(new broncoliHache({posX : tiles[randomTile]?.coords.posX as number * GameRender.TILE_SIZE, posY: tiles[randomTile]?.coords.posY as number * GameRender.TILE_SIZE}));
                    break;
                case 2:
                    this.monsters.push(new PainMechant({posX : tiles[randomTile]?.coords.posX as number * GameRender.TILE_SIZE, posY: tiles[randomTile]?.coords.posY as number * GameRender.TILE_SIZE}));
                    break;
                case 3:
                    this.monsters.push(new PainMechantVolant({posX : tiles[randomTile]?.coords.posX as number * GameRender.TILE_SIZE, posY: tiles[randomTile]?.coords.posY as number * GameRender.TILE_SIZE}));
                    break;
                default:
                    break;
            }
           
       }
    }
}