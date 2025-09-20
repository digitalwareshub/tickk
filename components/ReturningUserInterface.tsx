/**
 * ReturningUserInterface - Rich interface for users with existing data
 * Provides a professional, polished experience for returning users
 */

import Link from 'next/link'

interface ReturningUserInterfaceProps {
  totalItems: number
  onModeChange?: (mode: 'braindump' | 'organized') => void
}

export default function ReturningUserInterface({ totalItems, onModeChange }: ReturningUserInterfaceProps) {
  // Click handlers for quick actions
  const handleRecordNew = () => {
    // Scroll to the recording interface (it's below this component)
    const recordingSection = document.querySelector('[data-recording-interface]');
    if (recordingSection) {
      recordingSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleReviewItems = () => {
    // Switch to Organized mode to review content
    if (onModeChange) {
      onModeChange('organized');
    }
  };

  const handleViewProgress = () => {
    // Switch to Organized mode to view stats and progress
    if (onModeChange) {
      onModeChange('organized');
      // Optional: scroll to analytics section after mode change
      setTimeout(() => {
        const analyticsSection = document.querySelector('[data-analytics]');
        if (analyticsSection) {
          analyticsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    }
  };

  return (
    <div className="returning-user-interface">
      {/* Welcome Back Context Bar */}
      <div className="context-bar bg-gray-50 border-b border-gray-200">
        <div className="max-w-4xl mx-auto text-center py-6 px-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Welcome back to tickk
          </h1>
          <p className="text-gray-600 text-sm mb-4">
            Ready to capture more thoughts? You have {totalItems} item{totalItems !== 1 ? 's' : ''} in your workspace.
          </p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="quick-actions py-8">
        <div className="max-w-2xl mx-auto text-center px-4">
          <p className="text-gray-600 text-sm mb-6">
            Continue where you left off:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div 
              onClick={handleRecordNew}
              className="bg-white border border-gray-200 rounded-lg p-4 hover:border-orange-300 hover:shadow-md transition-all cursor-pointer"
            >
              <div className="text-orange-500 text-xl mb-2">🎤</div>
              <h3 className="font-medium text-gray-900 mb-1">Record New</h3>
              <p className="text-xs text-gray-600">Capture fresh thoughts</p>
            </div>
            <div 
              onClick={handleReviewItems}
              className="bg-white border border-gray-200 rounded-lg p-4 hover:border-orange-300 hover:shadow-md transition-all cursor-pointer"
            >
              <div className="text-orange-500 text-xl mb-2">📋</div>
              <h3 className="font-medium text-gray-900 mb-1">Review Items</h3>
              <p className="text-xs text-gray-600">Organize your content</p>
            </div>
            <div 
              onClick={handleViewProgress}
              className="bg-white border border-gray-200 rounded-lg p-4 hover:border-orange-300 hover:shadow-md transition-all cursor-pointer"
            >
              <div className="text-orange-500 text-xl mb-2">📊</div>
              <h3 className="font-medium text-gray-900 mb-1">View Progress</h3>
              <p className="text-xs text-gray-600">See your productivity</p>
            </div>
            <Link href="/blog" className="bg-white border border-gray-200 rounded-lg p-4 hover:border-orange-300 hover:shadow-md transition-all block">
              <div className="text-orange-500 text-xl mb-2">📖</div>
              <h3 className="font-medium text-gray-900 mb-1">Learn More</h3>
              <p className="text-xs text-gray-600">Voice productivity tips</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
