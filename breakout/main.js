import { BreakoutGame } from './game.js';

// Get DOM elements
const canvas = document.getElementById('game-canvas');
const overlay = document.getElementById('game-overlay');
const overlayContent = document.getElementById('overlay-content');
const themeToggle = document.getElementById('theme-toggle');
const muteBtn = document.getElementById('mute-btn');

// Stats elements
const scoreEl = document.getElementById('score');
const highScoreEl = document.getElementById('high-score');
const levelEl = document.getElementById('level');
const livesEl = document.getElementById('lives');
const bricksEl = document.getElementById('bricks');

// Initialize game
let game = new BreakoutGame(canvas);
let highScore = parseInt(localStorage.getItem('breakout-highscore')) || 0;
let animationId;
let muted = false;

// Update UI
function updateUI() {
  scoreEl.textContent = game.score;
  highScoreEl.textContent = highScore;
  levelEl.textContent = game.level;
  livesEl.textContent = game.lives;
  bricksEl.textContent = game.getRemainingBricks();
  
  if (game.score > highScore) {
    highScore = game.score;
    localStorage.setItem('breakout-highscore', highScore);
  }
}

// Show overlay
function showOverlay(title, message) {
  overlayContent.innerHTML = `
    <h2>${title}</h2>
    <p>${message}</p>
    <p>Press R to restart or Space to continue</p>
  `;
  overlay.classList.remove('hidden');
}

// Hide overlay
function hideOverlay() {
  overlay.classList.add('hidden');
}

// Game loop
function gameLoop() {
  game.update();
  game.draw();
  updateUI();

  // Check game states
  if (game.gameOver) {
    showOverlay('Game Over!', `Final Score: ${game.score}`);
    cancelAnimationFrame(animationId);
    return;
  }

  if (game.won) {
    showOverlay('Level Complete!', `Score: ${game.score}`);
    cancelAnimationFrame(animationId);
    return;
  }

  animationId = requestAnimationFrame(gameLoop);
}

// Start game
function startGame() {
  hideOverlay();
  game.paused = false;
  gameLoop();
}

// Pause game
function togglePause() {
  if (game.gameOver || game.won) return;
  
  game.paused = !game.paused;
  if (game.paused) {
    showOverlay('Paused', 'Press P or ESC to resume');
    cancelAnimationFrame(animationId);
  } else {
    hideOverlay();
    gameLoop();
  }
}

// Restart game
function restartGame() {
  cancelAnimationFrame(animationId);
  game.restart();
  hideOverlay();
  updateUI();
  gameLoop();
}

// Next level
function nextLevel() {
  game.nextLevel();
  hideOverlay();
  updateUI();
  gameLoop();
}

// Keyboard controls
const keys = {};

document.addEventListener('keydown', (e) => {
  keys[e.key] = true;

  if (e.key === ' ' || e.key === 'Spacebar') {
    e.preventDefault();
    if (game.won) {
      nextLevel();
    } else if (!game.paused && !game.gameOver) {
      game.ball.launch();
    }
  }

  if (e.key === 'p' || e.key === 'P' || e.key === 'Escape') {
    e.preventDefault();
    togglePause();
  }

  if (e.key === 'r' || e.key === 'R') {
    e.preventDefault();
    restartGame();
  }

  if (e.key === 'ArrowLeft') {
    game.paddle.moveLeft();
  }

  if (e.key === 'ArrowRight') {
    game.paddle.moveRight();
  }
});

document.addEventListener('keyup', (e) => {
  keys[e.key] = false;

  if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
    game.paddle.stop();
  }
});

// Mouse/Touch controls
let mouseDown = false;

canvas.addEventListener('mousedown', (e) => {
  mouseDown = true;
  handlePointerMove(e.clientX);
});

canvas.addEventListener('mousemove', (e) => {
  if (mouseDown) {
    handlePointerMove(e.clientX);
  }
});

canvas.addEventListener('mouseup', () => {
  mouseDown = false;
  game.paddle.stop();
});

canvas.addEventListener('touchstart', (e) => {
  e.preventDefault();
  handlePointerMove(e.touches[0].clientX);
});

canvas.addEventListener('touchmove', (e) => {
  e.preventDefault();
  handlePointerMove(e.touches[0].clientX);
});

function handlePointerMove(clientX) {
  const rect = canvas.getBoundingClientRect();
  const scaleX = canvas.width / rect.width;
  const x = (clientX - rect.left) * scaleX;
  game.paddle.x = x - game.paddle.width / 2;
  
  // Keep paddle in bounds
  if (game.paddle.x < 0) game.paddle.x = 0;
  if (game.paddle.x + game.paddle.width > canvas.width) {
    game.paddle.x = canvas.width - game.paddle.width;
  }
}

// Button controls
document.querySelectorAll('.control-btn-game').forEach(btn => {
  btn.addEventListener('click', () => {
    const action = btn.dataset.action;
    
    switch(action) {
      case 'move-left':
        game.paddle.moveLeft();
        setTimeout(() => game.paddle.stop(), 100);
        break;
      case 'move-right':
        game.paddle.moveRight();
        setTimeout(() => game.paddle.stop(), 100);
        break;
      case 'launch':
        if (game.won) {
          nextLevel();
        } else {
          game.ball.launch();
        }
        break;
      case 'pause':
        togglePause();
        break;
      case 'restart':
        restartGame();
        break;
    }
  });
});

// Theme toggle
themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
  document.body.classList.toggle('light-mode');
});

// Mute toggle
muteBtn.addEventListener('click', () => {
  muted = !muted;
  muteBtn.textContent = muted ? '🔇' : '🔊';
});

// Initialize
updateUI();
showOverlay('Breakout', 'Press Space to launch the ball!');

// Start on first interaction
document.addEventListener('keydown', function startOnKey(e) {
  if (e.key === ' ' || e.key === 'Spacebar') {
    startGame();
    document.removeEventListener('keydown', startOnKey);
  }
}, { once: true });

canvas.addEventListener('click', function startOnClick() {
  startGame();
}, { once: true });
