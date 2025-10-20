import { NextRouter } from 'next/router'

/**
 * Generate canonical URL for SEO purposes
 * Handles parameters, trailing slashes, and ensures consistency
 */
export function generateCanonicalUrl(
  router: NextRouter,
  baseUrl: string = 'https://tickk.app'
): string {
  // Get the current pathname without parameters
  const pathname = router.asPath.split('?')[0].split('#')[0]
  
  // Remove trailing slash (except for root)
  const cleanPath = pathname === '/' ? '/' : pathname.replace(/\/$/, '')
  
  // Combine base URL with clean path
  return `${baseUrl}${cleanPath}`
}

/**
 * Check if current URL should be redirected to canonical version
 */
export function shouldRedirectToCanonical(router: NextRouter): boolean {
  const currentUrl = `${window.location.origin}${router.asPath}`
  const hasWww = currentUrl.includes('www.')
  const hasParameters = router.asPath.includes('?') || router.asPath.includes('#')
  const hasTrailingSlash = router.asPath !== '/' && router.asPath.endsWith('/')
  
  return hasWww || hasParameters || hasTrailingSlash
}

/**
 * Handle canonical redirect on client side
 */
export function handleCanonicalRedirect(router: NextRouter): void {
  if (typeof window === 'undefined') return
  
  const canonicalUrl = generateCanonicalUrl(router)
  
  if (shouldRedirectToCanonical(router)) {
    // Use replace to avoid adding to history
    window.history.replaceState(null, '', canonicalUrl)
  }
}

/**
 * Get clean URL for SEO meta tags
 */
export function getCleanUrl(path: string, baseUrl: string = 'https://tickk.app'): string {
  // Remove parameters and fragments
  const cleanPath = path.split('?')[0].split('#')[0]
  
  // Remove trailing slash (except for root)
  const finalPath = cleanPath === '/' ? '/' : cleanPath.replace(/\/$/, '')
  
  return `${baseUrl}${finalPath}`
}

/**
 * Enhanced canonical URL generation with parameter handling
 */
export const canonicalUtils = {
  generateCanonicalUrl,
  shouldRedirectToCanonical,
  handleCanonicalRedirect,
  getCleanUrl,
}

export default canonicalUtils