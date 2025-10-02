#!/usr/bin/env node

/**
 * Bundle Analysis Report Viewer
 * Provides easy access to generated bundle analysis reports
 */

/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require('fs')
const path = require('path')
const { exec } = require('child_process')

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  green: '\x1b[32m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
  bold: '\x1b[1m'
}

function colorize(text, color) {
  return `${colors[color]}${text}${colors.reset}`
}

function openFile(filePath) {
  const platform = process.platform
  let command

  if (platform === 'darwin') {
    command = `open "${filePath}"`
  } else if (platform === 'win32') {
    command = `start "${filePath}"`
  } else {
    command = `xdg-open "${filePath}"`
  }

  exec(command, (err) => {
    if (err) {
      console.log(colorize(`❌ Failed to open ${filePath}: ${err.message}`, 'red'))
      console.log(colorize(`Please open manually: ${filePath}`, 'yellow'))
    } else {
      console.log(colorize(`✅ Opened ${path.basename(filePath)}`, 'green'))
    }
  })
}

function checkFileExists(filePath) {
  return fs.existsSync(filePath)
}

function getFileSize(filePath) {
  try {
    const stats = fs.statSync(filePath)
    return stats.size
  } catch {
    return 0
  }
}

function formatBytes(bytes) {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

function printFileInfo(filePath, label) {
  if (checkFileExists(filePath)) {
    const size = getFileSize(filePath)
    console.log(colorize(`✅ ${label}: ${path.basename(filePath)} (${formatBytes(size)})`, 'green'))
    return true
  } else {
    console.log(colorize(`❌ ${label}: Not found`, 'red'))
    return false
  }
}

function main() {
  const args = process.argv.slice(2)
  const mode = args[0] || 'both'
  
  console.log(colorize('📊 Bundle Analysis Report Viewer', 'bold'))
  console.log(colorize('=' .repeat(50), 'cyan'))
  
  const clientHtmlPath = path.join(process.cwd(), 'bundle-analysis-client.html')
  const serverHtmlPath = path.join(process.cwd(), 'bundle-analysis-server.html')
  const clientStatsPath = path.join(process.cwd(), 'bundle-stats-client.json')
  const serverStatsPath = path.join(process.cwd(), 'bundle-stats-server.json')
  
  console.log(colorize('\n📁 Generated Files:', 'bold'))
  
  let hasClient = printFileInfo(clientHtmlPath, 'Client Analysis Report')
  let hasServer = printFileInfo(serverHtmlPath, 'Server Analysis Report')
  printFileInfo(clientStatsPath, 'Client Stats JSON')
  printFileInfo(serverStatsPath, 'Server Stats JSON')
  
  if (!hasClient && !hasServer) {
    console.log(colorize('\n⚠️  No bundle analysis files found!', 'yellow'))
    console.log(colorize('Run one of these commands first:', 'blue'))
    console.log('  • npm run analyze:client')
    console.log('  • npm run analyze:server')
    console.log('  • npm run analyze:both')
    return
  }
  
  console.log(colorize('\n🚀 Opening Reports:', 'bold'))
  
  switch (mode.toLowerCase()) {
    case 'client':
      if (hasClient) {
        console.log(colorize('Opening client bundle analysis...', 'blue'))
        openFile(clientHtmlPath)
      } else {
        console.log(colorize('❌ Client analysis report not found', 'red'))
      }
      break
      
    case 'server':
      if (hasServer) {
        console.log(colorize('Opening server bundle analysis...', 'blue'))
        openFile(serverHtmlPath)
      } else {
        console.log(colorize('❌ Server analysis report not found', 'red'))
      }
      break
      
    case 'both':
    default:
      if (hasClient) {
        console.log(colorize('Opening client bundle analysis...', 'blue'))
        openFile(clientHtmlPath)
      }
      if (hasServer) {
        console.log(colorize('Opening server bundle analysis...', 'blue'))
        openFile(serverHtmlPath)
      }
      break
  }
  
  console.log(colorize('\n💡 Tips:', 'bold'))
  console.log('• Use the interactive treemap to explore bundle contents')
  console.log('• Look for large chunks that can be code-split')
  console.log('• Check for duplicate dependencies across chunks')
  console.log('• Run "npm run bundle:check" for size recommendations')
  
  console.log(colorize('\n📋 Available Commands:', 'bold'))
  console.log('• npm run analyze:client  - Generate client analysis')
  console.log('• npm run analyze:server  - Generate server analysis')
  console.log('• npm run analyze:both    - Generate both analyses')
  console.log('• npm run bundle:check    - Check bundle sizes')
  console.log('• npm run bundle:report   - Full analysis + recommendations')
}

if (require.main === module) {
  main()
}

module.exports = {
  openFile,
  checkFileExists,
  getFileSize,
  formatBytes
}
