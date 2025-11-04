/**
 * Retry Utility
 * Provides automatic retry logic with exponential backoff for failed operations
 */

export interface RetryOptions {
  maxRetries?: number
  initialDelayMs?: number
  maxDelayMs?: number
  backoffMultiplier?: number
  onRetry?: (attempt: number, error: Error) => void
}

/**
 * Retry an async operation with exponential backoff
 * 
 * @param operation - The async function to retry
 * @param options - Retry configuration options
 * @returns Promise that resolves with the operation result or rejects with the last error
 * 
 * @example
 * ```typescript
 * const result = await retryOperation(
 *   () => saveToStorage(data),
 *   { maxRetries: 3, initialDelayMs: 1000 }
 * )
 * ```
 */
export async function retryOperation<T>(
  operation: () => Promise<T>,
  options: RetryOptions = {}
): Promise<T> {
  const {
    maxRetries = 3,
    initialDelayMs = 1000,
    maxDelayMs = 10000,
    backoffMultiplier = 2,
    onRetry
  } = options

  let lastError: Error
  let currentDelay = initialDelayMs

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      return await operation()
    } catch (error) {
      lastError = error instanceof Error ? error : new Error(String(error))
      
      // If this was the last attempt, throw the error
      if (attempt === maxRetries) {
        throw lastError
      }

      // Call retry callback if provided
      if (onRetry) {
        onRetry(attempt + 1, lastError)
      }

      // Log retry attempt
      console.log(`Retry attempt ${attempt + 1}/${maxRetries} after ${currentDelay}ms:`, lastError.message)

      // Wait before next retry with exponential backoff
      await delay(currentDelay)
      
      // Increase delay for next retry, but cap at maxDelayMs
      currentDelay = Math.min(currentDelay * backoffMultiplier, maxDelayMs)
    }
  }

  // TypeScript: This should never be reached, but needed for type safety
  throw lastError!
}

/**
 * Retry an operation with a condition check
 * Useful for polling or waiting for a condition to be met
 * 
 * @param operation - Function that returns the value to check
 * @param condition - Function that returns true when the operation succeeded
 * @param options - Retry configuration options
 * @returns Promise that resolves when condition is met or rejects after max retries
 * 
 * @example
 * ```typescript
 * const element = await retryUntil(
 *   () => document.querySelector('.my-element'),
 *   (el) => el !== null,
 *   { maxRetries: 10, initialDelayMs: 100 }
 * )
 * ```
 */
export async function retryUntil<T>(
  operation: () => T | Promise<T>,
  condition: (result: T) => boolean,
  options: RetryOptions = {}
): Promise<T> {
  const {
    maxRetries = 3,
    initialDelayMs = 1000,
    maxDelayMs = 10000,
    backoffMultiplier = 2,
    onRetry
  } = options

  let currentDelay = initialDelayMs

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    const result = await operation()
    
    if (condition(result)) {
      return result
    }

    // If this was the last attempt, throw an error
    if (attempt === maxRetries) {
      throw new Error(`Condition not met after ${maxRetries} retries`)
    }

    // Call retry callback if provided
    if (onRetry) {
      const error = new Error('Condition not met')
      onRetry(attempt + 1, error)
    }

    // Wait before next retry
    await delay(currentDelay)
    
    // Increase delay for next retry
    currentDelay = Math.min(currentDelay * backoffMultiplier, maxDelayMs)
  }

  throw new Error('Retry failed')
}

/**
 * Retry an operation that might throw specific errors
 * Only retries on specific error types
 * 
 * @param operation - The async function to retry
 * @param shouldRetry - Function that determines if error should be retried
 * @param options - Retry configuration options
 * @returns Promise that resolves with the operation result
 * 
 * @example
 * ```typescript
 * const result = await retryOnError(
 *   () => fetchData(),
 *   (error) => error.message.includes('network'),
 *   { maxRetries: 3 }
 * )
 * ```
 */
export async function retryOnError<T>(
  operation: () => Promise<T>,
  shouldRetry: (error: Error) => boolean,
  options: RetryOptions = {}
): Promise<T> {
  const {
    maxRetries = 3,
    initialDelayMs = 1000,
    maxDelayMs = 10000,
    backoffMultiplier = 2,
    onRetry
  } = options

  let currentDelay = initialDelayMs

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      return await operation()
    } catch (error) {
      const err = error instanceof Error ? error : new Error(String(error))
      
      // Check if we should retry this error
      if (!shouldRetry(err)) {
        throw err
      }

      // If this was the last attempt, throw the error
      if (attempt === maxRetries) {
        throw err
      }

      // Call retry callback if provided
      if (onRetry) {
        onRetry(attempt + 1, err)
      }

      // Wait before next retry
      await delay(currentDelay)
      
      // Increase delay for next retry
      currentDelay = Math.min(currentDelay * backoffMultiplier, maxDelayMs)
    }
  }

  throw new Error('Retry failed')
}

/**
 * Delay execution for a specified time
 */
function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms))
}

/**
 * Wrap a function to automatically retry on failure
 * Returns a new function with retry logic built-in
 * 
 * @example
 * ```typescript
 * const saveWithRetry = withRetry(saveToStorage, { maxRetries: 3 })
 * await saveWithRetry(data)
 * ```
 */
export function withRetry<T extends (...args: unknown[]) => Promise<unknown>>(
  fn: T,
  options: RetryOptions = {}
): T {
  return ((...args: Parameters<T>) => {
    return retryOperation(() => fn(...args), options)
  }) as T
}
