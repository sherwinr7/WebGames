import { CELL_SIZE } from '../utils/constants.js';

export class UIRenderer {
  constructor(gameState) {
    this.gameState = gameState;
    
    // Get canvas elements
    this.holdCanvas = document.getElementById('hold-canvas');
    this.nextCanvas = document.getElementById('next-canvas');
    
    this.holdCtx = this.holdCanvas?.getContext('2d');
    this.nextCtx = this.nextCanvas?.getContext('2d');
    
    // Get UI elements
    this.scoreElement = document.getElementById('score');
    this.highScoreElement = document.getElementById('high-score');
    this.levelElement = document.getElementById('level');
    this.linesElement = document.getElementById('lines');
    this.comboElement = document.getElementById('combo');
    this.overlayElement = document.getElementById('game-overlay');
    this.overlayContentElement = document.getElementById('overlay-content');
  }

  drawPieceOnCanvas(ctx, piece, offsetX = 0, offsetY = 0) {
    if (!piece || !ctx) return;
    
    const shape = piece.getShape();
    const cellSize = 25; // Smaller cells for preview
    
    // Calculate centering offset
    const shapeWidth = shape[0].length * cellSize;
    const shapeHeight = shape.length * cellSize;
    const canvasWidth = ctx.canvas.width;
    const canvasHeight = ctx.canvas.height;
    const centerX = (canvasWidth - shapeWidth) / 2;
    const centerY = (canvasHeight - shapeHeight) / 2;
    
    for (let row = 0; row < shape.length; row++) {
      for (let col = 0; col < shape[row].length; col++) {
        if (shape[row][col]) {
          const x = centerX + col * cellSize + offsetX;
          const y = centerY + row * cellSize + offsetY;
          
          // Draw cell
          ctx.fillStyle = piece.color;
          ctx.fillRect(x + 1, y + 1, cellSize - 2, cellSize - 2);
          
          // Draw highlight
          ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
          ctx.fillRect(x + 1, y + 1, cellSize - 2, cellSize / 3);
          
          // Draw border
          ctx.strokeStyle = 'rgba(0, 0, 0, 0.3)';
          ctx.lineWidth = 2;
          ctx.strokeRect(x + 1, y + 1, cellSize - 2, cellSize - 2);
        }
      }
    }
  }

  renderHoldPiece() {
    if (!this.holdCtx) return;
    
    // Clear canvas
    this.holdCtx.fillStyle = '#1a1a2e';
    this.holdCtx.fillRect(0, 0, this.holdCanvas.width, this.holdCanvas.height);
    
    // Draw hold piece
    if (this.gameState.holdPiece) {
      this.drawPieceOnCanvas(this.holdCtx, this.gameState.holdPiece);
    }
  }

  renderNextQueue() {
    if (!this.nextCtx) return;
    
    // Clear canvas
    this.nextCtx.fillStyle = '#1a1a2e';
    this.nextCtx.fillRect(0, 0, this.nextCanvas.width, this.nextCanvas.height);
    
    // Draw next pieces
    const nextQueue = this.gameState.getNextQueue();
    const pieceHeight = this.nextCanvas.height / 3;
    
    nextQueue.forEach((piece, index) => {
      this.nextCtx.save();
      this.nextCtx.translate(0, index * pieceHeight);
      
      // Create temporary canvas context for this piece
      const tempCanvas = document.createElement('canvas');
      tempCanvas.width = this.nextCanvas.width;
      tempCanvas.height = pieceHeight;
      const tempCtx = tempCanvas.getContext('2d');
      
      this.drawPieceOnCanvas(tempCtx, piece);
      
      this.nextCtx.drawImage(tempCanvas, 0, 0);
      this.nextCtx.restore();
    });
  }

  updateScoreDisplay() {
    if (this.scoreElement) {
      this.scoreElement.textContent = this.gameState.scoreSystem.score.toLocaleString();
    }
    
    if (this.highScoreElement) {
      this.highScoreElement.textContent = this.gameState.scoreSystem.highScore.toLocaleString();
    }
    
    if (this.levelElement) {
      this.levelElement.textContent = this.gameState.levelSystem.level;
    }
    
    if (this.linesElement) {
      this.linesElement.textContent = this.gameState.scoreSystem.lines;
    }
    
    if (this.comboElement) {
      this.comboElement.textContent = this.gameState.scoreSystem.combo;
      
      // Highlight combo if active
      if (this.gameState.scoreSystem.combo > 0) {
        this.comboElement.style.color = '#ffd700';
        this.comboElement.style.transform = 'scale(1.2)';
      } else {
        this.comboElement.style.color = '#fff';
        this.comboElement.style.transform = 'scale(1)';
      }
    }
  }

  showPauseOverlay() {
    if (!this.overlayElement || !this.overlayContentElement) return;
    
    this.overlayContentElement.innerHTML = `
      <h2>PAUSED</h2>
      <p>Press P or ESC to resume</p>
    `;
    this.overlayElement.classList.remove('hidden');
  }

  showGameOverOverlay() {
    if (!this.overlayElement || !this.overlayContentElement) return;
    
    const score = this.gameState.scoreSystem.score;
    const highScore = this.gameState.scoreSystem.highScore;
    const isNewHighScore = score === highScore && score > 0;
    
    this.overlayContentElement.innerHTML = `
      <h2>GAME OVER</h2>
      ${isNewHighScore ? '<p style="color: #ffd700; font-size: 1.5rem;">🎉 NEW HIGH SCORE! 🎉</p>' : ''}
      <p>Score: ${score.toLocaleString()}</p>
      <p>Level: ${this.gameState.levelSystem.level}</p>
      <p>Lines: ${this.gameState.scoreSystem.lines}</p>
      <p style="margin-top: 20px;">Press R to restart</p>
    `;
    this.overlayElement.classList.remove('hidden');
  }

  hideOverlay() {
    if (this.overlayElement) {
      this.overlayElement.classList.add('hidden');
    }
  }

  updateOverlay() {
    if (this.gameState.status === 'paused') {
      this.showPauseOverlay();
    } else if (this.gameState.status === 'gameover') {
      this.showGameOverOverlay();
    } else {
      this.hideOverlay();
    }
  }

  render() {
    this.renderHoldPiece();
    this.renderNextQueue();
    this.updateScoreDisplay();
    this.updateOverlay();
  }
}
