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

export default function SEOMeta({ 
  title = 'Free Voice Productivity App | tickk - Speech Recognition Task Manager',
  description = 'Revolutionary free voice productivity app that transforms speech into organized tasks, notes, and calendar events using advanced natural language processing. ADHD-friendly with Focus Mode, Command Palette (⌘K), and executive function support. No login required, works completely offline, complete privacy protection. 99% accurate speech recognition.',
  image = '/og-image.webp',
  url,
  noIndex = false
}: SEOMetaProps) {
  const router = useRouter()
  const fullTitle = title.includes('tickk') ? title : `${title} | tickk`
  
  // Generate canonical URL - clean parameters and ensure consistency
  const canonicalUrl = url || getCleanUrl(router.asPath)
  
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
              url: `${canonicalUrl}${image}?${IMAGE_VERSION}`,
              width: 1200,
              height: 630,
              alt: 'tickk - Voice to Productivity App',
              type: 'image/webp',
            },
          ],
        }}
        twitter={{
          handle: '@TheTickkApp',
          site: '@TheTickkApp',
          cardType: 'summary_large_image',
        }}
        additionalMetaTags={[
          {
            name: 'keywords',
            content: 'free voice to text app, voice productivity software, speech recognition task manager, ADHD productivity app, neurodivergent productivity tools, ADHD voice assistant, executive function support app, ADHD task management, focus mode productivity, command palette app, voice controlled todo list, hands-free note taking, natural language processing productivity, speech to text organizer, voice command app, voice powered task management, free productivity tools, offline voice recognition, privacy focused voice app, voice note taking app, speech recognition productivity suite, voice driven workflow, hands-free productivity, voice activated organizer, voice task categorization, smart voice assistant, voice productivity dashboard, speech to action converter, voice based project management, voice transcription software, PWA voice app, progressive web app productivity, offline speech recognition, browser voice technology, no AI voice assistant, voice workflow automation, productivity analytics dashboard, streak tracking app, calendar export productivity, keyboard shortcuts productivity, ADHD friendly interface, executive function tools, focus productivity app, voice braindump method',
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
            content: `${url}/twitter-image.webp?${IMAGE_VERSION}`,
          },
        ]}
      />
    </>
  )
}
