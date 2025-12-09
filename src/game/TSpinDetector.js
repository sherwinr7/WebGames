export class TSpinDetector {
  constructor(boardManager) {
    this.boardManager = boardManager;
    this.lastAction = null;
  }

  setLastAction(action) {
    this.lastAction = action;
  }

  detectTSpin(piece) {
    // Only T pieces can perform T-Spins
    if (piece.type !== 'T') {
      return { isTSpin: false, type: null };
    }

    // Must have been a rotation, not just movement
    if (this.lastAction !== 'rotate') {
      return { isTSpin: false, type: null };
    }

    // Check the 4 diagonal corners around the T piece center
    const corners = this.getCornerPositions(piece);
    const occupiedCorners = corners.filter(corner => 
      this.boardManager.board.isOccupied(corner.x, corner.y)
    );

    // T-Spin requires at least 3 of 4 corners to be occupied
    if (occupiedCorners.length >= 3) {
      // Check if it's a mini T-Spin or regular T-Spin
      const isMini = this.isMiniTSpin(piece, corners, occupiedCorners);
      return {
        isTSpin: true,
        type: isMini ? 'mini' : 'normal'
      };
    }

    return { isTSpin: false, type: null };
  }

  getCornerPositions(piece) {
    // Get the center position of the T piece
    // T piece center is at position [1,1] in its shape matrix
    const centerX = piece.x + 1;
    const centerY = piece.y + 1;

    return [
      { x: centerX - 1, y: centerY - 1 }, // Top-left
      { x: centerX + 1, y: centerY - 1 }, // Top-right
      { x: centerX - 1, y: centerY + 1 }, // Bottom-left
      { x: centerX + 1, y: centerY + 1 }  // Bottom-right
    ];
  }

  isMiniTSpin(piece, corners, occupiedCorners) {
    // Mini T-Spin detection: check if the front corners are occupied
    // Front corners depend on rotation state
    const frontCorners = this.getFrontCorners(piece.rotation, corners);
    const frontOccupied = frontCorners.filter(corner =>
      occupiedCorners.some(oc => oc.x === corner.x && oc.y === corner.y)
    );

    // If both front corners are not occupied, it's a mini T-Spin
    return frontOccupied.length < 2;
  }

  getFrontCorners(rotation, corners) {
    // Front corners based on T piece rotation
    switch (rotation) {
      case 0: // T pointing up
        return [corners[0], corners[1]]; // Top corners
      case 1: // T pointing right
        return [corners[1], corners[3]]; // Right corners
      case 2: // T pointing down
        return [corners[2], corners[3]]; // Bottom corners
      case 3: // T pointing left
        return [corners[0], corners[2]]; // Left corners
      default:
        return [];
    }
  }
}
