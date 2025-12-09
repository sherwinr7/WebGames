# Falling Block Game 🎮

A modern web-based falling block game (Tetris-style) with enhanced features including particle effects, combo systems, ghost pieces, hold mechanics, and progressive difficulty.

## 🎯 Features

- **Classic Tetris Mechanics** with modern enhancements
- **Ghost Piece** preview showing where blocks will land
- **Hold System** to save pieces for strategic play
- **Combo System** rewarding consecutive line clears
- **T-Spin Detection** with bonus scoring
- **Particle Effects** for line clears and special moves
- **Progressive Difficulty** with increasing fall speed
- **Responsive Design** works on desktop and mobile
- **Touch Controls** optimized for mobile devices
- **High Score Persistence** using localStorage

## 🎮 Controls

### Desktop (Keyboard)
- **← →** - Move piece left/right
- **↓** - Soft drop (move down faster)
- **↑ or X** - Rotate clockwise
- **Z** - Rotate counter-clockwise
- **Space** - Hard drop (instant drop)
- **C** - Hold piece
- **P or Escape** - Pause game
- **R** - Restart (when game over)

### Mobile (Touch)
- **Swipe Left/Right** - Move piece
- **Swipe Down** - Soft drop
- **Tap** - Rotate clockwise
- **Buttons** - Rotate, Hold, Hard Drop

## 📊 Scoring System

### Line Clears
- **Single** (1 line): 100 × Level
- **Double** (2 lines): 300 × Level
- **Triple** (3 lines): 500 × Level
- **Tetris** (4 lines): 800 × Level

### Special Moves
- **T-Spin**: Bonus points based on lines cleared
- **Combo**: 50 × Combo Count × Level (for consecutive clears)
- **Hard Drop**: 2 points per cell dropped
- **Soft Drop**: 1 point per cell dropped

### Level Progression
- Level increases every 10 lines cleared
- Fall speed increases with each level
- Minimum fall speed reached at level 15

## 🚀 Quick Deploy to GitHub

### First Time Setup
```bash
# Windows
.\scripts\deploy.ps1

# Linux/Mac
chmod +x scripts/deploy.sh
./scripts/deploy.sh
```

The script will guide you through:
1. Entering your GitHub repository URL
2. Providing your GitHub Personal Access Token
3. Saving configuration for future deployments

📖 **Detailed Guide**: See `scripts/QUICK_START.md`

### GitHub Pages
After pushing to GitHub, enable GitHub Pages:
1. Go to repository Settings → Pages
2. Source: Deploy from a branch
3. Branch: `gh-pages` / root
4. Your game will be live at: `https://yourusername.github.io/falling-block-game/`

## 🛠️ Development

### Prerequisites
- Node.js 18+ and npm

### Setup
```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Project Structure
```
falling-block-game/
├── scripts/           # 🚀 Deployment & debug tools
│   ├── deploy.ps1    # Windows deployment
│   ├── deploy.sh     # Linux/Mac deployment
│   ├── QUICK_START.md
│   ├── DEBUG_TOOLS.md
│   └── PROJECT_INFO.md
├── src/
│   ├── game/          # Game logic
│   ├── render/        # Rendering engine
│   ├── input/         # Input handlers
│   ├── audio/         # Audio manager
│   └── utils/         # Constants and helpers
├── .github/workflows/ # CI/CD configuration
└── index.html         # Entry point
```

### 🔧 Debug Tools
- **Deployment Scripts**: Automated Git push with token management
- **Debug Guide**: `scripts/DEBUG_TOOLS.md`
- **Project Info**: `scripts/PROJECT_INFO.md`

## 🛠️ Technology Stack

- **Vanilla JavaScript** (ES6+)
- **HTML5 Canvas** for rendering
- **CSS3** for styling
- **Vite** for build tooling
- **GitHub Actions** for CI/CD
- **GitHub Pages** for hosting

## 📝 Game Mechanics

### Super Rotation System (SRS)
The game implements the standard SRS rotation system with wall kicks, allowing pieces to rotate even when close to walls or other pieces.

### 7-Bag Randomization
Pieces are generated using the 7-bag system, ensuring all 7 piece types appear before any repeat, providing fair and predictable randomization.

### Lock Delay
When a piece touches the ground, there's a brief delay before it locks, allowing players to slide or rotate the piece for better placement.

## 🎨 Visual Features

- Smooth 60fps animations using requestAnimationFrame
- Particle effects for line clears and hard drops
- Ghost piece showing landing position
- Modern gradient UI with glassmorphism effects
- Responsive design adapting to all screen sizes

## 📱 Mobile Support

The game is fully playable on mobile devices with:
- Touch-optimized controls
- Swipe gestures for movement
- Tap to rotate
- On-screen buttons for special actions
- Responsive layout

## 🏆 High Score

Your high score is automatically saved to your browser's localStorage and persists across sessions.

## 📄 License

MIT License - feel free to use this project for learning or as a base for your own games!

## 🤝 Contributing

Contributions are welcome! Feel free to open issues or submit pull requests.

---

Made with ❤️ using vanilla JavaScript and HTML5 Canvas
