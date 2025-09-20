/**
 * Enhanced Storage Service for Braindump-First Architecture
 * Handles both IndexedDB (preferred) and localStorage (fallback)
 */

import { v4 as uuidv4 } from 'uuid'
import type { 
  AppData, 
  VoiceItem, 
  BraindumpSession, 
  UserPreferences 
} from '@/types/braindump'

const DB_NAME = 'tickk_db'
const DB_VERSION = 1
const STORAGE_KEY = 'tickk_app_data'

export class StorageService {
  private static instance: StorageService
  private db: IDBDatabase | null = null
  private useIndexedDB = false
  
  static getInstance(): StorageService {
    if (!this.instance) {
      this.instance = new StorageService()
    }
    return this.instance
  }
  
  /**
   * Initialize storage (IndexedDB with localStorage fallback)
   */
  async init(): Promise<void> {
    try {
      if (typeof window !== 'undefined' && 'indexedDB' in window) {
        await this.initIndexedDB()
        this.useIndexedDB = true
        console.log('✅ IndexedDB initialized')
      } else {
        console.log('📱 Using localStorage fallback')
        this.useIndexedDB = false
      }
    } catch (error) {
      console.warn('⚠️ IndexedDB failed, falling back to localStorage:', error)
      this.useIndexedDB = false
    }
  }
  
  /**
   * Initialize IndexedDB with proper schema
   */
  private async initIndexedDB(): Promise<void> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(DB_NAME, DB_VERSION)
      
      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result
        
        // Tasks store
        if (!db.objectStoreNames.contains('tasks')) {
          const taskStore = db.createObjectStore('tasks', { keyPath: 'id' })
          taskStore.createIndex('timestamp', 'timestamp')
          taskStore.createIndex('sessionId', 'sessionId')
          taskStore.createIndex('completed', 'metadata.completed')
        }
        
        // Notes store
        if (!db.objectStoreNames.contains('notes')) {
          const noteStore = db.createObjectStore('notes', { keyPath: 'id' })
          noteStore.createIndex('timestamp', 'timestamp')
          noteStore.createIndex('sessionId', 'sessionId')
        }
        
        // Braindump store
        if (!db.objectStoreNames.contains('braindump')) {
          const braindumpStore = db.createObjectStore('braindump', { keyPath: 'id' })
          braindumpStore.createIndex('sessionId', 'sessionId')
          braindumpStore.createIndex('processed', 'processed')
          braindumpStore.createIndex('timestamp', 'timestamp')
        }
        
        // Sessions store
        if (!db.objectStoreNames.contains('sessions')) {
          const sessionStore = db.createObjectStore('sessions', { keyPath: 'id' })
          sessionStore.createIndex('startTime', 'startTime')
          sessionStore.createIndex('processed', 'processed')
        }
        
