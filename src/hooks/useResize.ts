/**
 * @module hooks/useResize
 * @description A custom React hook that implements resizing functionality for UI elements.
 * This hook provides mouse event handlers and state management for resizing operations
 * while enforcing size constraints.
 */

import { useState, useEffect, useCallback, useRef } from "react";
import { Size, ResizeConstraints } from "../types/common";
import { addEventListeners, throttle } from "../utils/common";

/**
 * Represents the initial state when a resize operation begins.
 * Stores initial mouse coordinates and element dimensions for reference.
 *
 * @interface ResizeStart
 * @extends Size
 * @property {number} x - Initial mouse X coordinate
 * @property {number} y - Initial mouse Y coordinate
 * @property {number} width - Initial element width
 * @property {number} height - Initial element height
 */
interface ResizeStart extends Size {
  x: number;
  y: number;
}

/**
 * Input props for the useResize hook.
 *
 * @interface UseResizeProps
 * @extends ResizeConstraints
 * @property {Size} size - Current size of the resizable element
 * @property {Function} setSize - State setter function to update element size
 */
interface UseResizeProps extends ResizeConstraints {
  size: Size;
  setSize: React.Dispatch<React.SetStateAction<Size>>;
}

/**
 * Return values from the useResize hook.
 *
 * @interface UseResizeResult
 * @property {boolean} isResizing - Flag indicating if a resize operation is in progress
 * @property {Function} handleResizeStart - Event handler to initiate resizing
 * @property {Function} handleResizeEnd - Event handler to terminate resizing
 */
interface UseResizeResult {
  isResizing: boolean;
  handleResizeStart: (e: React.MouseEvent) => void;
  handleResizeEnd: () => void;
}

/**
 * Custom hook that provides resizing functionality for UI elements.
 * Handles mouse events, manages resize state, and enforces dimension constraints.
 *
 * @param {UseResizeProps} props - Configuration options and state setters
 * @returns {UseResizeResult} Object containing resize state and event handlers
 */
export const useResize = ({
  size,
  setSize,
  minWidth,
  minHeight,
  maxWidth = Infinity,
  maxHeight = Infinity,
}: UseResizeProps): UseResizeResult => {
  const [isResizing, setIsResizing] = useState<boolean>(false);
  const [resizeStart, setResizeStart] = useState<ResizeStart>({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  });
  
  // Ref to store the throttled function
  const throttledResizeMoveRef = useRef<((e: MouseEvent) => void) | null>(null);

  /**
   * Initiates a resize operation when the user presses the mouse button.
   * Captures initial mouse position and element dimensions.
   *
   * @param {React.MouseEvent} e - Mouse event object
   */
  const handleResizeStart = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      e.preventDefault();

      setIsResizing(true);
      setResizeStart({
        x: e.clientX,
        y: e.clientY,
        width: size.width,
        height: size.height,
      });
    },
    [size.width, size.height]
  );

  /**
   * Handles mouse movement during a resize operation.
   * Calculates new dimensions based on mouse position delta and applies constraints.
   *
   * @param {MouseEvent} e - Mouse movement event
   */
  const handleResizeMove = useCallback(
    (e: MouseEvent) => {
      if (!isResizing) return;

      // Calculate change in mouse position
      const deltaX = e.clientX - resizeStart.x;
      const deltaY = e.clientY - resizeStart.y;

      // Apply changes to width/height with constraints
      const newWidth = Math.max(
        minWidth,
        Math.min(maxWidth, resizeStart.width + deltaX)
      );

      const newHeight = Math.max(
        minHeight,
        Math.min(maxHeight, resizeStart.height + deltaY)
      );

      setSize({ width: newWidth, height: newHeight });
    },
    [isResizing, resizeStart, minWidth, minHeight, maxWidth, maxHeight, setSize]
  );

  /**
   * Terminates a resize operation when the user releases the mouse button.
   */
  const handleResizeEnd = useCallback(() => {
    setIsResizing(false);
  }, []);

  // Setup and cleanup event listeners for resize operations
  useEffect(() => {
    if (!isResizing) return;

    // Create throttled version of resize move handler (~60fps)
    throttledResizeMoveRef.current = throttle(handleResizeMove, 16);

    // Add a class to prevent text selection during resize
    document.body.classList.add("resize-active");

    // Add global event listeners to track mouse movement
    const removeListeners = addEventListeners(document, {
      mousemove: throttledResizeMoveRef.current as EventListener,
      mouseup: handleResizeEnd,
    });

    // Cleanup function removes event listeners when component unmounts
    // or when resize operation ends
    return () => {
      removeListeners();
      document.body.classList.remove("resize-active");
      // Reset throttled function reference
      throttledResizeMoveRef.current = null;
    };
  }, [isResizing, handleResizeMove, handleResizeEnd]);

  return { isResizing, handleResizeStart, handleResizeEnd };
};