import { useState, useEffect, useCallback, useMemo, useRef } from "react";
import { Position, Size, WindowSize, DragConstraints } from "../types/common";
import { isMobileDevice, addEventListeners, throttle } from "../utils/common";

/**
 * Props interface for the useDrag hook
 * Contains all parameters needed to implement draggable functionality
 */
interface UseDragProps {
  position: Position; // Current position
  setPosition: React.Dispatch<React.SetStateAction<Position>>; // Function to update position
  windowSize: WindowSize; // Current window dimensions
  size: Size; // Size of the draggable element
  constraints?: DragConstraints; // Optional drag boundaries
}

/**
 * Return type for the useDrag hook
 * Provides drag state and handler functions for consumers
 */
interface UseDragResult {
  isDragging: boolean; // Whether dragging is in progress
  handleDragStart: (e: React.MouseEvent | React.TouchEvent) => void; // Handler for starting drag
  handleTouchStart?: (e: React.TouchEvent) => void; // Optional touch-specific handler
}

/**
 * Custom hook that implements draggable functionality for elements
 *
 * Handles:
 * - Mouse and touch events for cross-device compatibility
 * - Position constraints to keep elements within boundaries
 * - Drag state management
 * - Event cleanup
 *
 * @param props - Configuration options for drag behavior
 * @returns Object containing drag state and event handlers
 */
export const useDrag = ({
  position,
  setPosition,
  windowSize,
  size,
  constraints,
}: UseDragProps): UseDragResult => {
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [dragStart, setDragStart] = useState<Position>({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState<boolean>(false);
  
  // Ref to store the throttled function
  const throttledDragMoveRef = useRef<((e: MouseEvent | TouchEvent) => void) | null>(null);

  // Check if we're on a mobile device for different event handling
  useEffect(() => {
    setIsMobile(isMobileDevice());
  }, []);

  // Memoize the constraints calculation to avoid recreating on every render
  const effectiveConstraints = useMemo(() => {
    return (
      constraints || {
        minX: 0,
        minY: 0,
        maxX: Math.max(0, windowSize.width - size.width),
        maxY: Math.max(0, windowSize.height - size.height),
      }
    );
  }, [
    constraints,
    windowSize.width,
    windowSize.height,
    size.width,
    size.height,
  ]);

  /**
   * Determines if the target element should prevent dragging
   * Used to avoid dragging when interacting with controls within the draggable area
   *
   * @param target - DOM element that received the event
   * @returns true if dragging should be prevented
   */
  const shouldPreventDrag = useCallback((target: HTMLElement): boolean => {
    return (
      target instanceof HTMLButtonElement ||
      target instanceof HTMLInputElement ||
      target instanceof HTMLTextAreaElement ||
      (target instanceof HTMLElement &&
        (target.classList.contains("resize-handle") ||
          !!target.closest("button") ||
          !!target.closest("input") ||
          !!target.closest("textarea")))
    );
  }, []);

  /**
   * Handles the start of a drag operation via mouse or touch
   * Stores initial position information and sets dragging state
   *
   * @param e - Mouse or touch event that initiated the drag
   */
  const handleDragStart = useCallback(
    (e: React.MouseEvent | React.TouchEvent) => {
      // Prevent drag if clicking on interactive elements
      const target = e.target as HTMLElement;
      if (shouldPreventDrag(target)) {
        return;
      }

      e.preventDefault();
      setIsDragging(true);

      if ("touches" in e) {
        // Touch event
        setDragStart({
          x: e.touches[0].clientX - position.x,
          y: e.touches[0].clientY - position.y,
        });
      } else {
        // Mouse event
        setDragStart({
          x: (e as React.MouseEvent).clientX - position.x,
          y: (e as React.MouseEvent).clientY - position.y,
        });
      }
    },
    [position, shouldPreventDrag]
  );

  /**
   * Handles mouse/touch movement during a drag operation
   * Calculates new position based on movement while respecting constraints
   *
   * @param e - Mouse or touch move event
   */
  const handleDragMove = useCallback(
    (e: MouseEvent | TouchEvent) => {
      if (!isDragging) return;

      let clientX: number, clientY: number;

      if ("touches" in e) {
        // Touch event
        clientX = e.touches[0].clientX;
        clientY = e.touches[0].clientY;
      } else {
        // Mouse event
        clientX = (e as MouseEvent).clientX;
        clientY = (e as MouseEvent).clientY;
      }

      // Calculate new position with constraints
      const newX = Math.max(
        effectiveConstraints.minX,
        Math.min(effectiveConstraints.maxX, clientX - dragStart.x)
      );
      const newY = Math.max(
        effectiveConstraints.minY,
        Math.min(effectiveConstraints.maxY, clientY - dragStart.y)
      );

      setPosition({ x: newX, y: newY });
    },
    [isDragging, dragStart, effectiveConstraints, setPosition]
  );

  /**
   * Handles the end of a drag operation
   * Resets dragging state when mouse/touch is released
   */
  const handleDragEnd = useCallback(() => {
    setIsDragging(false);
  }, []);

  // Setup and cleanup event listeners
  useEffect(() => {
    if (!isDragging) return;

    // Create throttled version of drag move handler
    throttledDragMoveRef.current = throttle(handleDragMove, 16); // ~60fps

    // Add drag-related classes to body for UI feedback
    document.body.classList.add("dragging");

    let cleanup: () => void;

    if (isMobile) {
      // Touch event listeners for mobile devices
      cleanup = addEventListeners(
        document,
        {
          touchmove: throttledDragMoveRef.current as EventListener,
          touchend: handleDragEnd,
          touchcancel: handleDragEnd,
        },
        { passive: false } // Allow preventDefault in touchmove
      );
    } else {
      // Mouse event listeners for desktop
      document.body.style.cursor = "grabbing";
      cleanup = addEventListeners(document, {
        mousemove: throttledDragMoveRef.current as EventListener,
        mouseup: handleDragEnd,
        mouseleave: handleDragEnd, // Handle mouse leaving window
      });
    }

    // Clean up function registered here to handle component unmount during drag
    return () => {
      cleanup();
      document.body.classList.remove("dragging");
      if (!isMobile) {
        document.body.style.cursor = "";
      }
      // Reset throttled function reference
      throttledDragMoveRef.current = null;
    };
  }, [isDragging, handleDragMove, handleDragEnd, isMobile]);

  return {
    isDragging,
    handleDragStart,
    // Pass additional handlers for direct touch events
    handleTouchStart: isMobile ? handleDragStart : undefined,
  };
};