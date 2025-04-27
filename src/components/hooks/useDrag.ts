// hooks/useDrag.ts
import { useState, useEffect, useCallback } from 'react';
import { Position, Size, WindowSize, DragConstraints } from '../../types/common';
import { throttle, isMobileDevice, addEventListeners } from '../utils/common';

/**
 * UseDragProps interface defines the properties for the useDrag hook
 */
interface UseDragProps {
  position: Position;
  setPosition: React.Dispatch<React.SetStateAction<Position>>;
  windowSize: WindowSize;
  size: Size;
  constraints?: DragConstraints;
}

/**
 * UseDragResult interface defines the return values from the useDrag hook
 */
interface UseDragResult {
  isDragging: boolean;
  handleDragStart: (e: React.MouseEvent | React.TouchEvent) => void;
  handleTouchStart?: (e: React.TouchEvent) => void;
}

/**
 * useDrag hook manages the dragging functionality for elements.
 * It handles mouse and touch events, position constraints, and drag state.
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

  // Check if we're on a mobile device for different event handling
  useEffect(() => {
    setIsMobile(isMobileDevice());
  }, []);

  // Default constraints if none provided
  const effectiveConstraints = constraints || {
    minX: 0,
    minY: 0,
    maxX: Math.max(0, windowSize.width - size.width),
    maxY: Math.max(0, windowSize.height - size.height)
  };

  /**
   * Determines if the target element should prevent dragging
   */
  const shouldPreventDrag = useCallback((target: HTMLElement): boolean => {
    return (
      target instanceof HTMLButtonElement ||
      target instanceof HTMLInputElement ||
      target instanceof HTMLTextAreaElement ||
      (target instanceof HTMLElement && (
        target.classList.contains('resize-handle') ||
        target.closest('button') || 
        target.closest('input') ||
        target.closest('textarea')
      ))
    );
  }, []);

  /**
   * Handles the start of a drag operation via mouse or touch
   */
  const handleDragStart = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    // Prevent drag if clicking on interactive elements
    const target = e.target as HTMLElement;
    if (shouldPreventDrag(target)) {
      return;
    }

    e.preventDefault();
    setIsDragging(true);
    
    if ('touches' in e) {
      // Touch event
      setDragStart({ 
        x: e.touches[0].clientX - position.x, 
        y: e.touches[0].clientY - position.y 
      });
    } else {
      // Mouse event
      setDragStart({ 
        x: (e as React.MouseEvent).clientX - position.x, 
        y: (e as React.MouseEvent).clientY - position.y 
      });
    }
  }, [position, shouldPreventDrag]);

  /**
   * Handles mouse/touch movement during a drag operation
   */
  const handleDragMove = useCallback((e: MouseEvent | TouchEvent) => {
    if (!isDragging) return;

    let clientX: number, clientY: number;
    
    if ('touches' in e) {
      // Touch event
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      // Mouse event
      clientX = (e as MouseEvent).clientX;
      clientY = (e as MouseEvent).clientY;
    }

    const newX = Math.max(
      effectiveConstraints.minX,
      Math.min(effectiveConstraints.maxX, clientX - dragStart.x)
    );
    const newY = Math.max(
      effectiveConstraints.minY,
      Math.min(effectiveConstraints.maxY, clientY - dragStart.y)
    );
    
    setPosition({ x: newX, y: newY });
  }, [isDragging, dragStart, effectiveConstraints, setPosition]);

  // Create throttled version of move handler
  const throttledHandleDragMove = useCallback(
    throttle(handleDragMove, 16), // ~60fps
    [handleDragMove]
  );

  /**
   * Handles the end of a drag operation
   */
  const handleDragEnd = useCallback(() => {
    setIsDragging(false);
  }, []);

  // Setup and cleanup event listeners
  useEffect(() => {
    if (!isDragging) return;
    
    // Add drag-related classes to body for UI feedback
    document.body.classList.add('dragging');
    
    let cleanup: () => void;
    
    if (isMobile) {
      cleanup = addEventListeners(document, {
        'touchmove': throttledHandleDragMove as EventListener,
        'touchend': handleDragEnd,
        'touchcancel': handleDragEnd
      }, { passive: false });
    } else {
      document.body.style.cursor = 'grabbing';
      cleanup = addEventListeners(document, {
        'mousemove': throttledHandleDragMove as EventListener,
        'mouseup': handleDragEnd,
        'mouseleave': handleDragEnd
      });
    }

    // Clean up function registered here to handle component unmount during drag
    return () => {
      cleanup();
      document.body.classList.remove('dragging');
      if (!isMobile) {
        document.body.style.cursor = '';
      }
    };
  }, [isDragging, throttledHandleDragMove, handleDragEnd, isMobile]);

  return { 
    isDragging, 
    handleDragStart,
    // Pass additional handlers for direct touch events
    handleTouchStart: isMobile ? handleDragStart : undefined 
  };
};