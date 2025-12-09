import { BOARD_WIDTH, BOARD_TOTAL_HEIGHT } from '../utils/constants.js';

export class Board {
  constructor() {
    this.width = BOARD_WIDTH;
    this.height = BOARD_TOTAL_HEIGHT;
    this.grid = this.createEmptyGrid();
  }

  createEmptyGrid() {
    return Array(this.height).fill(null).map(() => Array(this.width).fill(0));
  }

  isValidPosition(x, y) {
    return x >= 0 && x < this.width && y >= 0 && y < this.height;
  }

  isOccupied(x, y) {
    if (!this.isValidPosition(x, y)) {
      return true; // Out of bounds counts as occupied
    }
    return this.grid[y][x] !== 0;
  }

  getCell(x, y) {
    if (!this.isValidPosition(x, y)) {
      return null;
    }
    return this.grid[y][x];
  }

  setCell(x, y, value) {
    if (this.isValidPosition(x, y)) {
      this.grid[y][x] = value;
    }
  }

  addPiece(piece) {
    const cells = piece.getCells();
    cells.forEach(cell => {
      if (this.isValidPosition(cell.x, cell.y)) {
        this.grid[cell.y][cell.x] = piece.color;
      }
    });
  }

  clear() {
    this.grid = this.createEmptyGrid();
  }

  clone() {
    const newBoard = new Board();
    newBoard.grid = this.grid.map(row => [...row]);
    return newBoard;
  }
}
