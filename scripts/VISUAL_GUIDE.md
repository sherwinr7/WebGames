# 🎨 Visual Deployment Guide

## 📸 Step-by-Step Screenshots Guide

### Step 1: Get Your GitHub Token

```
┌─────────────────────────────────────────────────────────┐
│  GitHub Settings → Developer settings → Personal tokens │
└─────────────────────────────────────────────────────────┘

1. Go to: https://github.com/settings/tokens
2. Click: "Generate new token (classic)"

┌──────────────────────────────────────┐
│  Token Settings                      │
├──────────────────────────────────────┤
│  Note: Falling Block Game Deploy    │
│  Expiration: 90 days (recommended)   │
│                                      │
│  Select scopes:                      │
│  ☑ repo                              │
│    ☑ repo:status                     │
│    ☑ repo_deployment                 │
│    ☑ public_repo                     │
│    ☑ repo:invite                     │
│                                      │
│  [Generate token]                    │
└──────────────────────────────────────┘

3. Copy the token (you won't see it again!)
   ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

### Step 2: Run Deployment Script

#### Windows PowerShell

```powershell
PS D:\Projects\falling-block-game> .\scripts\deploy.ps1

========================================
   Falling Block Game - Git Deploy
========================================

Initializing Git repository...
✓ Git repository initialized

Enter GitHub repository URL:
  Example: https://github.com/username/repo.git
Repository URL: https://github.com/sherwinr7/falling-block-game.git

