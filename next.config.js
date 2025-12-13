/* eslint-disable @typescript-eslint/no-require-imports */
// Vercel deployment trigger - Updated Nov 4, 2025
const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === 'development',
  buildExcludes: [/middleware-manifest\.json$/, /og-image\.webp$/, /twitter-image\.webp$/, /_next\/dynamic-css-manifest\.json$/],
  publicExcludes: ['!robots.txt', '!sitemap.xml'],
  // Fallback for failed precaching - prevents white screen
  cacheOnFrontEndNav: true,
  reloadOnOnline: true,
  // Cache strategies for better reliability
  fallbacks: {
    document: '/offline.html', // Create this page to show when offline
  },
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
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cdnjs.cloudflare.com https://cdn.jsdelivr.net https://compromise.cool https://www.googletagmanager.com https://www.google-analytics.com https://vitals.vercel-analytics.com https://www.clarity.ms https://*.clarity.ms https://static.hotjar.com https://*.hotjar.com",
              "style-src 'self' 'unsafe-inline' https://cdnjs.cloudflare.com https://cdn.jsdelivr.net",
              "font-src 'self' https://cdnjs.cloudflare.com",
              "img-src 'self' data: https: https://*.clarity.ms https://*.hotjar.com",
              "connect-src 'self' https: https://www.google-analytics.com https://analytics.google.com https://vitals.vercel-analytics.com https://*.clarity.ms https://www.clarity.ms https://*.hotjar.com https://*.hotjar.io",
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
    domains: ['peerpush.net', 'api.producthunt.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'peerpush.net',
        port: '',
        pathname: '/p/tickk/badge',
      },
      {
        protocol: 'https',
        hostname: 'api.producthunt.com',
        port: '',
        pathname: '/widgets/embed-image/v1/featured.svg',
      },
    ],
  },

  // Performance optimizations
  experimental: {
    optimizePackageImports: ['compromise'],
    optimizeCss: true,
    scrollRestoration: true,
  },

  // Build optimizations
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },

  // Turbopack configuration (Next.js 16+)
  // Empty config tells Next.js we're aware of Turbopack and accept it as default
  turbopack: {},

  // Bundle analyzer (uncomment for analysis)
  // webpack: (config, { isServer }) => {
  //   if (!isServer) {
  //     config.resolve.fallback = {
  //       ...config.resolve.fallback,
  //       fs: false,
  //     };
  //   }
  //   return config;
  // },

  // Redirects for SEO
  // NOTE: www→non-www and HTTP→HTTPS are handled at Vercel level (vercel.json)
  // to avoid redirect chains
  async redirects() {
    return [
      // NOTE: Query parameter redirects are now handled by middleware.ts
      // with 301 permanent redirects for better SEO
      // Legacy redirects
      {
        source: '/home',
        destination: '/',
        permanent: true,
      },
      {
        source: '/voice-app',
        destination: '/',
        permanent: true,
      },
      {
        source: '/voice-dashboard',
        destination: '/',
        permanent: true,
      },
      {
        source: '/app',
        destination: '/',
        permanent: true,
      },
      // GSC 404 fixes
      {
        source: '/Free',
        destination: '/',
        permanent: true,
      },
      // Remove old Spanish page redirects (they don't exist anymore)
      {
        source: '/es/:path*',
        destination: '/',
        permanent: true,
        statusCode: 301,
      },
      // Redirect old /landing to homepage (app moved to /)
      {
        source: '/landing',
        destination: '/',
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
