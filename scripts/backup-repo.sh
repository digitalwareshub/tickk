#!/bin/bash

# tickk Repository Backup Script
# Creates local backups of the repository

set -e

# Configuration
REPO_NAME="opos-voice"
BACKUP_DIR="$HOME/Backups/${REPO_NAME}"
DATE=$(date +%Y%m%d-%H%M%S)
ARCHIVE_NAME="${REPO_NAME}-backup-${DATE}"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${GREEN}🔄 Starting repository backup...${NC}"

# Create backup directory
mkdir -p "$BACKUP_DIR"

# Navigate to repo directory
REPO_DIR="$(pwd)"
echo -e "${YELLOW}📁 Repository: $REPO_DIR${NC}"

# Create full backup with git history
echo -e "${YELLOW}📦 Creating full backup with git history...${NC}"
git bundle create "$BACKUP_DIR/${ARCHIVE_NAME}-full.bundle" --all

# Create source code archive (without .git)
echo -e "${YELLOW}📦 Creating source code archive...${NC}"
tar -czf "$BACKUP_DIR/${ARCHIVE_NAME}-source.tar.gz" \
  --exclude='.git' \
  --exclude='node_modules' \
  --exclude='.next' \
  --exclude='dist' \
  --exclude='build' \
  .

# Create metadata file
echo -e "${YELLOW}📝 Creating backup metadata...${NC}"
cat > "$BACKUP_DIR/${ARCHIVE_NAME}-info.txt" << EOF
tickk Repository Backup
===========================
Date: $(date)
Commit: $(git rev-parse HEAD)
Branch: $(git branch --show-current)
Remote: $(git remote get-url origin)
Author: $(git config user.name) <$(git config user.email)>
Version: $(npm pkg get version 2>/dev/null || echo "Unknown")

Files included:
- ${ARCHIVE_NAME}-full.bundle (complete git repository)
- ${ARCHIVE_NAME}-source.tar.gz (source code only)
- ${ARCHIVE_NAME}-info.txt (this file)

Restore instructions:
1. Clone from bundle: git clone ${ARCHIVE_NAME}-full.bundle restored-repo
2. Extract source: tar -xzf ${ARCHIVE_NAME}-source.tar.gz
EOF

# List recent commits
echo -e "\nRecent commits:" >> "$BACKUP_DIR/${ARCHIVE_NAME}-info.txt"
git log --oneline -10 >> "$BACKUP_DIR/${ARCHIVE_NAME}-info.txt"

# Show backup summary
echo -e "${GREEN}✅ Backup completed successfully!${NC}"
echo -e "${YELLOW}📍 Backup location: $BACKUP_DIR${NC}"
echo -e "${YELLOW}📄 Files created:${NC}"
ls -lh "$BACKUP_DIR"/${ARCHIVE_NAME}*

# Cleanup old backups (keep last 10)
echo -e "${YELLOW}🧹 Cleaning up old backups (keeping last 10)...${NC}"
cd "$BACKUP_DIR"
ls -t ${REPO_NAME}-backup-* 2>/dev/null | tail -n +31 | xargs rm -f 2>/dev/null || true

echo -e "${GREEN}🎉 Repository backup process completed!${NC}"
