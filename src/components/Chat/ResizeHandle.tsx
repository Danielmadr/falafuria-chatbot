import React from 'react';

interface ResizeHandleProps {
  onMouseDown: (e: React.MouseEvent<HTMLDivElement>) => void;
  isResizing: boolean;
  faqsOpen?: boolean;
}

const ResizeHandle: React.FC<ResizeHandleProps> = ({ 
  onMouseDown, 
  isResizing,
}) => {
  return (
    <div
      className={`
        resize-handle absolute bottom-0 right-0 w-8 h-8 
        backdrop-blur-sm bg-gray-100 dark:bg-gray-700 
        hover:bg-gray-200 dark:hover:bg-gray-600 
        transition-colors duration-200
        ${isResizing ? 'bg-gray-200 dark:bg-gray-600' : ''}
        rounded-bl-md cursor-se-resize 
        flex items-center justify-center
        z-10
      `}
      onMouseDown={onMouseDown}
      aria-label="Resize chat window"
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          onMouseDown(e as unknown as React.MouseEvent<HTMLDivElement>);
        }
      }}
    >
      <svg 
        width="12" 
        height="12" 
        viewBox="0 0 12 12" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="1.5" 
        aria-hidden="true"
        className="text-gray-500 dark:text-gray-400"
      >
        <path d="M9 3L3 9" />
        <path d="M5 3L3 5" />
        <path d="M7 3L3 7" />
        <path d="M9 5L5 9" />
      </svg>
    </div>
  );
};

export default React.memo(ResizeHandle);