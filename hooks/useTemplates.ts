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

  const getDB = useCallback(async (): Promise<IDBDatabase> => {
    return new Promise((resolve, reject) => {
      console.log('🔧 Opening IndexedDB:', DB_NAME)
      const request = indexedDB.open(DB_NAME, 2)

      request.onerror = () => {
        console.error('❌ IndexedDB open error:', request.error)
        reject(request.error)
      }
      
      request.onsuccess = () => {
        console.log('✅ IndexedDB opened successfully')
        const db = request.result
        
        // Verify that the templates store exists
        if (!db.objectStoreNames.contains(STORE_NAME)) {
          console.error('❌ Templates store not found in database!')
          reject(new Error('Templates store not found. Please reload the page.'))
        } else {
          console.log('✅ Templates store exists')
          resolve(db)
        }
      }

      request.onupgradeneeded = (event) => {
        console.log('🔧 Database upgrade needed')
        const db = (event.target as IDBOpenDBRequest).result

        // Create templates store if it doesn't exist
        if (!db.objectStoreNames.contains(STORE_NAME)) {
          console.log('🔧 Creating templates store during upgrade')
          db.createObjectStore(STORE_NAME, { keyPath: 'id' })
          console.log('✅ Templates store created')
        }
      }
    })
  }, [])

  const loadTemplates = useCallback(async () => {
    try {
      console.log('📂 Loading templates...')
      setLoading(true)
      const db = await getDB()
      console.log('📂 Got DB connection, starting transaction')
      const transaction = db.transaction([STORE_NAME], 'readonly')
      const store = transaction.objectStore(STORE_NAME)
      const request = store.getAll()

      request.onsuccess = () => {
        const loadedTemplates = request.result as TaskTemplate[]
        console.log('📂 Loaded templates:', loadedTemplates.length)
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
        console.error('❌ Failed to load templates:', request.error)
        setError('Failed to load templates')
        // Only show toast once to prevent duplicates
        if (!hasShownErrorRef.current) {
          toast.error(ErrorMessages.TEMPLATE_LOAD_FAILED)
          hasShownErrorRef.current = true
        }
        setLoading(false)
      }
    } catch (err) {
      console.error('❌ Failed to access template database:', err)
      setError('Failed to access database')
      // Only show toast once to prevent duplicates
      if (!hasShownErrorRef.current) {
        toast.error(ErrorMessages.TEMPLATE_LOAD_FAILED)
        hasShownErrorRef.current = true
      }
      setLoading(false)
    }
  }, [getDB])

  // Initialize IndexedDB and load templates
  useEffect(() => {
    loadTemplates()
  }, [loadTemplates])

  const addTemplate = useCallback(async (template: Omit<TaskTemplate, 'id' | 'createdAt' | 'usageCount'>): Promise<void> => {
    try {
      console.log('💾 addTemplate: Starting...', template)
      const newTemplate: TaskTemplate = {
        ...template,
        id: crypto.randomUUID(),
        createdAt: new Date().toISOString(),
        usageCount: 0
      }
      console.log('💾 addTemplate: Created new template object:', newTemplate)

      console.log('💾 addTemplate: Getting DB connection...')
      const db = await getDB()
      console.log('💾 addTemplate: Got DB, creating transaction...')
      const transaction = db.transaction([STORE_NAME], 'readwrite')
      const store = transaction.objectStore(STORE_NAME)
      console.log('💾 addTemplate: Adding to store...')

      await new Promise<void>((resolve, reject) => {
        const request = store.add(newTemplate)
        
        request.onsuccess = () => {
          console.log('✅ Template added to IndexedDB')
        }
        
        request.onerror = () => {
          console.error('❌ Failed to add template:', request.error)
          reject(request.error)
        }

        // Wait for transaction to complete
        transaction.oncomplete = () => {
          console.log('✅ Transaction completed successfully')
          resolve()
        }
        
        transaction.onerror = () => {
          console.error('❌ Transaction error:', transaction.error)
          reject(transaction.error)
        }
        
        transaction.onabort = () => {
          console.error('❌ Transaction aborted')
          reject(new Error('Transaction aborted'))
        }
      })

      console.log('💾 addTemplate: Reloading templates...')
      await loadTemplates()
      console.log('💾 addTemplate: Success! Showing toast...')
      toast.success(SuccessMessages.TEMPLATE_SAVED)
    } catch (err) {
      console.error('❌ addTemplate failed:', err)
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

      await new Promise<void>((resolve, reject) => {
        const getRequest = store.get(id)

        getRequest.onsuccess = () => {
          const template = getRequest.result
          if (template) {
            const updatedTemplate = { ...template, ...updates }
            const putRequest = store.put(updatedTemplate)
            
            putRequest.onsuccess = () => {
              console.log('✅ Template updated in IndexedDB')
            }
            
            putRequest.onerror = () => {
              console.error('❌ Failed to update template:', putRequest.error)
              reject(putRequest.error)
            }
          } else {
            reject(new Error('Template not found'))
          }
        }
        
        getRequest.onerror = () => {
          console.error('❌ Failed to get template:', getRequest.error)
          reject(getRequest.error)
        }

        // Wait for transaction to complete
        transaction.oncomplete = () => {
          console.log('✅ Update transaction completed')
          resolve()
        }
        
        transaction.onerror = () => {
          console.error('❌ Update transaction error:', transaction.error)
          reject(transaction.error)
        }
        
        transaction.onabort = () => {
          console.error('❌ Update transaction aborted')
          reject(new Error('Transaction aborted'))
        }
      })

      await loadTemplates()
      toast.success(SuccessMessages.UPDATE_SUCCESS)
    } catch (err) {
      console.error('❌ updateTemplate failed:', err)
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
        
        request.onsuccess = () => {
          console.log('✅ Template deleted from IndexedDB')
        }
        
        request.onerror = () => {
          console.error('❌ Failed to delete template:', request.error)
          reject(request.error)
        }

        // Wait for transaction to complete
        transaction.oncomplete = () => {
          console.log('✅ Delete transaction completed')
          resolve()
        }
        
        transaction.onerror = () => {
          console.error('❌ Delete transaction error:', transaction.error)
          reject(transaction.error)
        }
        
        transaction.onabort = () => {
          console.error('❌ Delete transaction aborted')
          reject(new Error('Transaction aborted'))
        }
      })

      await loadTemplates()
      toast.success(SuccessMessages.TEMPLATE_DELETED)
    } catch (err) {
      console.error('❌ deleteTemplate failed:', err)
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
