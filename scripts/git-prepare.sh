#!/bin/bash

# Git Status and Preparation Script
# This script checks git status and prepares for commit/push

set -e

echo "=== Git Status Report ==="
git status

echo ""
echo "=== Checking Git Configuration ==="
git config --local user.name
git config --local user.email

echo ""
echo "=== Current Branch ==="
git branch -v

echo ""
echo "=== Remote Configuration ==="
git remote -v

echo ""
echo "=== Files Ready for Staging ==="
git status --short
