# Design Document

## Overview

This design document outlines the architecture for a modern web-based falling block game (Tetris-style) built with vanilla JavaScript, HTML5 Canvas, and CSS. The game features a component-based architecture with clear separation between game logic, rendering, input handling, and state management. The system is designed to be deployed on GitHub Pages with automated CI/CD via GitHub Actions.

The game implements classic Tetris mechanics enhanced with modern features including particle effects, combo tracking, T-Spin detection, ghost pieces, hold mechanics, and progressive difficulty scaling. All game state is managed through a centralized state machine, ensuring predictable behavior and easy testing.

## Architecture

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                         Game Loop                            │
│                    (requestAnimationFrame)                   │
└────────────┬────────────────────────────────────────────────┘
             │
             ├──────────────┬──────────────┬──────────────────┐
             │              │              │                  │
        ┌────▼────┐    ┌────▼────┐   ┌────▼────┐      ┌─────▼─────┐
        │  Input  │    │  Game   │   │ Render  │      │   Audio   │
        │ Handler │    │  State  │   │ Engine  │      │  Manager  │
        └────┬────┘    └────┬────┘   └────┬────┘      └─────┬─────┘
             │              │              │                  │
             │         ┌────▼────────┐     │                  │
             │         │   Board     │     │                  │
             └────────►│  Manager    │◄────┘                  │
                       └────┬────────┘                        │
                            │                                 │
                       ┌────▼────────┐                        │
                       │  Tetromino  │                        │
                       │   Factory   │                        │
                       └─────────────┘                        │
                                                              │
        ┌──────────────────────────────────────────────────┐ │
        │              Particle System                      │ │
        └───────────────────────────────────────────────────┘ │
                                                              │
        ┌──────────────────────────────────────────────────┐ │
        │            Score & Level System                   │◄┘
        └───────────────────────────────────────────────────┘
