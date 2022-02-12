import BroncoliHache from "../class/entities/enemies/BroncoliHache";
import Enemy from "../class/entities/enemies/Enemy";
import PainMechant from "../class/entities/enemies/PainMechant";
import PainMechantVolant from "../class/entities/enemies/PainMechantVolant";
import GameDictionary from "./Dictionary";

export default abstract class EnemyDictionary extends GameDictionary {
  static entries = [BroncoliHache, PainMechant, PainMechantVolant];
  static nbrEntries = EnemyDictionary.entries.length;

  static createByIndex(index: number) {
    return super.createByIndex(index) as Enemy;
  }

  static getByIndex(index: number) {
    return super.createByIndex(index) as typeof Enemy;
  }
}