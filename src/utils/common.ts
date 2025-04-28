/**
 * @module utils/common
 * @description Core utility functions for performance optimization, device detection,
 * and event handling that are used throughout the application.
 */

/**
 * Creates a throttled version of a function that limits how often it can be called.
 * This is useful for high-frequency events like scrolling, resizing, or mousemove.
 *
 * @template T - Function type with any number and type of parameters
 * @param {T} func - The function to throttle
 * @param {number} limit - The time limit in milliseconds between function calls
 * @returns {(...args: Parameters<T>) => void} Throttled function
 */
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean = false;
  return function (this: any, ...args: Parameters<T>): void {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

/**
 * Creates a debounced version of a function that delays execution until
 * after a pause in invocations. This is useful for operations that should
 * only happen after a user has finished a rapid succession of events.
 *
 * @template T - Function type with any number and type of parameters
 * @param {T} func - The function to debounce
 * @param {number} wait - The delay in milliseconds before executing the function
 * @returns {(...args: Parameters<T>) => void} Debounced function
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout> | null = null;

  return function (this: any, ...args: Parameters<T>): void {
    const later = () => {
      timeout = null;
      func.apply(this, args);
    };

    if (timeout !== null) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(later, wait);
  };
}

/**
 * Detects if the current device is a mobile or touch-enabled device.
 * Uses feature detection for touch capability rather than user agent sniffing.
 *
 * @returns {boolean} True if the device is mobile/touch-enabled, false otherwise
 */
export const isMobileDevice = (): boolean => {
  return (
    typeof window !== "undefined" &&
    ("ontouchstart" in window || navigator.maxTouchPoints > 0)
  );
};

/**
 * Adds multiple event listeners to an element with a unified cleanup function.
 * This utility simplifies managing multiple event listeners and ensures proper cleanup.
 *
 * @param {Window | Document | HTMLElement} element - The element to attach listeners to
 * @param {Record<string, EventListener>} events - Object mapping event names to handlers
 * @param {boolean | AddEventListenerOptions} [options] - Optional event listener options
 * @returns {() => void} A cleanup function that removes all attached listeners
 */
export const addEventListeners = (
  element: Window | Document | HTMLElement,
  events: Record<string, EventListener>,
  options?: boolean | AddEventListenerOptions
): (() => void) => {
  // Attach all event listeners
  Object.entries(events).forEach(([event, handler]) => {
    element.addEventListener(event, handler, options);
  });

  // Return a cleanup function
  return () => {
    Object.entries(events).forEach(([event, handler]) => {
      element.removeEventListener(event, handler, options);
    });
  };
};
