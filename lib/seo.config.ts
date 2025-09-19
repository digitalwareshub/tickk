const defaultSEOConfig = {
  titleTemplate: '%s | OnePageOS - Free Voice Productivity App',
  defaultTitle: 'OnePageOS - Free Voice Productivity App with Speech Recognition',
  description: 'Revolutionary free voice productivity app that transforms speech into organized tasks, notes, and reminders using advanced natural language processing. No login required, complete privacy, works offline.',
  canonical: 'https://onepageos.com',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://onepageos.com',
    site_name: 'OnePageOS',
    title: 'OnePageOS - Free Voice Productivity App with Speech Recognition',
    description: 'Revolutionary free voice productivity app that transforms speech into organized tasks, notes, and reminders using advanced natural language processing.',
    images: [
      {
        url: 'https://onepageos.com/og-image.png',
        width: 1200,
        height: 630,
        alt: 'OnePageOS Voice Productivity App',
        type: 'image/png',
      },
      {
        url: 'https://onepageos.com/og-image-square.png',
        width: 1080,
        height: 1080,
        alt: 'OnePageOS Voice App Logo',
        type: 'image/png',
      },
    ],
  },
  twitter: {
    handle: '@onepageos',
    site: '@onepageos',
    cardType: 'summary_large_image',
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
      content: 'OnePageOS',
    },
    {
      name: 'application-name',
      content: 'OnePageOS',
    },
    {
      name: 'msapplication-TileColor',
      content: '#ea580c',
    },
    {
      name: 'msapplication-config',
      content: '/browserconfig.xml',
    },
    {
      name: 'theme-color',
      content: '#ea580c',
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
      content: 'OnePageOS Team',
    },
    {
      name: 'creator',
      content: 'OnePageOS',
    },
    {
      name: 'publisher',
      content: 'OnePageOS',
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
    {
      rel: 'mask-icon',
      href: '/safari-pinned-tab.svg',
      color: '#ea580c',
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
    // Canonical and alternate links
    {
      rel: 'canonical',
      href: 'https://onepageos.com',
    },
    {
      rel: 'alternate',
      type: 'application/rss+xml',
      title: 'OnePageOS Updates',
      href: 'https://onepageos.com/feed.xml',
    },
    // Search engines
    {
      rel: 'search',
      type: 'application/opensearchdescription+xml',
      title: 'OnePageOS',
      href: '/opensearch.xml',
    },
  ],
}

export default defaultSEOConfig
