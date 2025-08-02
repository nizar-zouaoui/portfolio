/**
 * Secure ID generation utility
 */

/**
 * Generates a cryptographically secure random ID
 * Falls back to Math.random if crypto is not available
 */
export const generateSecureId = (): string => {
  try {
    // Use crypto.getRandomValues if available (browser environment)
    if (typeof crypto !== "undefined" && crypto.getRandomValues) {
      const array = new Uint8Array(16);
      crypto.getRandomValues(array);
      return Array.from(array, (byte) =>
        byte.toString(16).padStart(2, "0")
      ).join("");
    }

    // Use crypto.randomBytes if available (Node.js environment)
    if (typeof require !== "undefined") {
      try {
        const crypto = require("crypto");
        return crypto.randomBytes(16).toString("hex");
      } catch (e) {
        // Fall through to Math.random
      }
    }
  } catch (e) {
    console.warn(
      "Secure random generation failed, falling back to Math.random"
    );
  }

  // Fallback to Math.random with timestamp for better uniqueness
  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).substring(2, 15);
  return `${timestamp}-${random}`;
};

/**
 * Enhanced timer management with automatic cleanup
 */
export class TimerManager {
  private timers = new Set<NodeJS.Timeout>();

  setTimeout(callback: () => void, delay: number): NodeJS.Timeout {
    const timer = setTimeout(() => {
      this.timers.delete(timer);
      callback();
    }, delay);

    this.timers.add(timer);
    return timer;
  }

  clearTimeout(timer: NodeJS.Timeout): void {
    clearTimeout(timer);
    this.timers.delete(timer);
  }

  clearAll(): void {
    this.timers.forEach((timer) => clearTimeout(timer));
    this.timers.clear();
  }

  cleanup(): void {
    this.clearAll();
  }
}
