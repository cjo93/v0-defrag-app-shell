# Version Management Quick Reference

## Overview
The Defrag app uses a standardized version management system to ensure consistent builds across all environments. Currently supports versions **38** and **40**, with version **40** as the default production target.

## Files & Their Purpose

| File | Purpose |
|------|---------|
| `version.config.json` | Central configuration for version defaults, supported ranges, and history |
| `package.json` | Updated with version-aware build scripts |
| `scripts/check-version.js` | Validates version and creates build metadata |
| `scripts/version-info.js` | Displays current version info and build history |
| `scripts/validate-version.js` | Comprehensive system validation |
| `docs/VERSION-STANDARDIZATION-PLAN.md` | Full implementation plan |
| `docs/DEPLOYMENT-RUNBOOK.md` | Step-by-step deployment procedures |

## Common Commands

### Get Version Information
```bash
npm run version:info
```
Shows current default version, supported range, version history, and last build metadata.

### Validate System
```bash
npm run version:validate
```
Runs comprehensive checks: Node version, NPM version, git status, build artifacts, .gitignore configuration, and package.json health.

### Build Specific Version
```bash
npm run build:v40      # Build version 40 (default)
npm run build:v38      # Build version 38 (fallback)
npm run build          # Build using default version
```

### Lint Code
```bash
npm run lint
```

### Start Development Server
```bash
npm run dev
```

### Start Production Server
```bash
npm run start
```

## Development Workflow

### Starting Work
```bash
# 1. Update from remote
git pull origin main

# 2. Create feature branch
git checkout -b feature/your-feature

# 3. Make changes and commit
git add .
git commit -m "your commit message"
```

### Before Pushing
```bash
# 1. Validate system
npm run version:validate

# 2. Lint code
npm run lint

# 3. Test build
npm run build

# 4. Push changes
git push origin feature/your-feature
```

## Deployment Workflow

### To Staging
```bash
# 1. Verify all systems
npm run version:validate

# 2. Create clean build
npm run build:v40

# 3. Start server locally to test
npm run start

# 4. Deploy (method depends on platform)
```

### To Production
```bash
# 1. Ensure on main branch and up to date
git checkout main
git pull origin main

# 2. Validate everything
npm run version:validate

# 3. Create git tag for release
git tag -a v40-prod-$(date +%Y%m%d) -m "Production release"

# 4. Push with tags
git push origin main --tags

# 5. Verify deployment completed
npm run version:info
```

## Configuration Files

### version.config.json
```json
{
  "app": {
    "name": "defrag",
    "defaultVersion": "40",
    "minSupportedVersion": "38",
    "maxSupportedVersion": "40"
  },
  "deploy": {
    "production": {
      "targetVersion": "40",
      "fallback": "38"
    }
  }
}
```

**Key Fields:**
- `defaultVersion`: Version used when not explicitly specified
- `minSupportedVersion` / `maxSupportedVersion`: Allowed version range
- `targetVersion`: Primary version for each environment
- `fallback`: Fallback version if deployment fails

## Troubleshooting

### Build Fails with Version Error
```bash
# Check configuration
npm run version:info

# Validate system
npm run version:validate

# Clean and retry
rm -rf .next node_modules
npm ci
npm run build
```

### Build Artifacts Committed to Git
```bash
# Check git status
git status

# Remove from staging if accidentally added
git rm --cached .next
git rm --cached node_modules

# Verify .gitignore includes them
cat .gitignore | grep -E '\.next|node_modules'
```

### Deployment to Wrong Version
```bash
# Check deployment metadata
npm run version:info

# Check what's deployed
cat .deploy-metadata.json

# Rollback to previous version
git checkout v38-shell
npm run build:v38
npm run start
```

## Version History

| Version | Date | Description | Status |
|---------|------|-------------|--------|
| 40 | 2026-04-09 | Current stable - restored v38 with improvements | **Active** |
| 38 | 2026-04-09 | Previous stable - clean shell baseline | Fallback |

## Key Principles

1. **Version Defaults**: All builds target v40 unless explicitly specified
2. **Validation First**: Every build validates version consistency
3. **Metadata Tracking**: Build and deployment metadata created automatically
4. **Fallback Available**: v38 always available as rollback target
5. **Automation**: Scripts handle validation and metadata creation
6. **Lock File Pinning**: Dependencies locked via package-lock.json

## Next Steps for Team

1. **Run version:info** - Familiarize yourself with current state
2. **Run version:validate** - Confirm all systems operational
3. **Read DEPLOYMENT-RUNBOOK.md** - Understand deployment process
4. **Test build locally** - `npm run build:v40` and verify output
5. **Practice rollback** - Build v38 to verify fallback works

## Support

For questions or issues:
1. Check this quick reference
2. Review full plan: `docs/VERSION-STANDARDIZATION-PLAN.md`
3. Review deployment guide: `docs/DEPLOYMENT-RUNBOOK.md`
4. Run `npm run version:info` for diagnostics
5. Run `npm run version:validate` for system health
