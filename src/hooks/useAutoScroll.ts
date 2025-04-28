import { useEffect } from 'react';

/**
 * Custom hook to handle auto-scrolling to the bottom of a container
 * when new messages are added or visibility changes
 * 
 * @param ref Reference to the element to scroll into view
 * @param dependencyCount A value that changes when content is added (like messages.length)
 * @param isVisible Whether the container is currently visible
 * @param delay Optional delay before scrolling (default: 100ms)
 */
export const useAutoScroll = (
  ref: React.RefObject<HTMLDivElement | null>,
  dependencyCount: number,
  isVisible: boolean,
  delay: number = 100
) => {
  useEffect(() => {
    // Skip scrolling if content is not visible or there's nothing to scroll to
    if (!isVisible || dependencyCount === 0) return;
    
    // Debounce the scroll to handle rapid updates
    const scrollTimeout = setTimeout(() => {
      if (ref.current) {
        ref.current.scrollIntoView({ 
          behavior: "smooth", 
          block: "end" 
        });
      }
    }, delay);
    
    // Clean up timeout to prevent memory leaks
    return () => clearTimeout(scrollTimeout);
  }, [dependencyCount, isVisible, ref, delay]);
};