        // Settings store
        if (!db.objectStoreNames.contains('settings')) {
          db.createObjectStore('settings', { keyPath: 'key' })
        }
      }
      
      request.onsuccess = () => {
        this.db = request.result
        resolve()
      }
      
      request.onerror = () => {
        reject(request.error)
      }
    })
  }
  
  /**
   * Get all application data
   */
  async getAllData(): Promise<AppData | null> {
    if (this.useIndexedDB && this.db) {
      return await this.getAllDataFromIndexedDB()
    } else {
      return this.getAllDataFromLocalStorage()
    }
  }
  
  /**
   * Save complete application data
   */
  async saveAllData(data: AppData): Promise<void> {
    if (this.useIndexedDB && this.db) {
      await this.saveAllDataToIndexedDB(data)
    } else {
      this.saveAllDataToLocalStorage(data)
    }
  }
  
  /**
   * Add a new braindump item
   */
  async addBraindumpItem(item: VoiceItem): Promise<void> {
    if (this.useIndexedDB && this.db) {
      const tx = this.db.transaction(['braindump'], 'readwrite')
      const store = tx.objectStore('braindump')
      
      return new Promise((resolve, reject) => {
        const request = store.add(item)
        request.onsuccess = () => resolve()
        request.onerror = () => reject(request.error)
      })
    } else {
      // localStorage fallback
      const data = await this.getAllData()
      if (data) {
        data.braindump.push(item)
        await this.saveAllData(data)
      }
    }
  }
  
  /**
   * Get unprocessed braindump items
   */
  async getUnprocessedBraindumps(): Promise<VoiceItem[]> {
    if (this.useIndexedDB && this.db) {
      const tx = this.db.transaction(['braindump'], 'readonly')
      const store = tx.objectStore('braindump')
      const index = store.index('processed')
      
      return new Promise((resolve, reject) => {
        const request = index.getAll(IDBKeyRange.only(false))
        request.onsuccess = () => resolve(request.result)
        request.onerror = () => reject(request.error)
      })
    } else {
      const data = await this.getAllData()
      return data?.braindump.filter(item => !item.processed) || []
    }
  }
  
  /**
   * Process braindump items (move to tasks/notes)
   */
  async processBraindumpItems(items: VoiceItem[]): Promise<void> {
    if (this.useIndexedDB && this.db) {
      const tx = this.db.transaction(['braindump', 'tasks', 'notes'], 'readwrite')
      
      for (const item of items) {
        // Add to appropriate store
        if (item.suggestedCategory === 'tasks') {
          await this.addToStore(tx, 'tasks', { ...item, category: 'tasks' })
        } else if (item.suggestedCategory === 'notes') {
          await this.addToStore(tx, 'notes', { ...item, category: 'notes' })
        }
        
        // Mark as processed in braindump
        const updatedItem = { ...item, processed: true }
        await this.addToStore(tx, 'braindump', updatedItem)
      }
    } else {
      // localStorage fallback
      const data = await this.getAllData()
      if (data) {
        for (const item of items) {
          // Add to appropriate category
          if (item.suggestedCategory === 'tasks') {
            data.tasks.push({ ...item, category: 'tasks' })
          } else if (item.suggestedCategory === 'notes') {
            data.notes.push({ ...item, category: 'notes' })
          }
          
          // Mark as processed
          const braindumpIndex = data.braindump.findIndex(b => b.id === item.id)
          if (braindumpIndex !== -1) {
            data.braindump[braindumpIndex].processed = true
          }
        }
        
        await this.saveAllData(data)
      }
    }
  }
  
  /**
   * Create a new braindump session
   */
  async createSession(): Promise<BraindumpSession> {
    const session: BraindumpSession = {
      id: uuidv4(),
      startTime: new Date().toISOString(),
      itemCount: 0,
      processed: false
    }
    
    if (this.useIndexedDB && this.db) {
      const tx = this.db.transaction(['sessions'], 'readwrite')
      const store = tx.objectStore('sessions')
      
      return new Promise((resolve, reject) => {
        const request = store.add(session)
        request.onsuccess = () => resolve(session)
        request.onerror = () => reject(request.error)
      })
    } else {
      const data = await this.getAllData()
      if (data) {
        data.sessions.push(session)
        await this.saveAllData(data)
      }
      return session
    }
  }
  
  /**
   * Update session with stats
   */
  async updateSession(sessionId: string, updates: Partial<BraindumpSession>): Promise<void> {
    if (this.useIndexedDB && this.db) {
      const tx = this.db.transaction(['sessions'], 'readwrite')
      const store = tx.objectStore('sessions')
      
      return new Promise((resolve, reject) => {
        const getRequest = store.get(sessionId)
        getRequest.onsuccess = () => {
          const session = getRequest.result
          if (session) {
            const updatedSession = { ...session, ...updates }
            const putRequest = store.put(updatedSession)
            putRequest.onsuccess = () => resolve()
            putRequest.onerror = () => reject(putRequest.error)
          } else {
            reject(new Error('Session not found'))
          }
        }
        getRequest.onerror = () => reject(getRequest.error)
      })
    } else {
      const data = await this.getAllData()
      if (data) {
        const sessionIndex = data.sessions.findIndex(s => s.id === sessionId)
        if (sessionIndex !== -1) {
          data.sessions[sessionIndex] = { ...data.sessions[sessionIndex], ...updates }
          await this.saveAllData(data)
        }
      }
    }
  }
  
  /**
   * Get user preferences
   */
  async getPreferences(): Promise<UserPreferences | null> {
    const data = await this.getAllData()
    return data?.preferences || null
  }
  
  /**
   * Save user preferences
   */
  async savePreferences(preferences: UserPreferences): Promise<void> {
    const data = await this.getAllData()
    if (data) {
      data.preferences = preferences
      await this.saveAllData(data)
    }
  }
  
  /**
   * Export all data for backup/transfer
   */
  async exportData(): Promise<AppData | null> {
    return await this.getAllData()
  }
  
  /**
   * Clear all data (for testing or reset)
   */
  async clearAllData(): Promise<void> {
    if (this.useIndexedDB && this.db) {
      const stores = ['tasks', 'notes', 'braindump', 'sessions', 'settings']
      const tx = this.db.transaction(stores, 'readwrite')
      
      for (const storeName of stores) {
        const store = tx.objectStore(storeName)
        store.clear()
      }
    } else {
      localStorage.removeItem(STORAGE_KEY)
    }
  }
  
  // Private helper methods
  
  private async getAllDataFromIndexedDB(): Promise<AppData | null> {
    if (!this.db) return null
    
    try {
      const [tasks, notes, braindump, sessions] = await Promise.all([
        this.getAllFromStore('tasks'),
        this.getAllFromStore('notes'),
        this.getAllFromStore('braindump'),
        this.getAllFromStore('sessions')
      ])
      
      const preferences = await this.getFromStore('settings', 'preferences') as UserPreferences | null
      
      return {
        tasks: tasks as VoiceItem[],
        notes: notes as VoiceItem[],
        braindump: braindump as VoiceItem[],
        sessions: sessions as BraindumpSession[],
        version: '2.0.0',
        preferences: preferences || undefined
      }
    } catch (error) {
      console.error('Failed to load data from IndexedDB:', error)
      return null
    }
  }
  
  private getAllDataFromLocalStorage(): AppData | null {
    try {
      const data = localStorage.getItem(STORAGE_KEY)
      return data ? JSON.parse(data) : null
    } catch (error) {
      console.error('Failed to load data from localStorage:', error)
      return null
    }
  }
  
  private async saveAllDataToIndexedDB(data: AppData): Promise<void> {
    if (!this.db) throw new Error('IndexedDB not available')
    
    const tx = this.db.transaction(['tasks', 'notes', 'braindump', 'sessions', 'settings'], 'readwrite')
    
    // Clear existing data
    await Promise.all([
      this.clearStore(tx, 'tasks'),
      this.clearStore(tx, 'notes'),
      this.clearStore(tx, 'braindump'),
      this.clearStore(tx, 'sessions')
    ])
    
    // Save new data
    await Promise.all([
      ...data.tasks.map(item => this.addToStore(tx, 'tasks', item)),
      ...data.notes.map(item => this.addToStore(tx, 'notes', item)),
      ...data.braindump.map(item => this.addToStore(tx, 'braindump', item)),
      ...data.sessions.map(session => this.addToStore(tx, 'sessions', session))
    ])
    
    // Save preferences
    if (data.preferences) {
      await this.addToStore(tx, 'settings', { key: 'preferences', value: data.preferences })
    }
  }
  
  private saveAllDataToLocalStorage(data: AppData): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
    } catch (error) {
      console.error('Failed to save data to localStorage:', error)
      throw error
    }
  }
  
  private async getAllFromStore(storeName: string): Promise<unknown[]> {
    if (!this.db) return []
    
    return new Promise((resolve, reject) => {
      const tx = this.db!.transaction([storeName], 'readonly')
      const store = tx.objectStore(storeName)
      const request = store.getAll()
      
      request.onsuccess = () => resolve(request.result)
      request.onerror = () => reject(request.error)
    })
  }
  
  private async getFromStore(storeName: string, key: string): Promise<unknown> {
    if (!this.db) return null
    
    return new Promise((resolve, reject) => {
      const tx = this.db!.transaction([storeName], 'readonly')
      const store = tx.objectStore(storeName)
      const request = store.get(key)
      
      request.onsuccess = () => resolve(request.result?.value || null)
      request.onerror = () => reject(request.error)
    })
  }
  
  private async addToStore(tx: IDBTransaction, storeName: string, data: unknown): Promise<void> {
    return new Promise((resolve, reject) => {
      const store = tx.objectStore(storeName)
      const request = store.put(data)
      
      request.onsuccess = () => resolve()
      request.onerror = () => reject(request.error)
    })
  }
  
  private async clearStore(tx: IDBTransaction, storeName: string): Promise<void> {
    return new Promise((resolve, reject) => {
      const store = tx.objectStore(storeName)
      const request = store.clear()
      
      request.onsuccess = () => resolve()
      request.onerror = () => reject(request.error)
    })
  }
}
