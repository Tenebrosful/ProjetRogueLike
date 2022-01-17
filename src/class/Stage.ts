import { RandomSeed } from "random-seed";
import { Room } from "./Room";

export class Stage {
  private _tailleMap = 15;
  floor: number;
  rooms: Room[][];

  constructor(params: { floor: number }, random: RandomSeed) {

    const start = Date.now();

    let nbpiecedefault = 10;

    const quadrillage: (number | boolean)[][][] = [];

    for (let i = 0; i < this._tailleMap; i++) {
      quadrillage[i] = [];
      for (let j = 0; j < this._tailleMap; j++)
        // @ts-ignore
        quadrillage[i][j] = [false, 0, 0, 0, 0, 0, false];
    }

    const salleInit = [true, 1, 100, 100, 100, 100, false];

    // @ts-ignore
    quadrillage[Math.floor(this._tailleMap / 2) + 1][Math.floor(this._tailleMap / 2) + 1] = salleInit;

    for (let i = 0; i < this._tailleMap && nbpiecedefault > 0; i++)
      for (let j = 0; j < this._tailleMap && nbpiecedefault > 0; j++)
        // @ts-ignore
        if (quadrillage[i][j][0] && !quadrillage[i][j][6] && nbpiecedefault > 0) {

          console.log(`Génération pour la salle [${i};${j}]`);

          // @ts-ignore
          if (quadrillage[i][j][2] >= random.intBetween(1, 100)) {
            // @ts-ignore
            quadrillage[i - 1][j] = salleInit;
            // @ts-ignore
            quadrillage[i - 1][j][2] -= 25;
            // @ts-ignore
            quadrillage[i - 1][j][3] -= 50;
            // @ts-ignore
            quadrillage[i - 1][j][4] -= 100;
            // @ts-ignore
            quadrillage[i - 1][j][5] -= 50;
            nbpiecedefault -= 1;
            console.log(`Nouvelle salle générée en [${i - 1};${j}], ${nbpiecedefault} salles restantes`);
          }

          // @ts-ignore
          if (quadrillage[i][j][3] >= random.intBetween(1, 100)) {
            // @ts-ignore
            quadrillage[i][j + 1] = salleInit;
            // @ts-ignore
            quadrillage[i][j + 1][2] -= 50;
            // @ts-ignore
            quadrillage[i][j + 1][3] -= 25;
            // @ts-ignore
            quadrillage[i][j + 1][4] -= 50;
            // @ts-ignore
            quadrillage[i][j + 1][5] -= 100;
            nbpiecedefault -= 1;
            console.log(`Nouvelle salle générée en [${i};${j + 1}], ${nbpiecedefault} salles restantes`);
          }

          // @ts-ignore
          if (quadrillage[i][j][4] >= random.intBetween(1, 100)) {
            // @ts-ignore
            quadrillage[i + 1][j] = salleInit;
            // @ts-ignore
            quadrillage[i + 1][j][2] -= 100;
            // @ts-ignore
            quadrillage[i + 1][j][3] -= 50;
            // @ts-ignore
            quadrillage[i + 1][j][4] -= 25;
            // @ts-ignore
            quadrillage[i + 1][j][5] -= 50;
            nbpiecedefault -= 1;
            console.log(`Nouvelle salle générée en [${i + 1};${j}], ${nbpiecedefault} salles restantes`);
          }

          // @ts-ignore
          if (quadrillage[i][j][5] >= random.intBetween(1, 100)) {
            // @ts-ignore
            quadrillage[i][j - 1] = salleInit;
            // @ts-ignore
            quadrillage[i][j - 1][2] -= 50;
            // @ts-ignore
            quadrillage[i][j - 1][3] -= 100;
            // @ts-ignore
            quadrillage[i][j - 1][4] -= 50;
            // @ts-ignore
            quadrillage[i][j - 1][5] -= 25;
            nbpiecedefault -= 1;
            console.log(`Nouvelle salle générée en [${i};${j - 1}], ${nbpiecedefault} salles restantes`);
          }

          // @ts-ignore
          quadrillage[i][j][6] = true;

        }

    const stop = Date.now();

    console.log(stop - start, "ms");

    console.log(this.renderTextStage(quadrillage));

  }

  static generateRandom(params: { floor: number }, seed: RandomSeed) {
    return new Stage(params, seed);
  }

  renderTextStage(quadrillage: (number | boolean)[][][]) {
    let res = "";
    quadrillage.forEach(ligne => {
      // console.log(ligne);
      ligne.forEach(tile => {
        // console.log(tile);
        res += tile[0] ? "X" : " ";
      });
      res += "\n";
    });
    return res;
  }

}
