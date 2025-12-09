# Requirements Document

## Introduction

This document specifies the requirements for a modern web-based falling block game (Tetris-style) with enhanced features including particle effects, combo systems, ghost pieces, hold mechanics, and progressive difficulty. The game will be deployed via GitHub Pages with a responsive design optimized for both desktop and mobile play.

## Glossary

- **Game Board**: The rectangular playing field where blocks fall and stack
- **Tetromino**: A geometric shape composed of four square blocks connected orthogonally
- **Active Piece**: The currently falling tetromino that the player controls
- **Ghost Piece**: A semi-transparent preview showing where the active piece will land
- **Hold Queue**: A storage slot allowing players to save one tetromino for later use
- **Next Queue**: A preview display showing upcoming tetrominoes
- **Line Clear**: The removal of one or more completely filled horizontal rows
- **Hard Drop**: Instantly moving the active piece to its landing position
- **Soft Drop**: Accelerating the active piece's downward movement
- **Lock Delay**: A brief period after a piece touches down before it locks in place
- **Combo**: Consecutive line clears without placing a piece that doesn't clear lines
- **T-Spin**: A special move where a T-shaped tetromino is rotated into a tight space
- **Game State**: The current condition of the game (playing, paused, game over)
- **Score System**: The mechanism for calculating and tracking player points
- **Level System**: Progressive difficulty scaling based on lines cleared or score

## Requirements

### Requirement 1

**User Story:** As a player, I want to control falling tetrominoes with keyboard and touch inputs, so that I can position and rotate pieces precisely.

#### Acceptance Criteria

1. WHEN a player presses the left arrow key, THE Game Board SHALL move the Active Piece one cell left if the destination is valid
2. WHEN a player presses the right arrow key, THE Game Board SHALL move the Active Piece one cell right if the destination is valid
3. WHEN a player presses the up arrow key or X key, THE Game Board SHALL rotate the Active Piece clockwise using wall kick rules
4. WHEN a player presses the Z key, THE Game Board SHALL rotate the Active Piece counter-clockwise using wall kick rules
5. WHEN a player presses the down arrow key, THE Game Board SHALL apply Soft Drop to the Active Piece
6. WHEN a player presses the space bar, THE Game Board SHALL execute Hard Drop on the Active Piece
7. WHEN a player presses the C key, THE Game Board SHALL swap the Active Piece with the Hold Queue contents
8. WHEN a player uses touch controls on mobile, THE Game Board SHALL respond to swipe gestures for movement and tap gestures for rotation

### Requirement 2

**User Story:** As a player, I want to see visual feedback including ghost pieces and particle effects, so that I can make better decisions and enjoy a polished experience.

#### Acceptance Criteria

1. WHEN an Active Piece is falling, THE Game Board SHALL display a Ghost Piece at the landing position
2. WHEN a Line Clear occurs, THE Game Board SHALL display particle effects at the cleared rows
3. WHEN a Hard Drop is executed, THE Game Board SHALL display impact particle effects at the landing position
4. WHEN a T-Spin is performed, THE Game Board SHALL display special visual effects indicating the move
5. WHEN the Active Piece moves or rotates, THE Game Board SHALL update the Ghost Piece position immediately

### Requirement 3

**User Story:** As a player, I want a hold mechanic and next piece preview, so that I can plan my strategy and improve my gameplay.

#### Acceptance Criteria

1. WHEN a player activates the hold function, THE Game Board SHALL swap the Active Piece with the Hold Queue piece
2. WHEN the Hold Queue is empty and hold is activated, THE Game Board SHALL store the Active Piece and spawn the next piece
3. WHEN a piece is placed after using hold, THE Game Board SHALL allow the hold function to be used again
4. WHEN a piece has just been swapped from hold, THE Game Board SHALL prevent using hold again until the current piece locks
5. WHERE the Next Queue feature is enabled, THE Game Board SHALL display the next three upcoming tetrominoes

### Requirement 4

**User Story:** As a player, I want a scoring system with combos and special moves, so that I can be rewarded for skillful play.

#### Acceptance Criteria

1. WHEN a player clears one line, THE Score System SHALL award 100 points multiplied by the current level
2. WHEN a player clears two lines simultaneously, THE Score System SHALL award 300 points multiplied by the current level
3. WHEN a player clears three lines simultaneously, THE Score System SHALL award 500 points multiplied by the current level
4. WHEN a player clears four lines simultaneously, THE Score System SHALL award 800 points multiplied by the current level
5. WHEN a player achieves a Combo, THE Score System SHALL award bonus points equal to 50 multiplied by the combo count and level
6. WHEN a player performs a T-Spin with line clear, THE Score System SHALL award bonus points based on lines cleared
7. WHEN a player executes a Hard Drop, THE Score System SHALL award 2 points per cell dropped

### Requirement 5

**User Story:** As a player, I want progressive difficulty with increasing fall speed, so that the game remains challenging as I improve.

#### Acceptance Criteria

