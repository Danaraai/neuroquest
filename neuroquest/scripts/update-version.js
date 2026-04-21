#!/usr/bin/env node

/**
 * Update version.json with current timestamp
 * This is called during the build process to ensure version changes on each deploy
 */

const fs = require('fs');
const path = require('path');

const versionFile = path.join(__dirname, '../public/version.json');

const versionData = {
  version: '1.0.0',
  timestamp: Date.now(),
};

fs.writeFileSync(versionFile, JSON.stringify(versionData, null, 2));

console.log(`✓ Version updated: ${versionData.timestamp}`);
