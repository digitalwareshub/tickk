/**
 * OrganizedView Bulk Operations Tests
 * Tests for the new bulk delete functionality
 */

import { render, screen, fireEvent, waitFor } from '@testing-library/react'
// import { LanguageProvider } from '@/contexts/LanguageContext' // TODO: Fix tests after LanguageContext removal
import OrganizedView from '@/components/OrganizedView'
import type { AppData, VoiceItem } from '@/types/braindump'

// Mock data for testing
const mockTasks: VoiceItem[] = [
  {
    id: 'task1',
    text: 'Buy groceries',
    timestamp: new Date().toISOString(),
    completed: false,
    classification: {
      category: 'tasks',
      confidence: 0.9,
      reasoning: 'Action item'
    }
  },
  {
    id: 'task2', 
    text: 'Call dentist',
    timestamp: new Date().toISOString(),
    completed: true,
    classification: {
      category: 'tasks',
      confidence: 0.85,
      reasoning: 'Action item'
    }
  },
  {
    id: 'task3',
    text: 'Finish report',
    timestamp: new Date().toISOString(),
    completed: false,
    classification: {
      category: 'tasks',
      confidence: 0.95,
      reasoning: 'Action item'
    }
  }
]

const mockNotes: VoiceItem[] = [
  {
    id: 'note1',
    text: 'Meeting notes from today',
    timestamp: new Date().toISOString(),
    classification: {
      category: 'notes',
      confidence: 0.8,
      reasoning: 'Information'
    }
  },
  {
    id: 'note2',
    text: 'Ideas for the project',
    timestamp: new Date().toISOString(),
    classification: {
      category: 'notes',
      confidence: 0.75,
      reasoning: 'Information'
    }
  }
]

const mockAppData: AppData = {
  tasks: mockTasks,
  notes: mockNotes,
  braindump: [],
  sessions: [],
  version: '1.0.0'
}

// TODO: Fix tests after LanguageContext removal
const TestWrapper = ({ children }: { children: React.ReactNode }) => (
  // <LanguageProvider>
    <>{children}</>
  // </LanguageProvider>
)

