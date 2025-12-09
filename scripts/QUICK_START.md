# 🚀 Quick Start - Deploy to GitHub

## First Time Setup (5 minutes)

### Step 1: Get Your GitHub Token

1. Go to: https://github.com/settings/tokens
2. Click **"Generate new token (classic)"**
3. Give it a name: `Falling Block Game Deploy`
4. Select scope: ✅ **repo** (Full control of private repositories)
5. Click **"Generate token"**
6. **Copy the token** (you won't see it again!)

### Step 2: Run Deployment Script

**Windows:**
```powershell
.\scripts\deploy.ps1
```

**Linux/Mac:**
```bash
chmod +x scripts/deploy.sh  # First time only
./scripts/deploy.sh
```

### Step 3: Follow the Prompts

1. **Git Username**: `sherwinr7`
2. **Git Email**: `your-email@example.com`
3. **Repository URL**: `https://github.com/sherwinr7/falling-block-game.git`
4. **Token**: Paste your GitHub token
5. **Save config**: Press `Y` to save for future use
6. **Commit message**: Enter message or press Enter for default

Done! Your code is now on GitHub! 🎉

## Future Deployments

Just run the script again:
```powershell
.\scripts\deploy.ps1
```

It will remember your settings and only ask for a commit message!

## 🌐 Enable GitHub Pages

1. Go to: https://github.com/sherwinr7/falling-block-game/settings/pages
2. Source: **Deploy from a branch**
3. Branch: **gh-pages** / root
4. Click **Save**

Your game will be live at: `https://sherwinr7.github.io/falling-block-game/`

## 🔒 Security Notes

- ✅ `.git-config.json` is in `.gitignore` (your token is safe)
- ✅ Never share your GitHub token
- ✅ Set token expiration for extra security

## ❓ Troubleshooting

**"Authentication failed"**
- Check your token is valid
- Make sure it has `repo` scope

**"Push rejected"**
- Pull first: `git pull origin main`
- Then run script again

**"Remote already exists"**
- Script handles this automatically
- Or remove: `git remote remove origin`

---

Need help? Check `scripts/README.md` for detailed documentation.
