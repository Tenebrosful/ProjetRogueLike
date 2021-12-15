import { Floor } from "../class/tiles/Floor";
import { Error } from "../class/tiles/Error";
import { Void } from "../class/tiles/Void";
import { Wall } from "../class/tiles/Wall";
import { tileType } from "../enum/tileType";

export function tileResolver(type: tileType){
  switch(type){
    case tileType.FLOOR:
      return Floor;
    case tileType.WALL:
      return Wall;
    case tileType.VOID:
      return Void;
    default:
      return Error;
  }
}