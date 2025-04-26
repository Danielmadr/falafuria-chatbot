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
 * It handles mouse events, position constraints, and drag state.
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

  // Default constraints if none provided
  const effectiveConstraints = constraints || {
    minX: 0,
    minY: 0,
    maxX: windowSize.width - size.width,
    maxY: windowSize.height - size.height
  };

  /**
   * Handles the start of a drag operation
   */
  const handleDragStart = useCallback((e: React.MouseEvent) => {
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
    setDragStart({ 
      x: e.clientX - position.x, 
      y: e.clientY - position.y 
    });
  }, [position]);

  /**
   * Handles mouse movement during a drag operation
   */
  const handleDragMove = useCallback((e: MouseEvent) => {
    if (!isDragging) return;

    const newX = Math.max(
      effectiveConstraints.minX,
      Math.min(effectiveConstraints.maxX, e.clientX - dragStart.x)
    );
    const newY = Math.max(
      effectiveConstraints.minY,
      Math.min(effectiveConstraints.maxY, e.clientY - dragStart.y)
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
      document.body.style.cursor = 'grabbing';
      
      document.addEventListener('mousemove', handleDragMove);
      document.addEventListener('mouseup', handleDragEnd);
      
      // Handle edge cases like mouse leaving the window
      document.addEventListener('mouseleave', handleDragEnd);
    } else {
      document.body.classList.remove('dragging');
      document.body.style.cursor = '';
    }

    return () => {
      document.removeEventListener('mousemove', handleDragMove);
      document.removeEventListener('mouseup', handleDragEnd);
      document.removeEventListener('mouseleave', handleDragEnd);
      document.body.classList.remove('dragging');
      document.body.style.cursor = '';
    };
  }, [isDragging, handleDragMove, handleDragEnd]);

  return { isDragging, handleDragStart };
};