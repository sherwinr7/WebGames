# Implementation Plan

- [x] 1. Set up project structure and build configuration


  - Initialize npm project with Vite build tool
  - Configure Vite for GitHub Pages deployment
  - Set up project directory structure (src/, tests/, assets/)
  - Install dependencies (Vitest, fast-check)
  - Create basic HTML structure with canvas element
  - Set up CSS with responsive layout
  - _Requirements: 12.5_





- [x] 2. Implement core data models and constants

  - [x] 2.1 Define tetromino shapes and rotation states


    - Create TETROMINOES constant with all 7 piece types


    - Define colors for each piece type
    - Implement rotation state matrices for each piece
    - _Requirements: 1.3, 1.4_



  
  - [x] 2.2 Define wall kick data for SRS rotation system


    - Create WALL_KICKS constant with offset tables




    - Separate kick data for I-piece and JLSTZ pieces
    - _Requirements: 1.3, 1.4_
  
  - [x] 2.3 Define scoring and level constants


    - Create SCORING table with all point values
    - Create LEVEL_SPEEDS table with fall speed curve
    - Define game board dimensions (10x22)
    - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.5, 4.6, 4.7, 5.3_







- [ ] 3. Implement Tetromino Factory with 7-bag randomization
  - [ ] 3.1 Create Tetromino class
    - Implement constructor with type, shape, color, position, rotation
    - Add methods for getting current shape based on rotation
    - Add clone method for hold functionality







    - _Requirements: 1.7, 3.1_
  
  - [ ] 3.2 Implement 7-bag randomizer
    - Create bag generation function that shuffles all 7 pieces
    - Implement next piece generation that refills bag when empty





    - Ensure randomization produces all pieces before repeating
    - _Requirements: 3.5_
  
  - [ ] 3.3 Implement next queue management
    - Create function to initialize queue with 3 pieces
    - Add function to get next piece and refill queue

    - _Requirements: 3.5_




  
  - [ ]* 3.4 Write property test for next queue invariant
    - **Property 7: Next queue invariant**
    - **Validates: Requirements 3.5**

- [x] 4. Implement Board Manager with collision detection

  - [ ] 4.1 Create Board class
    - Initialize 10x22 grid (20 visible + 2 hidden rows)
    - Implement method to check if position is valid (in bounds and unoccupied)

    - Add method to add piece to board (lock piece)
    - Add method to get cell value at position
    - _Requirements: 6.1, 6.4_
  
  - [x] 4.2 Implement collision detection



    - Create function to check if piece can be placed at position
    - Test against board boundaries and occupied cells
    - _Requirements: 6.1_
  

  - [ ]* 4.3 Write property test for collision detection
    - **Property 14: Collision detection**
    - **Validates: Requirements 6.1**
  
  - [ ] 4.4 Implement piece movement logic
    - Create move function that checks collision before moving
    - Implement moveLeft, moveRight, moveDown methods



    - Return success/failure for each move attempt
    - _Requirements: 1.1, 1.2, 1.5_
  
  - [ ]* 4.5 Write property test for valid movement
    - **Property 1: Valid movement preserves piece integrity**
    - **Validates: Requirements 1.1, 1.2, 1.5**
  
  - [x] 4.6 Implement rotation with wall kicks

    - Create rotate function that tries rotation with wall kick offsets
    - Test each wall kick offset until valid position found
    - Support both clockwise and counter-clockwise rotation



    - _Requirements: 1.3, 1.4_
  
  - [ ]* 4.7 Write property test for rotation round-trip
    - **Property 2: Rotation round-trip identity**
    - **Validates: Requirements 1.3, 1.4**





  
  - [ ] 4.8 Implement ghost piece calculation
    - Create function to calculate landing position for current piece
    - Drop piece down until collision detected
    - _Requirements: 2.1, 2.5_
  
  - [ ]* 4.9 Write property test for ghost piece synchronization
    - **Property 4: Ghost piece synchronization**
    - **Validates: Requirements 2.5**

- [x] 5. Implement line clearing and gravity


  - [x] 5.1 Implement line detection




    - Create function to identify complete rows
    - Return array of row indices that are full
    - _Requirements: 7.1_
  
  - [x]* 5.2 Write property test for complete line detection

    - **Property 19: Complete line detection**


    - **Validates: Requirements 7.1**
  

  - [ ] 5.3 Implement line clearing with gravity
    - Create function to remove cleared rows from board
    - Move all rows above cleared lines downward
    - Ensure no gaps remain in board
    - _Requirements: 7.3, 7.4_
  
  - [ ]* 5.4 Write property test for line clear gravity
    - **Property 20: Line clear gravity**

    - **Validates: Requirements 7.3, 7.4**

