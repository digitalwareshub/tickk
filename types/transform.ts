/**
 * Transform Types for Tickk Pro
 * Ported from SharpNotes (shrp.app)
 */

export type TransformMode = 'summarize' | 'structure' | 'polish' | 'tasks';

export interface TransformResult {
  output: string;
  metadata?: TransformMetadata;
}

export interface TransformMetadata {
  originalLength: number;
  transformedLength: number;
  compressionRatio?: number;
  tasksFound?: number;
  entitiesExtracted?: ExtractedEntities;
}

export interface ExtractedEntities {
  people?: string[];
  places?: string[];
  organizations?: string[];
  dates?: string[];
  numbers?: string[];
  topics?: string[];
}

export interface TransformedNote {
  id: string;
  title: string;
  input: string;
  output: string;
  mode: TransformMode;
  createdAt: number;
  updatedAt: number;
  wordCount: number;
  isFavorite: boolean;
  isPinned?: boolean;
}

export interface TransformExportOptions {
  format: 'txt' | 'md' | 'json' | 'docx';
  includeMetadata?: boolean;
}
