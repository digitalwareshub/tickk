# tickk.app Implementation Roadmap

## 🚨 Priority 1: Critical Fixes (Week 1)

### 1. **Fix the NLP Classification System**
```javascript
// CURRENT: Broken string matching
const hasTimeWords = timeWords.some(word => lowerText.includes(word))

// IMPLEMENT: Actual compromise.js NLP
import nlp from 'compromise'

const classifyText = (text: string): 'tasks' | 'notes' | 'calendar' => {
  const doc = nlp(text)
  
  // Extract grammatical components
  const sentences = doc.sentences().json()
  const verbs = doc.verbs().json()
  const nouns = doc.nouns().json()
  const dates = doc.dates().json()
  const times = doc.times().json()
  
  // Detect imperatives (commands)
  const hasImperative = doc.has('#Imperative')
  const hasModal = doc.has('#Modal')  // must, should, need to
  
  // Detect questions vs statements
  const isQuestion = doc.has('#QuestionWord') || text.trim().endsWith('?')
  
  // Smart classification based on linguistic analysis
  if (dates.length > 0 || times.length > 0) {
    // Has temporal references
    if (hasImperative || hasModal) {
      return 'tasks'  // "Need to meet John tomorrow"
    }
    return 'calendar'  // "Meeting with John tomorrow"
  }
  
  if (hasImperative || doc.has('(need|must|should|have to)')) {
    return 'tasks'
  }
  
  return 'notes'
}
```

### 2. **Fix Word Boundary Issues**
```javascript
// PROBLEM: 'at' matches in 'that', 'what', 'great'
// SOLUTION: Use proper regex with word boundaries
const timePatterns = [
  /\bat\s+\d{1,2}(?::\d{2})?\s*(?:am|pm)\b/i,
  /\bat\s+(?:noon|midnight|sunrise|sunset)\b/i,
  // Not just /\bat\b/ which would match everywhere
]
```

### 3. **Synchronize Classification Logic**
Create a single source of truth:
```typescript
// lib/nlp-classifier.ts
export class VoiceClassifier {
  private nlp: any
  
  constructor() {
    this.nlp = require('compromise')
  }
  
  classify(text: string): Classification {
    // Single implementation used everywhere
  }
}

// Use in both index.tsx and app.tsx
import { VoiceClassifier } from '@/lib/nlp-classifier'
```

## 📊 Priority 2: Data Management (Week 2)

### 1. **Implement Proper Storage Layer**
```typescript
// lib/storage.ts
class StorageManager {
  private db: IDBDatabase | null = null
  
  async init() {
    // Use IndexedDB with localStorage fallback
    try {
      this.db = await this.openIndexedDB()
    } catch {
      console.warn('IndexedDB unavailable, using localStorage')
    }
  }
  
  async save(data: VoiceData) {
    if (this.db) {
      // IndexedDB (unlimited storage)
      await this.saveToIndexedDB(data)
    } else {
      // localStorage fallback (5-10MB limit)
      this.saveToLocalStorage(data)
    }
  }
  
  async export(): Promise<Blob> {
    const data = await this.getAll()
    return new Blob([JSON.stringify(data)], { type: 'application/json' })
  }
  
  async import(file: File): Promise<void> {
    const text = await file.text()
    const data = JSON.parse(text)
    await this.save(data)
  }
}
```

### 2. **Add Export/Import Functionality**
```typescript
// components/ExportImport.tsx
export function ExportImport() {
  const handleExport = async () => {
    const blob = await storage.export()
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `tickk-backup-${Date.now()}.json`
    a.click()
  }
  
  const handleImport = async (file: File) => {
    await storage.import(file)
    toast.success('Data imported successfully')
  }
  
  return (
    <>
      <button onClick={handleExport}>Export Data</button>
      <input type="file" accept=".json" onChange={(e) => handleImport(e.target.files[0])} />
    </>
  )
}
```

