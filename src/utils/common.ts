/**
 * Common utility functions for the application
 */

/**
 * Throttle function to limit the frequency of function calls
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
 * Debounce function to delay execution until after a pause
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
 * Checks if the current device is mobile
 */
export const isMobileDevice = (): boolean => {
  return (
    typeof window !== "undefined" &&
    ("ontouchstart" in window || navigator.maxTouchPoints > 0)
  );
};

/**
 * Add event listeners with automatic cleanup
 */
export const addEventListeners = (
  element: Window | Document | HTMLElement,
  events: Record<string, EventListener>,
  options?: boolean | AddEventListenerOptions
): (() => void) => {
  Object.entries(events).forEach(([event, handler]) => {
    element.addEventListener(event, handler, options);
  });

  return () => {
    Object.entries(events).forEach(([event, handler]) => {
      element.removeEventListener(event, handler, options);
    });
  };
};
