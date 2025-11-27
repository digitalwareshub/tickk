/**
 * Polish Transformer
 * Fixes contractions, typos, grammar, and formatting
 * Ported from SharpNotes for Tickk Pro
 */

import nlp from 'compromise';
import type { TransformResult } from '@/types/transform';

export function polishText(text: string): TransformResult {
  if (!text.trim()) {
    return {
      output: '',
      metadata: {
        originalLength: 0,
        transformedLength: 0
      }
    };
  }

  // Step 1: Basic cleanup
  let polished = text
    .replace(/\s+/g, ' ') // Multiple spaces → single space
    .replace(/\s+([.,!?;:])/g, '$1') // Remove space before punctuation
    .replace(/([.,!?;:])\s*([A-Za-z])/g, '$1 $2') // Ensure space after punctuation
    .trim();

  // Step 2: Fix common contractions
  const contractionFixes: { [key: string]: string } = {
    'dont': "don't",
    'cant': "can't",
    'wont': "won't",
    'didnt': "didn't",
    'doesnt': "doesn't",
    'isnt': "isn't",
    'arent': "aren't",
    'wasnt': "wasn't",
    'werent': "weren't",
    'hasnt': "hasn't",
    'havent': "haven't",
    'hadnt': "hadn't",
    'wouldnt': "wouldn't",
    'couldnt': "couldn't",
    'shouldnt': "shouldn't",
    'ive': "I've",
    'im': "I'm",
    'ill': "I'll",
    'id': "I'd",
    'youre': "you're",
    'youve': "you've",
    'youll': "you'll",
    'youd': "you'd",
    'theyre': "they're",
    'theyve': "they've",
    'theyll': "they'll",
    'theyd': "they'd",
    'were': "we're",
    'weve': "we've",
    'well': "we'll",
    'wed': "we'd",
    'hes': "he's",
    'shes': "she's",
    'its': "it's",
    'thats': "that's",
    'whats': "what's",
    'wheres': "where's",
    'whos': "who's",
    'hows': "how's",
    'theres': "there's"
  };

  Object.entries(contractionFixes).forEach(([wrong, right]) => {
    const regex = new RegExp(`\\b${wrong}\\b`, 'gi');
    polished = polished.replace(regex, (match) => {
      // Preserve original case for first letter
      if (match.charAt(0) === match.charAt(0).toUpperCase()) {
        return right.charAt(0).toUpperCase() + right.slice(1);
      }
      return right;
    });
  });

  // Step 3: Fix common typos
  const typoMap: { [key: string]: string } = {
    'teh': 'the',
    'adn': 'and',
    'nad': 'and',
    'hte': 'the',
    'taht': 'that',
    'waht': 'what',
    'wiht': 'with',
    'recieve': 'receive',
    'occured': 'occurred',
    'occuring': 'occurring',
    'thier': 'their',
    'truely': 'truly',
    'untill': 'until',
    'begining': 'beginning',
    'beleive': 'believe',
    'seperate': 'separate',
    'definately': 'definitely',
    'goverment': 'government',
    'occassion': 'occasion',
    'recomend': 'recommend',
    'accomodate': 'accommodate',
    'basicly': 'basically',
    'succesful': 'successful',
    'neccessary': 'necessary',
    'tommorrow': 'tomorrow',
    'wich': 'which',
    'becuase': 'because'
  };

  Object.entries(typoMap).forEach(([wrong, right]) => {
    const regex = new RegExp(`\\b${wrong}\\b`, 'gi');
    polished = polished.replace(regex, right);
  });

  // Step 4: Fix "i" → "I"
  polished = polished.replace(/\bi\b/g, 'I');

  // Step 5: Use NLP to fix sentence capitalization
  const doc = nlp(polished);

  // Capitalize first word of each sentence
  const sentences = doc.sentences();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  sentences.forEach((sentence: any) => {
    const sentText = sentence.out('text');
    if (sentText.length > 0) {
      const capitalized = sentText.charAt(0).toUpperCase() + sentText.slice(1);
      sentence.replaceWith(capitalized);
    }
  });

  polished = doc.out('text');

  // Step 6: Ensure proper punctuation at end of sentences
  const sentenceArray = polished.split(/([.!?])\s+/);
  const fixedSentences: string[] = [];

  for (let i = 0; i < sentenceArray.length; i += 2) {
    let sentence = sentenceArray[i]?.trim();
    const punct = sentenceArray[i + 1] || '';

    if (!sentence) {continue;}

    // If sentence doesn't end with punctuation, add period
    if (!sentence.match(/[.!?]$/) && punct === '') {
      sentence += '.';
    }

    fixedSentences.push(sentence + punct);
  }

  polished = fixedSentences.join(' ').trim();

  // Step 7: Fix multiple punctuation
  polished = polished
    .replace(/\.{2,}/g, '...') // Multiple periods → ellipsis
    .replace(/!{2,}/g, '!') // Multiple exclamation → single
    .replace(/\?{2,}/g, '?') // Multiple question → single
    .replace(/([.!?])\1+/g, '$1'); // Remove duplicate end punctuation

  // Step 8: Fix spacing around quotes
  polished = polished
    .replace(/\s+"/g, ' "') // Space before opening quote
    .replace(/"\s+/g, '" ') // Space after closing quote
    .replace(/"\s+([.,!?;:])/g, '"$1'); // No space between quote and punctuation

  // Step 9: Capitalize proper nouns (NLP will handle this)
  const finalDoc = nlp(polished);

  // Capitalize people names
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  finalDoc.people().forEach((person: any) => {
    const name = person.out('text');
    const capitalized = name
      .split(' ')
      .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
    person.replaceWith(capitalized);
  });

  // Capitalize places
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  finalDoc.places().forEach((place: any) => {
    const name = place.out('text');
    const capitalized = name
      .split(' ')
      .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
    place.replaceWith(capitalized);
  });

  polished = finalDoc.out('text');

  return {
    output: polished,
    metadata: {
      originalLength: text.split(/\s+/).filter(Boolean).length,
      transformedLength: polished.split(/\s+/).filter(Boolean).length
    }
  };
}