### 3. **Implement Data Pagination**
```typescript
// hooks/usePaginatedData.ts
export function usePaginatedData(category: string, itemsPerPage = 20) {
  const [page, setPage] = useState(1)
  const [data, setData] = useState([])
  const [total, setTotal] = useState(0)
  
  useEffect(() => {
    const loadPage = async () => {
      const result = await storage.getPage(category, page, itemsPerPage)
      setData(result.items)
      setTotal(result.total)
    }
    loadPage()
  }, [category, page])
  
  return { data, total, page, setPage, hasMore: page * itemsPerPage < total }
}
```

## 🔍 Priority 3: Search & Filter (Week 3)

### 1. **Add Search Functionality**
```typescript
// components/SearchBar.tsx
export function SearchBar() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  
  const search = useMemo(() => {
    return debounce(async (q: string) => {
      if (!q) {
        setResults([])
        return
      }
      
      // Search using compromise.js for better matching
      const doc = nlp(q)
      const keywords = doc.terms().out('array')
      
      const results = await storage.search({
        keywords,
        fuzzy: true,
        categories: ['tasks', 'notes', 'calendar']
      })
      
      setResults(results)
    }, 300)
  }, [])
  
  return (
    <div>
      <input 
        type="search"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value)
          search(e.target.value)
        }}
        placeholder="Search your voice notes..."
      />
      <SearchResults results={results} />
    </div>
  )
}
```

### 2. **Add Filtering Options**
```typescript
// components/FilterPanel.tsx
export function FilterPanel() {
  const [filters, setFilters] = useState({
    categories: ['tasks', 'notes', 'calendar'],
    dateRange: { start: null, end: null },
    completed: 'all', // all, completed, incomplete
    sortBy: 'date', // date, alphabetical, category
    sortOrder: 'desc'
  })
  
  return (
    <div className="filter-panel">
      <CategoryFilter />
      <DateRangePicker />
      <CompletionFilter />
      <SortOptions />
    </div>
  )
}
```

## ♿ Priority 4: Accessibility (Week 4)

### 1. **Add ARIA Live Regions**
```typescript
// components/LiveAnnouncer.tsx
export function LiveAnnouncer() {
  return (
    <>
      <div role="status" aria-live="polite" aria-atomic="true" className="sr-only">
        {/* Announce non-critical updates */}
        <span id="live-polite"></span>
      </div>
      <div role="alert" aria-live="assertive" aria-atomic="true" className="sr-only">
        {/* Announce critical updates */}
        <span id="live-assertive"></span>
      </div>
    </>
  )
}

// Usage
function announceToScreenReader(message: string, priority: 'polite' | 'assertive' = 'polite') {
  const element = document.getElementById(`live-${priority}`)
  if (element) {
    element.textContent = message
    setTimeout(() => element.textContent = '', 1000)
  }
}
```

### 2. **Keyboard Navigation**
```typescript
// components/VoiceItem.tsx
export function VoiceItem({ item, onDelete, onEdit }) {
  return (
    <div 
      role="article"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Delete') onDelete()
        if (e.key === 'Enter') onEdit()
      }}
      aria-label={`${item.category} item: ${item.text}`}
    >
      {/* Item content */}
    </div>
  )
}
```

## 🧪 Priority 5: Testing (Ongoing)

### 1. **Unit Tests for Classification**
```typescript
// __tests__/nlp-classifier.test.ts
describe('VoiceClassifier', () => {
  const classifier = new VoiceClassifier()
  
  test.each([
    ['I need to buy groceries tomorrow', 'tasks'],
    ['Meeting with John at 3pm', 'calendar'],
    ['Great idea for the project', 'notes'],
    ['Remember to call mom', 'tasks'],
    ['Lunch with Sarah on Friday', 'calendar'],
    ['I want to read that book', 'notes'], // The infamous bug
  ])('classifies "%s" as %s', (input, expected) => {
    expect(classifier.classify(input)).toBe(expected)
  })
})
```

### 2. **Integration Tests**
```typescript
// __tests__/voice-recording.test.tsx
describe('Voice Recording Flow', () => {
  test('complete recording flow', async () => {
    render(<App />)
    
    // Start recording
    const micButton = screen.getByRole('button', { name: /microphone/i })
    fireEvent.click(micButton)
    
    // Simulate speech
    mockSpeechRecognition.simulateResult('Buy groceries tomorrow')
    
    // Check classification
    await waitFor(() => {
      expect(screen.getByText('Buy groceries tomorrow')).toBeInTheDocument()
      expect(screen.getByText('Tasks (1)')).toBeInTheDocument()
    })
  })
})
```