1. WHEN the game starts, THE Level System SHALL initialize at level 1 with a base fall speed
2. WHEN a player clears 10 lines, THE Level System SHALL increase the level by 1
3. WHEN the level increases, THE Level System SHALL decrease the fall speed interval by a calculated amount
4. WHEN the level reaches 15 or higher, THE Level System SHALL maintain a minimum fall speed threshold
5. WHILE the game is in progress, THE Level System SHALL display the current level to the player

### Requirement 6

**User Story:** As a player, I want collision detection and lock delay mechanics, so that I have fair control over piece placement.

#### Acceptance Criteria

1. WHEN an Active Piece attempts to move to an occupied cell, THE Game Board SHALL prevent the movement
2. WHEN an Active Piece touches the bottom or a locked piece, THE Game Board SHALL start the Lock Delay timer
3. WHILE the Lock Delay timer is active and the piece moves or rotates, THE Game Board SHALL reset the Lock Delay timer
4. WHEN the Lock Delay timer expires, THE Game Board SHALL lock the Active Piece in place
5. WHEN a piece locks and any part extends above the visible board, THE Game State SHALL transition to game over

### Requirement 7

**User Story:** As a player, I want line clearing with smooth animations, so that I can see the results of my actions clearly.

#### Acceptance Criteria

1. WHEN a piece locks and creates one or more complete rows, THE Game Board SHALL identify all complete rows
2. WHEN complete rows are identified, THE Game Board SHALL play a line clear animation
3. WHEN the line clear animation completes, THE Game Board SHALL remove the cleared rows
4. WHEN rows are removed, THE Game Board SHALL move all rows above downward to fill the gaps
5. WHEN multiple lines are cleared simultaneously, THE Game Board SHALL animate all cleared lines together

### Requirement 8

**User Story:** As a player, I want game state management with pause and restart functionality, so that I can control my gaming session.

#### Acceptance Criteria

1. WHEN a player presses the P key or Escape key, THE Game State SHALL toggle between playing and paused
2. WHILE the Game State is paused, THE Game Board SHALL stop all piece movement and timers
3. WHEN the Game State is paused, THE Game Board SHALL display a pause overlay
4. WHEN a player presses the R key during game over, THE Game State SHALL reset and start a new game
5. WHEN a new game starts, THE Game Board SHALL clear all pieces and reset score and level to initial values

### Requirement 9

**User Story:** As a player, I want my high score saved locally, so that I can track my progress across sessions.

#### Acceptance Criteria

1. WHEN a game ends, THE Score System SHALL compare the final score with the stored high score
2. WHEN the final score exceeds the high score, THE Score System SHALL update the high score in local storage
3. WHEN the game loads, THE Score System SHALL retrieve the high score from local storage
4. WHEN no high score exists in local storage, THE Score System SHALL initialize the high score to zero
5. WHILE the game is running, THE Score System SHALL display both current score and high score

### Requirement 10

**User Story:** As a player, I want responsive design and smooth animations, so that I can play on any device with a great experience.

#### Acceptance Criteria

1. WHEN the game loads on any device, THE Game Board SHALL scale appropriately to fit the viewport
2. WHEN the viewport size changes, THE Game Board SHALL adjust its dimensions while maintaining aspect ratio
3. WHEN animations play, THE Game Board SHALL use requestAnimationFrame for smooth 60fps rendering
4. WHEN the game runs on mobile devices, THE Game Board SHALL provide touch-optimized controls
5. WHEN the game runs on desktop, THE Game Board SHALL support keyboard controls with visual key hints

### Requirement 11

**User Story:** As a player, I want audio feedback with sound effects and background music, so that the game feels more immersive and engaging.

#### Acceptance Criteria

1. WHEN a piece rotates, THE Game Board SHALL play a rotation sound effect
2. WHEN a piece locks in place, THE Game Board SHALL play a lock sound effect
3. WHEN lines are cleared, THE Game Board SHALL play a clear sound effect with intensity based on line count
4. WHEN a T-Spin is performed, THE Game Board SHALL play a special T-Spin sound effect
5. WHEN the game is running, THE Game Board SHALL play background music that loops continuously
6. WHEN a player toggles the mute option, THE Game Board SHALL enable or disable all audio
7. WHILE the Game State is paused, THE Game Board SHALL pause or lower the volume of background music

### Requirement 12

**User Story:** As a developer, I want the game deployed via GitHub Pages with automated builds, so that updates are seamlessly published.

#### Acceptance Criteria

1. WHEN code is pushed to the main branch, THE GitHub Actions workflow SHALL build the project
2. WHEN the build succeeds, THE GitHub Actions workflow SHALL deploy the built files to GitHub Pages
3. WHEN the deployment completes, THE GitHub Pages site SHALL serve the latest version of the game
4. WHEN the build fails, THE GitHub Actions workflow SHALL report errors in the action logs
5. WHERE build optimization is configured, THE GitHub Actions workflow SHALL minify and bundle assets for production
