import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { DefaultSeo } from 'next-seo'
import defaultSEOConfig from '@/lib/seo.config'
import Head from 'next/head'
import Script from 'next/script'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { trackPageView } from '@/lib/analytics/enhanced-analytics'
import { LanguageProvider } from '@/contexts/LanguageContext'

// Get GA tracking ID from environment
const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter()

  useEffect(() => {
    // Enhanced analytics will auto-initialize
    const handleRouteChange = (url: string) => {
      trackPageView(url)
    }
    
    router.events.on('routeChangeComplete', handleRouteChange)
    router.events.on('hashChangeComplete', handleRouteChange)
    
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
      router.events.off('hashChangeComplete', handleRouteChange)
    }
  }, [router.events])
  return (
    <>
      <DefaultSeo {...defaultSEOConfig} />
      
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=yes" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#16a34a" />
        
        {/* Preload social media images to prevent flickering */}
        <link rel="preload" as="image" href="/og-image.png" />
        <link rel="preload" as="image" href="/twitter-image.png" />
        
        {/* Preconnect to external domains for performance */}
        <link rel="preconnect" href="https://cdnjs.cloudflare.com" />
        <link rel="preconnect" href="https://cdn.jsdelivr.net" />
        <link rel="preconnect" href="https://compromise.cool" />
        
        {/* DNS prefetch for external domains */}
        <link rel="dns-prefetch" href="https://cdnjs.cloudflare.com" />
        <link rel="dns-prefetch" href="https://cdn.jsdelivr.net" />
        <link rel="dns-prefetch" href="https://compromise.cool" />

        {/* Google Analytics - moved to next/script */}
      </Head>
      
      {/* Google Analytics with next/script */}
      {GA_TRACKING_ID && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
            strategy="afterInteractive"
          />
          <Script id="gtag-init" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_TRACKING_ID}', {
                page_path: window.location.pathname,
                anonymize_ip: true,
                cookie_flags: 'SameSite=None;Secure'
              });
            `}
          </Script>
        </>
      )}

      {/* Hotjar Tracking Code for https://tickk.app */}
      <Script id="hotjar-init" strategy="afterInteractive">
        {`
          (function(h,o,t,j,a,r){
            h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
            h._hjSettings={hjid:6534546,hjsv:6};
            a=o.getElementsByTagName('head')[0];
            r=o.createElement('script');r.async=1;
            r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
            a.appendChild(r);
          })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
        `}
      </Script>
      
      <LanguageProvider>
        <Component {...pageProps} />
      </LanguageProvider>

      {/* Vercel Analytics */}
      <Analytics />
      <SpeedInsights />

      {/* Service Worker Registration for PWA */}
      <script
        dangerouslySetInnerHTML={{
          __html: `
            if ('serviceWorker' in navigator) {
              window.addEventListener('load', () => {
                navigator.serviceWorker.register('/sw.js')
                  .then(registration => {
                    console.log('SW registered: ', registration);
                  })
                  .catch(registrationError => {
                    console.log('SW registration failed: ', registrationError);
                  });
              });
            }
          `,
        }}
      />

      {/* Error boundary and performance monitoring */}
      <script
        dangerouslySetInnerHTML={{
          __html: `
            // Global error handling
            window.addEventListener('error', (event) => {
              console.error('Global error:', event.error);
            });
            
            window.addEventListener('unhandledrejection', (event) => {
              console.error('Unhandled promise rejection:', event.reason);
            });

            // Performance monitoring (Web Vitals)
            if ('PerformanceObserver' in window) {
              try {
                const observer = new PerformanceObserver((list) => {
                  const entries = list.getEntries();
                  entries.forEach((entry) => {
                    if (entry.entryType === 'largest-contentful-paint') {
                      console.log('LCP:', entry.startTime);
                    }
                    if (entry.entryType === 'first-input') {
                      console.log('FID:', entry.processingStart - entry.startTime);
                    }
                    if (entry.entryType === 'layout-shift') {
                      if (!entry.hadRecentInput) {
                        console.log('CLS:', entry.value);
                      }
                    }
                  });
                });
                
                observer.observe({ entryTypes: ['largest-contentful-paint', 'first-input', 'layout-shift'] });
              } catch (e) {
                // Performance Observer not supported
              }
            }
          `,
        }}
      />
    </>
  )
}