describe('OrganizedView Bulk Operations', () => {
  const mockOnDataUpdate = jest.fn()

  beforeEach(() => {
    mockOnDataUpdate.mockClear()
  })

  test('shows bulk actions button', () => {
    render(
      <TestWrapper>
        <OrganizedView 
          appData={mockAppData}
          preferences={null}
          onDataUpdate={mockOnDataUpdate}
        />
      </TestWrapper>
    )

    const bulkActionsButton = screen.getByText('Bulk Actions')
    expect(bulkActionsButton).toBeInTheDocument()
  })

  test('enables bulk mode when bulk actions button is clicked', () => {
    render(
      <TestWrapper>
        <OrganizedView 
          appData={mockAppData}
          preferences={null}
          onDataUpdate={mockOnDataUpdate}
        />
      </TestWrapper>
    )

    const bulkActionsButton = screen.getByText('Bulk Actions')
    fireEvent.click(bulkActionsButton)

    expect(screen.getByText('Exit Bulk Mode')).toBeInTheDocument()
    expect(screen.getByText('Select All')).toBeInTheDocument()
    expect(screen.getByText('Select None')).toBeInTheDocument()
  })

  test('allows selecting multiple items in bulk mode', () => {
    render(
      <TestWrapper>
        <OrganizedView 
          appData={mockAppData}
          preferences={null}
          onDataUpdate={mockOnDataUpdate}
        />
      </TestWrapper>
    )

    // Enter bulk mode
    const bulkActionsButton = screen.getByText('Bulk Actions')
    fireEvent.click(bulkActionsButton)

    // Select items (checkboxes should now be for selection, not completion)
    const checkboxes = screen.getAllByRole('checkbox')
    fireEvent.click(checkboxes[0]) // Select first item
    fireEvent.click(checkboxes[1]) // Select second item

    // Should show selected count
    expect(screen.getByText('2 selected')).toBeInTheDocument()
    expect(screen.getByText(/Delete Selected \(2\)/)).toBeInTheDocument()
  })

  test('select all button selects all visible items', () => {
    render(
      <TestWrapper>
        <OrganizedView 
          appData={mockAppData}
          preferences={null}
          onDataUpdate={mockOnDataUpdate}
        />
      </TestWrapper>
    )

    // Enter bulk mode
    fireEvent.click(screen.getByText('Bulk Actions'))
    
    // Click select all
    fireEvent.click(screen.getByText('Select All'))

    // Should show all items selected (3 tasks + 2 notes = 5 total)
    expect(screen.getByText('5 selected')).toBeInTheDocument()
  })

  test('shows delete completed button when completed tasks exist', () => {
    render(
      <TestWrapper>
        <OrganizedView 
          appData={mockAppData}
          preferences={null}
          onDataUpdate={mockOnDataUpdate}
        />
      </TestWrapper>
    )

    // Enter bulk mode
    fireEvent.click(screen.getByText('Bulk Actions'))

    // Should show delete completed button (1 completed task)
    expect(screen.getByText(/Delete Completed \(1\)/)).toBeInTheDocument()
  })

  test('bulk delete confirmation dialog appears', async () => {
    render(
      <TestWrapper>
        <OrganizedView 
          appData={mockAppData}
          preferences={null}
          onDataUpdate={mockOnDataUpdate}
        />
      </TestWrapper>
    )

    // Enter bulk mode and select items
    fireEvent.click(screen.getByText('Bulk Actions'))
    const checkboxes = screen.getAllByRole('checkbox')
    fireEvent.click(checkboxes[0])

    // Click delete selected
    fireEvent.click(screen.getByText(/Delete Selected \(1\)/))

    // Confirmation dialog should appear
    await waitFor(() => {
      expect(screen.getByText('Delete Selected')).toBeInTheDocument()
      expect(screen.getByText(/Are you sure you want to delete 1 items/)).toBeInTheDocument()
    })
  })

  test('bulk delete updates data correctly', async () => {
    render(
      <TestWrapper>
        <OrganizedView 
          appData={mockAppData}
          preferences={null}
          onDataUpdate={mockOnDataUpdate}
        />
      </TestWrapper>
    )

    // Enter bulk mode
    fireEvent.click(screen.getByText('Bulk Actions'))
    
    // Select first task
    const checkboxes = screen.getAllByRole('checkbox')
    fireEvent.click(checkboxes[0])

    // Delete selected
    fireEvent.click(screen.getByText(/Delete Selected \(1\)/))

    // Confirm deletion
    await waitFor(() => {
      const confirmButton = screen.getByText('Delete')
      fireEvent.click(confirmButton)
    })

    // Should call onDataUpdate with updated data
    await waitFor(() => {
      expect(mockOnDataUpdate).toHaveBeenCalledWith({
        ...mockAppData,
        tasks: mockAppData.tasks.slice(1), // First task should be removed
        notes: mockAppData.notes // Notes unchanged
      })
    })
  })

  test('delete completed only removes completed tasks', async () => {
    render(
      <TestWrapper>
        <OrganizedView 
          appData={mockAppData}
          preferences={null}
          onDataUpdate={mockOnDataUpdate}
        />
      </TestWrapper>
    )

    // Enter bulk mode
    fireEvent.click(screen.getByText('Bulk Actions'))
    
    // Click delete completed
    fireEvent.click(screen.getByText(/Delete Completed \(1\)/))

    // Confirm deletion
    await waitFor(() => {
      const confirmButton = screen.getByText('Delete')
      fireEvent.click(confirmButton)
    })

    // Should remove only completed tasks
    await waitFor(() => {
      expect(mockOnDataUpdate).toHaveBeenCalledWith({
        ...mockAppData,
        tasks: mockAppData.tasks.filter(task => !task.completed)
      })
    })
  })
})