/**
 * ProcessBraindumpModal - Phase 2.3 Implementation
 * The magical processing modal that organizes braindump items
 */

import { useState, useEffect, useRef } from 'react'
import { VoiceClassifier } from '@/lib/classification/classifier'
import { StorageService } from '@/lib/storage/storage-service'
import { trackPageInteraction } from '@/lib/analytics'
import { logError } from '@/lib/logger'
import type { VoiceItem, Classification } from '@/types/braindump'

interface ProcessedItem extends VoiceItem {
  suggestedCategory: 'tasks' | 'notes'
  confidence: number
  classification: Classification
}

interface ProcessBraindumpModalProps {
  items: VoiceItem[]
  onClose: () => void
  onComplete: (organizedData: { tasks: VoiceItem[]; notes: VoiceItem[] }) => void
}

type ProcessingStage = 'processing' | 'review' | 'complete'

export default function ProcessBraindumpModal({ 
  items, 
  onClose, 
  onComplete 
}: ProcessBraindumpModalProps) {
  const [stage, setStage] = useState<ProcessingStage>('processing')
  const [currentIndex, setCurrentIndex] = useState(0)
  const [processed, setProcessed] = useState<ProcessedItem[]>([])
  const [isProcessing, setIsProcessing] = useState(false)
  
  const dialogRef = useRef<HTMLDivElement>(null)
  const classifier = VoiceClassifier.getInstance()
  const storageService = StorageService.getInstance()
  
  // Focus management
  useEffect(() => {
    if (dialogRef.current) {
      dialogRef.current.focus()
    }
  }, [])
  
  // Escape key handling
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClose()
      }
    }
    
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  
  // Start processing on mount
  useEffect(() => {
    processItems()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  
  /**
   * Process all braindump items with animation
   */
  const processItems = async () => {
    setIsProcessing(true)
    setStage('processing')
    
    try {
      const results: ProcessedItem[] = []
      
      // Process items one by one with animation delay
      for (let i = 0; i < items.length; i++) {
        setCurrentIndex(i)
        
        // Classify the item
        const classification = await classifier.classify(items[i].text)
        
        const processedItem: ProcessedItem = {
          ...items[i],
          suggestedCategory: classification.category,
          confidence: classification.confidence,
          classification,
          processed: false
        }
        
        results.push(processedItem)
        
        // Animation delay for better UX
        await new Promise(resolve => setTimeout(resolve, 300))
      }
      
      setProcessed(results)
      setStage('review')
      
      // Track processing completion
      trackPageInteraction('braindump_processing_complete', `${items.length}_items`)
      
    } catch (error) {
      logError('Processing failed', error, 'process-modal')
      // Could add error handling UI here
    } finally {
      setIsProcessing(false)
    }
  }
  
  /**
   * Handle category change for a specific item
   */
  const handleCategoryChange = (itemId: string, newCategory: 'tasks' | 'notes') => {
    setProcessed(prev => prev.map(item => 
      item.id === itemId 
        ? { ...item, suggestedCategory: newCategory }
        : item
    ))
    
    trackPageInteraction('category_manually_changed', newCategory)
  }
  
  /**
   * Apply the organization and complete the process
   */
  const applyOrganization = async () => {
    setStage('complete')
    
    try {
      // Separate into tasks and notes
      const tasks = processed.filter(item => item.suggestedCategory === 'tasks')
      const notes = processed.filter(item => item.suggestedCategory === 'notes')
      
      // Mark original items as processed
      const updatedBraindumpItems = items.map(item => ({
        ...item,
        processed: true
      }))
      
      // Save to storage
      await storageService.processBraindumpItems(updatedBraindumpItems)
      
      // Track successful organization
      trackPageInteraction('braindump_organization_applied', `${tasks.length}_tasks_${notes.length}_notes`)
      
      // Return organized data to parent
      setTimeout(() => {
        onComplete({ tasks, notes })
      }, 2000) // Show success state for 2 seconds
      
    } catch (error) {
      logError('Failed to apply organization', error, 'process-modal')
      // Could add error handling UI
    }
  }
  
  /**
   * Handle modal close
   */
  const handleClose = () => {
    if (stage === 'processing' && isProcessing) {
      // Don't allow closing while processing
      return
    }
    
    trackPageInteraction('braindump_processing_cancelled', stage)
    onClose()
  }
  
  /**
   * Re-process items (if user wants to try again)
   */
  const reProcess = () => {
    setCurrentIndex(0)
    setProcessed([])
    processItems()
  }
  
  // Calculate stats for display
  const taskCount = processed.filter(item => item.suggestedCategory === 'tasks').length
  const noteCount = processed.filter(item => item.suggestedCategory === 'notes').length
  const averageConfidence = processed.length > 0 
    ? processed.reduce((sum, item) => sum + item.confidence, 0) / processed.length 
    : 0
  
  return (
    <div className="fixed inset-0 bg-black/20 flex items-center justify-center z-50 p-4">
      <div 
        ref={dialogRef}
        tabIndex={-1}
        className="bg-white border border-gray-200 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        {/* Header */}
        <div className="flex-shrink-0 p-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 id="modal-title" className="text-lg font-semibold text-gray-900">
              {stage === 'processing' && 'Organizing...'}
              {stage === 'review' && 'Review & Adjust'}
              {stage === 'complete' && 'Complete'}
            </h2>
            
            {stage !== 'processing' && (
              <button
                onClick={handleClose}
                className="text-gray-400 hover:text-gray-600 transition-colors"
                aria-label="Close dialog"
              >
                <span className="text-lg">×</span>
              </button>
            )}
          </div>
        </div>
        
        {/* Content */}
        <div className="flex-1 p-4 sm:p-6 overflow-y-auto min-h-0">
          {stage === 'processing' && (
            <div className="text-center py-8">
              {/* Processing Animation */}
              <div className="mb-8">
                <div className="text-4xl mb-4">⏳</div>
                <div className="text-lg text-gray-600 mb-6">
                  Analyzing and categorizing your thoughts...
                </div>
              </div>
              
              {/* Progress Bar */}
              <div className="max-w-md mx-auto mb-6">
                <div className="bg-gray-200 rounded-full h-4 overflow-hidden mb-2">
                  <div 
                    className="bg-gray-600 h-full transition-all duration-300 ease-out"
                    style={{ width: `${((currentIndex + 1) / items.length) * 100}%` }}
                  />
                </div>
                <div className="text-sm text-gray-500">
                  {currentIndex + 1} of {items.length} items
                </div>
              </div>
              
              {/* Current Item Being Processed */}
              {items[currentIndex] && (
                <div className="bg-gray-50 rounded-lg p-4 max-w-md mx-auto">
                  <div className="text-sm text-gray-500 mb-1">
                    Processing:
                  </div>
                  <div className="font-medium text-gray-900">
                    &quot;{items[currentIndex].text.slice(0, 100)}{items[currentIndex].text.length > 100 ? '...' : ''}&quot;
                  </div>
                </div>
              )}
            </div>
          )}
          
          {stage === 'review' && (
            <div>
              {/* Stats Summary */}
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="bg-gray-50 rounded-lg p-4 text-center border border-gray-200">
                  <div className="text-3xl mb-2">📋</div>
                  <div className="text-2xl font-bold text-gray-700">
                    {taskCount}
                  </div>
                  <div className="text-sm text-gray-600">Tasks</div>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-4 text-center border border-gray-200">
                  <div className="text-3xl mb-2">📝</div>
                  <div className="text-2xl font-bold text-gray-700">
                    {noteCount}
                  </div>
                  <div className="text-sm text-gray-600">Notes</div>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-4 text-center border border-gray-200">
                  <div className="text-3xl mb-2">🎯</div>
                  <div className="text-2xl font-bold text-gray-700">
                    {Math.round(averageConfidence * 100)}%
                  </div>
                  <div className="text-sm text-gray-600">Confidence</div>
                </div>
              </div>
              
              {/* Review Items */}
              <div className="space-y-3 mb-6">
                {processed.map((item) => (
                  <ReviewItem 
                    key={item.id}
                    item={item}
                    onCategoryChange={handleCategoryChange}
                  />
                ))}
              </div>
            </div>
          )}
          
          {stage === 'complete' && (
            <div className="text-center py-8">
              <div className="text-6xl mb-6">🎉</div>
              <h3 className="text-3xl font-bold mb-4 text-gray-900 ">
                Perfect! All Organized
              </h3>
              <p className="text-lg text-gray-600  mb-6">
                Your {items.length} thoughts have been organized into {taskCount} tasks and {noteCount} notes.
              </p>
              
              <div className="bg-green-50 rounded-lg p-4 mb-6 border border-green-200">
                <p className="text-sm text-green-800">
                  ✅ Items saved successfully<br/>
                  🔄 Taking you to your organized workspace...
                </p>
              </div>
            </div>
          )}
        </div>
        
        {/* Footer Actions */}
        {stage === 'review' && (
          <div className="flex-shrink-0 p-4 sm:p-6 border-t border-gray-200 bg-gray-50">
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <button
                onClick={applyOrganization}
                className="flex-1 px-4 sm:px-6 py-3 bg-black text-white rounded-lg font-semibold hover:bg-gray-800 transition-all text-sm sm:text-base"
              >
                ✅ Apply Organization
              </button>
              
              <button
                onClick={reProcess}
                className="px-4 sm:px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm sm:text-base"
              >
                🔄 Re-process
              </button>
              
              <button
                onClick={handleClose}
                className="px-4 sm:px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm sm:text-base"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

/**
 * Review Item Component for individual item category adjustment
 */
interface ReviewItemProps {
  item: ProcessedItem
  onCategoryChange: (itemId: string, category: 'tasks' | 'notes') => void
}

function ReviewItem({ item, onCategoryChange }: ReviewItemProps) {
  const [category, setCategory] = useState(item.suggestedCategory)
  
  const handleCategoryChange = (newCategory: 'tasks' | 'notes') => {
    setCategory(newCategory)
    onCategoryChange(item.id, newCategory)
  }
  
  return (
    <div className={`
      p-4 rounded-lg border-2 transition-all
      ${category === 'tasks' 
        ? 'border-gray-300 bg-gray-50' 
        : 'border-gray-300 bg-gray-50'}
    `}>
      <div className="flex items-start gap-4">
        {/* Item Content */}
        <div className="flex-1">
          <p className="text-gray-800 font-medium mb-2">
            &quot;{item.text}&quot;
          </p>
          
          {/* Confidence Indicator */}
          <div className="mb-3">
            <div className="text-xs text-gray-500 mb-1">
              Confidence: {Math.round(item.confidence * 100)}%
            </div>
            <div className="w-full bg-gray-200  rounded-full h-1">
              <div 
                className="bg-gradient-to-r from-purple-600 to-blue-600 h-1 rounded-full transition-all"
                style={{ width: `${item.confidence * 100}%` }}
              />
            </div>
          </div>
          
          {/* Task Metadata */}
          {category === 'tasks' && item.classification.metadata && (
            <div className="flex gap-2 text-xs mb-2">
              {item.classification.metadata.hasDate && (
                <span className="px-2 py-1 bg-gray-100 border border-gray-200 rounded-full">
                  📅 {item.classification.metadata.dateInfo}
                </span>
              )}
              {item.classification.metadata.urgency && item.classification.metadata.urgency !== 'none' && (
                <span className="px-2 py-1 bg-gray-100 border border-gray-200 rounded-full">
                  ⚡ {item.classification.metadata.urgency}
                </span>
              )}
            </div>
          )}
          
          {/* Classification Reasoning */}
          <div className="text-xs text-gray-500 ">
            {item.classification.reasoning}
          </div>
        </div>
        
        {/* Category Toggle */}
        <div className="flex gap-2">
          <button
            onClick={() => handleCategoryChange('tasks')}
            className={`
              px-3 py-2 rounded-lg transition-all text-sm font-medium
              ${category === 'tasks' 
                ? 'bg-gray-800 text-white' 
                : 'bg-gray-200 text-gray-600 hover:bg-gray-300'}
            `}
          >
            📋 Task
          </button>
          
          <button
            onClick={() => handleCategoryChange('notes')}
            className={`
              px-3 py-2 rounded-lg transition-all text-sm font-medium
              ${category === 'notes' 
                ? 'bg-gray-800 text-white' 
                : 'bg-gray-200 text-gray-600 hover:bg-gray-300'}
            `}
          >
            📝 Note
          </button>
        </div>
      </div>
    </div>
  )
}
