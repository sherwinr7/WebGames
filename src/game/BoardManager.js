import { Board } from './Board.js';
import { WALL_KICKS, BOARD_HIDDEN_ROWS } from '../utils/constants.js';

export class BoardManager {
  constructor() {
    this.board = new Board();
  }

  canPlacePiece(piece) {
    const cells = piece.getCells();
    return cells.every(cell => !this.board.isOccupied(cell.x, cell.y));
  }

  canMove(piece, dx, dy) {
    const testPiece = piece.clone();
    testPiece.x += dx;
    testPiece.y += dy;
    return this.canPlacePiece(testPiece);
  }

  moveLeft(piece) {
    if (this.canMove(piece, -1, 0)) {
      piece.x--;
      return true;
    }
    return false;
  }

  moveRight(piece) {
    if (this.canMove(piece, 1, 0)) {
      piece.x++;
      return true;
    }
    return false;
  }

  moveDown(piece) {
    if (this.canMove(piece, 0, 1)) {
      piece.y++;
      return true;
    }
    return false;
  }

  canRotate(piece, newRotation, kickData) {
    const testPiece = piece.clone();
    testPiece.rotation = newRotation;
    
    // Try each wall kick offset
    for (const [dx, dy] of kickData) {
      testPiece.x = piece.x + dx;
      testPiece.y = piece.y + dy;
      
      if (this.canPlacePiece(testPiece)) {
        return { success: true, dx, dy };
      }
    }
    
    return { success: false };
  }

  rotate(piece, clockwise = true) {
    const oldRotation = piece.rotation;
    const newRotation = clockwise 
      ? (oldRotation + 1) % 4 
      : (oldRotation + 3) % 4;
    
    // Determine wall kick table
    const kickTable = piece.type === 'I' ? WALL_KICKS.I : WALL_KICKS.JLSTZ;
    const kickKey = `${oldRotation}->${newRotation}`;
    const kickData = kickTable[kickKey] || [[0, 0]];
    
    const result = this.canRotate(piece, newRotation, kickData);
    
    if (result.success) {
      piece.rotation = newRotation;
      piece.x += result.dx;
      piece.y += result.dy;
      return true;
    }
    
    return false;
  }

  calculateGhostPosition(piece) {
    const ghost = piece.clone();
    while (this.canMove(ghost, 0, 1)) {
      ghost.y++;
    }
    return ghost;
  }

  hardDrop(piece) {
    let distance = 0;
    while (this.canMove(piece, 0, 1)) {
      piece.y++;
      distance++;
    }
    return distance;
  }

  lockPiece(piece) {
    this.board.addPiece(piece);
  }

  isGameOver(piece) {
    const cells = piece.getCells();
    return cells.some(cell => cell.y < BOARD_HIDDEN_ROWS);
  }

  getCompletedRows() {
    const completedRows = [];
    
    for (let y = 0; y < this.board.height; y++) {
      if (this.board.grid[y].every(cell => cell !== 0)) {
        completedRows.push(y);
      }
    }
    
    return completedRows;
  }

  clearRows(rows) {
    // Sort rows in descending order
    rows.sort((a, b) => b - a);
    
    // Remove each row and add empty row at top
    rows.forEach(row => {
      this.board.grid.splice(row, 1);
      this.board.grid.unshift(Array(this.board.width).fill(0));
    });
  }

  reset() {
    this.board.clear();
  }
}
