export class GameLoop {
  constructor(gameState, renderEngine, uiRenderer, particleSystem, audioManager) {
    this.gameState = gameState;
    this.renderEngine = renderEngine;
    this.uiRenderer = uiRenderer;
    this.particleSystem = particleSystem;
    this.audioManager = audioManager;
    
    this.lastTime = 0;
    this.animationId = null;
    this.isRunning = false;
  }

  start() {
    if (this.isRunning) return;
    
    this.isRunning = true;
    this.lastTime = performance.now();
    this.loop(this.lastTime);
  }

  stop() {
    this.isRunning = false;
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
      this.animationId = null;
    }
  }

  loop(currentTime) {
    if (!this.isRunning) return;
    
    // Calculate delta time in milliseconds
    const deltaTime = currentTime - this.lastTime;
    this.lastTime = currentTime;
    
    // Update game state (only if playing)
    if (this.gameState.status === 'playing') {
      this.gameState.update(deltaTime);
    }
    
    // Update particles
    this.particleSystem.update();
    
    // Render everything
    this.render();
    
    // Continue loop
    this.animationId = requestAnimationFrame((time) => this.loop(time));
  }

  render() {
    // Render main game board
    this.renderEngine.render();
    
    // Render particles on top
    this.particleSystem.render();
    
    // Render UI elements
    this.uiRenderer.render();
  }
}