## 🎨 Priority 6: UI/UX Improvements

### 1. **Add Loading States**
```typescript
// components/LoadingStates.tsx
export function ItemSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
      <div className="h-3 bg-gray-200 rounded w-1/2"></div>
    </div>
  )
}
```

### 2. **Add Toast Notifications**
```typescript
// Using react-hot-toast or similar
import toast from 'react-hot-toast'

// In your components
toast.success('Item added to tasks')
toast.error('Failed to save. Please try again.')
```

### 3. **Add Confirmation Dialogs**
```typescript
// components/ConfirmDialog.tsx
export function ConfirmDialog({ isOpen, onConfirm, onCancel, message }) {
  return (
    <Dialog open={isOpen} onClose={onCancel}>
      <DialogTitle>Confirm Action</DialogTitle>
      <DialogContent>{message}</DialogContent>
      <DialogActions>
        <Button onClick={onCancel}>Cancel</Button>
        <Button onClick={onConfirm} color="primary">Confirm</Button>
      </DialogActions>
    </Dialog>
  )
}
```

## 🔒 Priority 7: Security Fixes

### 1. **Sanitize User Input**
```typescript
import DOMPurify from 'isomorphic-dompurify'

function sanitizeInput(text: string): string {
  return DOMPurify.sanitize(text, { 
    ALLOWED_TAGS: [],
    ALLOWED_ATTR: []
  })
}
```

### 2. **Add Rate Limiting**
```typescript
// utils/rateLimiter.ts
class RateLimiter {
  private attempts = new Map<string, number[]>()
  
  isAllowed(action: string, maxAttempts = 10, windowMs = 60000): boolean {
    const now = Date.now()
    const userAttempts = this.attempts.get(action) || []
    
    // Remove old attempts
    const validAttempts = userAttempts.filter(time => now - time < windowMs)
    
    if (validAttempts.length >= maxAttempts) {
      return false
    }
    
    validAttempts.push(now)
    this.attempts.set(action, validAttempts)
    return true
  }
}
```

## 📱 Priority 8: Enhanced PWA Features

### 1. **Add Background Sync**
```typescript
// service-worker.ts
self.addEventListener('sync', async (event) => {
  if (event.tag === 'sync-voice-data') {
    event.waitUntil(syncVoiceData())
  }
})

async function syncVoiceData() {
  const unsyncedData = await getUnsyncedData()
  // Sync with optional cloud service
}
```

### 2. **Add Push Notifications**
```typescript
// For task reminders
Notification.requestPermission().then(permission => {
  if (permission === 'granted') {
    new Notification('Task Reminder', {
      body: 'You have 3 pending tasks',
      icon: '/icon-192.png'
    })
  }
})
```

## 📊 Implementation Timeline

```
Week 1: Critical Fixes
  ├── Fix NLP classification
  ├── Fix word boundaries
  └── Synchronize logic

Week 2: Data Management
  ├── Storage layer
  ├── Export/Import
  └── Pagination

Week 3: Search & Filter
  ├── Search functionality
  └── Filtering options

Week 4: Accessibility
  ├── ARIA regions
  ├── Keyboard navigation
  └── Screen reader support

Ongoing: Testing
  ├── Unit tests
  ├── Integration tests
  └── E2E tests

Week 5-6: UI/UX & Security
  ├── Loading states
  ├── Notifications
  ├── Input sanitization
  └── Rate limiting

Week 7-8: PWA Enhancements
  ├── Background sync
  ├── Push notifications
  └── Offline improvements
```

## Success Metrics

- Classification accuracy > 95%
- Page load time < 2 seconds
- Lighthouse score > 95
- Test coverage > 80%
- Zero critical accessibility issues
- User satisfaction > 4.5/5

This roadmap transforms tickk from a pretty demo into a production-ready application that actually delivers on its promises.