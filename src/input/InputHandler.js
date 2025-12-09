export class InputHandler {
  constructor(gameState) {
    this.gameState = gameState;
    this.keys = {};
    this.keyRepeatDelay = 150; // ms
    this.keyRepeatInterval = 50; // ms
    this.keyTimers = {};
    
    this.setupEventListeners();
  }

  setupEventListeners() {
    document.addEventListener('keydown', this.handleKeyDown.bind(this));
    document.addEventListener('keyup', this.handleKeyUp.bind(this));
  }

  handleKeyDown(event) {
    const key = event.key;
    
    // Prevent default for game keys
    const gameKeys = ['ArrowLeft', 'ArrowRight', 'ArrowDown', 'ArrowUp', ' ', 'z', 'Z', 'x', 'X', 'c', 'C', 'p', 'P', 'Escape', 'r', 'R'];
    if (gameKeys.includes(key)) {
      event.preventDefault();
    }
    
    // Ignore if key is already pressed (prevents key repeat)
    if (this.keys[key]) return;
    
    this.keys[key] = true;
    this.processKey(key);
  }

  handleKeyUp(event) {
    const key = event.key;
    this.keys[key] = false;
    
    if (this.keyTimers[key]) {
      clearTimeout(this.keyTimers[key]);
      delete this.keyTimers[key];
    }
  }

  processKey(key) {
    switch (key) {
      case 'ArrowLeft':
        this.gameState.moveLeft();
        this.setupKeyRepeat(key, () => this.gameState.moveLeft());
        break;
      case 'ArrowRight':
        this.gameState.moveRight();
        this.setupKeyRepeat(key, () => this.gameState.moveRight());
        break;
      case 'ArrowDown':
        this.gameState.moveDown();
        this.setupKeyRepeat(key, () => this.gameState.moveDown());
        break;
      case 'ArrowUp':
      case 'x':
      case 'X':
        this.gameState.rotate(true); // Clockwise
        break;
      case 'z':
      case 'Z':
        this.gameState.rotate(false); // Counter-clockwise
        break;
      case ' ':
        this.gameState.hardDrop();
        break;
      case 'c':
      case 'C':
        this.gameState.hold();
        break;
      case 'p':
      case 'P':
      case 'Escape':
        this.gameState.togglePause();
        break;
      case 'r':
      case 'R':
        if (this.gameState.status === 'gameover') {
          this.gameState.reset();
        }
        break;
    }
  }

  setupKeyRepeat(key, action) {
    // Clear existing timer
    if (this.keyTimers[key]) {
      clearTimeout(this.keyTimers[key]);
    }
    
    // Set up repeat after delay
    this.keyTimers[key] = setTimeout(() => {
      this.repeatKey(key, action);
    }, this.keyRepeatDelay);
  }

  repeatKey(key, action) {
    if (!this.keys[key]) return;
    
    action();
    
    this.keyTimers[key] = setTimeout(() => {
      this.repeatKey(key, action);
    }, this.keyRepeatInterval);
  }

  destroy() {
    document.removeEventListener('keydown', this.handleKeyDown.bind(this));
    document.removeEventListener('keyup', this.handleKeyUp.bind(this));
    
    // Clear all timers
    Object.values(this.keyTimers).forEach(timer => clearTimeout(timer));
  }
}
