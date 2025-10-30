/**
 * Device Detection Utilities
 * For determining mobile vs desktop behavior
 */

import { useState, useEffect } from 'react'

/**
 * Hook to detect if device is mobile based on screen size and touch capability
 */
export function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkIsMobile = () => {
      // Check for touch capability and screen size
      const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0
      const isSmallScreen = window.innerWidth < 768 // Tailwind md breakpoint
      
      // Consider mobile if has touch AND small screen, or just very small screen
      setIsMobile((hasTouch && isSmallScreen) || window.innerWidth < 640)
    }

    // Check on mount
    checkIsMobile()

    // Listen for resize
    window.addEventListener('resize', checkIsMobile)
    
    return () => window.removeEventListener('resize', checkIsMobile)
  }, [])

  return isMobile
}

/**
 * Simple function to check if device likely has hover capability
 */
export function hasHoverCapability(): boolean {
  if (typeof window === 'undefined') return false
  
  // Check for hover media query support
  return window.matchMedia('(hover: hover)').matches
}