- [ ] 6. Implement scoring system
  - [x] 6.1 Create ScoreSystem class

    - Initialize with score, level, lines, combo, highScore
    - Implement method to calculate line clear score
    - Add combo tracking and bonus calculation


    - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.5_




  
  - [ ]* 6.2 Write property test for line clear scoring
    - **Property 8: Line clear scoring formula**

    - **Validates: Requirements 4.1, 4.2, 4.3, 4.4**
  
  - [ ]* 6.3 Write property test for combo scoring
    - **Property 9: Combo scoring accumulation**


    - **Validates: Requirements 4.5**
  
  - [ ] 6.4 Implement T-Spin detection
    - Create function to detect T-Spin based on corner occupancy





    - Check if last action was rotation (not translation)
    - Verify 3 of 4 diagonal corners are occupied
    - _Requirements: 4.6_
  
  - [ ]* 6.5 Write property test for T-Spin detection
    - **Property 10: T-Spin detection and scoring**

    - **Validates: Requirements 4.6**

  
  - [ ] 6.6 Implement hard drop scoring
    - Add method to calculate hard drop points based on distance
    - Award 2 points per cell dropped


    - _Requirements: 4.7_
  
  - [ ]* 6.7 Write property test for hard drop scoring
    - **Property 11: Hard drop distance scoring**
    - **Validates: Requirements 4.7**
  
  - [ ] 6.8 Implement high score persistence
    - Add method to save high score to localStorage

    - Add method to load high score from localStorage


    - Handle missing or corrupted data gracefully
    - _Requirements: 9.1, 9.2, 9.3, 9.4_


  
  - [ ]* 6.9 Write property test for high score persistence
    - **Property 23: High score persistence round-trip**

    - **Validates: Requirements 9.2, 9.3**



- [ ] 7. Implement level system
  - [ ] 7.1 Create LevelSystem class
    - Initialize with level 1 and base fall speed
    - Implement method to calculate level from lines cleared
    - Add method to get fall speed for current level
    - _Requirements: 5.1, 5.2, 5.3, 5.4_
  
  - [ ]* 7.2 Write property test for level progression
    - **Property 12: Level progression**
    - **Validates: Requirements 5.2**
  
  - [x]* 7.3 Write property test for fall speed monotonicity

    - **Property 13: Fall speed monotonicity**


    - **Validates: Requirements 5.3**

- [ ] 8. Implement game state management
  - [ ] 8.1 Create GameState class
    - Initialize all game state variables
    - Implement state transitions (playing, paused, gameover)
    - Add hold queue with canHold flag
    - Add lock delay timer management

    - _Requirements: 6.2, 6.3, 6.4, 8.1, 8.2_
  
  - [ ] 8.2 Implement hold mechanic
    - Create hold function that swaps active and hold pieces
    - Set canHold to false after swap
    - Reset canHold to true after piece locks
    - Handle empty hold queue case
    - _Requirements: 1.7, 3.1, 3.2, 3.3, 3.4_

  
  - [ ]* 8.3 Write property test for hold swap correctness
    - **Property 5: Hold swap correctness**
    - **Validates: Requirements 1.7, 3.1**
  
  - [ ]* 8.4 Write property test for hold lock state
    - **Property 6: Hold lock state management**


    - **Validates: Requirements 3.3, 3.4**
  
  - [ ] 8.5 Implement lock delay mechanics
    - Start lock delay timer when piece touches ground
    - Reset timer on successful move or rotation
    - Lock piece when timer expires
    - _Requirements: 6.2, 6.3, 6.4_

  


  - [ ]* 8.6 Write property test for lock delay reset
    - **Property 16: Lock delay reset on movement**
    - **Validates: Requirements 6.3**
  
  - [x] 8.7 Implement game over detection


    - Check if locked piece extends above visible board
    - Transition to game over state if condition met
    - _Requirements: 6.5_
  

  - [x]* 8.8 Write property test for game over detection


    - **Property 18: Game over detection**
    - **Validates: Requirements 6.5**
  
  - [ ] 8.9 Implement pause and reset functionality
    - Add pause toggle method



    - Add reset method that clears all state
    - _Requirements: 8.1, 8.4, 8.5_
  
  - [ ]* 8.10 Write property test for pause toggle
    - **Property 21: Pause state toggle**
    - **Validates: Requirements 8.1**


  
  - [ ]* 8.11 Write property test for game reset
    - **Property 22: Game reset completeness**


    - **Validates: Requirements 8.4, 8.5**

- [x] 9. Checkpoint - Ensure all tests pass


  - Ensure all tests pass, ask the user if questions arise.

