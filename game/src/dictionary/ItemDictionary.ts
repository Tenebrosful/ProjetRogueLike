import Item from "../class/entities/items/Item";
import PommeOr from "../class/entities/items/PommeOr";
import Treasure from "../class/entities/items/Treasure";
import GameDictionary from "./Dictionary";

export default abstract class ItemDictionary extends GameDictionary {
  static entries = [PommeOr, Treasure];
  static nbrEntries = ItemDictionary.entries.length;

  static createByIndex(index: number) {
    return super.createByIndex(index) as Item;
  }

  static getByIndex(index: number) {
    return super.createByIndex(index) as typeof Item;
  }
}