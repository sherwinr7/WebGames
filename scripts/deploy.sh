#!/bin/bash
# Falling Block Game - Deployment Script (Linux/Mac)
# This script handles Git operations with configuration management

CONFIG_FILE=".git-config.json"

# Color output functions
GREEN='\033[0;32m'
RED='\033[0;31m'
CYAN='\033[0;36m'
YELLOW='\033[1;33m'
MAGENTA='\033[0;35m'
GRAY='\033[0;90m'
NC='\033[0m' # No Color

success() { echo -e "${GREEN}$1${NC}"; }
error() { echo -e "${RED}$1${NC}"; }
info() { echo -e "${CYAN}$1${NC}"; }
warning() { echo -e "${YELLOW}$1${NC}"; }

# Load configuration
load_config() {
    if [ -f "$CONFIG_FILE" ]; then
        REPO_URL=$(jq -r '.repoUrl' "$CONFIG_FILE")
        TOKEN=$(jq -r '.token' "$CONFIG_FILE")
        USER_NAME=$(jq -r '.userName' "$CONFIG_FILE")
        USER_EMAIL=$(jq -r '.userEmail' "$CONFIG_FILE")
        LAST_UPDATED=$(jq -r '.lastUpdated' "$CONFIG_FILE")
        return 0
    fi
    return 1
}

# Save configuration
save_config() {
    cat > "$CONFIG_FILE" << EOF
{
  "repoUrl": "$1",
  "token": "$2",
  "userName": "$3",
  "userEmail": "$4",
  "lastUpdated": "$(date '+%Y-%m-%d %H:%M:%S')"
}
EOF
    success "✓ Configuration saved to $CONFIG_FILE"
}

# Main script
echo -e "${MAGENTA}"
echo "========================================"
echo "   Falling Block Game - Git Deploy"
echo "========================================"
echo -e "${NC}"

# Check if git is initialized
if [ ! -d ".git" ]; then
    info "Initializing Git repository..."
    git init
    success "✓ Git repository initialized"
fi

# Load existing config
REPO_URL=""
TOKEN=""
USER_NAME=""
USER_EMAIL=""
if load_config; then
    info "Found existing configuration:"
    warning "  Repository: $REPO_URL"
    warning "  User: $USER_NAME <$USER_EMAIL>"
    warning "  Last Updated: $LAST_UPDATED"
    
    read -p $'\n'"Use existing configuration? (Y/n): " use_existing
    if [ "$use_existing" = "" ] || [ "$use_existing" = "Y" ] || [ "$use_existing" = "y" ]; then
        : # Keep existing values
    else
        REPO_URL=""
        TOKEN=""
        USER_NAME=""
        USER_EMAIL=""
    fi
fi

# Get Git username if not set
if [ "$USER_NAME" = "" ]; then
    info "\nEnter your Git username:"
    echo -e "${GRAY}  Example: sherwinr7${NC}"
    read -p "Username: " USER_NAME
    
    if [ "$USER_NAME" = "" ]; then
        error "✗ Git username is required!"
        exit 1
    fi
fi

# Get Git email if not set
if [ "$USER_EMAIL" = "" ]; then
    info "\nEnter your Git email:"
    echo -e "${GRAY}  Example: your-email@example.com${NC}"
    read -p "Email: " USER_EMAIL
    
    if [ "$USER_EMAIL" = "" ]; then
        error "✗ Git email is required!"
        exit 1
    fi
fi

# Get repository URL if not set
if [ "$REPO_URL" = "" ]; then
    info "\nEnter GitHub repository URL:"
    echo -e "${GRAY}  Example: https://github.com/username/repo.git${NC}"
    read -p "Repository URL: " REPO_URL
    
    if [ "$REPO_URL" = "" ]; then
        error "✗ Repository URL is required!"
        exit 1
    fi
fi

# Get GitHub token if not set
if [ "$TOKEN" = "" ]; then
    info "\nEnter GitHub Personal Access Token:"
    echo -e "${GRAY}  (Create one at: https://github.com/settings/tokens)${NC}"
    echo -e "${GRAY}  Required scopes: repo${NC}"
    read -sp "Token: " TOKEN
    echo
    
    if [ "$TOKEN" = "" ]; then
        error "✗ GitHub token is required!"
        exit 1
    fi
fi

# Configure Git user
info "\n⚙️ Configuring Git user..."
git config user.name "$USER_NAME"
git config user.email "$USER_EMAIL"
success "✓ Git user configured: $USER_NAME <$USER_EMAIL>"

# Save configuration
read -p $'\n'"Save this configuration for future use? (Y/n): " save_config_choice
if [ "$save_config_choice" = "" ] || [ "$save_config_choice" = "Y" ] || [ "$save_config_choice" = "y" ]; then
    save_config "$REPO_URL" "$TOKEN" "$USER_NAME" "$USER_EMAIL"
fi

# Extract username and repo from URL
if [[ $REPO_URL =~ github\.com[:/](.+)/(.+?)(\.git)?$ ]]; then
    USERNAME="${BASH_REMATCH[1]}"
    REPONAME="${BASH_REMATCH[2]%.git}"
else
    error "✗ Invalid GitHub URL format"
    exit 1
fi

# Create authenticated URL
AUTH_URL="https://${TOKEN}@github.com/${USERNAME}/${REPONAME}.git"

info "\n📦 Preparing deployment..."

# Check for remote
if git remote | grep -q "origin"; then
    info "Updating remote origin..."
    git remote set-url origin "$AUTH_URL"
else
    info "Adding remote origin..."
    git remote add origin "$AUTH_URL"
fi

# Get commit message
info "\nEnter commit message (or press Enter for default):"
read -p "Message: " COMMIT_MSG
if [ "$COMMIT_MSG" = "" ]; then
    COMMIT_MSG="Update: $(date '+%Y-%m-%d %H:%M')"
fi

# Git operations
info "\n🔄 Starting Git operations..."

# Add all files
echo -e "${GRAY}  → Adding files...${NC}"
git add .

# Commit
echo -e "${GRAY}  → Creating commit...${NC}"
git commit -m "$COMMIT_MSG"

# Get current branch
BRANCH=$(git branch --show-current)
if [ "$BRANCH" = "" ]; then
    BRANCH="main"
    git branch -M main
fi

# Push
echo -e "${GRAY}  → Pushing to GitHub ($BRANCH)...${NC}"
if git push -u origin "$BRANCH"; then
    success "\n✓ Successfully deployed to GitHub!"
    info "Repository: https://github.com/${USERNAME}/${REPONAME}"
else
    error "\n✗ Deployment failed!"
    exit 1
fi

echo -e "${MAGENTA}\n========================================\n${NC}"
