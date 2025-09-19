import Head from 'next/head'
import { NextSeo } from 'next-seo'

interface SEOMetaProps {
  title?: string
  description?: string
  image?: string
  url?: string
}

export default function SEOMeta({ 
  title = 'OnePageOS - Transform Voice into Organized Tasks',
  description = 'A privacy-first voice-to-productivity app that converts your speech into organized tasks, notes, and calendar events. Works offline, stores data locally, and keeps your information private.',
  image = '/og-image.svg',
  url = 'https://onepageos.com'
}: SEOMetaProps) {
  const fullTitle = title.includes('OnePageOS') ? title : `${title} | OnePageOS`
  
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
        
        {/* Preload critical assets */}
        <link rel="preload" href="/icon.svg" as="image" type="image/svg+xml" />
      </Head>
      
      <NextSeo
        title={fullTitle}
        description={description}
        canonical={url}
        openGraph={{
          type: 'website',
          locale: 'en_US',
          url: url,
          site_name: 'OnePageOS',
          title: fullTitle,
          description: description,
          images: [
            {
              url: `${url}${image}`,
              width: 1200,
              height: 630,
              alt: 'OnePageOS - Voice to Productivity App',
              type: 'image/svg+xml',
            },
          ],
        }}
        twitter={{
          handle: '@onepageos',
          site: '@onepageos',
          cardType: 'summary_large_image',
        }}
        additionalMetaTags={[
          {
            name: 'keywords',
            content: 'voice recognition, productivity app, task management, note taking, calendar, privacy, offline, voice to text, speech recognition, personal productivity',
          },
          {
            name: 'author',
            content: 'OnePageOS Team',
          },
          {
            name: 'viewport',
            content: 'width=device-width, initial-scale=1',
          },
          {
            name: 'application-name',
            content: 'OnePageOS',
          },
          {
            name: 'apple-mobile-web-app-title',
            content: 'OnePageOS',
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
        ]}
      />
    </>
  )
}
