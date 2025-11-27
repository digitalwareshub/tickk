/**
 * Structure Transformer
 * Converts stream-of-consciousness text into hierarchical organization
 * Ported from SharpNotes for Tickk Pro
 */

import nlp from 'compromise';
import type { TransformResult } from '@/types/transform';

export function structureText(text: string): TransformResult {
  const doc = nlp(text);
  const structured: string[] = [];

  // Get all sentences
  const sentences = doc.sentences().out('array') as string[];

  if (sentences.length === 0) {
    return {
      output: 'No text to structure.',
      metadata: {
        originalLength: 0,
        transformedLength: 0
      }
    };
  }

  // If only 1-2 sentences, just format as bullets
  if (sentences.length <= 2) {
    sentences.forEach(s => {
      structured.push(`• ${s.trim()}`);
    });

    return {
      output: structured.join('\n'),
      metadata: {
        originalLength: text.split(/\s+/).filter(Boolean).length,
        transformedLength: structured.join(' ').split(/\s+/).filter(Boolean).length
      }
    };
  }

  let currentSection: string | null = null;
  const sections: { [key: string]: string[] } = {};
  let hasFoundHeaders = false;

  sentences.forEach((sentence) => {
    const sentDoc = nlp(sentence);
    const trimmed = sentence.trim();

    // Skip empty sentences
    if (!trimmed) {return;}

    // Detect headers/topics (potential section breaks)
    const isQuestion = trimmed.endsWith('?');
    const isAllCaps = trimmed === trimmed.toUpperCase() && trimmed.length > 3 && trimmed.length < 50;
    const topics = sentDoc.topics().out('array') as string[];
    const wordCount = trimmed.split(/\s+/).length;
    const isShortWithTopic = topics.length > 0 && wordCount <= 10;
    const endsWithColon = trimmed.endsWith(':');

    // Check if it's likely a header
    const isHeader = isQuestion || isAllCaps || isShortWithTopic || endsWithColon;

    if (isHeader) {
      hasFoundHeaders = true;

      // Create new section
      let headerText = trimmed;

      // Clean up header
      if (isAllCaps) {
        headerText = headerText
          .toLowerCase()
          .split(' ')
          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ');
      }

      // Remove trailing colon for headers
      headerText = headerText.replace(/:+$/, '');

      // Remove trailing punctuation for headers (except ?)
      if (!isQuestion) {
        headerText = headerText.replace(/[.,!;]+$/, '');
      }

      currentSection = headerText;

      if (!sections[currentSection]) {
        sections[currentSection] = [];
      }

      // Don't add the header itself as content
      return;
    }

    // Add to current section or create default section
    if (currentSection === null) {
      currentSection = 'Overview';
      sections[currentSection] = [];
    }

    sections[currentSection].push(trimmed);
  });

  // If no clear headers were found, use smart grouping
  if (!hasFoundHeaders || Object.keys(sections).length <= 1) {
    const allSentences = sentences.map(s => s.trim()).filter(Boolean);
    const grouped = smartGroupSentences(allSentences);

    // Build output from smart groups
    Object.entries(grouped).forEach(([topic, items]) => {
      if (items.length === 0) {return;}

      structured.push(`## ${topic}\n`);
      items.forEach(item => {
        structured.push(`• ${item}`);
      });
      structured.push(''); // Blank line between sections
    });
  } else {
    // Build output from detected sections
    Object.entries(sections).forEach(([header, items]) => {
      if (items.length === 0) {return;}

      // Format header
      structured.push(`## ${header}\n`);

      // Add items as bullets
      items.forEach(item => {
        // Check if already a bullet point
        if (item.match(/^[•\-*]\s/)) {
          structured.push(item);
        } else {
          structured.push(`• ${item}`);
        }
      });

      structured.push(''); // Blank line between sections
    });
  }

  const output = structured.join('\n').trim();

  return {
    output,
    metadata: {
      originalLength: text.split(/\s+/).filter(Boolean).length,
      transformedLength: output.split(/\s+/).filter(Boolean).length
    }
  };
}

// Helper function to group sentences by topic similarity
function smartGroupSentences(sentences: string[]): { [key: string]: string[] } {
  const groups: { [key: string]: string[] } = {};

  // Handle very short input
  if (sentences.length <= 3) {
    return { 'Notes': sentences };
  }

  sentences.forEach((sentence, index) => {
    const sentDoc = nlp(sentence);
    const topics = sentDoc.topics().out('array') as string[];
    const verbs = sentDoc.verbs().out('array') as string[];
    const nouns = sentDoc.nouns().out('array') as string[];

    // Try to find a meaningful group key
    let groupKey = 'General';

    // Priority 1: Use first topic
    if (topics.length > 0) {
      groupKey = topics[0];
    }
    // Priority 2: Use first noun if no topic
    else if (nouns.length > 0) {
      groupKey = nouns[0];
    }
    // Priority 3: Use verb as fallback
    else if (verbs.length > 0) {
      groupKey = verbs[0];
    }
    // First sentence gets special treatment
    else if (index === 0) {
      groupKey = 'Overview';
    }

    // Capitalize and clean group key
    groupKey = groupKey
      .trim()
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ')
      .substring(0, 30); // Limit length

    if (!groups[groupKey]) {
      groups[groupKey] = [];
    }

    groups[groupKey].push(sentence);
  });

  // Merge very small groups (1 item) into a "General" or "Other" section
  const finalGroups: { [key: string]: string[] } = {};
  const smallItems: string[] = [];

  Object.entries(groups).forEach(([key, items]) => {
    if (items.length === 1 && Object.keys(groups).length > 4) {
      // Collect small groups
      smallItems.push(...items);
    } else {
      finalGroups[key] = items;
    }
  });

  // Add small items to a combined section
  if (smallItems.length > 0) {
    if (finalGroups['General']) {
      finalGroups['General'].push(...smallItems);
    } else if (finalGroups['Overview']) {
      finalGroups['Overview'].push(...smallItems);
    } else {
      finalGroups['Additional Notes'] = smallItems;
    }
  }

  return Object.keys(finalGroups).length > 0 ? finalGroups : { 'Notes': sentences };
}
