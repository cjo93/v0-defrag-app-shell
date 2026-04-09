#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const versionConfig = JSON.parse(
  fs.readFileSync(path.join(__dirname, '../version.config.json'), 'utf8')
);

console.log('\n=== Defrag App Version Information ===\n');
console.log(`App Name: ${versionConfig.app.name}`);
console.log(`Default Version: ${versionConfig.app.defaultVersion}`);
console.log(`Supported Versions: ${versionConfig.app.minSupportedVersion} - ${versionConfig.app.maxSupportedVersion}`);
console.log(`\nVersion History:`);

Object.entries(versionConfig.versionHistory).forEach(([version, info]) => {
  console.log(`  v${version}: ${info.date} - ${info.description}`);
});

console.log(`\nBuild Configuration:`);
console.log(`  Node: ${versionConfig.build.node}`);
console.log(`  NPM: ${versionConfig.build.npm}`);

if (fs.existsSync(path.join(__dirname, '../.build-metadata.json'))) {
  const metadata = JSON.parse(
    fs.readFileSync(path.join(__dirname, '../.build-metadata.json'), 'utf8')
  );
  console.log(`\nLast Build:`);
  console.log(`  Version: ${metadata.version}`);
  console.log(`  Timestamp: ${metadata.timestamp}`);
  console.log(`  Node: ${metadata.node}`);
  console.log(`  NPM: ${metadata.npm}`);
}

console.log('\n');
