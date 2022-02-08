import Monstre from './Monstre.js';

export default class PainMechant extends Monstre {

    constructor() {
        super("PainMechant", "/static/img/monsters/PNG/pain.png", 200, 200);
      }

    move(ctx){
        if(this.deplacement <= 200){
            this.posX+= 2;
            this.deplacement+= 2;
          }
          if(this.deplacement >= 200 &&  this.deplacement<= 400){
            this.posY+= 2;
            this.deplacement+= 2;
          }
          if(this.deplacement >= 400  && this.deplacement <= 600){
            this.posX-= 2;
            this.deplacement+=2;
          }
          if(this.deplacement >= 600){
            this.posY-= 2;
            this.deplacement+=2;
          }
          if(this.deplacement === 800){
            this.deplacement = 0;
          }
         
    }
}

 

