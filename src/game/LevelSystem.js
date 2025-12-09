import { LEVEL_SPEEDS, MIN_FALL_SPEED, LINES_PER_LEVEL } from '../utils/constants.js';

export class LevelSystem {
  constructor() {
    this.level = 1;
  }

  calculateLevel(linesCleared) {
    return Math.floor(linesCleared / LINES_PER_LEVEL) + 1;
  }

  updateLevel(linesCleared) {
    this.level = this.calculateLevel(linesCleared);
  }

  getFallSpeed() {
    // Get speed from table or calculate for higher levels
    if (LEVEL_SPEEDS[this.level]) {
      return LEVEL_SPEEDS[this.level];
    }
    
    // For levels beyond the table, use minimum speed
    return MIN_FALL_SPEED;
  }

  reset() {
    this.level = 1;
  }
}
