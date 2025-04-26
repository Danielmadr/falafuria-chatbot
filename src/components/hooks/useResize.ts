import { useState, useEffect, useCallback } from 'react';
import { Size, ResizeConstraints } from '../../types/common';

/**
 * ResizeStart interface represents the initial state when resizing begins,
 * including mouse position and element dimensions
 */
interface ResizeStart extends Size {
  x: number;
  y: number;
}

/**
 * UseResizeProps interface defines the input parameters for the useResize hook
 */
interface UseResizeProps extends ResizeConstraints {
  size: Size;
  setSize: React.Dispatch<React.SetStateAction<Size>>;
}

/**
 * UseResizeResult interface defines the return values from the useResize hook
 */
interface UseResizeResult {
  isResizing: boolean;
  handleResizeStart: (e: React.MouseEvent) => void;
  handleResizeEnd: () => void;
}

/**
 * useResize hook provides functionality for resizing elements with mouse events
 * It manages resize state, handles mouse events, and enforces dimension constraints
 * 
 * @param {UseResizeProps} props - Configuration options for the resize behavior
 * @returns {UseResizeResult} Object containing resize state and event handlers
 */
export const useResize = ({
  size,
  setSize,
  minWidth,
  minHeight,
  maxWidth = Infinity,
  maxHeight = Infinity
}: UseResizeProps): UseResizeResult => {
  const [isResizing, setIsResizing] = useState<boolean>(false);
  const [resizeStart, setResizeStart] = useState<ResizeStart>({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  });

  /**
   * Handles the start of a resize operation
   * Stores initial mouse position and element dimensions
   */
  const handleResizeStart = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    
    setIsResizing(true);
    setResizeStart({
      x: e.clientX,
      y: e.clientY,
      width: size.width,
      height: size.height,
    });
  }, [size.width, size.height]);

  /**
   * Handles mouse movement during a resize operation
   * Calculates new dimensions based on mouse position while respecting constraints
   */
  const handleResizeMove = useCallback((e: MouseEvent) => {
    if (!isResizing) return;

    const deltaX = e.clientX - resizeStart.x;
    const deltaY = e.clientY - resizeStart.y;

    const newWidth = Math.max(
      minWidth,
      Math.min(maxWidth, resizeStart.width + deltaX)
    );
    
    const newHeight = Math.max(
      minHeight,
      Math.min(maxHeight, resizeStart.height + deltaY)
    );

    setSize({ width: newWidth, height: newHeight });
  }, [isResizing, resizeStart, minWidth, minHeight, maxWidth, maxHeight, setSize]);

  /**
   * Handles the end of a resize operation
   */
  const handleResizeEnd = useCallback(() => {
    setIsResizing(false);
  }, []);

  // Add and remove event listeners for resize operations
  useEffect(() => {
    if (isResizing) {
      document.addEventListener('mousemove', handleResizeMove);
      document.addEventListener('mouseup', handleResizeEnd);
      
      // Add a class to the body to prevent text selection during resize
      document.body.classList.add('resize-active');
    }

    // Cleanup function to remove event listeners
    return () => {
      document.removeEventListener('mousemove', handleResizeMove);
      document.removeEventListener('mouseup', handleResizeEnd);
      document.body.classList.remove('resize-active');
    };
  }, [isResizing, handleResizeMove, handleResizeEnd]);

  return { isResizing, handleResizeStart, handleResizeEnd };
};