import { BoardManager } from './BoardManager.js';
import { TetrominoFactory } from './TetrominoFactory.js';
import { ScoreSystem } from './ScoreSystem.js';
import { LevelSystem } from './LevelSystem.js';
import { TSpinDetector } from './TSpinDetector.js';
import { LOCK_DELAY, MAX_LOCK_RESETS } from '../utils/constants.js';

class GameState {
  constructor() {
    this.status = 'playing';
    this.boardManager = new BoardManager();
    this.factory = new TetrominoFactory();
    this.scoreSystem = new ScoreSystem();
    this.levelSystem = new LevelSystem();
    this.tSpinDetector = new TSpinDetector(this.boardManager);
    this.activePiece = null;
    this.holdPiece = null;
    this.canHold = true;
    this.lockDelayTimer = 0;
    this.lockDelayActive = false;
    this.lockResetCount = 0;
    this.fallTimer = 0;
    this.isMuted = this.loadMuteState();
    this.lastTSpinResult = { isTSpin: false, type: null };
    this.init();
  }

  init() {
    this.factory.initializeQueue();
    this.spawnPiece();
  }

  spawnPiece() {
    this.activePiece = this.factory.getNext();
    this.canHold = true;
    this.lockDelayActive = false;
    this.lockDelayTimer = 0;
    this.lockResetCount = 0;
    this.tSpinDetector.setLastAction(null);
    if (!this.boardManager.canPlacePiece(this.activePiece)) {
      this.status = 'gameover';
    }
  }

  moveLeft() {
    if (this.status !== 'playing' || !this.activePiece) return false;
    const moved = this.boardManager.moveLeft(this.activePiece);
    if (moved) {
      this.tSpinDetector.setLastAction('move');
      this.resetLockDelayIfActive();
    }
    return moved;
  }

  moveRight() {
    if (this.status !== 'playing' || !this.activePiece) return false;
    const moved = this.boardManager.moveRight(this.activePiece);
    if (moved) {
      this.tSpinDetector.setLastAction('move');
      this.resetLockDelayIfActive();
    }
    return moved;
  }

  moveDown() {
    if (this.status !== 'playing' || !this.activePiece) return false;
    const moved = this.boardManager.moveDown(this.activePiece);
    if (moved) {
      this.tSpinDetector.setLastAction('move');
      this.scoreSystem.addSoftDropScore(1);
      this.resetLockDelayIfActive();
    } else {
      this.startLockDelay();
    }
    return moved;
  }

  rotate(clockwise = true) {
    if (this.status !== 'playing' || !this.activePiece) return false;
    const rotated = this.boardManager.rotate(this.activePiece, clockwise);
    if (rotated) {
      this.tSpinDetector.setLastAction('rotate');
      this.resetLockDelayIfActive();
    }
    return rotated;
  }

  hardDrop() {
    if (this.status !== 'playing' || !this.activePiece) return 0;
    const distance = this.boardManager.hardDrop(this.activePiece);
    this.scoreSystem.addHardDropScore(distance);
    this.lockPiece();
    return distance;
  }

  hold() {
    if (this.status !== 'playing' || !this.activePiece || !this.canHold) return false;
    if (this.holdPiece === null) {
      this.holdPiece = this.activePiece;
      this.holdPiece.x = 3;
      this.holdPiece.y = 0;
      this.holdPiece.rotation = 0;
      this.spawnPiece();
    } else {
      const temp = this.activePiece;
      this.activePiece = this.holdPiece;
      this.activePiece.x = 3;
      this.activePiece.y = 0;
      this.holdPiece = temp;
      this.holdPiece.x = 3;
      this.holdPiece.y = 0;
      this.holdPiece.rotation = 0;
    }
    this.canHold = false;
    this.lockDelayActive = false;
    this.lockDelayTimer = 0;
    this.tSpinDetector.setLastAction(null);
    return true;
  }

  startLockDelay() {
    if (!this.lockDelayActive) {
      this.lockDelayActive = true;
      this.lockDelayTimer = 0;
    }
  }

  resetLockDelayIfActive() {
    if (this.lockDelayActive && this.lockResetCount < MAX_LOCK_RESETS) {
      this.lockDelayTimer = 0;
      this.lockResetCount++;
    }
  }

  updateLockDelay(deltaTime) {
    if (this.lockDelayActive) {
      this.lockDelayTimer += deltaTime;
      if (this.lockDelayTimer >= LOCK_DELAY) {
        this.lockPiece();
      }
    }
  }

  lockPiece() {
    if (!this.activePiece) return;
    this.lastTSpinResult = this.tSpinDetector.detectTSpin(this.activePiece);
    this.boardManager.lockPiece(this.activePiece);
    if (this.boardManager.isGameOver(this.activePiece)) {
      this.status = 'gameover';
      return;
    }
    const completedRows = this.boardManager.getCompletedRows();
    this.scoreSystem.addLineClearScore(completedRows.length, this.levelSystem.level, this.lastTSpinResult.isTSpin, this.lastTSpinResult.type);
    if (completedRows.length > 0) {
      this.boardManager.clearRows(completedRows);
    }
    this.levelSystem.updateLevel(this.scoreSystem.lines);
    this.spawnPiece();
  }

  updateFallTimer(deltaTime) {
    if (this.status !== 'playing' || !this.activePiece) return;
    this.fallTimer += deltaTime;
    const fallSpeed = this.levelSystem.getFallSpeed();
    if (this.fallTimer >= fallSpeed) {
      this.fallTimer = 0;
      this.moveDown();
    }
  }

  update(deltaTime) {
    if (this.status !== 'playing') return;
    this.updateFallTimer(deltaTime);
    this.updateLockDelay(deltaTime);
  }

  togglePause() {
    if (this.status === 'playing') {
      this.status = 'paused';
    } else if (this.status === 'paused') {
      this.status = 'playing';
    }
  }

  reset() {
    this.status = 'playing';
    this.boardManager.reset();
    this.scoreSystem.reset();
    this.levelSystem.reset();
    this.factory = new TetrominoFactory();
    this.activePiece = null;
    this.holdPiece = null;
    this.canHold = true;
    this.lockDelayTimer = 0;
    this.lockDelayActive = false;
    this.lockResetCount = 0;
    this.fallTimer = 0;
    this.lastTSpinResult = { isTSpin: false, type: null };
    this.init();
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    this.saveMuteState();
  }

  saveMuteState() {
    try {
      localStorage.setItem('fallingBlockMuted', this.isMuted.toString());
    } catch (e) {
      console.warn('Could not save mute state to localStorage:', e);
    }
  }

  loadMuteState() {
    try {
      const saved = localStorage.getItem('fallingBlockMuted');
      return saved === 'true';
    } catch (e) {
      console.warn('Could not load mute state from localStorage:', e);
      return false;
    }
  }

  getGhostPiece() {
    if (!this.activePiece) return null;
    return this.boardManager.calculateGhostPosition(this.activePiece);
  }

  getNextQueue() {
    return this.factory.peekQueue();
  }
}


export default GameState;
