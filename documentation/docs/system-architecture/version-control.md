---
sidebar_position: 8
title: Version Control
description: Git workflow and branching strategy
---

# Version Control

## Repository

**GitHub:** https://github.com/Capstone-Projects-2025-Spring/project-mentalhealthliteracyapp

## Branching Strategy

### Main Branches
- **main** - Production-ready code
- **develop** - Integration branch for features

### Feature Branches
- **feature/\*** - New features
- **bugfix/\*** - Bug fixes
- **hotfix/\*** - Urgent production fixes
- **docs/\*** - Documentation updates

## Workflow

### 1. Create Feature Branch
```bash
git checkout -b feature/your-feature-name
```

### 2. Make Changes
```bash
git add .
git commit -m "feat: descriptive commit message"
```

### 3. Push Changes
```bash
git push origin feature/your-feature-name
```

### 4. Create Pull Request
- Target: `main` branch
- Request reviews from team
- Pass CI/CD checks

## Commit Convention

Use semantic commits:
- **feat:** New feature
- **fix:** Bug fix
- **docs:** Documentation
- **style:** Formatting
- **refactor:** Code restructuring
- **test:** Tests
- **chore:** Maintenance

Example:
```bash
git commit -m "feat: add user preference selection"
git commit -m "fix: video playback on mobile"
git commit -m "docs: update API documentation"
```

## Code Review

### PR Requirements
- Descriptive title and description
- Link to related issue
- Tests passing
- No merge conflicts

### Review Checklist
- [ ] Code follows style guide
- [ ] Tests included
- [ ] Documentation updated
- [ ] No console logs
- [ ] No hardcoded values

## Protected Branches

**main branch rules:**
- Require pull request reviews (1+)
- Dismiss stale reviews
- Require status checks to pass
- No direct pushes

## .gitignore

Key exclusions:
```
node_modules/
.env
.env.local
dist/
build/
*.log
.DS_Store
```