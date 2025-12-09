# 🔧 Git User Configuration Guide

## Why Git User Configuration Matters

When you commit code to Git, it records:
- **Username** - Who made the commit
- **Email** - Contact information
- **Timestamp** - When it was committed

If these aren't set correctly, commits will show the wrong author on GitHub!

## ✅ Updated Deployment Script

The deployment script now automatically configures your Git user information before pushing code.

### What It Does

1. **Prompts for Git Username** - Your GitHub username (e.g., `sherwinr7`)
2. **Prompts for Git Email** - Email associated with your GitHub account
3. **Configures Git Locally** - Sets `user.name` and `user.email` for this repository
4. **Saves Configuration** - Stores settings for future deployments
5. **Pushes with Correct Author** - All commits show the right username

### Configuration File

The script saves your settings in `.git-config.json`:

```json
{
  "repoUrl": "https://github.com/sherwinr7/falling-block-game.git",
  "token": "ghp_xxxxxxxxxxxx",
  "userName": "sherwinr7",
  "userEmail": "your-email@example.com",
  "lastUpdated": "2024-12-05 10:30:00"
}
```

## 🚀 Using the Script

### First Time

```powershell
.\scripts\deploy.ps1
```

You'll be prompted for:
1. ✅ Git username
2. ✅ Git email  
3. ✅ Repository URL
4. ✅ GitHub token
5. ✅ Save configuration (Y/n)
6. ✅ Commit message

### Subsequent Times

The script remembers your settings! Just:
1. Run the script
2. Confirm to use existing config
3. Enter commit message
4. Done!

## 🔧 Manual Git Configuration

If you want to configure Git manually:

### For This Repository Only

```powershell
git config user.name "sherwinr7"
git config user.email "your-email@example.com"
```

### For All Repositories (Global)

```powershell
git config --global user.name "sherwinr7"
git config --global user.email "your-email@example.com"
```

### Verify Configuration

```powershell
# Check local config
git config user.name
git config user.email

# Check global config
git config --global user.name
git config --global user.email
```

## 🔄 Fixing Previous Commits

If you already pushed commits with the wrong author:

### Fix Last Commit

```powershell
# Amend the last commit
git commit --amend --author="sherwinr7 <your-email@example.com>" --no-edit

# Force push to update GitHub
git push -f origin main
```

### Fix Multiple Commits

```powershell
# Interactive rebase (last 5 commits)
git rebase -i HEAD~5

# For each commit, change 'pick' to 'edit'
# Then for each:
git commit --amend --author="sherwinr7 <your-email@example.com>" --no-edit
git rebase --continue

# Force push
git push -f origin main
```

## 📧 Finding Your GitHub Email

### Primary Email

1. Go to: https://github.com/settings/emails
2. Your primary email is listed at the top

### Keep Email Private

GitHub provides a no-reply email:
- Format: `username@users.noreply.github.com`
- Example: `sherwinr7@users.noreply.github.com`

To use it:
```powershell
git config user.email "sherwinr7@users.noreply.github.com"
```

## ✅ Best Practices

1. **Use Consistent Email** - Same email across all repositories
2. **Verify Before Pushing** - Check `git config user.name` and `git config user.email`
3. **Save Configuration** - Let the script save your settings
4. **Keep Token Secure** - Never commit `.git-config.json` (it's in `.gitignore`)

## 🎯 Quick Reference

```powershell
# Deploy with script (recommended)
.\scripts\deploy.ps1

# Check current user
git config user.name
git config user.email

# Set user for this repo
git config user.name "sherwinr7"
git config user.email "your-email@example.com"

# Set user globally
git config --global user.name "sherwinr7"
git config --global user.email "your-email@example.com"

# View all config
git config --list

# View commit history with authors
git log --pretty=format:"%h - %an <%ae> : %s"
```

## 🆘 Troubleshooting

### Wrong Username Showing on GitHub

**Problem**: Commits show different username  
**Solution**: Run deployment script again or manually configure Git user

### Email Not Verified

**Problem**: GitHub shows "unverified" badge  
**Solution**: Verify email at https://github.com/settings/emails

### Multiple Git Accounts

**Problem**: Using different accounts for different projects  
**Solution**: Use local config (not global) for each repository

---

**The deployment script now handles all of this automatically! 🎉**