Enter GitHub Personal Access Token:
  (Create one at: https://github.com/settings/tokens)
  Required scopes: repo
Token: ****************************************

Save this configuration for future use? (Y/n): Y
✓ Configuration saved to .git-config.json

📦 Preparing deployment...
Adding remote origin...

Enter commit message (or press Enter for default):
Message: Initial commit with enhanced UI

🔄 Starting Git operations...
  → Adding files...
  → Creating commit...
  → Pushing to GitHub (main)...

✓ Successfully deployed to GitHub!
Repository: https://github.com/sherwinr7/falling-block-game

========================================
```

#### Linux/Mac Terminal

```bash
$ ./scripts/deploy.sh

========================================
   Falling Block Game - Git Deploy
========================================

Found existing configuration:
  Repository: https://github.com/sherwinr7/falling-block-game.git
  Last Updated: 2024-12-04 10:30:00

Use existing configuration? (Y/n): Y

Enter commit message (or press Enter for default):
Message: Update UI with glassmorphism effects

🔄 Starting Git operations...
  → Adding files...
  → Creating commit...
  → Pushing to GitHub (main)...

✓ Successfully deployed to GitHub!
Repository: https://github.com/sherwinr7/falling-block-game

========================================
```

### Step 3: Enable GitHub Pages

```
┌─────────────────────────────────────────────────────┐
│  Repository Settings → Pages                        │
└─────────────────────────────────────────────────────┘

1. Go to: https://github.com/sherwinr7/falling-block-game/settings/pages

┌──────────────────────────────────────┐
│  GitHub Pages                        │
├──────────────────────────────────────┤
│  Source                              │
│  ○ Deploy from a branch              │
│  ● GitHub Actions                    │
│                                      │
│  Branch                              │
│  [main ▼]  [/ (root) ▼]             │
│                                      │
│  [Save]                              │
└──────────────────────────────────────┘

2. Wait 1-2 minutes for deployment

┌──────────────────────────────────────┐
│  ✓ Your site is live at:            │
│  https://sherwinr7.github.io/        │
│  falling-block-game/                 │
└──────────────────────────────────────┘
```

## 🎯 Visual Workflow

```
┌─────────────┐
│   Start     │
└──────┬──────┘
       │
       ▼
┌─────────────────────┐
│ Get GitHub Token    │
│ (github.com/        │
│  settings/tokens)   │
└──────┬──────────────┘
       │
       ▼
┌─────────────────────┐
│ Run Deploy Script   │
│ .\scripts\deploy.ps1│
└──────┬──────────────┘
       │
       ▼
┌─────────────────────┐     ┌──────────────┐
│ First Time?         │────>│ Enter URL    │
│                     │     │ & Token      │
└──────┬──────────────┘     └──────┬───────┘
       │                           │
       │ No (config exists)        │
       │                           │
       ▼                           ▼
┌─────────────────────┐     ┌──────────────┐
│ Use Saved Config?   │     │ Save Config? │
└──────┬──────────────┘     └──────┬───────┘
       │                           │
       ▼                           ▼
┌─────────────────────────────────────┐
│ Enter Commit Message                │
└──────┬──────────────────────────────┘
       │
       ▼
┌─────────────────────┐
│ Git Add & Commit    │
└──────┬──────────────┘
       │
       ▼
┌─────────────────────┐
│ Push to GitHub      │
└──────┬──────────────┘
       │
       ▼
┌─────────────────────┐
│ ✓ Success!          │
│ Code on GitHub      │
└──────┬──────────────┘
       │
       ▼
┌─────────────────────┐
│ Enable GitHub Pages │
│ (Settings → Pages)  │
└──────┬──────────────┘
       │
       ▼
┌─────────────────────┐
│ ✓ Live Website!     │
│ yourusername.github │
│ .io/repo-name/      │
└─────────────────────┘
```

## 🎬 Animation: What Happens Behind the Scenes

```
Frame 1: Script Starts
┌────────────────────────────────┐
│ 🚀 Deployment Script Running   │
│                                │
│ [▓▓▓░░░░░░░] 30%              │
│ Checking Git repository...     │
└────────────────────────────────┘

Frame 2: Loading Config
┌────────────────────────────────┐
│ 🚀 Deployment Script Running   │
│                                │
│ [▓▓▓▓▓▓░░░░] 60%              │
│ Loading configuration...       │
└────────────────────────────────┘

Frame 3: Authenticating
┌────────────────────────────────┐
│ 🚀 Deployment Script Running   │
│                                │
│ [▓▓▓▓▓▓▓▓░░] 80%              │
│ Authenticating with GitHub...  │
└────────────────────────────────┘

Frame 4: Pushing Code
┌────────────────────────────────┐
│ 🚀 Deployment Script Running   │
│                                │
│ [▓▓▓▓▓▓▓▓▓▓] 100%             │
│ Pushing to GitHub...           │
└────────────────────────────────┘

Frame 5: Complete!
┌────────────────────────────────┐
│ ✓ Deployment Complete!         │
│                                │
│ Your code is now on GitHub!    │
│ 🎉 Success!                    │
└────────────────────────────────┘
```

## 📊 Configuration File Structure

```
.git-config.json (Created by script)
┌─────────────────────────────────────┐
│ {                                   │
│   "repoUrl": "https://github.com/   │
│               sherwinr7/            │
│               falling-block-game.git│
│   "token": "ghp_xxxxxxxxxx...",     │
│   "lastUpdated": "2024-12-04        │
│                   10:30:00"         │
│ }                                   │
└─────────────────────────────────────┘
        │
        ▼
.gitignore (Protects your token)
┌─────────────────────────────────────┐
│ # Git deployment configuration      │
│ # (contains sensitive token)        │
│ .git-config.json                    │
└─────────────────────────────────────┘
```

## 🎨 Color-Coded Output

The script uses colors to help you understand what's happening:

```
🟢 Green  = Success messages
   ✓ Configuration saved
   ✓ Successfully deployed

🔵 Cyan   = Information
   📦 Preparing deployment...
   🔄 Starting Git operations...

🟡 Yellow = Warnings/Prompts
   Repository: https://github.com/...
   Last Updated: 2024-12-04

🔴 Red    = Errors
   ✗ Repository URL is required!
   ✗ Deployment failed

⚪ Gray   = Progress indicators
   → Adding files...
   → Creating commit...
```

## 🗺️ File System Changes

```
Before Running Script:
falling-block-game/
├── src/
├── scripts/
│   └── deploy.ps1
└── .gitignore

After First Run:
falling-block-game/
├── .git/              ← Git repository created
├── .git-config.json   ← Your config saved
├── src/
├── scripts/
│   └── deploy.ps1
└── .gitignore

On GitHub:
https://github.com/sherwinr7/falling-block-game
├── All your files
├── Commit history
└── GitHub Actions running
```

## 🎯 Success Indicators

### ✅ Deployment Successful When You See:

```
✓ Configuration saved to .git-config.json
✓ Successfully deployed to GitHub!
Repository: https://github.com/sherwinr7/falling-block-game
```

### ❌ Deployment Failed When You See:

```
✗ Repository URL is required!
✗ GitHub token is required!
✗ Deployment failed: [error message]
```

## 🔄 Subsequent Deployments

```
Run 1 (First Time):
┌──────────────────────────────┐
│ Enter URL: [type URL]        │
│ Enter Token: [type token]    │
│ Save config: Y               │
└──────────────────────────────┘

Run 2+ (Using Saved Config):
┌──────────────────────────────┐
│ Use existing config: Y       │
│ Commit message: [type msg]   │
│ ✓ Done!                      │
└──────────────────────────────┘
```

## 📱 Mobile View (If Accessing Docs on Phone)

```
┌─────────────────────┐
│  Quick Deploy       │
├─────────────────────┤
│                     │
│  1. Get Token       │
│     github.com/     │
│     settings/tokens │
│                     │
│  2. Run Script      │
│     .\scripts\      │
│     deploy.ps1      │
│                     │
│  3. Enter Details   │
│     - URL           │
│     - Token         │
│                     │
│  4. Done! 🎉        │
│                     │
└─────────────────────┘
```

---

**Visual Guide Complete! 🎨**

*For text-based instructions, see QUICK_START.md*
