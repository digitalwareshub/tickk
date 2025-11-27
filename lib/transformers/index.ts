/**
 * Transformers Index
 * Central export for all text transformation functions
 * Tickk Pro Feature
 */

export { summarizeText } from './summarize';
export { structureText } from './structure';
export { polishText } from './polish';
export { extractTasks } from './tasks';

import { summarizeText } from './summarize';
import { structureText } from './structure';
import { polishText } from './polish';
import { extractTasks } from './tasks';
import type { TransformMode, TransformResult } from '@/types/transform';

/**
 * Transform text based on selected mode
 */
export function transformText(text: string, mode: TransformMode): TransformResult {
  switch (mode) {
    case 'summarize':
      return summarizeText(text);
    case 'structure':
      return structureText(text);
    case 'polish':
      return polishText(text);
    case 'tasks':
      return extractTasks(text);
    default:
      return {
        output: text,
        metadata: {
          originalLength: text.split(/\s+/).filter(Boolean).length,
          transformedLength: text.split(/\s+/).filter(Boolean).length
        }
      };
  }
}

/**
 * Mode descriptions for UI
 */
export const modeDescriptions: Record<TransformMode, { title: string; description: string; icon: string }> = {
  summarize: {
    title: 'Summarize',
    description: 'Extract key points and entities. Reduces text by ~70%.',
    icon: 'FileText'
  },
  structure: {
    title: 'Structure',
    description: 'Organize into sections with headers and bullet points.',
    icon: 'List'
  },
  polish: {
    title: 'Polish',
    description: 'Fix grammar, typos, and formatting. Makes text professional.',
    icon: 'Sparkles'
  },
  tasks: {
    title: 'Extract Tasks',
    description: 'Find action items and create a checklist.',
    icon: 'CheckSquare'
  }
};
