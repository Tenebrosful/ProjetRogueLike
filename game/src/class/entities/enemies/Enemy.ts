import { entityType } from "../../../enum/entityType";
import Logger from "../../Logger";
import ThinkingEntity from "../ThinkingEntity";

export default abstract class Enemy extends ThinkingEntity {
  type = entityType.ENEMY;

  name = "Enemi";
  maxLife : number;
  life : number;

  getHurt(damage: number): void {
    this.life -= damage;
    Logger.log(`Points de vie du monstre: ${this.life}`, "GAME");
  }
}