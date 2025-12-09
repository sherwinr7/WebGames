# 📋 Falling Block Game - Project Information

## 🎮 Project Overview

A modern, feature-rich falling block puzzle game built with vanilla JavaScript and Vite. Features include particle effects, combo systems, ghost pieces, hold mechanics, and progressive difficulty.

## 📁 Project Structure

```
falling-block-game/
│
├── scripts/                    # 🛠️ Deployment & Debug Tools
│   ├── deploy.ps1             # Windows deployment script
│   ├── deploy.sh              # Linux/Mac deployment script
│   ├── QUICK_START.md         # Quick deployment guide
│   ├── DEBUG_TOOLS.md         # Debugging documentation
│   ├── README.md              # Scripts documentation
│   └── PROJECT_INFO.md        # This file
│
├── src/                       # 💻 Source Code
│   ├── game/                  # Game logic
│   │   ├── Board.js          # Game board management
│   │   ├── BoardManager.js   # Board operations
│   │   ├── GameLoop.js       # Main game loop
│   │   ├── GameState.js      # Game state management
│   │   ├── LevelSystem.js    # Level progression
│   │   ├── ScoreSystem.js    # Scoring logic
│   │   ├── Tetromino.js      # Piece definitions
│   │   ├── TetrominoFactory.js # Piece generation
│   │   └── TSpinDetector.js  # T-Spin detection
│   │
│   ├── render/               # Rendering system
│   │   ├── RenderEngine.js   # Main renderer
│   │   ├── UIRenderer.js     # UI elements
│   │   └── ParticleSystem.js # Particle effects
│   │
│   ├── input/                # Input handling
│   │   ├── InputHandler.js   # Keyboard input
│   │   └── TouchHandler.js   # Touch controls
│   │
│   ├── audio/                # Audio system
│   │   └── AudioManager.js   # Sound effects & music
│   │
│   ├── utils/                # Utilities
│   │   └── constants.js      # Game constants
│   │
│   ├── main.js               # Application entry point
│   └── styles.css            # Global styles
│
├── .github/                   # GitHub configuration
│   └── workflows/
│       └── deploy.yml        # GitHub Actions deployment
│
├── .kiro/                     # Kiro IDE specs
│   └── specs/
│       └── falling-block-game/
│           ├── requirements.md # Feature requirements
│           ├── design.md      # Design document
│           └── tasks.md       # Implementation tasks
│
├── index.html                 # Main HTML file
├── package.json              # Dependencies
├── vite.config.js            # Vite configuration
├── .gitignore                # Git ignore rules
└── README.md                 # Project README

```

## 🎯 Key Features

### Gameplay
- ✅ Classic falling block mechanics
- ✅ 7 unique piece types (I, O, T, S, Z, J, L)
- ✅ Ghost piece preview
- ✅ Hold piece mechanic
- ✅ Next piece preview
- ✅ Hard drop & soft drop
- ✅ Wall kicks & rotation system

### Scoring System
- ✅ Line clear scoring (1-4 lines)
- ✅ Combo multipliers
- ✅ T-Spin detection & bonus
- ✅ Level progression
- ✅ High score tracking

### Visual Effects
- ✅ Particle system for line clears
- ✅ Smooth animations
- ✅ Ghost piece transparency
- ✅ Glassmorphism UI
- ✅ Dark/Light theme toggle

### Audio
- ✅ Sound effects for actions
- ✅ Background music
- ✅ Volume control
- ✅ Mute toggle

### Controls
- ✅ Keyboard controls
- ✅ Touch controls (mobile)
- ✅ Pause/Resume
- ✅ Restart game

## 🎨 Design System

