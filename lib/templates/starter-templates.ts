import type { TaskTemplate } from '@/types/braindump'

export const STARTER_TEMPLATE_IDS = [
  'starter_personal_tasks',
  'starter_meeting_notes',
  'starter_quick_ideas',
]

export const starterTemplates: TaskTemplate[] = [
  {
    id: 'starter_personal_tasks',
    text: 'Review today, choose the next task, and note anything blocking progress.',
    category: 'tasks',
    priority: 'medium',
    tags: ['personal'],
    createdAt: '2026-01-01T00:00:00.000Z',
    usageCount: 0,
    metadata: {
      description: 'A simple personal task planning template.',
      icon: 'T',
    },
  },
  {
    id: 'starter_meeting_notes',
    text: 'Capture decisions, action items, owners, and follow-ups from this meeting.',
    category: 'notes',
    tags: ['meeting'],
    createdAt: '2026-01-01T00:00:00.000Z',
    usageCount: 0,
    metadata: {
      description: 'Turn meeting thoughts into usable notes.',
      icon: 'N',
    },
  },
  {
    id: 'starter_quick_ideas',
    text: 'Write the idea, why it matters, and the smallest next step.',
    category: 'notes',
    tags: ['ideas'],
    createdAt: '2026-01-01T00:00:00.000Z',
    usageCount: 0,
    metadata: {
      description: 'A lightweight template for quick thoughts.',
      icon: '*',
    },
  },
]

export const isStarterTemplate = (templateId: string) => STARTER_TEMPLATE_IDS.includes(templateId)
