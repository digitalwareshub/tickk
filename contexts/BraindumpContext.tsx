/**
 * BraindumpContext
 * Context provider for BraindumpInterface to eliminate prop drilling
 */

import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react'
import type { AppData, UserPreferences } from '@/types/braindump'

// Context types
interface BraindumpContextType {
  // Data
  appData: AppData
  preferences: UserPreferences | null
  
  // Actions
  updateData: (data: AppData) => void
  
  // Recording state
  isRecording: boolean
  setRecordingState: (isRecording: boolean) => void
  
  // Recording controls
  recordingControls: {
    startRecording: () => void
    stopRecording: () => void
    canProcess: boolean
    processItems: () => void
  } | null
  setRecordingControls: (controls: {
    startRecording: () => void
    stopRecording: () => void
    canProcess: boolean
    processItems: () => void
  }) => void
  
  // Recording status
  recordingStatus: {
    transcript?: string
    error?: string | null
    isSupported?: boolean
  } | null
  updateRecordingStatus: (status: {
    transcript?: string
    error?: string | null
    isSupported?: boolean
  }) => void
  
  // Mode switching
  currentMode: 'braindump' | 'organized'
  switchMode: (mode: 'braindump' | 'organized') => void
  
  // Interface visibility
  showMainInterface: boolean
  setShowMainInterface: (show: boolean) => void
}

// Create context
const BraindumpContext = createContext<BraindumpContextType | undefined>(undefined)

// Provider props
interface BraindumpProviderProps {
  children: ReactNode
  initialAppData: AppData
  initialPreferences: UserPreferences | null
  onDataUpdate: (data: AppData) => void
  onRecordingStateChange?: (isRecording: boolean) => void
  onRecordingControls?: (controls: {
    startRecording: () => void
    stopRecording: () => void
    canProcess: boolean
    processItems: () => void
  }) => void
  onRecordingStatusUpdate?: (status: {
    transcript?: string
    error?: string | null
    isSupported?: boolean
  }) => void
  onModeSwitch?: (mode: 'braindump' | 'organized') => void
  showMainInterface?: boolean
}

// Provider component
export function BraindumpProvider({
  children,
  initialAppData,
  initialPreferences,
  onDataUpdate,
  onRecordingStateChange,
  onRecordingControls,
  onRecordingStatusUpdate,
  onModeSwitch,
  showMainInterface = true
}: BraindumpProviderProps) {
  // State
  const [appData, setAppData] = useState<AppData>(initialAppData)
  const [preferences] = useState<UserPreferences | null>(initialPreferences)
  const [isRecording, setIsRecording] = useState(false)
  const [recordingControls, setRecordingControls] = useState<{
    startRecording: () => void
    stopRecording: () => void
    canProcess: boolean
    processItems: () => void
  } | null>(null)
  const [recordingStatus, setRecordingStatus] = useState<{
    transcript?: string
    error?: string | null
    isSupported?: boolean
  } | null>(null)
  const [currentMode, setCurrentMode] = useState<'braindump' | 'organized'>('braindump')
  const [showMainInterfaceState, setShowMainInterfaceState] = useState(showMainInterface)

  // Actions
  const updateData = useCallback((data: AppData) => {
    setAppData(data)
    onDataUpdate(data)
  }, [onDataUpdate])

  const setRecordingState = useCallback((recording: boolean) => {
    setIsRecording(recording)
    onRecordingStateChange?.(recording)
  }, [onRecordingStateChange])

  const setRecordingControlsCallback = useCallback((controls: {
    startRecording: () => void
    stopRecording: () => void
    canProcess: boolean
    processItems: () => void
  }) => {
    setRecordingControls(controls)
    onRecordingControls?.(controls)
  }, [onRecordingControls])

  const updateRecordingStatus = useCallback((status: {
    transcript?: string
    error?: string | null
    isSupported?: boolean
  }) => {
    setRecordingStatus(status)
    onRecordingStatusUpdate?.(status)
  }, [onRecordingStatusUpdate])

  const switchMode = useCallback((mode: 'braindump' | 'organized') => {
    setCurrentMode(mode)
    onModeSwitch?.(mode)
  }, [onModeSwitch])

  const setShowMainInterface = useCallback((show: boolean) => {
    setShowMainInterfaceState(show)
  }, [])

  // Context value
  const contextValue: BraindumpContextType = {
    // Data
    appData,
    preferences,
    
    // Actions
    updateData,
    
    // Recording state
    isRecording,
    setRecordingState,
    
    // Recording controls
    recordingControls,
    setRecordingControls: setRecordingControlsCallback,
    
    // Recording status
    recordingStatus,
    updateRecordingStatus,
    
    // Mode switching
    currentMode,
    switchMode,
    
    // Interface visibility
    showMainInterface: showMainInterfaceState,
    setShowMainInterface
  }

  return (
    <BraindumpContext.Provider value={contextValue}>
      {children}
    </BraindumpContext.Provider>
  )
}

// Hook to use the context
export function useBraindump(): BraindumpContextType {
  const context = useContext(BraindumpContext)
  if (context === undefined) {
    throw new Error('useBraindump must be used within a BraindumpProvider')
  }
  return context
}

// Export context for advanced usage
export { BraindumpContext }