```

### Component Responsibilities

**Game Loop**
- Manages the main game loop using requestAnimationFrame
- Coordinates timing for piece falling, animations, and rendering
- Handles delta time calculations for frame-independent movement

**Input Handler**
- Captures keyboard events (arrow keys, space, Z, X, C, P, R, Escape)
- Processes touch events for mobile (swipe, tap)
- Implements input buffering for responsive controls
- Prevents key repeat delays for smooth movement

**Game State**
- Maintains current game state (playing, paused, game over)
- Manages state transitions and validates state changes
- Stores current score, level, lines cleared, and combo count
- Handles high score persistence via localStorage

**Board Manager**
- Maintains the 10x20 game board grid (with 2 hidden rows above)
- Handles collision detection for piece movement and rotation
- Implements wall kick system for rotation
- Manages piece locking with lock delay timer
- Detects and clears completed lines
- Calculates ghost piece position

**Tetromino Factory**
- Generates tetrominoes using the 7-bag randomization system
- Defines piece shapes, colors, and rotation states
- Manages the next queue (3 pieces ahead)
- Implements the hold queue with swap restrictions

**Render Engine**
- Draws the game board, active piece, and ghost piece on HTML5 Canvas
- Renders UI elements (score, level, next queue, hold queue)
- Manages particle effects for line clears and hard drops
- Handles animations with smooth interpolation
- Implements responsive scaling for different screen sizes

**Particle System**
- Creates and manages particle effects
- Handles particle lifecycle (spawn, update, destroy)
- Implements different particle types (line clear, hard drop, T-Spin)
- Uses efficient pooling to minimize garbage collection

**Audio Manager**
- Loads and manages sound effects (rotate, lock, clear, T-Spin)
- Plays background music with looping
- Handles mute/unmute functionality
- Manages audio context for web audio API

**Score & Level System**
- Calculates points based on line clears, combos, T-Spins, and hard drops
- Tracks combo chains and applies multipliers
- Manages level progression (every 10 lines)
- Adjusts fall speed based on current level
- Persists high score to localStorage

## Components and Interfaces

### Tetromino Interface

```javascript
interface Tetromino {
  type: 'I' | 'O' | 'T' | 'S' | 'Z' | 'J' | 'L';
  shape: number[][];  // 2D array representing the piece
  color: string;
  x: number;          // Board position
  y: number;
  rotation: number;   // 0-3 for rotation state
}
```

### Board Interface

```javascript
interface Board {
  grid: number[][];   // 10 width x 22 height (2 hidden rows)
  width: number;      // 10
  height: number;     // 20 visible + 2 hidden
}
```

### Game State Interface

```javascript
interface GameState {
  status: 'playing' | 'paused' | 'gameover';
  score: number;
  highScore: number;
  level: number;
  lines: number;
  combo: number;
  activePiece: Tetromino | null;
  holdPiece: Tetromino | null;
  canHold: boolean;
  nextQueue: Tetromino[];
  board: Board;
  lockDelayTimer: number;
  fallTimer: number;
  isMuted: boolean;
}
```

### Input Command Interface

```javascript
interface InputCommand {
  type: 'move' | 'rotate' | 'drop' | 'hold' | 'pause' | 'restart';
  direction?: 'left' | 'right' | 'down';
  rotationDir?: 'cw' | 'ccw';
  dropType?: 'soft' | 'hard';
}
```

## Data Models

### Tetromino Shapes

Standard tetromino shapes with SRS (Super Rotation System) rotation states:

```javascript
const TETROMINOES = {
  I: {
    shape: [[1,1,1,1]],
    color: '#00f0f0',
    rotations: 2  // I piece has 2 unique rotations
  },
  O: {
    shape: [[1,1],[1,1]],
    color: '#f0f000',
    rotations: 1  // O piece doesn't rotate
  },
  T: {
    shape: [[0,1,0],[1,1,1]],
    color: '#a000f0',
    rotations: 4
  },
  S: {
    shape: [[0,1,1],[1,1,0]],
    color: '#00f000',
    rotations: 2
  },
  Z: {
    shape: [[1,1,0],[0,1,1]],
    color: '#f00000',
    rotations: 2
  },
  J: {
    shape: [[1,0,0],[1,1,1]],
    color: '#0000f0',
    rotations: 4
  },
  L: {
    shape: [[0,0,1],[1,1,1]],
    color: '#f0a000',
    rotations: 4
  }
};
```

### Wall Kick Data

SRS wall kick offsets for rotation collision resolution:

```javascript
const WALL_KICKS = {
  JLSTZ: {
    '0->1': [[0,0], [-1,0], [-1,1], [0,-2], [-1,-2]],
    '1->0': [[0,0], [1,0], [1,-1], [0,2], [1,2]],
    '1->2': [[0,0], [1,0], [1,-1], [0,2], [1,2]],
    '2->1': [[0,0], [-1,0], [-1,1], [0,-2], [-1,-2]],
    '2->3': [[0,0], [1,0], [1,1], [0,-2], [1,-2]],
    '3->2': [[0,0], [-1,0], [-1,-1], [0,2], [-1,2]],
    '3->0': [[0,0], [-1,0], [-1,-1], [0,2], [-1,2]],
    '0->3': [[0,0], [1,0], [1,1], [0,-2], [1,-2]]
  },
  I: {
    '0->1': [[0,0], [-2,0], [1,0], [-2,-1], [1,2]],
    '1->0': [[0,0], [2,0], [-1,0], [2,1], [-1,-2]],
    '1->2': [[0,0], [-1,0], [2,0], [-1,2], [2,-1]],
    '2->1': [[0,0], [1,0], [-2,0], [1,-2], [-2,1]],
    '2->3': [[0,0], [2,0], [-1,0], [2,1], [-1,-2]],
    '3->2': [[0,0], [-2,0], [1,0], [-2,-1], [1,2]],
    '3->0': [[0,0], [1,0], [-2,0], [1,-2], [-2,1]],
    '0->3': [[0,0], [-1,0], [2,0], [-1,2], [2,-1]]
  }
};
```

### Scoring Table

```javascript
const SCORING = {
  SINGLE: 100,
  DOUBLE: 300,
  TRIPLE: 500,
  TETRIS: 800,
  COMBO_BONUS: 50,
  SOFT_DROP: 1,
  HARD_DROP: 2,
  T_SPIN_MINI: 100,
  T_SPIN: 400,
  T_SPIN_SINGLE: 800,
  T_SPIN_DOUBLE: 1200,
  T_SPIN_TRIPLE: 1600
};
```

### Level Speed Curve

```javascript
const LEVEL_SPEEDS = {
  1: 1000,   // 1 second per cell
  2: 900,
  3: 800,
  4: 700,
  5: 600,
  6: 500,
  7: 400,
  8: 300,
  9: 250,
  10: 200,
  15: 100,   // Minimum speed threshold
  20: 100
};
```

## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system—essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*


### Property 1: Valid movement preserves piece integrity

*For any* game board state and active piece, when a movement command (left, right, down) is issued, if the destination cells are unoccupied and within bounds, the piece SHALL move by exactly one cell in that direction; otherwise the piece position SHALL remain unchanged.

**Validates: Requirements 1.1, 1.2, 1.5**

### Property 2: Rotation round-trip identity

*For any* tetromino and board state, rotating the piece clockwise four times SHALL result in the piece returning to its original rotation state and position (accounting for wall kicks).

**Validates: Requirements 1.3, 1.4**

### Property 3: Hard drop matches ghost position

*For any* game board state and active piece, executing a hard drop SHALL place the piece at exactly the position indicated by the ghost piece calculation.

**Validates: Requirements 1.6, 2.1**

### Property 4: Ghost piece synchronization

*For any* sequence of valid moves and rotations applied to the active piece, the ghost piece position SHALL always equal the position where the piece would land if hard dropped at that moment.

**Validates: Requirements 2.5**

### Property 5: Hold swap correctness

*For any* active piece and hold piece (or empty hold), activating hold SHALL swap the two pieces such that the previous active piece becomes the hold piece and the previous hold piece (or next piece from queue) becomes the active piece.

**Validates: Requirements 1.7, 3.1**

### Property 6: Hold lock state management

*For any* game state, after using hold, the canHold flag SHALL be false until the current piece locks, at which point canHold SHALL become true again.

**Validates: Requirements 3.3, 3.4**

### Property 7: Next queue invariant

*For any* game state during active play, the next queue SHALL always contain exactly 3 tetrominoes.

**Validates: Requirements 3.5**

### Property 8: Line clear scoring formula

*For any* line clear event with n lines cleared (where 1 ≤ n ≤ 4) at level L, the score awarded SHALL equal SCORING[n] × L, where SCORING[1]=100, SCORING[2]=300, SCORING[3]=500, SCORING[4]=800.

**Validates: Requirements 4.1, 4.2, 4.3, 4.4**

### Property 9: Combo scoring accumulation

*For any* combo count C at level L, the combo bonus awarded SHALL equal 50 × C × L.

**Validates: Requirements 4.5**

### Property 10: T-Spin detection and scoring

*For any* T-piece placement that results from a rotation (not translation) where the piece is surrounded by blocks or walls in at least 3 of the 4 diagonal corners, the system SHALL detect it as a T-Spin and award bonus points according to the T-Spin scoring table.

**Validates: Requirements 4.6**

### Property 11: Hard drop distance scoring

*For any* hard drop operation, the score awarded SHALL equal 2 × D, where D is the number of cells the piece dropped.

**Validates: Requirements 4.7**

### Property 12: Level progression

*For any* game state with L lines cleared, the current level SHALL equal 1 + floor(L / 10).

**Validates: Requirements 5.2**

### Property 13: Fall speed monotonicity

*For any* two levels L1 and L2 where L1 < L2, the fall speed at L2 SHALL be less than or equal to the fall speed at L1, with a minimum threshold at level 15.

**Validates: Requirements 5.3**

### Property 14: Collision detection

*For any* board state and piece position, a move or rotation SHALL be rejected if any cell of the resulting piece position would overlap with an occupied board cell or extend outside the board boundaries.

**Validates: Requirements 6.1**

### Property 15: Lock delay activation

*For any* active piece, when the piece cannot move downward (blocked by bottom or locked pieces), the lock delay timer SHALL activate.

**Validates: Requirements 6.2**

### Property 16: Lock delay reset on movement

*For any* active piece with an active lock delay timer, any successful movement or rotation SHALL reset the lock delay timer to its initial value.

**Validates: Requirements 6.3**

### Property 17: Piece locking finality

*For any* active piece, when the lock delay timer expires, the piece SHALL be permanently added to the board grid and a new piece SHALL spawn.

**Validates: Requirements 6.4**

### Property 18: Game over detection

*For any* piece lock operation, if any cell of the locked piece has a y-coordinate less than 0 (in the hidden rows above the visible board), the game state SHALL transition to game over.

**Validates: Requirements 6.5**

### Property 19: Complete line detection

*For any* board state, a row SHALL be identified as complete if and only if all 10 cells in that row are occupied.

**Validates: Requirements 7.1**

### Property 20: Line clear gravity

*For any* board state where rows R are cleared, all rows above the highest cleared row SHALL move downward by a distance equal to the number of cleared rows, and the resulting board SHALL have no gaps.

**Validates: Requirements 7.3, 7.4**

### Property 21: Pause state toggle

*For any* game state that is either playing or paused, issuing a pause command SHALL toggle the state to the opposite value (playing ↔ paused).

**Validates: Requirements 8.1**

### Property 22: Game reset completeness

*For any* game state, executing a reset SHALL return all game state variables (score, level, lines, combo, board, pieces) to their initial values as if the game just started.

**Validates: Requirements 8.4, 8.5**

### Property 23: High score persistence round-trip

*For any* high score value H, saving H to localStorage and then retrieving it SHALL return the same value H.

**Validates: Requirements 9.2, 9.3**

### Property 24: Mute state toggle

*For any* audio state (muted or unmuted), toggling the mute function SHALL change the state to its opposite value.

**Validates: Requirements 11.6**

## Error Handling

### Input Validation

- **Invalid Moves**: When a player attempts an invalid move (collision, out of bounds), the system silently rejects the move without error messages, maintaining game flow
- **Rapid Input**: Input buffering prevents key repeat issues and ensures responsive controls even with rapid key presses
- **Touch Gesture Recognition**: Touch input includes threshold detection to distinguish between taps, swipes, and accidental touches

### Game State Errors

- **Corrupted State**: If game state becomes invalid (e.g., piece outside bounds), the system logs the error and resets to a safe state
- **Timer Overflow**: All timers use delta time calculations to prevent overflow and ensure frame-independent behavior
- **Queue Exhaustion**: The 7-bag randomizer ensures the next queue never runs empty by generating new bags proactively

### Storage Errors

- **localStorage Unavailable**: If localStorage is not available (private browsing, quota exceeded), the game continues without persistence and displays a warning
- **Corrupted Save Data**: Invalid data in localStorage is ignored and replaced with default values
- **Parse Errors**: JSON parsing errors when loading high scores default to zero

### Audio Errors

- **Audio Context Blocked**: Modern browsers block audio until user interaction; the system handles this by initializing audio on first user input
- **Missing Audio Files**: If audio files fail to load, the game continues silently without sound effects
- **Audio Playback Failure**: Failed audio playback is logged but doesn't interrupt gameplay

### Rendering Errors

- **Canvas Not Supported**: If HTML5 Canvas is unavailable, display a fallback message directing users to upgrade their browser
- **Animation Frame Errors**: If requestAnimationFrame fails, fall back to setTimeout with appropriate timing
- **Resize Handling**: Window resize events are debounced to prevent excessive recalculation

## Testing Strategy

### Unit Testing

The game will use **Vitest** as the testing framework for unit tests. Unit tests will focus on:

- **Tetromino Factory**: Test piece generation, rotation states, and 7-bag randomization
- **Board Manager**: Test collision detection, line detection, and board manipulation
- **Score System**: Test scoring calculations for various scenarios (single, double, triple, tetris, combos, T-Spins)
- **Level System**: Test level progression and fall speed calculations
- **Game State**: Test state transitions (playing, paused, game over) and reset functionality
- **Input Handler**: Test command parsing and input buffering
- **Wall Kick System**: Test rotation with wall kicks for all piece types

Example unit tests:
- Verify that clearing 4 lines at level 5 awards 4000 points (800 × 5)
- Verify that a T-piece in a T-Spin configuration is correctly detected
- Verify that the 7-bag randomizer produces all 7 pieces before repeating
- Verify that game over triggers when a piece locks above the visible board

### Property-Based Testing

The game will use **fast-check** (JavaScript property-based testing library) for property-based tests. Each property-based test will run a minimum of 100 iterations to ensure thorough coverage.

Property-based tests will verify the correctness properties defined in this document:

- **Property 1**: Generate random board states and pieces, test movement in all directions
- **Property 2**: Generate random pieces and rotation sequences, verify round-trip identity
- **Property 3**: Generate random board states, verify hard drop matches ghost position
- **Property 8**: Generate random line counts (1-4) and levels, verify scoring formula
- **Property 12**: Generate random line counts, verify level calculation
- **Property 14**: Generate random board states and piece positions, verify collision detection
- **Property 20**: Generate random board states with complete lines, verify gravity after clearing
- **Property 23**: Generate random high scores, verify localStorage round-trip

Each property-based test MUST be tagged with a comment explicitly referencing the correctness property:
```javascript
// Feature: falling-block-game, Property 1: Valid movement preserves piece integrity
test('piece movement respects boundaries and collisions', () => { ... });
```

### Integration Testing

Integration tests will verify end-to-end game flows:

- Complete game session from start to game over
- Pause and resume functionality during active gameplay
- Hold mechanic interaction with next queue
- Combo chains across multiple line clears
- T-Spin detection in realistic game scenarios

### Manual Testing

Manual testing will focus on aspects not easily automated:

- Visual quality of particle effects and animations
- Audio synchronization with game events
- Responsive design across different devices and screen sizes
- Touch controls on mobile devices
- Overall game feel and player experience

## Performance Considerations

### Rendering Optimization

- **Canvas Layering**: Use multiple canvas layers (background, board, active piece, particles, UI) to minimize redraw
- **Dirty Rectangle**: Only redraw changed regions when possible
- **Particle Pooling**: Reuse particle objects to minimize garbage collection
- **RequestAnimationFrame**: Use RAF for smooth 60fps rendering with delta time

### Memory Management

- **Object Pooling**: Pool tetromino objects and particles to reduce allocation
- **Event Listener Cleanup**: Properly remove event listeners when components unmount
- **Efficient Data Structures**: Use typed arrays for board grid where beneficial

### Asset Loading

- **Lazy Loading**: Load audio files asynchronously without blocking game start
- **Asset Preloading**: Preload critical assets during initial load screen
- **Compression**: Use compressed audio formats (MP3/OGG) for smaller file sizes

## Deployment Architecture

### Build Process

```
Source Files (src/)
    ↓
