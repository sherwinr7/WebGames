import { Tetromino } from './Tetromino.js';
import { PIECE_TYPES } from '../utils/constants.js';

export class TetrominoFactory {
  constructor() {
    this.bag = [];
    this.nextQueue = [];
  }

  // Fisher-Yates shuffle algorithm
  shuffle(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }

  generateBag() {
    return this.shuffle(PIECE_TYPES);
  }

  getNextPiece() {
    // Refill bag if empty
    if (this.bag.length === 0) {
      this.bag = this.generateBag();
    }
    
    const type = this.bag.shift();
    return new Tetromino(type);
  }

  initializeQueue() {
    this.nextQueue = [];
    for (let i = 0; i < 3; i++) {
      this.nextQueue.push(this.getNextPiece());
    }
  }

  getNext() {
    const piece = this.nextQueue.shift();
    this.nextQueue.push(this.getNextPiece());
    return piece;
  }

  peekQueue() {
    return this.nextQueue;
  }
}
