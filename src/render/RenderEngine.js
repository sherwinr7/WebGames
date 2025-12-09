import { CELL_SIZE, BOARD_WIDTH, BOARD_HEIGHT, BOARD_HIDDEN_ROWS } from '../utils/constants.js';

export class RenderEngine {
  constructor(canvas, gameState) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.gameState = gameState;
    this.cellSize = CELL_SIZE;
    
    this.setupCanvas();
  }

  setupCanvas() {
    // Set canvas size
    this.canvas.width = BOARD_WIDTH * this.cellSize;
    this.canvas.height = BOARD_HEIGHT * this.cellSize;
    
    // Enable image smoothing for better visuals
    this.ctx.imageSmoothingEnabled = true;
  }

  clear() {
    this.ctx.fillStyle = '#1a1a2e';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
  }

  drawGrid() {
    this.ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
    this.ctx.lineWidth = 1;
    
    // Draw vertical lines
    for (let x = 0; x <= BOARD_WIDTH; x++) {
      this.ctx.beginPath();
      this.ctx.moveTo(x * this.cellSize, 0);
      this.ctx.lineTo(x * this.cellSize, BOARD_HEIGHT * this.cellSize);
      this.ctx.stroke();
    }
    
    // Draw horizontal lines
    for (let y = 0; y <= BOARD_HEIGHT; y++) {
      this.ctx.beginPath();
      this.ctx.moveTo(0, y * this.cellSize);
      this.ctx.lineTo(BOARD_WIDTH * this.cellSize, y * this.cellSize);
      this.ctx.stroke();
    }
  }

  drawCell(x, y, color, alpha = 1) {
    const adjustedY = y - BOARD_HIDDEN_ROWS;
    
    // Don't draw cells in hidden rows
    if (adjustedY < 0) return;
    
    const pixelX = x * this.cellSize;
    const pixelY = adjustedY * this.cellSize;
    
    // Draw cell background
    this.ctx.globalAlpha = alpha;
    this.ctx.fillStyle = color;
    this.ctx.fillRect(pixelX + 1, pixelY + 1, this.cellSize - 2, this.cellSize - 2);
    
    // Draw cell highlight
    this.ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
    this.ctx.fillRect(pixelX + 1, pixelY + 1, this.cellSize - 2, this.cellSize / 3);
    
    // Draw cell border
    this.ctx.strokeStyle = 'rgba(0, 0, 0, 0.3)';
    this.ctx.lineWidth = 2;
    this.ctx.strokeRect(pixelX + 1, pixelY + 1, this.cellSize - 2, this.cellSize - 2);
    
    this.ctx.globalAlpha = 1;
  }

  drawBoard() {
    const board = this.gameState.boardManager.board;
    
    for (let y = BOARD_HIDDEN_ROWS; y < board.height; y++) {
      for (let x = 0; x < board.width; x++) {
        const cell = board.grid[y][x];
        if (cell !== 0) {
          this.drawCell(x, y, cell);
        }
      }
    }
  }

  drawPiece(piece, alpha = 1) {
    if (!piece) return;
    
    const cells = piece.getCells();
    cells.forEach(cell => {
      this.drawCell(cell.x, cell.y, piece.color, alpha);
    });
  }

  drawGhostPiece() {
    const ghost = this.gameState.getGhostPiece();
    if (ghost) {
      this.drawPiece(ghost, 0.3);
    }
  }

  drawActivePiece() {
    if (this.gameState.activePiece) {
      this.drawPiece(this.gameState.activePiece);
    }
  }

  render() {
    this.clear();
    this.drawGrid();
    this.drawBoard();
    this.drawGhostPiece();
    this.drawActivePiece();
  }
}
