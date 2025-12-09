import GameState from './game/GameState.js';
import { GameLoop } from './game/GameLoop.js';
import { RenderEngine } from './render/RenderEngine.js';
import { UIRenderer } from './render/UIRenderer.js';
import { ParticleSystem } from './render/ParticleSystem.js';
import { InputHandler } from './input/InputHandler.js';
import { TouchHandler } from './input/TouchHandler.js';
import { AudioManager } from './audio/AudioManager.js';

class Game {
  constructor() {
    this.canvas = document.getElementById('game-canvas');
    this.muteBtn = document.getElementById('mute-btn');
    this.themeToggle = document.getElementById('theme-toggle');
    this.isDarkMode = localStorage.getItem('theme') !== 'light';
    
    if (!this.canvas) {
      console.error('Game canvas not found!');
      return;
    }
    
    this.applyTheme();
    this.init();
  }

  init() {
    // Initialize game state
    console.log('Initializing game...');
    this.gameState = new GameState();
    console.log('GameState created:', this.gameState);
    
    // Initialize rendering
    this.renderEngine = new RenderEngine(this.canvas, this.gameState);
    this.uiRenderer = new UIRenderer(this.gameState);
    this.particleSystem = new ParticleSystem(this.canvas);
    
    // Initialize audio
    this.audioManager = new AudioManager(this.gameState);
    this.audioManager.init();
    
    // Initialize input handlers
    this.inputHandler = new InputHandler(this.gameState);
    this.touchHandler = new TouchHandler(this.gameState, this.canvas);
    
    // Initialize game loop
    this.gameLoop = new GameLoop(
      this.gameState,
      this.renderEngine,
      this.uiRenderer,
      this.particleSystem,
      this.audioManager
    );
    
    // Set up event listeners
    this.setupEventListeners();
    
    // Start the game
    console.log('Starting game loop...');
    console.log('Active piece:', this.gameState.activePiece);
    this.gameLoop.start();
    
    // Play background music
    this.audioManager.playMusic();
  }

  setupEventListeners() {
    // Theme toggle
    if (this.themeToggle) {
      this.themeToggle.addEventListener('click', () => {
        this.isDarkMode = !this.isDarkMode;
        this.applyTheme();
        localStorage.setItem('theme', this.isDarkMode ? 'dark' : 'light');
      });
    }
    
    // Mute button
    if (this.muteBtn) {
      this.muteBtn.addEventListener('click', () => {
        this.gameState.toggleMute();
        this.audioManager.setMuted(this.gameState.isMuted);
        this.updateMuteButton();
      });
      
      this.updateMuteButton();
    }
    
    // Game control buttons
    const controlButtons = document.querySelectorAll('.control-btn-game');
    controlButtons.forEach(button => {
      button.addEventListener('click', (e) => {
        e.preventDefault();
        const action = button.dataset.action;
        this.handleButtonAction(action);
      });
    });
    
    // Handle visibility change (pause when tab is hidden)
    document.addEventListener('visibilitychange', () => {
      if (document.hidden && this.gameState.status === 'playing') {
        this.gameState.togglePause();
      }
    });
  }

  applyTheme() {
    if (this.isDarkMode) {
      document.body.classList.remove('light-mode');
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
      document.body.classList.add('light-mode');
    }
  }

  handleButtonAction(action) {
    switch (action) {
      case 'move-left':
        this.gameState.moveLeft();
        break;
      case 'move-right':
        this.gameState.moveRight();
        break;
      case 'move-down':
        this.gameState.moveDown();
        break;
      case 'rotate-cw':
        this.gameState.rotate(true);
        break;
      case 'rotate-ccw':
        this.gameState.rotate(false);
        break;
      case 'hard-drop':
        this.gameState.hardDrop();
        break;
      case 'hold':
        this.gameState.hold();
        break;
      case 'pause':
        this.gameState.togglePause();
        break;
      case 'restart':
        this.gameState.reset();
        break;
    }
  }

  updateMuteButton() {
    if (this.muteBtn) {
      this.muteBtn.textContent = this.gameState.isMuted ? '🔇' : '🔊';
    }
  }
}

// Start the game when DOM is loaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    new Game();
  });
} else {
  new Game();
}
