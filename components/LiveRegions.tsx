/**
 * Live Regions Component
 * Provides ARIA live regions for screen reader announcements
 */

export default function LiveRegions() {
  return (
    <>
      {/* Polite announcements (non-critical updates) */}
      <div 
        role="status" 
        aria-live="polite" 
        aria-atomic="true" 
        className="sr-only"
        id="live-polite"
      />
      
      {/* Assertive announcements (critical updates) */}
      <div 
        role="alert" 
        aria-live="assertive" 
        aria-atomic="true" 
        className="sr-only"
        id="live-assertive"
      />
      
      {/* Recording status (continuous updates) */}
      <div 
        role="status"
        aria-live="polite"
        aria-relevant="additions text"
        className="sr-only"
        id="recording-status"
      />
      
      {/* Processing status */}
      <div
        role="progressbar"
        aria-live="polite"
        aria-label="Processing progress"
        className="sr-only"
        id="processing-progress"
      />
    </>
  )
}
