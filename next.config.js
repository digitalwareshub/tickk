/* eslint-disable @typescript-eslint/no-require-imports */
const path = require('path')
const fs = require('fs')

// PWA Configuration with Development Support
const isDevelopment = process.env.NODE_ENV === 'development'
const enablePWA = process.env.ENABLE_PWA === 'true'
const pwaEnabled = !isDevelopment || enablePWA

// Log PWA status
console.log(`\n🚀 PWA Configuration:`)
console.log(`   Environment: ${process.env.NODE_ENV}`)
console.log(`   PWA Enabled: ${pwaEnabled ? '✅ YES' : '❌ NO'}`)
if (isDevelopment && enablePWA) {
  console.log(`   Development PWA Testing: ✅ ENABLED`)
  console.log(`   💡 Use 'ENABLE_PWA=true npm run dev' to test PWA features`)
} else if (isDevelopment) {
  console.log(`   Development PWA Testing: ❌ DISABLED`)
  console.log(`   💡 Use 'ENABLE_PWA=true npm run dev' to enable PWA testing`)
}
console.log(`\n`)

// Validate manifest.json exists
const manifestPath = path.join(__dirname, 'public', 'manifest.json')
if (!fs.existsSync(manifestPath)) {
  console.error('❌ PWA Error: manifest.json not found in public directory')
  process.exit(1)
}

// Validate manifest.json content
try {
  const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'))
  const requiredFields = ['name', 'short_name', 'start_url', 'display', 'icons']
  const missingFields = requiredFields.filter(field => !manifest[field])
  
  if (missingFields.length > 0) {
    console.error(`❌ PWA Error: manifest.json missing required fields: ${missingFields.join(', ')}`)
    process.exit(1)
  }
  
  if (pwaEnabled) {
    console.log(`✅ PWA Manifest validated successfully`)
    console.log(`   App Name: ${manifest.name}`)
    console.log(`   Short Name: ${manifest.short_name}`)
    console.log(`   Icons: ${manifest.icons?.length || 0} configured`)
  }
} catch (error) {
  console.error('❌ PWA Error: Invalid manifest.json format:', error.message)
  process.exit(1)
}

const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === 'development' && !process.env.ENABLE_PWA,
  buildExcludes: [/middleware-manifest\.json$/],
  runtimeCaching: [
    {
      urlPattern: /^https:\/\/cdnjs\.cloudflare\.com\/.*/i,
      handler: 'CacheFirst',
      options: {
        cacheName: 'cdnjs-cache',
        expiration: {
          maxEntries: 10,
          maxAgeSeconds: 365 * 24 * 60 * 60, // 1 year
        },
      },
    },
    {
      urlPattern: /^https:\/\/cdn\.jsdelivr\.net\/.*/i,
      handler: 'CacheFirst',
      options: {
        cacheName: 'jsdelivr-cache',
        expiration: {
          maxEntries: 10,
          maxAgeSeconds: 365 * 24 * 60 * 60, // 1 year
        },
      },
    },
    {
      urlPattern: /^https:\/\/compromise\.cool\/.*/i,
      handler: 'CacheFirst',
      options: {
        cacheName: 'compromise-cache',
        expiration: {
          maxEntries: 5,
          maxAgeSeconds: 365 * 24 * 60 * 60, // 1 year
        },
      },
    },
  ],
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  
  // Production optimizations
  poweredByHeader: false,
  compress: true,
  
  // Security headers
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cdnjs.cloudflare.com https://cdn.jsdelivr.net https://compromise.cool https://www.googletagmanager.com https://www.google-analytics.com https://vitals.vercel-analytics.com",
              "style-src 'self' 'unsafe-inline' https://cdnjs.cloudflare.com https://cdn.jsdelivr.net",
              "font-src 'self' https://cdnjs.cloudflare.com",
              "img-src 'self' data: https:",
              "connect-src 'self' https: https://www.google-analytics.com https://analytics.google.com https://vitals.vercel-analytics.com",
              "media-src 'self'",
              "frame-src 'none'",
              "base-uri 'self'",
              "form-action 'self'"
            ].join('; '),
          },
          {
            key: 'Permissions-Policy',
            value: [
              'camera=()',
              'microphone=(self)',
              'geolocation=()',
              'interest-cohort=()',
              'payment=()',
              'usb=()',
            ].join(', '),
          },
        ],
      },
      {
        source: '/sitemap.xml',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=86400, must-revalidate',
          },
        ],
      },
      {
        source: '/robots.txt',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=86400',
          },
        ],
      },
      {
        source: '/manifest.json',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=604800',
          },
        ],
      },
    ]
  },

  // Image optimization
  images: {
    formats: ['image/webp', 'image/avif'],
    minimumCacheTTL: 31536000, // 1 year
    // Exclude social media images from optimization to prevent flickering
    unoptimized: false,
    domains: [],
    remotePatterns: [],
  },

  // Performance optimizations
  experimental: {
    optimizePackageImports: ['compromise'],
    // optimizeCss: true, // Disabled to prevent dynamic-css-manifest.json 404 errors
    scrollRestoration: true,
  },

  // Build optimizations
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },

  // Bundle analyzer and webpack optimizations
  webpack: (config, { isServer, dev }) => {
    // Bundle size monitoring and warnings
    if (!dev) {
      config.performance = {
        hints: 'warning',
        maxEntrypointSize: 512000, // 500KB
        maxAssetSize: 512000, // 500KB
        assetFilter: (assetFilename) => {
          return !assetFilename.endsWith('.map') && !assetFilename.includes('sw.js')
        }
      }
    }

    // Client-side fallbacks
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
        crypto: false,
      }
    }

    // Bundle analyzer integration
    if (process.env.ANALYZE === 'true') {
      const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
      config.plugins.push(
        new BundleAnalyzerPlugin({
          analyzerMode: 'static',
          openAnalyzer: false,
          reportFilename: isServer ? '../bundle-analysis-server.html' : '../bundle-analysis-client.html',
          generateStatsFile: true,
          statsFilename: isServer ? '../bundle-stats-server.json' : '../bundle-stats-client.json',
        })
      )
    }

    return config
  },

  // Redirects for SEO
  async redirects() {
    return [
      // WWW to non-WWW redirect (canonical)
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'www.tickk.app',
          },
        ],
        destination: 'https://tickk.app/:path*',
        permanent: true,
      },
      // Legacy redirects
      {
        source: '/home',
        destination: '/',
        permanent: true,
      },
      {
        source: '/voice-app',
        destination: '/app',
        permanent: true,
      },
      {
        source: '/voice-dashboard',
        destination: '/app',
        permanent: true,
      },
    ]
  },

  // Enable trailing slash for consistency
  trailingSlash: false,

  // Environment variables for build-time optimization
  env: {
    NEXT_PUBLIC_APP_NAME: 'tickk',
    NEXT_PUBLIC_APP_DESCRIPTION: 'Free Voice Productivity App',
    NEXT_PUBLIC_APP_URL: 'https://tickk.app',
  },
};

module.exports = withPWA(nextConfig);
