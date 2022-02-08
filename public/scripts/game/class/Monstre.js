
export default class Monstre {
  
  constructor(name, sprite, posX, posY) {
    if (this.constructor === Monstre) {
      throw new TypeError('Abstract class "Monstre" cannot be instantiated directly');
    }
    this.sprite = new Image();
    this.sprite.src = sprite;
    this.name = name;
    this.posX = posX;
    this.posY = posY;
    this.deplacement = 0;
  }

  move() {
    throw new Error('You must implement this function');
  }

}