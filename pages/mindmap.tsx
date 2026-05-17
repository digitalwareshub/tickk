/**
 * Mind Map Page
 * Standalone page for visualizing tasks and notes over time
 */

import { useState, useEffect } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Layout from '@/components/Layout'
import MindMapView from '@/components/MindMapView'
import type { AppData } from '@/types/braindump'
import { StorageService } from '@/lib/storage/storage-service'
import { trackProductEvent } from '@/lib/analytics/enhanced-analytics'

export default function MindMapPage() {
  const [appData, setAppData] = useState<AppData | null>(null)
  const [loading, setLoading] = useState(true)
  const [storageService] = useState(() => StorageService.getInstance())

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await storageService.getAllData()
        console.log('Loaded data:', data)
        
        if (!data) {
          console.log('No data found, using fallback')
          trackProductEvent('mindmap_opened', 'mindmap_page', {
            source: 'mindmap_page',
            has_items: false,
          })
          setAppData({
            version: '1.0.0',
            tasks: [],
            notes: [],
            braindump: [],
            sessions: []
          })
        } else {
          trackProductEvent('mindmap_opened', 'mindmap_page', {
            source: 'mindmap_page',
            has_items: data.tasks.length + data.notes.length + data.braindump.length > 0,
          })
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
      <div className="flex min-h-screen items-center justify-center bg-[#1a1b26] text-white">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
          <p className="text-[#a0a0a0]">Loading your data...</p>
        </div>
      </div>
    )
  }

  if (!appData) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#1a1b26] text-white">
        <div className="text-center">
          <p className="text-red-600 dark:text-red-400 text-xl mb-4">Failed to load data</p>
          <p className="text-[#a0a0a0]">Check the browser console for details</p>
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

      <Layout className="min-h-screen bg-[#1a1b26] text-white">
        {/* Hero Section */}
        <section className="px-6 py-10">
          <div className="mx-auto max-w-[900px]">
            <div className="text-center mb-8">
              <h1 className="mb-3 flex items-center justify-center gap-3 font-mono text-3xl font-bold text-white md:text-4xl">
                <span><span className="text-orange-500">Mind</span> Map</span>
                <span className="rounded-md border border-[#333333] bg-white/[0.02] px-3 py-1 font-mono text-xs font-medium text-[#a0a0a0]">
                  BETA
                </span>
              </h1>
              <p className="mb-2 text-[#a0a0a0]">
                Visualize your productivity journey over time. {appData.tasks.length} tasks • {appData.notes.length} notes
              </p>
              <p className="text-xs text-[#737373]">
                Found a bug? <Link href="/bug-report" className="text-orange-500 hover:text-orange-400">Report it here</Link>
              </p>
            </div>

            {/* Mind Map Component */}
            <MindMapView appData={appData} />
          </div>
        </section>
      </Layout>
    </>
  )
}
