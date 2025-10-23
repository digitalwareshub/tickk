#!/usr/bin/env node
/**
 * Feature Flag Toggle Script
 *
 * Usage:
 *   node scripts/toggle-features.js on   # Enable all features
 *   node scripts/toggle-features.js off  # Disable all features
 *   node scripts/toggle-features.js status  # Show current status
 */

const fs = require('fs');
const path = require('path');

const envPath = path.join(__dirname, '../.env.local');

const FEATURES = [
  'NEXT_PUBLIC_ENABLE_MONETIZATION',
  'NEXT_PUBLIC_ENABLE_PRO_TIER',
  'NEXT_PUBLIC_SHOW_PRICING',
  'NEXT_PUBLIC_ENABLE_QUOTAS',
  'NEXT_PUBLIC_ENABLE_ADVANCED_EXPORTS',
  'NEXT_PUBLIC_ENABLE_ANALYTICS_DASHBOARD',
  'NEXT_PUBLIC_ENABLE_CLOUD_BACKUP',
  'NEXT_PUBLIC_ENABLE_STRIPE',
];

function readEnvFile() {
  if (!fs.existsSync(envPath)) {
    console.error('❌ .env.local not found. Run: cp .env.local.example .env.local');
    process.exit(1);
  }
  return fs.readFileSync(envPath, 'utf8');
}

function writeEnvFile(content) {
  fs.writeFileSync(envPath, content, 'utf8');
}

function toggleFeatures(enable) {
  let content = readEnvFile();
  const value = enable ? 'true' : 'false';

  FEATURES.forEach(feature => {
    // Match: FEATURE=true or FEATURE=false or # FEATURE=...
    const regex = new RegExp(`^(#\\s*)?${feature}=.*$`, 'gm');

    if (content.match(regex)) {
      // Update existing line
      content = content.replace(regex, `${feature}=${value}`);
    } else {
      // Add new line in monetization section
      const marker = '# MONETIZATION FEATURE FLAGS';
      if (content.includes(marker)) {
        content = content.replace(
          marker,
          `${marker}\n${feature}=${value}`
        );
      }
    }
  });

  writeEnvFile(content);
  console.log(`✅ All features ${enable ? 'enabled' : 'disabled'}`);
  console.log('\n🔄 Restart your dev server: npm run dev\n');
}

function showStatus() {
  const content = readEnvFile();
  console.log('\n📊 Feature Flag Status:\n');

  FEATURES.forEach(feature => {
    const regex = new RegExp(`^${feature}=(.*)$`, 'gm');
    const match = content.match(regex);

    if (match) {
      const value = match[0].split('=')[1].trim();
      const status = value === 'true' ? '✅ ON ' : '❌ OFF';
      console.log(`${status} ${feature}`);
    } else {
      console.log(`⚪ N/A ${feature} (not set)`);
    }
  });

  console.log('\n');
}

// Main
const command = process.argv[2];

switch (command) {
  case 'on':
  case 'enable':
    toggleFeatures(true);
    break;

  case 'off':
  case 'disable':
    toggleFeatures(false);
    break;

  case 'status':
  case 'show':
    showStatus();
    break;

  default:
    console.log(`
🚩 Feature Flag Manager

Usage:
  node scripts/toggle-features.js on      # Enable all features
  node scripts/toggle-features.js off     # Disable all features
  node scripts/toggle-features.js status  # Show current status

Examples:
  npm run features:on     # Enable all
  npm run features:off    # Disable all
  npm run features:status # Check status
`);
}
