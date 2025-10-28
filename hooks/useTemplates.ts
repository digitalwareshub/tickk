/**
 * useTemplates Hook
 * Manages task templates with IndexedDB persistence
 */

import { useState, useEffect, useCallback } from 'react'
import type { TaskTemplate } from '@/types/braindump'

const DB_NAME = 'tickk_db'
const STORE_NAME = 'templates'

export function useTemplates() {
  const [templates, setTemplates] = useState<TaskTemplate[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Initialize IndexedDB and load templates
  useEffect(() => {
    loadTemplates()
  }, [])

  const getDB = useCallback(async (): Promise<IDBDatabase> => {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(DB_NAME, 1)

      request.onerror = () => reject(request.error)
      request.onsuccess = () => resolve(request.result)

      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result

        // Create templates store if it doesn't exist
        if (!db.objectStoreNames.contains(STORE_NAME)) {
          db.createObjectStore(STORE_NAME, { keyPath: 'id' })
        }
      }
    })
  }, [])

  const loadTemplates = useCallback(async () => {
    try {
      setLoading(true)
      const db = await getDB()
      const transaction = db.transaction([STORE_NAME], 'readonly')
      const store = transaction.objectStore(STORE_NAME)
      const request = store.getAll()

      request.onsuccess = () => {
        const loadedTemplates = request.result as TaskTemplate[]
        // Sort by usage count and last used
        loadedTemplates.sort((a, b) => {
          if (b.usageCount !== a.usageCount) {
            return b.usageCount - a.usageCount
          }
          if (a.lastUsed && b.lastUsed) {
            return new Date(b.lastUsed).getTime() - new Date(a.lastUsed).getTime()
          }
          return 0
        })
        setTemplates(loadedTemplates)
        setLoading(false)
      }

      request.onerror = () => {
        setError('Failed to load templates')
        setLoading(false)
      }
    } catch (err) {
      setError('Failed to access database')
      setLoading(false)
    }
  }, [getDB])

  const addTemplate = useCallback(async (template: Omit<TaskTemplate, 'id' | 'createdAt' | 'usageCount'>): Promise<void> => {
    try {
      const newTemplate: TaskTemplate = {
        ...template,
        id: crypto.randomUUID(),
        createdAt: new Date().toISOString(),
        usageCount: 0
      }

      const db = await getDB()
      const transaction = db.transaction([STORE_NAME], 'readwrite')
      const store = transaction.objectStore(STORE_NAME)

      await new Promise<void>((resolve, reject) => {
        const request = store.add(newTemplate)
        request.onsuccess = () => resolve()
        request.onerror = () => reject(request.error)
      })

      await loadTemplates()
    } catch (err) {
      setError('Failed to add template')
      throw err
    }
  }, [getDB, loadTemplates])

  const updateTemplate = useCallback(async (id: string, updates: Partial<TaskTemplate>): Promise<void> => {
    try {
      const db = await getDB()
      const transaction = db.transaction([STORE_NAME], 'readwrite')
      const store = transaction.objectStore(STORE_NAME)

      const getRequest = store.get(id)

      await new Promise<void>((resolve, reject) => {
        getRequest.onsuccess = () => {
          const template = getRequest.result
          if (template) {
            const updatedTemplate = { ...template, ...updates }
            const putRequest = store.put(updatedTemplate)
            putRequest.onsuccess = () => resolve()
            putRequest.onerror = () => reject(putRequest.error)
          } else {
            reject(new Error('Template not found'))
          }
        }
        getRequest.onerror = () => reject(getRequest.error)
      })

      await loadTemplates()
    } catch (err) {
      setError('Failed to update template')
      throw err
    }
  }, [getDB, loadTemplates])

  const deleteTemplate = useCallback(async (id: string): Promise<void> => {
    try {
      const db = await getDB()
      const transaction = db.transaction([STORE_NAME], 'readwrite')
      const store = transaction.objectStore(STORE_NAME)

      await new Promise<void>((resolve, reject) => {
        const request = store.delete(id)
        request.onsuccess = () => resolve()
        request.onerror = () => reject(request.error)
      })

      await loadTemplates()
    } catch (err) {
      setError('Failed to delete template')
      throw err
    }
  }, [getDB, loadTemplates])

  const incrementUsage = useCallback(async (id: string): Promise<void> => {
    try {
      await updateTemplate(id, {
        usageCount: (templates.find(t => t.id === id)?.usageCount || 0) + 1,
        lastUsed: new Date().toISOString()
      })
    } catch (err) {
      // Silent fail - usage tracking is not critical
      console.error('Failed to increment template usage:', err)
    }
  }, [templates, updateTemplate])

  return {
    templates,
    loading,
    error,
    addTemplate,
    updateTemplate,
    deleteTemplate,
    incrementUsage,
    refresh: loadTemplates
  }
}
