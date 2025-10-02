#!/usr/bin/env node

/**
 * Bundle Size Analysis and Monitoring Script
 * Provides comprehensive bundle size analysis with recommendations
 */

/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require('fs')
const path = require('path')

// Bundle size thresholds (in bytes)
const THRESHOLDS = {
  client: {
    warning: 500 * 1024, // 500KB
    error: 1000 * 1024,  // 1MB
  },
  server: {
    warning: 200 * 1024, // 200KB
    error: 500 * 1024,   // 500KB
  },
  total: {
    warning: 2 * 1024 * 1024, // 2MB
    error: 5 * 1024 * 1024,   // 5MB
  }
}

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

function formatBytes(bytes) {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

function analyzeBundleStats(statsPath, type) {
  if (!fs.existsSync(statsPath)) {
    console.log(colorize(`⚠️  No ${type} bundle stats found at ${statsPath}`, 'yellow'))
    return null
  }

  try {
    const stats = JSON.parse(fs.readFileSync(statsPath, 'utf8'))
    const assets = stats.assets || []
    
    let totalSize = 0
    const largeAssets = []
    
    assets.forEach(asset => {
      if (asset.name && !asset.name.endsWith('.map')) {
        totalSize += asset.size
        if (asset.size > THRESHOLDS[type].warning) {
          largeAssets.push({
            name: asset.name,
            size: asset.size,
            chunks: asset.chunks
          })
        }
      }
    })

    return {
      totalSize,
      largeAssets,
      assetCount: assets.length,
      stats
    }
  } catch (error) {
    console.log(colorize(`❌ Error reading ${type} stats: ${error.message}`, 'red'))
    return null
  }
}

function generateRecommendations(clientAnalysis, serverAnalysis) {
  const recommendations = []
  
  if (clientAnalysis) {
    if (clientAnalysis.totalSize > THRESHOLDS.client.error) {
      recommendations.push({
        type: 'error',
        message: `Client bundle is too large (${formatBytes(clientAnalysis.totalSize)})`,
        suggestions: [
          'Consider code splitting with dynamic imports',
          'Remove unused dependencies',
          'Optimize images and assets',
          'Use tree shaking for better dead code elimination'
        ]
      })
    } else if (clientAnalysis.totalSize > THRESHOLDS.client.warning) {
      recommendations.push({
        type: 'warning',
        message: `Client bundle is approaching size limit (${formatBytes(clientAnalysis.totalSize)})`,
        suggestions: [
          'Monitor bundle size regularly',
          'Consider lazy loading for non-critical components',
          'Review and optimize large dependencies'
        ]
      })
    }

    if (clientAnalysis.largeAssets.length > 0) {
      recommendations.push({
        type: 'info',
        message: `Found ${clientAnalysis.largeAssets.length} large client assets`,
        suggestions: [
          'Review large assets for optimization opportunities',
          'Consider asset compression and minification',
          'Split large chunks into smaller ones'
        ]
      })
    }
  }

  if (serverAnalysis) {
    if (serverAnalysis.totalSize > THRESHOLDS.server.error) {
      recommendations.push({
        type: 'error',
        message: `Server bundle is too large (${formatBytes(serverAnalysis.totalSize)})`,
        suggestions: [
          'Move heavy dependencies to client-side only',
          'Use dynamic imports for server-side code',
          'Optimize server-side rendering performance'
        ]
      })
    }
  }

  return recommendations
}

function printAnalysis(analysis, type) {
  if (!analysis) return

  console.log(colorize(`\n📊 ${type.toUpperCase()} Bundle Analysis`, 'bold'))
  console.log(colorize('=' .repeat(50), 'cyan'))
  
  console.log(`Total Size: ${colorize(formatBytes(analysis.totalSize), 'bold')}`)
  console.log(`Asset Count: ${analysis.assetCount}`)
  
  if (analysis.largeAssets.length > 0) {
    console.log(colorize(`\n🔍 Large Assets (>${formatBytes(THRESHOLDS[type].warning)}):`, 'yellow'))
    analysis.largeAssets
      .sort((a, b) => b.size - a.size)
      .forEach(asset => {
        const sizeColor = asset.size > THRESHOLDS[type].error ? 'red' : 'yellow'
        console.log(`  • ${asset.name}: ${colorize(formatBytes(asset.size), sizeColor)}`)
      })
  } else {
    console.log(colorize('✅ No large assets found', 'green'))
  }
}

function printRecommendations(recommendations) {
  if (recommendations.length === 0) {
    console.log(colorize('\n🎉 Bundle size is within acceptable limits!', 'green'))
    return
  }

  console.log(colorize('\n💡 Recommendations:', 'bold'))
  console.log(colorize('=' .repeat(50), 'cyan'))
  
  recommendations.forEach((rec, index) => {
    const icon = rec.type === 'error' ? '❌' : rec.type === 'warning' ? '⚠️' : 'ℹ️'
    const color = rec.type === 'error' ? 'red' : rec.type === 'warning' ? 'yellow' : 'blue'
    
    console.log(`\n${index + 1}. ${icon} ${colorize(rec.message, color)}`)
    rec.suggestions.forEach(suggestion => {
      console.log(`   • ${suggestion}`)
    })
  })
}

function main() {
  console.log(colorize('🔍 Bundle Size Analysis', 'bold'))
  console.log(colorize('=' .repeat(50), 'cyan'))
  
  const clientStatsPath = path.join(process.cwd(), 'bundle-stats-client.json')
  const serverStatsPath = path.join(process.cwd(), 'bundle-stats-server.json')
  
  const clientAnalysis = analyzeBundleStats(clientStatsPath, 'client')
  const serverAnalysis = analyzeBundleStats(serverStatsPath, 'server')
  
  printAnalysis(clientAnalysis, 'client')
  printAnalysis(serverAnalysis, 'server')
  
  const recommendations = generateRecommendations(clientAnalysis, serverAnalysis)
  printRecommendations(recommendations)
  
  // Summary
  const totalSize = (clientAnalysis?.totalSize || 0) + (serverAnalysis?.totalSize || 0)
  console.log(colorize('\n📈 Summary:', 'bold'))
  console.log(`Total Bundle Size: ${colorize(formatBytes(totalSize), 'bold')}`)
  
  if (totalSize > THRESHOLDS.total.error) {
    console.log(colorize('❌ Bundle size exceeds error threshold', 'red'))
    process.exit(1)
  } else if (totalSize > THRESHOLDS.total.warning) {
    console.log(colorize('⚠️  Bundle size exceeds warning threshold', 'yellow'))
  } else {
    console.log(colorize('✅ Bundle size is within acceptable limits', 'green'))
  }
  
  console.log(colorize('\n💡 Run "npm run analyze:both" to generate detailed bundle analysis reports', 'blue'))
}

if (require.main === module) {
  main()
}

module.exports = {
  analyzeBundleStats,
  generateRecommendations,
  formatBytes,
  THRESHOLDS
}
