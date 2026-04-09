# Defrag App Version Standardization Plan

> Comprehensive strategy for standardizing build processes across all environments, ensuring version 38 and 40 consistency on the main branch.

## 📋 What's Included

This standardization plan delivers a complete framework for version management, including:

- **Strategic Documentation** - 10-phase implementation plan with detailed procedures
- **Configuration Management** - Central version configuration with defaults and history
- **Automation Scripts** - Build validation, version info, and system health checks
- **Operational Procedures** - Pre-deployment checklists and deployment runbooks
- **Team Resources** - Quick reference guides and troubleshooting documentation

## 🚀 Quick Start

### For Developers
```bash
# Check current version
npm run version:info

# Validate system health
npm run version:validate

# Build version 40 (default)
npm run build:v40

# Lint code
npm run lint
```

### For Operations
```bash
# Pre-deployment setup
npm run version:validate
npm run build:v40

# Post-deployment verification
npm run version:info
cat .build-metadata.json
```

## 📁 Documentation Structure

```
docs/
├── EXECUTIVE-SUMMARY.md              ⭐ Start here (5 min)
├── VERSION-MANAGEMENT-QUICK-REF.md   Quick commands (10 min)
├── IMPLEMENTATION-SUMMARY.md          Overview of deliverables
├── DEPLOYMENT-RUNBOOK.md              Step-by-step procedures
└── VERSION-STANDARDIZATION-PLAN.md    Full strategic plan (30 min)

scripts/
├── check-version.js                   Validate version at build time
├── version-info.js                    Display version information
└── validate-version.js                Comprehensive system checks
```

## 🎯 Key Features

### ✅ Automated Version Validation
Every build automatically validates:
- Version is within supported range (38-40)
- Lock file consistency
- Build environment (Node, NPM)
- Creates build metadata automatically

### ✅ Standardized Configuration
Central `version.config.json` specifies:
- Default version (40)
- Supported version range (38-40)
- Build environment requirements
- Deployment targets
- Version history with dates

### ✅ Clear Deployment Procedures
Complete runbook with:
- Pre-deployment checklist (30 minutes)
- Step-by-step deployment process
- Post-deployment verification
- Emergency rollback procedures
- Smoke test suite

### ✅ Ongoing Maintenance
Documented procedures for:
- Monthly maintenance tasks
- Version upgrade path
- Dependency updates
- Performance monitoring
- Incident documentation

## 📖 Documentation Guide

| Document | Purpose | Time |
|----------|---------|------|
| EXECUTIVE-SUMMARY.md | High-level overview | 5 min |
| VERSION-MANAGEMENT-QUICK-REF.md | Common commands | 10 min |
| DEPLOYMENT-RUNBOOK.md | How to deploy | 30 min |
| VERSION-STANDARDIZATION-PLAN.md | Full strategy | 30 min |
| IMPLEMENTATION-SUMMARY.md | What was delivered | 10 min |

## 🔄 Build Process Flow

```
Developer runs: npm run build

↓

scripts/check-version.js runs automatically:
  • Validates version ✓
  • Checks lock file ✓
  • Creates metadata ✓

↓

Next.js build executes:
  • Compiles application
  • Creates .next/ directory
  • Optimizes output

↓

Build metadata saved to .build-metadata.json:
  • Version: 40
  • Timestamp: ISO format
  • Node version
  • NPM version
```

## 📦 Version Configuration

### Current Setup
- **Default Version**: 40
- **Fallback Version**: 38
- **Supported Range**: 38-40
- **Build Environment**: Node 22, NPM 10.x

### Version History
| Version | Date | Description | Status |
|---------|------|-------------|--------|
| 40 | 2026-04-09 | Current stable | **Active** |
| 38 | 2026-04-09 | Previous stable | Fallback |

## 🛠 Available Commands

### Version Management
```bash
npm run version:info       # Show current version info
npm run version:validate   # Validate system health
```

### Building
```bash
npm run build              # Build version 40 (default)
npm run build:v40          # Build version 40 explicitly
npm run build:v38          # Build version 38 (fallback)
```

### Development
```bash
npm run dev                # Start dev server
npm run lint               # Run ESLint
npm run start              # Start production server
```

## 📋 Deployment Checklist

