import { EntitySprites } from "../../../typing/entitySprites";
import { Entity } from "./Entity";

export class Player extends Entity {
  sprites: EntitySprites = {
    walking: {
      left: "player/K_Roi_ssant_gauche.png",
      right: "player/K_Roi_ssant_droite.png"
    }
  };
}