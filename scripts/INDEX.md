# 📚 Scripts & Tools Index

Welcome to the Falling Block Game deployment and debugging tools!

## 📁 Available Files

### 🚀 Deployment Scripts

| File | Platform | Description |
|------|----------|-------------|
| `deploy.ps1` | Windows | PowerShell deployment script |
| `deploy.sh` | Linux/Mac | Bash deployment script |
| `QUICK_START.md` | All | 5-minute deployment guide |

### 📖 Documentation

| File | Purpose | For |
|------|---------|-----|
| `README.md` | Complete scripts documentation | Developers |
| `QUICK_START.md` | Fast deployment guide | First-time users |
| `DEBUG_TOOLS.md` | Debugging & troubleshooting | Developers |
| `PROJECT_INFO.md` | Project overview & structure | Everyone |
| `GIT_USER_SETUP.md` | Git user configuration guide | Everyone |
| `INDEX.md` | This file - navigation guide | Everyone |

## 🎯 Quick Links

### I want to...

#### 🚀 Deploy to GitHub
→ **Start here**: `QUICK_START.md`  
→ **Detailed guide**: `README.md`

#### 🐛 Debug an issue
→ **Go to**: `DEBUG_TOOLS.md`

#### 📊 Learn about the project
→ **Read**: `PROJECT_INFO.md`

#### 🔧 Understand the scripts
→ **Check**: `README.md`

## 📋 Common Tasks

### First Time Deployment
1. Read `QUICK_START.md`
2. Get GitHub token from https://github.com/settings/tokens
3. Run `.\scripts\deploy.ps1` (Windows) or `./scripts/deploy.sh` (Linux/Mac)
4. Follow the prompts

### Subsequent Deployments
```bash
# Just run the script - it remembers your settings!
.\scripts\deploy.ps1
```

### Troubleshooting
1. Check `DEBUG_TOOLS.md` for common issues
2. Verify `.git-config.json` exists (if you saved config)
3. Ensure GitHub token is valid
4. Check console for errors

### Changing Repository
1. Delete `.git-config.json`
2. Run deployment script again
3. Enter new repository URL

## 🔒 Security Notes

- ✅ `.git-config.json` stores your token locally
- ✅ This file is in `.gitignore` (never committed)
- ✅ Token is only used for authentication
- ✅ Set token expiration for extra security

## 📚 Documentation Structure

```
scripts/
├── INDEX.md              ← You are here
├── QUICK_START.md        ← Start here for deployment
├── README.md             ← Complete documentation
├── DEBUG_TOOLS.md        ← Debugging guide
├── PROJECT_INFO.md       ← Project overview
├── deploy.ps1            ← Windows script
└── deploy.sh             ← Linux/Mac script
```

## 🎓 Learning Path

### Beginner
1. `QUICK_START.md` - Deploy your first time
2. `PROJECT_INFO.md` - Understand the project

### Intermediate
1. `README.md` - Learn all script features
2. `DEBUG_TOOLS.md` - Debug common issues

### Advanced
1. Read the script source code
2. Customize for your workflow
3. Add your own tools

## 💡 Tips

### For Windows Users
- Use PowerShell (not CMD)
- Run as Administrator if permission issues occur
- Use `.\scripts\deploy.ps1` (with `.\`)

### For Linux/Mac Users
- Make script executable first: `chmod +x scripts/deploy.sh`
- Use `./scripts/deploy.sh` (with `./`)
- Install `jq` if not available: `sudo apt install jq` or `brew install jq`

### For All Users
- Save your configuration when prompted
- Use meaningful commit messages
- Test locally before deploying
- Keep your token secure

## 🆘 Need Help?

### Quick Answers
- **Script won't run**: Check file permissions
- **Authentication failed**: Verify token is valid
- **Push rejected**: Pull latest changes first
- **Config not saving**: Check write permissions

### Detailed Help
- **Deployment issues**: See `README.md` → Troubleshooting
- **Game bugs**: See `DEBUG_TOOLS.md`
- **Project questions**: See `PROJECT_INFO.md`

### Still Stuck?
1. Check all documentation files
2. Review error messages carefully
3. Search GitHub issues
4. Open a new issue with details

## 🔄 Updates

### Check for Updates
```bash
git pull origin main
```

### After Updates
- Re-read documentation (may have changed)
- Check for new features in scripts
- Update your local configuration if needed

## 📞 Contact

- **Repository**: https://github.com/sherwinr7/falling-block-game
- **Issues**: https://github.com/sherwinr7/falling-block-game/issues
- **Author**: @sherwinr7

## ⭐ Quick Reference Card

```
┌─────────────────────────────────────────┐
│  FALLING BLOCK GAME - QUICK REFERENCE   │
├─────────────────────────────────────────┤
│                                         │
│  Deploy (Windows):                      │
│  > .\scripts\deploy.ps1                 │
│                                         │
│  Deploy (Linux/Mac):                    │
│  $ ./scripts/deploy.sh                  │
│                                         │
│  First Time:                            │
│  1. Get token: github.com/settings/tokens│
│  2. Run script                          │
│  3. Enter repo URL & token              │
│  4. Save config                         │
│                                         │
│  Next Times:                            │
│  1. Run script                          │
│  2. Enter commit message                │
│  3. Done!                               │
│                                         │
│  Help Files:                            │
│  - QUICK_START.md (5 min guide)         │
│  - README.md (full docs)                │
│  - DEBUG_TOOLS.md (troubleshooting)     │
│  - PROJECT_INFO.md (project details)    │
│                                         │
└─────────────────────────────────────────┘
```

---

**Happy Coding! 🚀**

*Last Updated: December 2024*
