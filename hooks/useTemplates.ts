/**
 * useTemplates Hook
 * Manages task templates with IndexedDB persistence
 */

import { useState, useEffect, useCallback, useRef } from 'react'
import toast from 'react-hot-toast'
import { ErrorMessages, SuccessMessages } from '@/lib/utils/error-messages'
import type { TaskTemplate } from '@/types/braindump'

const DB_NAME = 'tickk_db'
const STORE_NAME = 'templates'

export function useTemplates() {
  const [templates, setTemplates] = useState<TaskTemplate[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const hasShownErrorRef = useRef(false)

  // Initialize IndexedDB and load templates
  useEffect(() => {
    loadTemplates()
  }, [])

  const getDB = useCallback(async (): Promise<IDBDatabase> => {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(DB_NAME, 2) // Increment version to trigger upgrade

      request.onerror = () => reject(request.error)
      
      request.onsuccess = () => {
        const db = request.result
        
        // Check if the templates store exists
        if (!db.objectStoreNames.contains(STORE_NAME)) {
          // Close and reopen with a higher version to trigger upgrade
          db.close()
          const upgradeRequest = indexedDB.open(DB_NAME, db.version + 1)
          
          upgradeRequest.onerror = () => reject(upgradeRequest.error)
          upgradeRequest.onsuccess = () => resolve(upgradeRequest.result)
          
          upgradeRequest.onupgradeneeded = (event) => {
            const upgradeDb = (event.target as IDBOpenDBRequest).result
            if (!upgradeDb.objectStoreNames.contains(STORE_NAME)) {
              upgradeDb.createObjectStore(STORE_NAME, { keyPath: 'id' })
            }
          }
        } else {
          resolve(db)
        }
      }

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
        setError(null) // Clear any previous errors
        setLoading(false)
      }

      request.onerror = () => {
        console.error('Failed to load templates:', request.error)
        setError('Failed to load templates')
        // Only show toast once to prevent duplicates
        if (!hasShownErrorRef.current) {
          toast.error(ErrorMessages.TEMPLATE_LOAD_FAILED)
          hasShownErrorRef.current = true
        }
        setLoading(false)
      }
    } catch (err) {
      console.error('Failed to access template database:', err)
      setError('Failed to access database')
      // Only show toast once to prevent duplicates
      if (!hasShownErrorRef.current) {
        toast.error(ErrorMessages.TEMPLATE_LOAD_FAILED)
        hasShownErrorRef.current = true
      }
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
      toast.success(SuccessMessages.TEMPLATE_SAVED)
    } catch (err) {
      setError('Failed to add template')
      toast.error(ErrorMessages.TEMPLATE_SAVE_FAILED)
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
      toast.success(SuccessMessages.UPDATE_SUCCESS)
    } catch (err) {
      setError('Failed to update template')
      toast.error(ErrorMessages.TEMPLATE_UPDATE_FAILED)
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
      toast.success(SuccessMessages.TEMPLATE_DELETED)
    } catch (err) {
      setError('Failed to delete template')
      toast.error(ErrorMessages.TEMPLATE_DELETE_FAILED)
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
