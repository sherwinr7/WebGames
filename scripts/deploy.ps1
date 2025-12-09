# Falling Block Game - Deployment Script
# This script handles Git operations with configuration management

$CONFIG_FILE = ".git-config.json"
$SCRIPT_DIR = Split-Path -Parent $MyInvocation.MyCommand.Path

# Color output functions
function Write-Success { param($msg) Write-Host $msg -ForegroundColor Green }
function Write-Error { param($msg) Write-Host $msg -ForegroundColor Red }
function Write-Info { param($msg) Write-Host $msg -ForegroundColor Cyan }
function Write-Warning { param($msg) Write-Host $msg -ForegroundColor Yellow }

# Load or create configuration
function Get-GitConfig {
    if (Test-Path $CONFIG_FILE) {
        $config = Get-Content $CONFIG_FILE | ConvertFrom-Json
        return $config
    }
    return $null
}

function Save-GitConfig {
    param($repoUrl, $token, $userName, $userEmail)
    $config = @{
        repoUrl = $repoUrl
        token = $token
        userName = $userName
        userEmail = $userEmail
        lastUpdated = (Get-Date).ToString("yyyy-MM-dd HH:mm:ss")
    }
    $config | ConvertTo-Json | Set-Content $CONFIG_FILE
    Write-Success "✓ Configuration saved to $CONFIG_FILE"
}

# Main script
Write-Host "`n========================================" -ForegroundColor Magenta
Write-Host "   Falling Block Game - Git Deploy" -ForegroundColor Magenta
Write-Host "========================================`n" -ForegroundColor Magenta

# Check if git is initialized
if (-not (Test-Path ".git")) {
    Write-Info "Initializing Git repository..."
    git init
    Write-Success "✓ Git repository initialized"
}

# Load existing config
$config = Get-GitConfig
$repoUrl = ""
$token = ""
$userName = ""
$userEmail = ""

if ($config) {
    Write-Info "Found existing configuration:"
    Write-Host "  Repository: $($config.repoUrl)" -ForegroundColor Yellow
    Write-Host "  User: $($config.userName) <$($config.userEmail)>" -ForegroundColor Yellow
    Write-Host "  Last Updated: $($config.lastUpdated)" -ForegroundColor Yellow
    
    $useExisting = Read-Host "`nUse existing configuration? (Y/n)"
    if ($useExisting -eq "" -or $useExisting -eq "Y" -or $useExisting -eq "y") {
        $repoUrl = $config.repoUrl
        $token = $config.token
        $userName = $config.userName
        $userEmail = $config.userEmail
    }
}

# Get Git user name if not set
if ($userName -eq "") {
    Write-Info "`nEnter your Git username:"
    Write-Host "  Example: sherwinr7" -ForegroundColor Gray
    $userName = Read-Host "Username"
    
    if ($userName -eq "") {
        Write-Error "✗ Git username is required!"
        exit 1
    }
}

# Get Git user email if not set
if ($userEmail -eq "") {
    Write-Info "`nEnter your Git email:"
    Write-Host "  Example: your-email@example.com" -ForegroundColor Gray
    $userEmail = Read-Host "Email"
    
    if ($userEmail -eq "") {
        Write-Error "✗ Git email is required!"
        exit 1
    }
}

# Get repository URL if not set
if ($repoUrl -eq "") {
    Write-Info "`nEnter GitHub repository URL:"
    Write-Host "  Example: https://github.com/username/repo.git" -ForegroundColor Gray
    $repoUrl = Read-Host "Repository URL"
    
    if ($repoUrl -eq "") {
        Write-Error "✗ Repository URL is required!"
        exit 1
    }
}

# Get GitHub token if not set
if ($token -eq "") {
    Write-Info "`nEnter GitHub Personal Access Token:"
    Write-Host "  (Create one at: https://github.com/settings/tokens)" -ForegroundColor Gray
    Write-Host "  Required scopes: repo" -ForegroundColor Gray
    $secureToken = Read-Host "Token" -AsSecureString
    $token = [System.Runtime.InteropServices.Marshal]::PtrToStringAuto(
        [System.Runtime.InteropServices.Marshal]::SecureStringToBSTR($secureToken)
    )
    
    if ($token -eq "") {
        Write-Error "✗ GitHub token is required!"
        exit 1
    }
}

# Configure Git user
Write-Info "`n⚙️ Configuring Git user..."
git config user.name "$userName"
git config user.email "$userEmail"
Write-Success "✓ Git user configured: $userName <$userEmail>"

# Save configuration
$saveConfig = Read-Host "`nSave this configuration for future use? (Y/n)"
if ($saveConfig -eq "" -or $saveConfig -eq "Y" -or $saveConfig -eq "y") {
    Save-GitConfig -repoUrl $repoUrl -token $token -userName $userName -userEmail $userEmail
}

# Extract username and repo from URL
$repoUrl -match "github\.com[:/](.+)/(.+?)(\.git)?$" | Out-Null
$username = $matches[1]
$repoName = $matches[2] -replace "\.git$", ""

# Create authenticated URL
$authUrl = "https://${token}@github.com/${username}/${repoName}.git"

Write-Info "`n📦 Preparing deployment..."

# Check for remote
$remotes = git remote
if ($remotes -contains "origin") {
    Write-Info "Updating remote origin..."
    git remote set-url origin $authUrl
} else {
    Write-Info "Adding remote origin..."
    git remote add origin $authUrl
}

# Get commit message
Write-Info "`nEnter commit message (or press Enter for default):"
$commitMsg = Read-Host "Message"
if ($commitMsg -eq "") {
    $commitMsg = "Update: $(Get-Date -Format 'yyyy-MM-dd HH:mm')"
}

# Git operations
Write-Info "`n🔄 Starting Git operations..."

try {
    # Add all files
    Write-Host "  → Adding files..." -ForegroundColor Gray
    git add .
    
    # Commit
    Write-Host "  → Creating commit..." -ForegroundColor Gray
    git commit -m $commitMsg
    
    # Get current branch
    $branch = git branch --show-current
    if ($branch -eq "") {
        $branch = "main"
        git branch -M main
    }
    
    # Push
    Write-Host "  → Pushing to GitHub ($branch)..." -ForegroundColor Gray
    git push -u origin $branch
    
    Write-Success "`n✓ Successfully deployed to GitHub!"
    Write-Info "Repository: https://github.com/${username}/${repoName}"
    
} catch {
    Write-Error "`n✗ Deployment failed: $_"
    exit 1
}

Write-Host "`n========================================`n" -ForegroundColor Magenta
