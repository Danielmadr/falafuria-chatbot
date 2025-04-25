import { useState, useEffect, useCallback } from 'react';

interface Position {
  x: number;
  y: number;
}

interface Size {
  width: number;
  height: number;
}

interface WindowSize {
  width: number;
  height: number;
}

interface UseDragProps {
  position: Position;
  setPosition: React.Dispatch<React.SetStateAction<Position>>;
  windowSize: WindowSize;
  size: Size;
}

export const useDrag = ({ position, setPosition, windowSize, size }: UseDragProps) => {
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [dragStart, setDragStart] = useState<Position>({ x: 0, y: 0 });

  const handleDragStart = useCallback((e: React.MouseEvent) => {
    // Prevent drag if clicking on a button, input or resize handle
    if (
      e.target instanceof HTMLButtonElement ||
      e.target instanceof HTMLInputElement ||
      (e.target instanceof HTMLElement && e.target.classList.contains('resize-handle'))
    ) {
      return;
    }

    setIsDragging(true);
    setDragStart({ 
      x: e.clientX - position.x, 
      y: e.clientY - position.y 
    });
  }, [position]);

  const handleDragMove = useCallback((e: MouseEvent) => {
    if (!isDragging) return;

    const newX = Math.max(
      0,
      Math.min(windowSize.width - size.width, e.clientX - dragStart.x)
    );
    const newY = Math.max(
      0,
      Math.min(windowSize.height - size.height, e.clientY - dragStart.y)
    );
    
    setPosition({ x: newX, y: newY });
  }, [isDragging, dragStart, windowSize, size, setPosition]);

  const handleDragEnd = useCallback(() => {
    setIsDragging(false);
  }, []);

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleDragMove);
      document.addEventListener('mouseup', handleDragEnd);
    }

    return () => {
      document.removeEventListener('mousemove', handleDragMove);
      document.removeEventListener('mouseup', handleDragEnd);
    };
  }, [isDragging, handleDragMove, handleDragEnd]);

  return { isDragging, handleDragStart };
};