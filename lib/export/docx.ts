/**
 * DOCX Export Utility
 * Export transformed notes as Word documents
 * Tickk Pro Feature
 */

import { Document, Paragraph, TextRun, HeadingLevel, Packer } from 'docx';
import { saveAs } from 'file-saver';
import JSZip from 'jszip';
import toast from 'react-hot-toast';
import type { TransformedNote, TransformMode } from '@/types/transform';

/**
 * Sanitize filename to remove invalid characters
 */
function sanitizeFilename(filename: string): string {
  return filename
    .replace(/[^a-z0-9\s-]/gi, '')
    .replace(/\s+/g, '-')
    .toLowerCase()
    .substring(0, 50) || 'untitled';
}

/**
 * Export a single note as Word document
 */
export async function exportNoteAsDocx(note: TransformedNote): Promise<boolean> {
  try {
    const date = new Date(note.createdAt).toLocaleDateString();

    const doc = new Document({
      sections: [{
        properties: {},
        children: [
          new Paragraph({
            text: note.title,
            heading: HeadingLevel.HEADING_1,
          }),
          new Paragraph({
            children: [
              new TextRun({ text: 'Created: ', bold: true }),
              new TextRun(date),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({ text: 'Mode: ', bold: true }),
              new TextRun(note.mode),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({ text: 'Words: ', bold: true }),
              new TextRun(String(note.wordCount)),
            ],
          }),
          new Paragraph({ text: '' }), // Empty line
          new Paragraph({
            text: 'Original Input',
            heading: HeadingLevel.HEADING_2,
          }),
          new Paragraph({ text: note.input }),
          new Paragraph({ text: '' }), // Empty line
          new Paragraph({
            text: 'Transformed Output',
            heading: HeadingLevel.HEADING_2,
          }),
          ...note.output.split('\n').map(line => new Paragraph({ text: line })),
        ],
      }],
    });

    const blob = await Packer.toBlob(doc);
    const filename = `${sanitizeFilename(note.title)}.docx`;
    saveAs(blob, filename);

    toast.success(`Downloaded ${filename}`);
    return true;
  } catch (error) {
    console.error('Failed to create Word document:', error);
    toast.error('Failed to create Word document');
    return false;
  }
}

/**
 * Export note as TXT
 */
export function exportNoteAsTxt(note: TransformedNote): boolean {
  try {
    const content = `${note.title}\n${'='.repeat(note.title.length)}\n\n${note.output}`;
    const blob = new Blob([content], { type: 'text/plain' });
    const filename = `${sanitizeFilename(note.title)}.txt`;
    saveAs(blob, filename);
    toast.success(`Downloaded ${filename}`);
    return true;
  } catch (error) {
    console.error('Failed to export TXT:', error);
    toast.error('Failed to export');
    return false;
  }
}

/**
 * Export note as Markdown
 */
export function exportNoteAsMarkdown(note: TransformedNote): boolean {
  try {
    const date = new Date(note.createdAt).toLocaleDateString();
    const content = `# ${note.title}

**Created:** ${date}
**Mode:** ${note.mode}
**Words:** ${note.wordCount}

---

## Original Input

${note.input}

---

## Transformed Output

${note.output}
`;

    const blob = new Blob([content], { type: 'text/markdown' });
    const filename = `${sanitizeFilename(note.title)}.md`;
    saveAs(blob, filename);
    toast.success(`Downloaded ${filename}`);
    return true;
  } catch (error) {
    console.error('Failed to export Markdown:', error);
    toast.error('Failed to export');
    return false;
  }
}

/**
 * Export note in all formats as a ZIP file
 */
export async function exportNoteAsZip(note: TransformedNote): Promise<boolean> {
  try {
    const zip = new JSZip();
    const date = new Date(note.createdAt).toLocaleDateString();
    const baseFilename = sanitizeFilename(note.title);

    // Add TXT file
    const txtContent = `${note.title}\n${'='.repeat(note.title.length)}\n\n${note.output}`;
    zip.file(`${baseFilename}.txt`, txtContent);

    // Add Markdown file
    const mdContent = `# ${note.title}

**Created:** ${date}
**Mode:** ${note.mode}
**Words:** ${note.wordCount}

---

## Original Input

${note.input}

---

## Transformed Output

${note.output}
`;
    zip.file(`${baseFilename}.md`, mdContent);

    // Add Word document
    const doc = new Document({
      sections: [{
        properties: {},
        children: [
          new Paragraph({
            text: note.title,
            heading: HeadingLevel.HEADING_1,
          }),
          new Paragraph({
            children: [
              new TextRun({ text: 'Created: ', bold: true }),
              new TextRun(date),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({ text: 'Mode: ', bold: true }),
              new TextRun(note.mode),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({ text: 'Words: ', bold: true }),
              new TextRun(String(note.wordCount)),
            ],
          }),
          new Paragraph({ text: '' }),
          new Paragraph({
            text: 'Original Input',
            heading: HeadingLevel.HEADING_2,
          }),
          new Paragraph({ text: note.input }),
          new Paragraph({ text: '' }),
          new Paragraph({
            text: 'Transformed Output',
            heading: HeadingLevel.HEADING_2,
          }),
          ...note.output.split('\n').map(line => new Paragraph({ text: line })),
        ],
      }],
    });

    const docxBlob = await Packer.toBlob(doc);
    zip.file(`${baseFilename}.docx`, docxBlob);

    // Generate and download ZIP
    const zipBlob = await zip.generateAsync({ type: 'blob' });
    const zipFilename = `${baseFilename}-export.zip`;
    saveAs(zipBlob, zipFilename);

    toast.success(`Downloaded ${zipFilename} with all formats`);
    return true;
  } catch (error) {
    console.error('Failed to create ZIP file:', error);
    toast.error('Failed to create export package');
    return false;
  }
}

/**
 * Export multiple notes as JSON
 */
export function exportNotesAsJSON(notes: TransformedNote[]): boolean {
  try {
    const content = JSON.stringify({
      exportDate: new Date().toISOString(),
      notesCount: notes.length,
      source: 'tickk-pro',
      notes,
    }, null, 2);

    const blob = new Blob([content], { type: 'application/json' });
    const filename = `tickk-notes-export-${Date.now()}.json`;
    saveAs(blob, filename);
    toast.success(`Downloaded ${filename}`);
    return true;
  } catch (error) {
    console.error('Failed to export JSON:', error);
    toast.error('Failed to export');
    return false;
  }
}

/**
 * Quick export based on transform mode
 */
export async function quickExport(
  input: string,
  output: string,
  mode: TransformMode,
  format: 'txt' | 'md' | 'docx' | 'zip' = 'md'
): Promise<boolean> {
  const note: TransformedNote = {
    id: `export_${Date.now()}`,
    title: input.slice(0, 50).trim() + (input.length > 50 ? '...' : ''),
    input,
    output,
    mode,
    createdAt: Date.now(),
    updatedAt: Date.now(),
    wordCount: input.split(/\s+/).filter(Boolean).length,
    isFavorite: false,
    isPinned: false
  };

  switch (format) {
    case 'txt':
      return exportNoteAsTxt(note);
    case 'md':
      return exportNoteAsMarkdown(note);
    case 'docx':
      return exportNoteAsDocx(note);
    case 'zip':
      return exportNoteAsZip(note);
    default:
      return exportNoteAsMarkdown(note);
  }
}
