import { useState, useEffect, useCallback } from 'react';

interface Size {
  width: number;
  height: number;
}

interface ResizeStart extends Size {
  x: number;
  y: number;
}

interface UseResizeProps {
  size: Size;
  setSize: React.Dispatch<React.SetStateAction<Size>>;
  minWidth: number;
  minHeight: number;
}

export const useResize = ({ size, setSize, minWidth, minHeight }: UseResizeProps) => {
  const [isResizing, setIsResizing] = useState<boolean>(false);
  const [resizeStart, setResizeStart] = useState<ResizeStart>({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  });

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
  }, [size]);

  const handleResizeMove = useCallback((e: MouseEvent) => {
    if (!isResizing) return;

    const newWidth = Math.max(
      minWidth,
      resizeStart.width + (e.clientX - resizeStart.x)
    );
    const newHeight = Math.max(
      minHeight,
      resizeStart.height + (e.clientY - resizeStart.y)
    );

    setSize({ width: newWidth, height: newHeight });
  }, [isResizing, resizeStart, minWidth, minHeight, setSize]);

  const handleResizeEnd = useCallback(() => {
    setIsResizing(false);
  }, []);

  useEffect(() => {
    if (isResizing) {
      document.addEventListener('mousemove', handleResizeMove);
      document.addEventListener('mouseup', handleResizeEnd);
      
      // Add a class to the body to prevent text selection during resize
      document.body.classList.add('resize-active');
    }

    return () => {
      document.removeEventListener('mousemove', handleResizeMove);
      document.removeEventListener('mouseup', handleResizeEnd);
      document.body.classList.remove('resize-active');
    };
  }, [isResizing, handleResizeMove, handleResizeEnd]);

  return { isResizing, handleResizeStart };
};