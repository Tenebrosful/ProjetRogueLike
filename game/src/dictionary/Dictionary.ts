export default abstract class GameDictionary {
  static nbrEntries: number;
  static entries: any[];

  static createByIndex(index: number) {
    if(index < 0 || index >= this.nbrEntries) return;
    return new this.entries[index];
  }

  static getByIndex(index: number) {
    if(index < 0 || index >= this.nbrEntries) return;
    return this.entries[index];
  };
}