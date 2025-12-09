import { TETROMINOES } from '../utils/constants.js';

export class Tetromino {
  constructor(type, x = 3, y = 0, rotation = 0) {
    this.type = type;
    this.x = x;
    this.y = y;
    this.rotation = rotation;
    this.color = TETROMINOES[type].color;
  }

  getShape() {
    return TETROMINOES[this.type].shapes[this.rotation];
  }

  clone() {
    return new Tetromino(this.type, this.x, this.y, this.rotation);
  }

  getRotatedShape(newRotation) {
    return TETROMINOES[this.type].shapes[newRotation];
  }

  getCells() {
    const shape = this.getShape();
    const cells = [];
    
    for (let row = 0; row < shape.length; row++) {
      for (let col = 0; col < shape[row].length; col++) {
        if (shape[row][col]) {
          cells.push({
            x: this.x + col,
            y: this.y + row
          });
        }
      }
    }
    
    return cells;
  }
}
