/**
 * Mind Map Page
 * Standalone page for visualizing tasks and notes over time
 */

import { useState, useEffect } from 'react'
import Head from 'next/head'
import Layout from '@/components/Layout'
import MindMapView from '@/components/MindMapView'
import BugReportModal from '@/components/BugReportModal'
import type { AppData } from '@/types/braindump'
import { StorageService } from '@/lib/storage/storage-service'

export default function MindMapPage() {
  const [appData, setAppData] = useState<AppData | null>(null)
  const [loading, setLoading] = useState(true)
  const [storageService] = useState(() => StorageService.getInstance())
  const [isBugReportOpen, setIsBugReportOpen] = useState(false)

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await storageService.getAllData()
        console.log('Loaded data:', data)
        
        if (!data) {
          console.log('No data found, using fallback')
          setAppData({
            version: '1.0.0',
            tasks: [],
            notes: [],
            braindump: [],
            sessions: []
          })
        } else {
          setAppData(data)
        }
      } catch (error) {
        console.error('Failed to load data:', error)
        setAppData({
          version: '1.0.0',
          tasks: [],
          notes: [],
          braindump: [],
          sessions: []
        })
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [storageService])

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-800 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-slate-400">Loading your data...</p>
        </div>
      </div>
    )
  }

  if (!appData) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-800 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 dark:text-red-400 text-xl mb-4">Failed to load data</p>
          <p className="text-gray-600 dark:text-slate-400">Check the browser console for details</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-4 px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600"
          >
            Retry
          </button>
        </div>
      </div>
    )
  }

  return (
    <>
      <Head>
        <title>Mind Map - Visualize Your Productivity | tickk</title>
        <meta name="description" content="Visualize your tasks and notes over time with an interactive mind map. See patterns, track progress, and understand your productivity journey." />
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      <Layout className="min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-800">
        {/* Hero Section */}
        <section className="py-8 px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-slate-50 mb-2 flex items-center justify-center gap-3">
                <span>🧠 <span className="text-orange-600 dark:text-orange-400">Mind</span> Map</span>
                <span className="text-sm bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-300 px-3 py-1 rounded-full font-medium">
                  BETA
                </span>
              </h1>
              <p className="text-gray-600 dark:text-slate-400 mb-3">
                Visualize your productivity journey over time. {appData.tasks.length} tasks • {appData.notes.length} notes
              </p>
              <button
                onClick={() => setIsBugReportOpen(true)}
                className="text-sm text-orange-600 dark:text-orange-400 hover:text-orange-700 dark:hover:text-orange-300 underline transition-colors"
              >
                Report a Bug
              </button>
            </div>

            {/* Mind Map Component */}
            <MindMapView appData={appData} />
          </div>
        </section>
      </Layout>

      {/* Bug Report Modal */}
      <BugReportModal
        isOpen={isBugReportOpen}
        onClose={() => setIsBugReportOpen(false)}
        featureName="Mind Map"
      />
    </>
  )
}