- [ ] 10. Implement input handling
  - [x] 10.1 Create InputHandler class


    - Set up keyboard event listeners
    - Map keys to game commands (arrows, space, Z, X, C, P, R, Escape)
    - Implement input buffering for responsive controls
    - Prevent default browser behavior for game keys


    - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 1.7, 8.1, 8.4_

  



  - [x] 10.2 Create TouchHandler class for mobile


    - Set up touch event listeners on canvas
    - Implement swipe detection for left/right/down movement
    - Implement tap detection for rotation

    - Add touch controls UI overlay
    - _Requirements: 1.8, 10.4_

- [ ] 11. Implement rendering engine
  - [ ] 11.1 Create RenderEngine class
    - Set up canvas context and scaling
    - Implement method to draw board grid



    - Add method to draw individual cells with colors


    - Implement responsive canvas sizing
    - _Requirements: 10.1, 10.2_
  


  - [ ] 11.2 Implement piece rendering
    - Create method to draw active piece
    - Add method to draw ghost piece (semi-transparent)


    - Implement smooth piece movement animation
    - _Requirements: 2.1_
  
  - [ ]* 11.3 Write property test for hard drop and ghost position
    - **Property 3: Hard drop matches ghost position**


    - **Validates: Requirements 1.6, 2.1**
  
  - [ ] 11.4 Implement UI rendering
    - Draw score, level, lines cleared
    - Render next queue preview (3 pieces)
    - Render hold queue preview


    - Display high score
    - Show pause overlay when paused
    - Show game over screen
    - _Requirements: 3.5, 8.3, 9.5_
  
  - [ ] 11.5 Create ParticleSystem class
    - Implement particle spawning for line clears


    - Add particle spawning for hard drops
    - Add special particles for T-Spins
    - Implement particle update and rendering


    - Use object pooling for efficiency
    - _Requirements: 2.2, 2.3, 2.4_





- [x] 12. Implement audio system


  - [ ] 12.1 Create AudioManager class
    - Load sound effects (rotate, lock, clear, tspin)


    - Load background music
    - Implement play methods for each sound
    - Handle audio context initialization on user interaction
    - _Requirements: 11.1, 11.2, 11.3, 11.4, 11.5_
  




  - [ ] 12.2 Implement mute functionality
    - Add mute toggle method
    - Store mute preference in localStorage
    - _Requirements: 11.6_




  
  - [ ]* 12.3 Write property test for mute toggle
    - **Property 24: Mute state toggle**



    - **Validates: Requirements 11.6**

- [ ] 13. Implement main game loop
  - [ ] 13.1 Create GameLoop class
    - Set up requestAnimationFrame loop
    - Implement delta time calculation
    - Add fall timer that triggers automatic piece drop
    - Coordinate update and render cycles
    - Handle pause state (stop updates but keep rendering)
    - _Requirements: 10.3_
  
  - [ ] 13.2 Wire all components together
    - Initialize all game systems
    - Connect input handler to game state
    - Connect game state changes to audio manager
    - Connect game state to render engine
    - Implement complete game flow from start to game over
    - _Requirements: All_

- [ ] 14. Add polish and visual effects
  - [ ] 14.1 Implement line clear animation
    - Add fade-out effect for cleared lines
    - Delay gravity until animation completes
    - _Requirements: 7.2_
  
  - [ ] 14.2 Add visual feedback for special moves
    - Highlight T-Spin moves with special effect
    - Show combo counter with animation
    - Add screen shake for tetris clears
    - _Requirements: 2.4_
  
  - [ ] 14.3 Improve UI aesthetics
    - Add modern color scheme and gradients
    - Implement smooth transitions for UI elements
    - Add keyboard hints for desktop users
    - Style pause and game over overlays
    - _Requirements: 10.5_

- [ ] 15. Set up GitHub Actions deployment
  - [ ] 15.1 Create GitHub Actions workflow file
    - Create .github/workflows/deploy.yml
    - Configure workflow to trigger on push to main
    - Add steps: checkout, setup Node.js, install dependencies
    - Add build step with Vite
    - Add test step to run all tests
    - Add deployment step to gh-pages branch
    - _Requirements: 12.1, 12.2, 12.3, 12.4, 12.5_
  
  - [ ] 15.2 Configure Vite for GitHub Pages
    - Set base path in vite.config.js for repository name
    - Ensure assets are correctly referenced
    - Test build output locally
    - _Requirements: 12.5_
  
  - [ ] 15.3 Create README with game instructions
    - Document game controls (keyboard and touch)
    - Explain scoring system and special moves
    - Add link to live demo on GitHub Pages
    - Include development setup instructions
    - _Requirements: 12.3_

- [ ] 16. Final checkpoint - Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.
