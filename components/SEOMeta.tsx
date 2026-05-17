import Head from 'next/head'
import { NextSeo } from 'next-seo'
import { useRouter } from 'next/router'
import { getCleanUrl } from '@/lib/canonical'

interface SEOMetaProps {
  title?: string
  description?: string
  image?: string
  url?: string
  noIndex?: boolean
}

// Cache-busting version for images
const IMAGE_VERSION = 'v2';
const SITE_URL = 'https://tickk.app'

function absoluteUrl(pathOrUrl: string, baseUrl = SITE_URL): string {
  if (/^https?:\/\//i.test(pathOrUrl)) {
    return pathOrUrl
  }

  const normalizedPath = pathOrUrl.startsWith('/') ? pathOrUrl : `/${pathOrUrl}`
  return `${baseUrl}${normalizedPath}`
}

export default function SEOMeta({ 
  title = 'Tickk - Private Voice Brain Dump App',
  description = 'Tickk turns messy spoken thoughts into tasks and notes in your browser. No account required, local storage, and installable as a PWA.',
  image = '/og-image.webp',
  url,
  noIndex = false
}: SEOMetaProps) {
  const router = useRouter()
  const fullTitle = title.includes('tickk') ? title : `${title} | tickk`
  
  // Generate canonical URL - clean parameters and ensure consistency
  const canonicalUrl = url || getCleanUrl(router.asPath)
  const imageUrl = absoluteUrl(image)
  const twitterImageUrl = absoluteUrl('/twitter-image.webp')
  
  return (
    <>
      <Head>
        {/* Primary Favicon */}
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="icon" href="/favicon.ico" type="image/x-icon" sizes="any" />
        
        {/* Apple Touch Icons */}
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon-180x180.png" />
        
        {/* Android Chrome Icons */}
        <link rel="icon" type="image/png" sizes="192x192" href="/android-chrome-192x192.png" />
        <link rel="icon" type="image/png" sizes="512x512" href="/android-chrome-512x512.png" />
        
        {/* Standard Favicon Sizes */}
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        
        {/* Web App Manifest */}
        <link rel="manifest" href="/manifest.json" />
        
        {/* Theme Color */}
        <meta name="theme-color" content="#f97316" />
        <meta name="msapplication-TileColor" content="#f97316" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
        
        {/* RSS Feed */}
        <link rel="alternate" type="application/rss+xml" title="tickk Blog RSS Feed" href="/feed.xml" />
        
        {/* Preload critical assets */}
        <link rel="preload" href="/icon.svg" as="image" type="image/svg+xml" />
      </Head>
      
      <NextSeo
        title={fullTitle}
        description={description}
        canonical={canonicalUrl}
        noindex={noIndex}
        nofollow={noIndex}
        openGraph={{
          type: 'website',
          locale: 'en_US',
          url: canonicalUrl,
          site_name: 'tickk',
          title: fullTitle,
          description: description,
          images: [
            {
              url: `${imageUrl}?${IMAGE_VERSION}`,
              width: 1200,
              height: 630,
              alt: 'Tickk - private voice brain dump app',
              type: 'image/webp',
            },
          ],
        }}
        twitter={{
          handle: '@tickkdotapp',
          site: '@tickkdotapp',
          cardType: 'summary_large_image',
        }}
        additionalMetaTags={[
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
            content: noIndex
              ? 'noindex, nofollow'
              : 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1',
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
            name: 'distribution',
            content: 'global',
          },
          {
            name: 'rating',
            content: 'general',
          },
          {
            name: 'category',
            content: 'productivity, software, voice technology',
          },
          {
            name: 'classification',
            content: 'productivity software, voice recognition, voice assistant',
          },
          {
            name: 'application-name',
            content: 'tickk',
          },
          {
            name: 'apple-mobile-web-app-title',
            content: 'tickk',
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
            name: 'format-detection',
            content: 'telephone=no',
          },
          // Twitter Card Image
          {
            name: 'twitter:image',
            content: `${twitterImageUrl}?${IMAGE_VERSION}`,
          },
        ]}
      />
    </>
  )
}
