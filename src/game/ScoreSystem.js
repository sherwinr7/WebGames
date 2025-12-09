import { SCORING } from '../utils/constants.js';

export class ScoreSystem {
  constructor() {
    this.score = 0;
    this.lines = 0;
    this.combo = 0;
    this.highScore = this.loadHighScore();
  }

  calculateLineClearScore(linesCleared, level) {
    let baseScore = 0;
    
    switch (linesCleared) {
      case 1:
        baseScore = SCORING.SINGLE;
        break;
      case 2:
        baseScore = SCORING.DOUBLE;
        break;
      case 3:
        baseScore = SCORING.TRIPLE;
        break;
      case 4:
        baseScore = SCORING.TETRIS;
        break;
      default:
        baseScore = 0;
    }
    
    return baseScore * level;
  }

  calculateComboBonus(level) {
    return SCORING.COMBO_BONUS * this.combo * level;
  }

  addLineClearScore(linesCleared, level, isTSpin = false, tSpinType = null) {
    if (linesCleared > 0) {
      // Base line clear score
      let points = this.calculateLineClearScore(linesCleared, level);
      
      // T-Spin bonus
      if (isTSpin && tSpinType) {
        switch (tSpinType) {
          case 'mini':
            points = SCORING.T_SPIN_MINI * level;
            break;
          case 'normal':
            if (linesCleared === 0) {
              points = SCORING.T_SPIN * level;
            } else if (linesCleared === 1) {
              points = SCORING.T_SPIN_SINGLE * level;
            } else if (linesCleared === 2) {
              points = SCORING.T_SPIN_DOUBLE * level;
            } else if (linesCleared === 3) {
              points = SCORING.T_SPIN_TRIPLE * level;
            }
            break;
        }
      }
      
      // Combo bonus
      const comboBonus = this.calculateComboBonus(level);
      points += comboBonus;
      
      this.score += points;
      this.lines += linesCleared;
      this.combo++;
    } else {
      // Reset combo if no lines cleared
      this.combo = 0;
    }
    
    this.updateHighScore();
  }

  addSoftDropScore(cells) {
    this.score += cells * SCORING.SOFT_DROP;
  }

  addHardDropScore(distance) {
    this.score += distance * SCORING.HARD_DROP;
  }

  updateHighScore() {
    if (this.score > this.highScore) {
      this.highScore = this.score;
      this.saveHighScore();
    }
  }

  saveHighScore() {
    try {
      localStorage.setItem('fallingBlockHighScore', this.highScore.toString());
    } catch (e) {
      console.warn('Could not save high score to localStorage:', e);
    }
  }

  loadHighScore() {
    try {
      const saved = localStorage.getItem('fallingBlockHighScore');
      return saved ? parseInt(saved, 10) : 0;
    } catch (e) {
      console.warn('Could not load high score from localStorage:', e);
      return 0;
    }
  }

  reset() {
    this.score = 0;
    this.lines = 0;
    this.combo = 0;
  }
}
