import { useState, useEffect, useCallback } from 'react';
import { Position, Size, WindowSize, DragConstraints } from '../../types/common';

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
 * useDrag hook manages the dragging functionality for elements.
 * It handles mouse and touch events, position constraints, and drag state.
 * 
 * @param {Position} position - Current position of the element
 * @param {Function} setPosition - State setter function for updating position
 * @param {WindowSize} windowSize - Current window dimensions for boundary calculations
 * @param {Size} size - Current size of the draggable element
 * @param {DragConstraints} constraints - Optional object containing drag boundaries
 * @returns {Object} Object containing drag state and event handlers
 */
export const useDrag = ({ 
  position, 
  setPosition, 
  windowSize, 
  size,
  constraints,
}: UseDragProps) => {
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [dragStart, setDragStart] = useState<Position>({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState<boolean>(false);

  // Check if we're on a mobile device for different event handling
  useEffect(() => {
    setIsMobile('ontouchstart' in window || navigator.maxTouchPoints > 0);
  }, []);

  // Default constraints if none provided
  const effectiveConstraints = constraints || {
    minX: 0,
    minY: 0,
    maxX: windowSize.width - size.width,
    maxY: windowSize.height - size.height
  };

  /**
   * Handles the start of a drag operation via mouse
   */
  const handleDragStart = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    // Prevent drag if clicking on interactive elements
    if (
      e.target instanceof HTMLButtonElement ||
      e.target instanceof HTMLInputElement ||
      e.target instanceof HTMLTextAreaElement ||
      (e.target instanceof HTMLElement && (
        e.target.classList.contains('resize-handle') ||
        e.target.closest('button') || 
        e.target.closest('input') ||
        e.target.closest('textarea')
      ))
    ) {
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
        x: e.clientX - position.x, 
        y: e.clientY - position.y 
      });
    }
  }, [position]);

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
      clientX = e.clientX;
      clientY = e.clientY;
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

  /**
   * Handles the end of a drag operation
   */
  const handleDragEnd = useCallback(() => {
    setIsDragging(false);
  }, []);

  // Setup and cleanup event listeners
  useEffect(() => {
    if (isDragging) {
      // Add drag-related classes to body for UI feedback
      document.body.classList.add('dragging');
      
      if (isMobile) {
        document.addEventListener('touchmove', handleDragMove as EventListener, { passive: false });
        document.addEventListener('touchend', handleDragEnd);
        document.addEventListener('touchcancel', handleDragEnd);
      } else {
        document.body.style.cursor = 'grabbing';
        document.addEventListener('mousemove', handleDragMove as EventListener);
        document.addEventListener('mouseup', handleDragEnd);
        document.addEventListener('mouseleave', handleDragEnd);
      }
    } else {
      document.body.classList.remove('dragging');
      if (!isMobile) {
        document.body.style.cursor = '';
      }
    }

    return () => {
      if (isMobile) {
        document.removeEventListener('touchmove', handleDragMove as EventListener);
        document.removeEventListener('touchend', handleDragEnd);
        document.removeEventListener('touchcancel', handleDragEnd);
      } else {
        document.removeEventListener('mousemove', handleDragMove as EventListener);
        document.removeEventListener('mouseup', handleDragEnd);
        document.removeEventListener('mouseleave', handleDragEnd);
      }
      document.body.classList.remove('dragging');
      document.body.style.cursor = '';
    };
  }, [isDragging, handleDragMove, handleDragEnd, isMobile]);

  return { 
    isDragging, 
    handleDragStart,
    // Pass additional handlers for direct touch events
    handleTouchStart: isMobile ? handleDragStart : undefined 
  };
};