### Dark Mode (Default)
- Background: Deep blue/purple gradient (#0f0f23 → #1a1a2e → #16213e)
- Accent: Cyan (#00f0f0)
- Secondary: Purple (#a000f0)
- Effects: Glowing borders, 3D buttons

### Light Mode
- Background: Slate gradient (#f8fafc → #e2e8f0 → #cbd5e1)
- Accent: Purple (#667eea)
- Secondary: Violet (#764ba2)
- Effects: Subtle shadows, clean design

## 🚀 Technology Stack

### Core
- **JavaScript (ES6+)** - Modern vanilla JS
- **Vite** - Build tool & dev server
- **HTML5 Canvas** - Game rendering
- **CSS3** - Styling & animations

### Features
- **Web Audio API** - Sound system
- **LocalStorage** - Save high scores
- **RequestAnimationFrame** - Smooth animations
- **Touch Events** - Mobile support

## 📊 Game Mechanics

### Scoring Formula
```
Base Score = Lines × 100 × Level
Combo Bonus = Combo × 50
T-Spin Bonus = 400 × Level
```

### Level Progression
- Lines needed: `Level × 10`
- Speed increase: `10%` per level
- Max level: `15`

### Piece Generation
- 7-bag randomizer system
- Ensures fair distribution
- Prevents long droughts

## 🎮 Controls

### Keyboard
- `←/→` - Move left/right
- `↓` - Soft drop
- `Space` - Hard drop
- `↑/X` - Rotate clockwise
- `Z` - Rotate counter-clockwise
- `C` - Hold piece
- `P/Esc` - Pause
- `R` - Restart

### Touch (Mobile)
- Swipe left/right - Move
- Swipe down - Soft drop
- Tap - Rotate
- Hold button - Hold piece

## 📈 Performance

### Optimization
- Canvas rendering optimized
- Efficient collision detection
- Minimal DOM manipulation
- RequestAnimationFrame for smooth 60 FPS

### Browser Support
- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+
- ✅ Mobile browsers

## 🔧 Development

### Setup
```bash
npm install
npm run dev
```

### Build
```bash
npm run build
npm run preview
```

### Deploy
```bash
.\scripts\deploy.ps1  # Windows
./scripts/deploy.sh   # Linux/Mac
```

## 📝 Documentation

### For Developers
- `scripts/README.md` - Deployment scripts
- `scripts/DEBUG_TOOLS.md` - Debugging guide
- `.kiro/specs/` - Feature specifications

### For Users
- `README.md` - Project overview
- `scripts/QUICK_START.md` - Quick deploy guide

## 🌐 Deployment

### GitHub Pages
- Automatic deployment via GitHub Actions
- Triggered on push to main branch
- Live at: `https://sherwinr7.github.io/falling-block-game/`

### Manual Deployment
1. Run deployment script
2. Enter GitHub credentials
3. Push to repository
4. GitHub Actions handles the rest

## 🔒 Security

### Best Practices
- ✅ Tokens stored in `.git-config.json`
- ✅ Config file in `.gitignore`
- ✅ No sensitive data in code
- ✅ Token expiration recommended

## 📊 Project Stats

- **Total Files**: 30+
- **Lines of Code**: ~3000+
- **Components**: 13 modules
- **Features**: 24 correctness properties
- **Test Coverage**: Property-based tests

## 🎯 Future Enhancements

### Planned Features
- [ ] Multiplayer mode
- [ ] Leaderboards
- [ ] Custom themes
- [ ] Power-ups
- [ ] Challenge modes
- [ ] Achievements

### Performance
- [ ] WebGL rendering
- [ ] Service worker caching
- [ ] Progressive Web App (PWA)

## 🤝 Contributing

1. Fork the repository
2. Create feature branch
3. Make changes
4. Test thoroughly
5. Use deployment script
6. Create Pull Request

## 📄 License

This project is open source and available for educational purposes.

## 👤 Author

**Sherwin R**
- GitHub: [@sherwinr7](https://github.com/sherwinr7)
- Repository: [falling-block-game](https://github.com/sherwinr7/falling-block-game)

## 🙏 Acknowledgments

- Built with modern web technologies
- Inspired by classic puzzle games
- Developed using Kiro IDE

---

**Version**: 1.0.0  
**Last Updated**: December 2024  
**Status**: ✅ Production Ready

---

For questions or issues, please open an issue on GitHub!
