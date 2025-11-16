// Cache-busting version - increment when images change
const IMAGE_VERSION = 'v2';

const defaultSEOConfig = {
  titleTemplate: '%s | tickk - Free Voice Productivity App',
  defaultTitle: 'tickk - Free Voice Productivity App with Speech Recognition',
  description: 'Speak it. Save it. Sort it later. Voice-first brain dump → auto-organized into tasks & notes. Free, open-source, local storage.',
  canonical: 'https://tickk.app',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://tickk.app',
    site_name: 'tickk',
    title: 'tickk - Free Voice Productivity App with Speech Recognition',
    description: 'Speak it. Save it. Sort it later. Voice-first brain dump → auto-organized into tasks & notes. Free, open-source, local storage.',
    images: [
      {
        url: `https://tickk.app/og-image.webp?${IMAGE_VERSION}`,
        width: 1200,
        height: 630,
        alt: 'tickk Voice Productivity App',
        type: 'image/webp',
      },
    ],
  },
  twitter: {
    handle: '@TheTickkApp',
    site: '@TheTickkApp',
    cardType: 'summary_large_image',
    images: [`https://tickk.app/twitter-image.webp?${IMAGE_VERSION}`],
  },
  additionalMetaTags: [
    {
      name: 'viewport',
      content: 'width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=yes',
    },
    {
      name: 'apple-mobile-web-app-capable',
      content: 'yes',
    },
    {
      name: 'apple-mobile-web-app-status-bar-style',
      content: 'default',
    },
    {
      name: 'apple-mobile-web-app-title',
      content: 'tickk',
    },
    {
      name: 'application-name',
      content: 'tickk',
    },
    {
      name: 'msapplication-TileColor',
      content: '#16a34a',
    },
    {
      name: 'msapplication-config',
      content: '/browserconfig.xml',
    },
    {
      name: 'theme-color',
      content: '#16a34a',
    },
    {
      name: 'color-scheme',
      content: 'light dark',
    },
    // Additional SEO meta tags
    {
      name: 'keywords',
      content: 'free voice to text app, voice productivity software, speech recognition task manager, voice assistant, hands-free note taking, voice controlled todo list, natural language processing productivity, speech to text organizer, voice command app, voice powered task management, free productivity tools, offline voice recognition, privacy focused voice app, voice note taking app, speech recognition productivity suite, voice driven workflow, hands-free productivity, voice activated organizer, voice task categorization, smart voice assistant, voice productivity dashboard, speech to action converter, voice based project management, voice transcription software',
    },
    {
      name: 'author',
      content: 'tickk Team',
    },
    {
      name: 'creator',
      content: 'tickk',
    },
    {
      name: 'publisher',
      content: 'tickk',
    },
    {
      name: 'robots',
      content: 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1',
    },
    {
      name: 'googlebot',
      content: 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1',
    },
    {
      name: 'bingbot',
      content: 'index, follow',
    },
    {
      name: 'language',
      content: 'en-US',
    },
    {
      name: 'geo.region',
      content: 'US',
    },
    {
      name: 'geo.placename',
      content: 'United States',
    },
    {
      name: 'geo.position',
      content: '39.8282;-98.5795',
    },
    {
      name: 'ICBM',
      content: '39.8282, -98.5795',
    },
    {
      name: 'distribution',
      content: 'global',
    },
    {
      name: 'rating',
      content: 'general',
    },
    {
      name: 'referrer',
      content: 'strict-origin-when-cross-origin',
    },
    {
      name: 'format-detection',
      content: 'telephone=no, email=no',
    },
    // PWA related
    {
      name: 'mobile-web-app-capable',
      content: 'yes',
    },
    {
      name: 'apple-touch-fullscreen',
      content: 'yes',
    },
  ],
  additionalLinkTags: [
    {
      rel: 'icon',
      href: '/favicon.ico',
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '16x16',
      href: '/favicon-16x16.png',
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '32x32',
      href: '/favicon-32x32.png',
    },
    {
      rel: 'apple-touch-icon',
      sizes: '180x180',
      href: '/apple-touch-icon.png',
    },
    {
      rel: 'manifest',
      href: '/manifest.json',
    },

    // Preconnect to improve performance
    {
      rel: 'preconnect',
      href: 'https://cdnjs.cloudflare.com',
    },
    {
      rel: 'preconnect',
      href: 'https://cdn.jsdelivr.net',
    },
    {
      rel: 'preconnect',
      href: 'https://compromise.cool',
    },
    // DNS prefetch for external domains
    {
      rel: 'dns-prefetch',
      href: 'https://cdnjs.cloudflare.com',
    },
    {
      rel: 'dns-prefetch',
      href: 'https://cdn.jsdelivr.net',
    },
    {
      rel: 'dns-prefetch',
      href: 'https://compromise.cool',
    },
    // Alternate links
    {
      rel: 'alternate',
      type: 'application/rss+xml',
      title: 'tickk Updates',
      href: 'https://tickk.app/feed.xml',
    },
    // Search engines
    {
      rel: 'search',
      type: 'application/opensearchdescription+xml',
      title: 'tickk',
      href: '/opensearch.xml',
    },
  ],
}

export default defaultSEOConfig
