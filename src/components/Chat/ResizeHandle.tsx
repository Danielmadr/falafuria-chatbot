import React from 'react';

interface ResizeHandleProps {
  onMouseDown: (e: React.MouseEvent<HTMLDivElement>) => void;
  isResizing: boolean;
}

const ResizeHandle: React.FC<ResizeHandleProps> = ({ onMouseDown, isResizing }) => {
  return (
    <div
      className={`
        resize-handle absolute bottom-0 right-0 w-6 h-6 
        bg-gray-300 hover:bg-gray-400 
        transition-colors duration-200
        ${isResizing ? 'bg-gray-400' : ''}
        opacity-70 rounded-bl cursor-se-resize 
        flex items-center justify-center
      `}
      onMouseDown={onMouseDown}
      aria-label="Resize chat window"
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          // Simulate a mouse down event for keyboard accessibility
          onMouseDown(e as unknown as React.MouseEvent<HTMLDivElement>);
        }
      }}
    >
      <svg width="10" height="10" viewBox="0 0 10 10" aria-hidden="true">
        <path d="M0 10L10 10L10 0" fill="none" stroke="#444" strokeWidth="1" />
        <path d="M0 6L6 0" fill="none" stroke="#444" strokeWidth="1" />
        <path d="M0 3L3 0" fill="none" stroke="#444" strokeWidth="1" />
      </svg>
    </div>
  );
};

export default React.memo(ResizeHandle);