Vite Build Tool
    ↓
Bundling & Minification
    ↓
Output (dist/)
    ↓
GitHub Actions
    ↓
GitHub Pages
```

### GitHub Actions Workflow

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - Checkout code
      - Setup Node.js
      - Install dependencies (npm ci)
      - Run tests (npm test)
      - Build project (npm run build)
      - Deploy to gh-pages branch
```

### Project Structure

```
falling-block-game/
├── src/
│   ├── index.html
│   ├── main.js
│   ├── styles.css
│   ├── game/
│   │   ├── GameLoop.js
│   │   ├── GameState.js
│   │   ├── Board.js
│   │   ├── Tetromino.js
│   │   ├── TetrominoFactory.js
│   │   ├── ScoreSystem.js
│   │   └── LevelSystem.js
│   ├── input/
│   │   ├── InputHandler.js
│   │   └── TouchHandler.js
│   ├── render/
│   │   ├── RenderEngine.js
│   │   ├── ParticleSystem.js
│   │   └── UIRenderer.js
│   ├── audio/
│   │   └── AudioManager.js
│   └── utils/
│       ├── constants.js
│       └── helpers.js
├── tests/
│   ├── unit/
│   │   ├── Board.test.js
│   │   ├── Tetromino.test.js
│   │   ├── ScoreSystem.test.js
│   │   └── ...
│   └── property/
│       ├── movement.property.test.js
│       ├── rotation.property.test.js
│       ├── scoring.property.test.js
│       └── ...
├── assets/
│   ├── audio/
│   │   ├── rotate.mp3
│   │   ├── lock.mp3
│   │   ├── clear.mp3
│   │   └── music.mp3
│   └── images/
│       └── (any UI images)
├── .github/
│   └── workflows/
│       └── deploy.yml
├── package.json
├── vite.config.js
└── README.md
```

## Technology Stack

- **Core**: Vanilla JavaScript (ES6+)
- **Rendering**: HTML5 Canvas API
- **Styling**: CSS3 with Flexbox/Grid
- **Build Tool**: Vite (fast, modern build tool)
- **Testing**: Vitest (unit tests) + fast-check (property-based tests)
- **CI/CD**: GitHub Actions
- **Hosting**: GitHub Pages
- **Audio**: Web Audio API

## Browser Compatibility

- **Target**: Modern browsers (Chrome 90+, Firefox 88+, Safari 14+, Edge 90+)
- **Mobile**: iOS Safari 14+, Chrome Mobile 90+
- **Features Required**: ES6, Canvas API, Web Audio API, localStorage, requestAnimationFrame
