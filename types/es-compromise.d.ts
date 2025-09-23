declare module 'es-compromise' {
  interface SpanishDoc {
    text(): string;
    has(tag: string): boolean;
    match(pattern: string): SpanishDoc;
    tag(tag: string): SpanishDoc;
    length: number;
  }

  interface SpanishNLP {
    (text: string): SpanishDoc;
  }
  
  const nlp: SpanishNLP;
  export default nlp;
}
