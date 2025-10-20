import { NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl
  
  // List of tracking parameters to remove
  const trackingParams = [
    'utm_source',
    'utm_medium', 
    'utm_campaign',
    'utm_term',
    'utm_content',
    'ref',
    'source',
    'gclid',
    'fbclid',
    'msclkid',
    'twclid',
    '_gl',
    'mc_cid',
    'mc_eid',
    'productunti', // This specific parameter from the GSC error
  ]
  
  // Check if URL has any tracking parameters
  if (search) {
    const params = new URLSearchParams(search)
    let hasTrackingParams = false
    
    // Check for tracking parameters
    trackingParams.forEach(param => {
      if (params.has(param)) {
        hasTrackingParams = true
        params.delete(param)
      }
    })
    
    // If we found tracking parameters, redirect to clean URL
    if (hasTrackingParams) {
      const cleanUrl = new URL(request.url)
      cleanUrl.search = params.toString()
      
      // If no parameters left, remove the ? entirely
      if (!params.toString()) {
        cleanUrl.search = ''
      }
      
      return NextResponse.redirect(cleanUrl, 302) // Temporary redirect
    }
  }
  
  // Handle trailing slashes - redirect to non-trailing version
  if (pathname !== '/' && pathname.endsWith('/')) {
    const cleanUrl = new URL(request.url)
    cleanUrl.pathname = pathname.slice(0, -1)
    return NextResponse.redirect(cleanUrl, 301) // Permanent redirect
  }
  
  // Continue with the request
  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - robots.txt
     * - sitemap.xml
     * - manifest.json
     * - sw.js (service worker)
     * - Any file with an extension
     */
    '/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|manifest.json|sw.js|.*\\.).*)',
  ],
}