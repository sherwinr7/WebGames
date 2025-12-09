# Deployment & Development Scripts

This folder contains scripts and tools for deploying and managing the Falling Block Game.

## 📁 Contents

- `deploy.ps1` - PowerShell deployment script (Windows)
- `deploy.sh` - Bash deployment script (Linux/Mac)
- `README.md` - This file

## 🚀 Deployment Scripts

### Features

- ✅ Interactive Git configuration
- ✅ Secure token storage
- ✅ Configuration persistence
- ✅ Easy repository URL management
- ✅ Automatic authentication
- ✅ Colored output for better UX

### Usage

#### Windows (PowerShell)

```powershell
# Navigate to project root
cd path/to/falling-block-game

# Run deployment script
.\scripts\deploy.ps1
```

#### Linux/Mac (Bash)

```bash
# Navigate to project root
cd path/to/falling-block-game

# Make script executable (first time only)
chmod +x scripts/deploy.sh

# Run deployment script
./scripts/deploy.sh
```

### First Time Setup

1. **Run the script** - It will prompt you for:
   - Git username (e.g., `sherwinr7`)
   - Git email (e.g., `your-email@example.com`)
   - GitHub repository URL (e.g., `https://github.com/sherwinr7/falling-block-game.git`)
   - GitHub Personal Access Token

2. **Create GitHub Token**:
   - Go to: https://github.com/settings/tokens
   - Click "Generate new token (classic)"
   - Select scope: `repo` (Full control of private repositories)
   - Copy the generated token

3. **Save Configuration** - Choose to save for future deployments

### Subsequent Deployments

The script will remember your configuration. You can:
- Use existing configuration (press Enter or Y)
- Update configuration (press N and enter new values)

### Configuration File

The script creates `.git-config.json` in your project root:

```json
{
  "repoUrl": "https://github.com/username/repo.git",
  "token": "your_github_token",
  "userName": "sherwinr7",
  "userEmail": "your-email@example.com",
  "lastUpdated": "2024-12-04 10:30:00"
}
```

**⚠️ Important**: Add `.git-config.json` to `.gitignore` to keep your token secure!

## 🔧 Development Tools

### Quick Commands

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
├── scripts/           # Deployment and utility scripts
├── src/              # Source code
│   ├── game/         # Game logic
│   ├── render/       # Rendering engine
│   ├── input/        # Input handlers
│   ├── audio/        # Audio system
│   └── utils/        # Utilities
├── .github/          # GitHub Actions
└── dist/             # Production build
```

## 📝 Notes

### Security Best Practices

1. **Never commit tokens** - Always add `.git-config.json` to `.gitignore`
2. **Use token expiration** - Set expiration dates on GitHub tokens
3. **Rotate tokens regularly** - Update tokens periodically
4. **Limit token scope** - Only grant necessary permissions

### Troubleshooting

**Authentication Failed**
- Verify your token is valid
- Check token has `repo` scope
- Ensure token hasn't expired

**Push Rejected**
- Pull latest changes first: `git pull origin main`
- Resolve any conflicts
- Run deployment script again

**Remote Already Exists**
- Script will automatically update the remote URL
- Or manually remove: `git remote remove origin`

## 🌐 GitHub Pages Deployment

The project includes automatic GitHub Pages deployment via GitHub Actions.

### Setup

1. Go to repository Settings → Pages
2. Source: Deploy from a branch
3. Branch: `gh-pages` / `root`
4. Save

The game will be available at: `https://username.github.io/falling-block-game/`

## 📚 Additional Resources

- [GitHub Token Documentation](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token)
- [Git Documentation](https://git-scm.com/doc)
- [GitHub Pages Guide](https://pages.github.com/)

## 🤝 Contributing

When contributing:
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Use the deployment script to push
5. Create a Pull Request

---

**Happy Deploying! 🚀**
