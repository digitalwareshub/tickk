"use client";

import Script from 'next/script';
import { useEffect } from 'react';

export default function ClarityAnalytics() {
  const CLARITY_ID = 'u7ajuzfsvx';

  useEffect(() => {
    // Debug: Check if Clarity loaded
    const checkClarity = setInterval(() => {
      if (typeof window !== 'undefined' && (window as Window & { clarity?: unknown }).clarity) {
        console.log('✅ Microsoft Clarity loaded successfully');
        console.log('Clarity ID:', CLARITY_ID);
        clearInterval(checkClarity);
      }
    }, 1000);

    // Cleanup after 10 seconds
    setTimeout(() => clearInterval(checkClarity), 10000);

    return () => clearInterval(checkClarity);
  }, [CLARITY_ID]);

  return (
    <Script 
      id="microsoft-clarity" 
      strategy="afterInteractive"
      onLoad={() => console.log('Clarity script loaded')}
      onError={() => console.error('Clarity script failed to load')}
    >
      {`
        (function(c,l,a,r,i,t,y){
          c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
          t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
          y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
        })(window, document, "clarity", "script", "${CLARITY_ID}");
      `}
    </Script>
  );
}
