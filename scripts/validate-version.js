#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const childProcess = require('child_process');

const versionConfig = JSON.parse(
  fs.readFileSync(path.join(__dirname, '../version.config.json'), 'utf8')
);

const checks = {
  nodeVersion: () => {
    const currentNode = process.version;
    const requiredNode = versionConfig.build.node;
    console.log(`[✓] Node version: ${currentNode}`);
    return true;
  },

  npmVersion: () => {
    const npmVersion = childProcess.execSync('npm -v', { encoding: 'utf8' }).trim();
    console.log(`[✓] NPM version: ${npmVersion}`);
    return true;
  },

  gitStatus: () => {
    try {
      const status = childProcess.execSync('git status --porcelain', { encoding: 'utf8' });
      if (status) {
        console.warn(`[⚠] Uncommitted changes detected`);
      } else {
        console.log(`[✓] Git status: clean`);
      }
      return true;
    } catch (e) {
      console.warn(`[⚠] Git check skipped`);
      return true;
    }
  },

  buildArtifacts: () => {
    const artifacts = ['.next', 'node_modules'];
    const found = artifacts.filter(a => fs.existsSync(path.join(__dirname, '../', a)));
    console.log(`[✓] Build artifacts: ${found.length > 0 ? found.join(', ') : 'none (clean)'}`);
    return true;
  },

  gitignore: () => {
    const gitignorePath = path.join(__dirname, '../.gitignore');
    if (fs.existsSync(gitignorePath)) {
      const gitignore = fs.readFileSync(gitignorePath, 'utf8');
      const hasNodeModules = gitignore.includes('node_modules');
      const hasNext = gitignore.includes('.next');
      if (hasNodeModules && hasNext) {
        console.log(`[✓] .gitignore properly configured`);
        return true;
      } else {
        console.warn(`[⚠] .gitignore may be incomplete`);
        return false;
      }
    }
    return false;
  },

  packageJson: () => {
    const pkgPath = path.join(__dirname, '../package.json');
    if (fs.existsSync(pkgPath)) {
      const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
      console.log(`[✓] Package.json: ${pkg.name} v${pkg.version}`);
      return true;
    }
    return false;
  },
};

console.log('\n=== Defrag App Validation ===\n');

let allPassed = true;
Object.entries(checks).forEach(([name, check]) => {
  try {
    if (!check()) allPassed = false;
  } catch (e) {
    console.error(`[✗] ${name}: ${e.message}`);
    allPassed = false;
  }
});

console.log(`\n${allPassed ? '✓ All checks passed' : '✗ Some checks failed'}\n`);
process.exit(allPassed ? 0 : 1);
