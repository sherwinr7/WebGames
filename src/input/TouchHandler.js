export class TouchHandler {
  constructor(gameState, canvas) {
    this.gameState = gameState;
    this.canvas = canvas;
    this.touchStartX = 0;
    this.touchStartY = 0;
    this.touchStartTime = 0;
    this.swipeThreshold = 30; // pixels
    this.tapThreshold = 200; // ms
    
    this.setupEventListeners();
    this.setupTouchButtons();
  }

  setupEventListeners() {
    this.canvas.addEventListener('touchstart', this.handleTouchStart.bind(this), { passive: false });
    this.canvas.addEventListener('touchmove', this.handleTouchMove.bind(this), { passive: false });
    this.canvas.addEventListener('touchend', this.handleTouchEnd.bind(this), { passive: false });
  }

  setupTouchButtons() {
    const touchControls = document.getElementById('touch-controls');
    if (!touchControls) return;
    
    // Show touch controls on mobile
    if (this.isMobileDevice()) {
      touchControls.classList.remove('hidden');
      touchControls.classList.add('visible');
    }
    
    // Set up button listeners
    const buttons = touchControls.querySelectorAll('.touch-btn');
    buttons.forEach(button => {
      button.addEventListener('touchstart', (e) => {
        e.preventDefault();
        const action = button.dataset.action;
        this.handleButtonAction(action);
      });
      
      button.addEventListener('click', (e) => {
        e.preventDefault();
        const action = button.dataset.action;
        this.handleButtonAction(action);
      });
    });
  }

  handleButtonAction(action) {
    switch (action) {
      case 'rotate-cw':
        this.gameState.rotate(true);
        break;
      case 'rotate-ccw':
        this.gameState.rotate(false);
        break;
      case 'hold':
        this.gameState.hold();
        break;
      case 'hard-drop':
        this.gameState.hardDrop();
        break;
    }
  }

  handleTouchStart(event) {
    event.preventDefault();
    
    const touch = event.touches[0];
    this.touchStartX = touch.clientX;
    this.touchStartY = touch.clientY;
    this.touchStartTime = Date.now();
  }

  handleTouchMove(event) {
    event.preventDefault();
  }

  handleTouchEnd(event) {
    event.preventDefault();
    
    const touch = event.changedTouches[0];
    const touchEndX = touch.clientX;
    const touchEndY = touch.clientY;
    const touchEndTime = Date.now();
    
    const deltaX = touchEndX - this.touchStartX;
    const deltaY = touchEndY - this.touchStartY;
    const deltaTime = touchEndTime - this.touchStartTime;
    
    const absDeltaX = Math.abs(deltaX);
    const absDeltaY = Math.abs(deltaY);
    
    // Check for tap (quick touch without much movement)
    if (deltaTime < this.tapThreshold && absDeltaX < 10 && absDeltaY < 10) {
      this.gameState.rotate(true);
      return;
    }
    
    // Check for swipe
    if (absDeltaX > this.swipeThreshold || absDeltaY > this.swipeThreshold) {
      if (absDeltaX > absDeltaY) {
        // Horizontal swipe
        if (deltaX > 0) {
          this.gameState.moveRight();
        } else {
          this.gameState.moveLeft();
        }
      } else {
        // Vertical swipe
        if (deltaY > 0) {
          this.gameState.moveDown();
        }
      }
    }
  }

  isMobileDevice() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  }

  destroy() {
    this.canvas.removeEventListener('touchstart', this.handleTouchStart.bind(this));
    this.canvas.removeEventListener('touchmove', this.handleTouchMove.bind(this));
    this.canvas.removeEventListener('touchend', this.handleTouchEnd.bind(this));
  }
}