### Pre-Deployment (30 minutes before)
- [ ] Run `npm run version:validate`
- [ ] Run `npm run build:v40` locally
- [ ] Test with `npm run start`
- [ ] Verify git status is clean
- [ ] Check recent commits

### Deployment
- [ ] Create git tag: `git tag -a v40-prod-YYYYMMDD`
- [ ] Push to main: `git push origin main --tags`
- [ ] Monitor deployment
- [ ] Verify build metadata

### Post-Deployment
- [ ] Run smoke tests
- [ ] Test key routes
- [ ] Monitor error logs
- [ ] Verify version info

## 🚨 Emergency Rollback

If deployment fails:

```bash
# Immediate rollback to fallback version
git checkout v38-shell
npm run build:v38
npm run start
```

See DEPLOYMENT-RUNBOOK.md for detailed rollback procedures.

## 📊 Success Metrics

- ✅ 100% automated version validation
- ✅ Zero manual version checks needed
- ✅ All builds create metadata
- ✅ Fallback version always available
- ✅ Clear procedures documented

## 🔍 Troubleshooting

### Build fails with version error
```bash
npm run version:validate    # Check system health
npm run version:info        # Review configuration
```

### Build artifacts accidentally committed
```bash
git status
# Verify .gitignore includes .next and node_modules
```

### Deployment to wrong version
```bash
npm run version:info        # Check what's deployed
cat .build-metadata.json    # Review build metadata
```

See VERSION-STANDARDIZATION-PLAN.md for complete troubleshooting guide.

## 🎓 Team Implementation Timeline

| Phase | Duration | Activity |
|-------|----------|----------|
| Week 1 | 5 days | Read docs, understand plan |
| Week 2 | 5 days | Local testing and practice |
| Week 3 | 5 days | Staging deployment |
| Week 4 | 5 days | Production deployment |

## 📞 Getting Help

### Quick Questions
1. Check VERSION-MANAGEMENT-QUICK-REF.md
2. Run `npm run version:info`
3. Run `npm run version:validate`

### Deployment Help
1. Follow DEPLOYMENT-RUNBOOK.md
2. Check pre-deployment checklist
3. Review troubleshooting section

### Deep Questions
1. Read VERSION-STANDARDIZATION-PLAN.md
2. Review IMPLEMENTATION-SUMMARY.md
3. Check specific sections in docs/

## 🔗 File Structure

```
version.config.json                       Central version config
package.json                              Updated with version scripts

scripts/
├── check-version.js                     Build validation
├── version-info.js                      Version display
└── validate-version.js                  System validation

docs/
├── EXECUTIVE-SUMMARY.md                 ⭐ Start here
├── VERSION-MANAGEMENT-QUICK-REF.md      Commands reference
├── DEPLOYMENT-RUNBOOK.md                How to deploy
├── IMPLEMENTATION-SUMMARY.md            What was delivered
├── VERSION-STANDARDIZATION-PLAN.md      Full plan
└── README.md                            This file
```

## ✅ Implementation Readiness

The plan is **complete and ready** for team implementation:

- ✅ All documentation completed
- ✅ Configuration files created
- ✅ Automation scripts developed
- ✅ Package.json updated
- ✅ Procedures documented
- ✅ Examples provided
- ✅ Troubleshooting guide included

## 🎯 Next Steps

1. **Today**: Read EXECUTIVE-SUMMARY.md (5 min)
2. **Tomorrow**: Share VERSION-MANAGEMENT-QUICK-REF.md with team
3. **This Week**: Run `npm run version:info` and `npm run version:validate` locally
4. **Next Week**: Build locally with `npm run build:v40`
5. **Following Week**: Deploy to staging
6. **Final Week**: Deploy to production

## 📝 Notes

- Version 40 is the default for all new builds
- Version 38 is always available as fallback
- All builds create metadata automatically
- Git tagging strategy ensures clear version history
- Pre-commit hooks prevent accidental build artifact commits

## 📅 Created

- **Date**: 2026-04-09
- **Project**: Defrag App (v0-defrag-app-shell)
- **Scope**: Main Branch Version Standardization
- **Target Versions**: 38, 40

---

**Status**: ✅ Complete and ready for implementation

**Questions?** Start with EXECUTIVE-SUMMARY.md or VERSION-MANAGEMENT-QUICK-REF.md
