# Deployment Runbook - Defrag App

## Pre-Deployment Checklist (30 minutes before)

### Environment Verification
```bash
# Check current environment
npm run version:info

# Validate all systems
npm run version:validate
```

Expected output:
- ✓ Node version check
- ✓ NPM version check
- ✓ Git status: clean
- ✓ Build artifacts verified
- ✓ .gitignore properly configured

### Local Build Test
```bash
# Clean install
rm -rf .next node_modules
npm ci

# Test build
npm run build

# Test start (verify no runtime errors)
npm run start
# Navigate to http://localhost:3000 and verify:
# - Landing page loads
# - Dashboard displays
# - Navigation works
```

### Git Verification
```bash
# Ensure no uncommitted changes
git status

# Review recent commits
git log --oneline -5

# Verify on main branch
git branch -v
```

---

## Production Deployment Process

### 1. Create Release Tag
```bash
# Create annotated tag with date and version
git tag -a v40-prod-$(date +%Y%m%d) -m "Production release v40 - $(date)"

# Verify tag created
git tag -l -n1 | tail -5

# Push tags to repository
git push origin --tags
```

### 2. Verify Branch is Clean and Current
```bash
# Ensure main branch is checked out
git checkout main

# Pull latest changes
git pull origin main

# Verify no uncommitted changes
git status
```

### 3. Run Build Verification
```bash
# Run comprehensive validation
npm run version:validate

# Verify it reports:
# ✓ All checks passed
```

### 4. Build for Target Version
```bash
# Build for version 40 (default)
npm run build:v40

# Build should complete with:
# ✓ Version validation passed
# ✓ Build successful
# Check for .next directory created
ls -la .next/
```

### 5. Start Production Server (Local Testing)
```bash
# Start the server
npm run start

# In another terminal, run smoke tests
curl http://localhost:3000
# Should return 200 OK

# Test key routes
curl http://localhost:3000/dashboard
curl http://localhost:3000/workspace
```

### 6. Deploy to Production Environment

**For Vercel:**
```bash
# Git push triggers automatic deployment
git push origin main

# Monitor deployment at:
# https://vercel.com/dashboard

# Verify deployment status
npm run version:info  # Check if metadata shows new deployment
```

**For Custom Server:**
```bash
# Build production bundle
npm ci --production

# Copy to server
scp -r .next/ user@server:/app/
scp -r node_modules/ user@server:/app/

# Restart application
ssh user@server "cd /app && npm run start"
```

---

## Post-Deployment Verification

### 1. Smoke Tests (5 minutes after deployment)
```bash
# Test landing page
curl -I https://defrag-app.vercel.app/
# Expected: 200 OK

# Test dashboard
curl -I https://defrag-app.vercel.app/dashboard
# Expected: 200 OK

# Test workspace
curl -I https://defrag-app.vercel.app/workspace
# Expected: 200 OK
```

### 2. Functional Testing
- [ ] Landing page loads correctly
- [ ] Login/signup flows work
- [ ] Dashboard displays user data
- [ ] Workspace full 3-column layout renders
- [ ] Message input functional
- [ ] Canvas artifacts display
- [ ] Navigation between pages works

### 3. Monitor Deployment
```bash
# Check Vercel deployment logs
vercel logs --follow

# Monitor error tracking (if configured)
# Check Sentry/error dashboard for new errors

# Review Core Web Vitals
# Check Google PageSpeed Insights
```

### 4. Version Verification
```bash
# Verify deployment version
npm run version:info

# Check build metadata
cat .build-metadata.json
# Should show:
# - version: "40"
# - timestamp: recent time
# - node/npm versions

# Check git tag
git describe --tags
```

---

## Rollback Procedure (If Issues Detected)

### Immediate Rollback
```bash
# If deployment is critical failure, immediately rollback to fallback version

# On Vercel: Revert deployment from dashboard
# In UI: Deployments → Select previous stable → Click "Redeploy"

# Or via command line:
git checkout v38-shell  # Fallback version
git push -f origin main

# Or rebuild previous version:
npm run build:v38
npm run start
```

### Detailed Rollback Investigation
```bash
# 1. Check what changed
git diff v40-prod-$(date +%Y%m%d) HEAD

# 2. Check logs for errors
npm run start 2>&1 | grep -i error

# 3. Verify version didn't change unexpectedly
npm run version:info

# 4. Once stable, document incident and causes
# Create incident report in docs/incidents/
```

---

## Emergency Contacts & Escalation

### Critical Issues (All systems down)
1. Check error dashboard for root cause
2. Review recent commits for breaking changes
3. Attempt rollback to fallback version (v38)
4. If rollback fails, rebuild v38 from clean state
5. Escalate to development team

### Performance Issues (Slow responses)
1. Check build size: `npm run build -- --analyze`
2. Review database queries for N+1 problems
3. Check cache configuration
4. Consider rolling back to previous version

### Data Integrity Issues
1. Do NOT rollback until root cause identified
2. Verify data consistency
3. Check database logs
4. Create backup before any recovery attempts

---

## Post-Incident Checklist

After any deployment or incident:

- [ ] Document what happened
- [ ] Document how it was resolved
- [ ] Update troubleshooting guide
- [ ] Review process to prevent recurrence
- [ ] Update deployment checklist if needed
- [ ] Share findings with team
- [ ] Archive incident report in docs/incidents/

---

## Quick Command Reference

```bash
# Daily commands
npm run version:info        # Check current version
npm run version:validate    # Verify system health
npm run lint               # Check code quality

# Build commands
npm run build              # Build default version (40)
npm run build:v38          # Build version 38
npm run build:v40          # Build version 40
npm run start              # Start production server

# Git commands
git log --oneline -10      # View recent commits
git status                 # Check current status
git push origin main --tags # Push with tags

# Deployment
npm run version:info
npm run build:v40
npm run start

# Debugging
cat .build-metadata.json   # View last build metadata
cat .deploy-metadata.json  # View last deploy metadata
git describe --tags        # Show current tag
```

---

## Support

For issues or questions:
1. Check troubleshooting guide in docs/
2. Review recent git logs
3. Run version:validate for diagnostics
4. Contact development team with version info from `npm run version:info`
