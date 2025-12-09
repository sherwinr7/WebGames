# Breakout - Brick Breaker Game 🎯

A modern, responsive Breakout/Arkanoid game with beautiful UI, particle effects, and power-ups!

## 🎮 Features

- **Classic Breakout Gameplay** - Break all the bricks to advance
- **Beautiful UI** - Glassmorphism effects with dark/light themes
- **Particle Effects** - Explosive brick destruction animations
- **Progressive Difficulty** - More bricks each level
- **Responsive Design** - Works on desktop and mobile
- **Touch Controls** - Optimized for mobile devices
- **High Score Tracking** - Saves your best score locally

## 🕹️ Controls

### Desktop (Keyboard)
- **← →** - Move paddle left/right
- **Space** - Launch ball / Continue to next level
- **P or Escape** - Pause game
- **R** - Restart game

### Mouse/Touch
- **Click/Drag** - Move paddle
- **Tap** - Launch ball
- **Buttons** - Use on-screen controls

## 📊 Scoring

- **Points per brick** - Based on row position (higher = more points)
- **Level progression** - Complete all bricks to advance
- **Lives** - Start with 3 lives
- **High Score** - Automatically saved

## 🎨 UI Layout

### Left Panel
- Current Score
- Best Score
- Level
- Lives
- Remaining Bricks

### Center
- Game Canvas (400x600)
- Paddle, Ball, and Bricks

### Right Panel
- Power-ups Display
- Movement Controls
- Game Controls (Pause/Restart)

## 🚀 How to Run

### Option 1: Open Directly
Simply open `index.html` in a modern web browser.

### Option 2: Local Server
```bash
# Using Python
python -m http.server 8000

# Using Node.js
npx serve

# Then visit: http://localhost:8000
```

## 🎯 Game Mechanics

- **Paddle Control** - Move to keep the ball in play
- **Ball Physics** - Angle changes based on paddle hit position
- **Brick Destruction** - Hit bricks to destroy them
- **Wall Bounce** - Ball bounces off walls and ceiling
- **Life Loss** - Lose a life if ball falls below paddle
- **Level Complete** - Destroy all bricks to advance

## 🌈 Themes

- **Dark Mode** (Default) - Cyberpunk aesthetic with cyan/purple
- **Light Mode** - Clean slate blue theme
- Toggle with 🌓 button in header

## 📱 Mobile Support

Fully responsive design with:
- Touch-optimized controls
- Swipe to move paddle
- Tap to launch ball
- On-screen buttons
- Adaptive canvas sizing

## 🎨 Visual Features

- Gradient paddle with glow effects
- Radial gradient ball with trail
- Colorful bricks with shadows
- Particle explosions on brick destruction
- Glassmorphism UI panels
- Smooth animations

## 🔧 Technical Stack

- **Vanilla JavaScript** (ES6 Modules)
- **HTML5 Canvas** for rendering
- **CSS3** for styling and animations
- **LocalStorage** for high score persistence

## 📁 File Structure

```
breakout/
├── index.html      # Main HTML file
├── styles.css      # All styling and themes
├── game.js         # Game logic (Paddle, Ball, Bricks, Particles)
├── main.js         # Game initialization and controls
└── README.md       # This file
```

## 🎮 Future Enhancements

Potential features to add:
- ✨ Power-ups (Multi-ball, Expand paddle, Laser, Slow ball)
- 🎵 Sound effects and background music
- 🏆 Leaderboard system
- 💾 Save game progress
- 🎨 More brick types (unbreakable, multi-hit)
- ⚡ Special effects and combos

## 🤝 Credits

Built with the same beautiful UI framework as the Falling Block Game.
Reuses the responsive layout, theme system, and visual effects.

---

**Enjoy breaking bricks! 🎯✨**
