/**
 * ImportModal Component
 * Allows users to import their exported JSON data
 * Critical for multi-device usage and data restoration
 */

import { useState, useRef, useEffect } from 'react'
import { Upload, FileJson, AlertTriangle, CheckCircle2, X } from 'lucide-react'
import type { AppData } from '@/types/braindump'

interface ImportModalProps {
  isOpen: boolean
  onClose: () => void
  onImport: (data: AppData) => Promise<{ success: boolean; error?: string }>
}

export default function ImportModal({ isOpen, onClose, onImport }: ImportModalProps) {
  const [isDragging, setIsDragging] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [previewData, setPreviewData] = useState<AppData | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isImporting, setIsImporting] = useState(false)
  const [importSuccess, setImportSuccess] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Handle Escape key to close modal
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen && !isImporting) {
        onClose()
      }
    }

    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [isOpen, isImporting, onClose])

  if (!isOpen) return null

  const handleFileSelect = (file: File) => {
    setError(null)
    setSelectedFile(file)
    
    // Validate file type
    if (!file.name.endsWith('.json')) {
      setError('Please select a valid JSON file')
      setPreviewData(null)
      return
    }
    
    // Check file size (max 10MB to prevent browser crashes)
    const maxSize = 10 * 1024 * 1024 // 10MB in bytes
    if (file.size > maxSize) {
      setError('File is too large (max 10MB). Your export file might be corrupted.')
      setPreviewData(null)
      return
    }
    
    // Check if file is suspiciously small
    if (file.size < 50) {
      setError('File is too small to be a valid Tickk export')
      setPreviewData(null)
      return
    }

    // Read and parse file
    const reader = new FileReader()
    reader.onload = (e) => {
      try {
        const content = e.target?.result as string
        
        // Check if file is empty
        if (!content || content.trim().length === 0) {
          setError('File is empty')
          setPreviewData(null)
          return
        }
        
        // Try to parse JSON
        let data: AppData
        try {
          data = JSON.parse(content) as AppData
        } catch {
          setError('Invalid JSON format. Please check your file.')
          setPreviewData(null)
          return
        }
        
        // Validate it's a Tickk export
        if (!data.tasks && !data.notes && !data.braindump) {
          setError('This doesn\'t appear to be a valid Tickk export file')
          setPreviewData(null)
          return
        }
        
        // Check for required arrays (initialize if missing for backwards compatibility)
        if (!Array.isArray(data.tasks)) data.tasks = []
        if (!Array.isArray(data.notes)) data.notes = []
        if (!Array.isArray(data.braindump)) data.braindump = []
        
        // Validate at least some data exists
        const totalItems = data.tasks.length + data.notes.length + data.braindump.length
        if (totalItems === 0) {
          setError('Import file contains no data (0 items). Are you sure this is the correct file?')
          setPreviewData(null)
          return
        }
        
        // Basic item validation
        const allItems = [...data.tasks, ...data.notes, ...data.braindump]
        const invalidItems = allItems.filter(item => !item.id || !item.text || !item.timestamp)
        if (invalidItems.length > 0) {
          setError(`Found ${invalidItems.length} corrupted item(s). File may be damaged.`)
          setPreviewData(null)
          return
        }
        
        setPreviewData(data)
        setError(null)
      } catch (err) {
        console.error('Error reading file:', err)
        setError('Failed to read file. Please try again.')
        setPreviewData(null)
      }
    }
    
    reader.onerror = () => {
      setError('Failed to read file')
      setPreviewData(null)
    }
    
    reader.readAsText(file)
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    
    const file = e.dataTransfer.files[0]
    if (file) {
      handleFileSelect(file)
    }
  }

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      handleFileSelect(file)
    }
  }

  const handleImport = async () => {
    if (!previewData) return
    
    setIsImporting(true)
    setError(null)
    
    try {
      const result = await onImport(previewData)
      
      if (result.success) {
        setImportSuccess(true)
        setTimeout(() => {
          onClose()
          // Reset state
          setSelectedFile(null)
          setPreviewData(null)
          setImportSuccess(false)
        }, 2000)
      } else {
        setError(result.error || 'Import failed')
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Import failed')
    } finally {
      setIsImporting(false)
    }
  }

  const getTotalItems = (data: AppData | null) => {
    if (!data) return 0
    return (data.tasks?.length || 0) + (data.notes?.length || 0) + (data.braindump?.length || 0)
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-slate-700">
          <div className="flex items-center gap-3">
            <Upload className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-slate-100">
              Import Data
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5 text-gray-500 dark:text-slate-400" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Success Message */}
          {importSuccess && (
            <div className="mb-6 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-semibold text-green-900 dark:text-green-100">
                  Import successful!
                </p>
                <p className="text-sm text-green-700 dark:text-green-300 mt-1">
                  Your data has been imported. The page will reload shortly.
                </p>
              </div>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-600 dark:text-red-400 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-semibold text-red-900 dark:text-red-100">
                  Import failed
                </p>
                <p className="text-sm text-red-700 dark:text-red-300 mt-1">
                  {error}
                </p>
              </div>
            </div>
          )}

          {/* File Upload Area */}
          {!previewData && (
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={`border-2 border-dashed rounded-xl p-12 text-center transition-all ${
                isDragging
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                  : 'border-gray-300 dark:border-slate-600 hover:border-gray-400 dark:hover:border-slate-500'
              }`}
            >
              <FileJson className="w-16 h-16 mx-auto mb-4 text-gray-400 dark:text-slate-500" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-slate-100 mb-2">
                {isDragging ? 'Drop your file here' : 'Upload JSON Export'}
              </h3>
              <p className="text-gray-600 dark:text-slate-400 mb-4">
                Drag and drop your Tickk export file, or click to browse
              </p>
              <button
                onClick={() => fileInputRef.current?.click()}
                className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors"
              >
                Select File
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept=".json,application/json"
                onChange={handleFileInput}
                className="hidden"
              />
            </div>
          )}

          {/* Preview Data */}
          {previewData && !importSuccess && (
            <div className="space-y-4">
              <div className="bg-gray-50 dark:bg-slate-900 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 dark:text-slate-100 mb-3">
                  Preview: {selectedFile?.name}
                </h3>
                
                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div className="text-center p-3 bg-white dark:bg-slate-800 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                      {previewData.tasks?.length || 0}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-slate-400">Tasks</div>
                  </div>
                  
                  <div className="text-center p-3 bg-white dark:bg-slate-800 rounded-lg">
                    <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                      {previewData.notes?.length || 0}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-slate-400">Notes</div>
                  </div>
                  
                  <div className="text-center p-3 bg-white dark:bg-slate-800 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                      {previewData.braindump?.length || 0}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-slate-400">Braindump</div>
                  </div>
                </div>

                <div className="text-sm text-gray-600 dark:text-slate-400">
                  <p><strong>Total items:</strong> {getTotalItems(previewData)}</p>
                  {previewData.version && (
                    <p><strong>Export version:</strong> {previewData.version}</p>
                  )}
                </div>
              </div>

              {/* Warning */}
              <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-yellow-600 dark:text-yellow-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-yellow-900 dark:text-yellow-100 mb-1">
                      Warning: This will replace your current data
                    </p>
                    <p className="text-sm text-yellow-700 dark:text-yellow-300">
                      Your existing data will be automatically backed up to{' '}
                      <code className="bg-yellow-100 dark:bg-yellow-900/40 px-1 rounded text-xs">
                        tickk_import_backup
                      </code>{' '}
                      in localStorage before import. If something goes wrong, you can restore it from the browser console.
                    </p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 justify-end">
                <button
                  onClick={() => {
                    setSelectedFile(null)
                    setPreviewData(null)
                    setError(null)
                  }}
                  className="px-4 py-2 text-gray-700 dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
                  disabled={isImporting}
                >
                  Cancel
                </button>
                <button
                  onClick={handleImport}
                  disabled={isImporting}
                  className="px-6 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold rounded-lg transition-colors flex items-center gap-2"
                >
                  {isImporting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Importing...
                    </>
                  ) : (
                    <>
                      <Upload className="w-4 h-4" />
                      Import Data
                    </>
                  )}
                </button>
              </div>
            </div>
          )}

          {/* Help Text */}
          {!previewData && !importSuccess && (
            <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <p className="text-sm text-blue-900 dark:text-blue-100">
                <strong>💡 Tip:</strong> This feature allows you to transfer your data between devices or restore from a backup. 
                Export your data first from the export menu, then import it on another device.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
