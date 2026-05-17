import { NextRequest, NextResponse } from 'next/server'

export function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl

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
    'productunti',
  ]

  if (search) {
    const params = new URLSearchParams(search)
    let hasTrackingParams = false

    trackingParams.forEach((param) => {
      if (params.has(param)) {
        hasTrackingParams = true
        params.delete(param)
      }
    })

    if (hasTrackingParams) {
      const cleanUrl = new URL(request.url)
      cleanUrl.search = params.toString()

      if (!params.toString()) {
        cleanUrl.search = ''
      }

      return NextResponse.redirect(cleanUrl, 301)
    }
  }

  if (pathname !== '/' && pathname.endsWith('/')) {
    const cleanUrl = new URL(request.url)
    cleanUrl.pathname = pathname.slice(0, -1)
    return NextResponse.redirect(cleanUrl, 301)
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|manifest.json|sw.js|.*\\.).*)',
  ],
}
