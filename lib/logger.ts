/**
 * Production-Safe Logging Utility
 * Environment-aware logging with proper error tracking and analytics integration
 */

import { event } from '@/lib/analytics'

export type LogLevel = 'debug' | 'info' | 'warn' | 'error'

// Log entry interface for internal use (currently unused but kept for future analytics)
// interface LogEntry {
//   level: LogLevel
//   message: string
//   data?: unknown
//   timestamp: string
//   context?: string
// }

class Logger {
  private isDevelopment = process.env.NODE_ENV === 'development'
  private isProduction = process.env.NODE_ENV === 'production'

  /**
   * Log debug messages (development only)
   */
  debug(message: string, data?: unknown): void {
    if (this.isDevelopment) {
      console.debug(`[DEBUG] ${message}`, data || '')
    }
  }

  /**
   * Log info messages (development only)
   */
  info(message: string, data?: unknown): void {
    if (this.isDevelopment) {
      console.info(`[INFO] ${message}`, data || '')
    }
  }

  /**
   * Log warnings (development + production with analytics)
   */
  warn(message: string, data?: unknown, context?: string): void {
    if (this.isDevelopment) {
      console.warn(`[WARN] ${message}`, data || '')
    }

    // Track warnings in production for monitoring
    if (this.isProduction && typeof window !== 'undefined') {
      this.trackLogEvent('warn', message, data, context)
    }
  }

  /**
   * Log errors (always logged, tracked in production)
   */
  error(message: string, data?: unknown, context?: string): void {
    // Always log errors for debugging
    console.error(`[ERROR] ${message}`, data || '')

    // Track errors in production for monitoring
    if (this.isProduction && typeof window !== 'undefined') {
      this.trackLogEvent('error', message, data, context)
    }
  }

  /**
   * Track log events in production for monitoring
   */
  private trackLogEvent(level: LogLevel, message: string, data?: unknown, context?: string): void {
    try {
      event({
        action: 'log_event',
        category: 'logging',
        label: `${level}_${context || 'general'}_${message.substring(0, 50)}`,
        value: 1
      })
    } catch (error) {
      // Fallback to console if analytics fails
      console.error('Failed to track log event:', error)
    }
  }

  /**
   * Create a scoped logger for specific contexts
   */
  createScopedLogger(context: string): ScopedLogger {
    return new ScopedLogger(this, context)
  }

  /**
   * Log performance metrics (development only)
   */
  performance(metric: string, value: number, context?: string): void {
    if (this.isDevelopment) {
      console.log(`[PERF] ${metric}: ${value}ms`, context ? `(${context})` : '')
    }
  }

  /**
   * Log user actions (development + production analytics)
   */
  userAction(action: string, data?: unknown, context?: string): void {
    if (this.isDevelopment) {
      console.log(`[USER] ${action}`, data || '')
    }

    // Track user actions in production
    if (this.isProduction && typeof window !== 'undefined') {
      this.trackLogEvent('info', `user_action_${action}`, data, context)
    }
  }
}

/**
 * Scoped logger for specific contexts
 */
class ScopedLogger {
  constructor(
    private logger: Logger,
    private context: string
  ) {}

  debug(message: string, data?: unknown): void {
    this.logger.debug(message, data)
  }

  info(message: string, data?: unknown): void {
    this.logger.info(message, data)
  }

  warn(message: string, data?: unknown): void {
    this.logger.warn(message, data, this.context)
  }

  error(message: string, data?: unknown): void {
    this.logger.error(message, data, this.context)
  }

  performance(metric: string, value: number): void {
    this.logger.performance(metric, value, this.context)
  }

  userAction(action: string, data?: unknown): void {
    this.logger.userAction(action, data, this.context)
  }
}

// Create singleton instance
const logger = new Logger()

// Export both the instance and the class
export default logger
export { Logger, ScopedLogger }

// Convenience exports for common use cases
export const logError = (message: string, data?: unknown, context?: string) => logger.error(message, data, context)
export const logWarn = (message: string, data?: unknown, context?: string) => logger.warn(message, data, context)
export const logInfo = (message: string, data?: unknown) => logger.info(message, data)
export const logDebug = (message: string, data?: unknown) => logger.debug(message, data)
