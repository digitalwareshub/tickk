declare module 'es-compromise' {
  interface SpanishNLP {
    (text: string): any;
  }
  
  const nlp: SpanishNLP;
  export default nlp;
}
