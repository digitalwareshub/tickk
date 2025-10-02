/**
 * TypeScript interfaces for Web Speech API
 * These provide proper typing for Speech Recognition functionality
 */

export interface SpeechRecognitionResult {
  transcript: string
  confidence: number
}

export interface SpeechRecognitionResultList {
  readonly length: number
  item(index: number): SpeechRecognitionResultWithAlternatives
  [index: number]: SpeechRecognitionResultWithAlternatives
}

export interface SpeechRecognitionAlternative {
  transcript: string
  confidence: number
}

export interface SpeechRecognitionResultWithAlternatives {
  readonly length: number
  item(index: number): SpeechRecognitionAlternative
  [index: number]: SpeechRecognitionAlternative
  isFinal: boolean
}

export interface SpeechRecognitionEvent extends Event {
  readonly resultIndex: number
  readonly results: SpeechRecognitionResultList
}

export interface SpeechRecognitionErrorEvent extends Event {
  readonly error: string
  readonly message: string
}

export interface SpeechGrammarList {
  readonly length: number
  item(index: number): SpeechGrammar
  addFromURI(src: string, weight?: number): void
  addFromString(string: string, weight?: number): void
}

export interface SpeechGrammar {
  src: string
  weight: number
}

export interface SpeechRecognition extends EventTarget {
  continuous: boolean
  interimResults: boolean
  lang: string
  maxAlternatives: number
  serviceURI: string
  grammars: SpeechGrammarList
  
  start(): void
  stop(): void
  abort(): void
  
  onstart: ((this: SpeechRecognition, ev: Event) => unknown) | null
  onend: ((this: SpeechRecognition, ev: Event) => unknown) | null
  onerror: ((this: SpeechRecognition, ev: SpeechRecognitionErrorEvent) => unknown) | null
  onresult: ((this: SpeechRecognition, ev: SpeechRecognitionEvent) => unknown) | null
  onnomatch: ((this: SpeechRecognition, ev: SpeechRecognitionEvent) => unknown) | null
  onsoundstart: ((this: SpeechRecognition, ev: Event) => unknown) | null
  onsoundend: ((this: SpeechRecognition, ev: Event) => unknown) | null
  onspeechstart: ((this: SpeechRecognition, ev: Event) => unknown) | null
  onspeechend: ((this: SpeechRecognition, ev: Event) => unknown) | null
  onaudiostart: ((this: SpeechRecognition, ev: Event) => unknown) | null
  onaudioend: ((this: SpeechRecognition, ev: Event) => unknown) | null
}

export interface SpeechRecognitionStatic {
  new (): SpeechRecognition
}

export interface Window {
  SpeechRecognition: SpeechRecognitionStatic
  webkitSpeechRecognition: SpeechRecognitionStatic
}

declare global {
  interface Window {
    SpeechRecognition: SpeechRecognitionStatic
    webkitSpeechRecognition: SpeechRecognitionStatic
  }
}
