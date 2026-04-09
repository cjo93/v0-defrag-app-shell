#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const versionConfig = JSON.parse(
  fs.readFileSync(path.join(__dirname, '../version.config.json'), 'utf8')
);

const targetVersion = process.argv[2]?.split('=')[1] || versionConfig.app.defaultVersion;

console.log(`[v0] Validating build for version: ${targetVersion}`);

// Validate version is within supported range
const min = parseInt(versionConfig.app.minSupportedVersion);
const max = parseInt(versionConfig.app.maxSupportedVersion);
const target = parseInt(targetVersion);

if (target < min || target > max) {
  console.error(`❌ Version ${target} outside supported range [${min}-${max}]`);
  process.exit(1);
}

// Check lock file consistency
const lockFile = path.join(__dirname, '../package-lock.json');
if (fs.existsSync(lockFile) && versionConfig.build.lockfileVersion) {
  const lockData = JSON.parse(fs.readFileSync(lockFile, 'utf8'));
  if (lockData.lockfileVersion !== versionConfig.build.lockfileVersion) {
    console.warn(`⚠️  Lock file version mismatch. Expected: ${versionConfig.build.lockfileVersion}, Got: ${lockData.lockfileVersion}`);
  }
}

// Create build metadata
const buildMetadata = {
  version: targetVersion,
  timestamp: new Date().toISOString(),
  node: process.version,
  npm: require('child_process').execSync('npm -v', { encoding: 'utf8' }).trim(),
};

fs.writeFileSync(
  path.join(__dirname, '../.build-metadata.json'),
  JSON.stringify(buildMetadata, null, 2)
);

console.log(`✓ Version validation passed`);
console.log(`✓ Build metadata written`);
