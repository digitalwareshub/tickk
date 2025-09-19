// Production build optimization script
/* eslint-disable @typescript-eslint/no-require-imports */
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

module.exports = withBundleAnalyzer

// Add to package.json scripts:
// "analyze": "ANALYZE=true npm run build"
// "build:prod": "NODE_ENV=production npm run build"
// "export": "npm run build && next export"
