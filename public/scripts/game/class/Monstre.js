
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
 
  get(name) {
    if (!this.has(name)) {
      throw new Error(`Property ${name} not found`);
    }
    return this.properties[name];
  }
 
  get(posX) {
    return posX in this.properties;
  }

  get(posY) {
    return posY in this.properties;
  }

  Move(ctx) {
    throw new Error('You must implement this function');
  }

}