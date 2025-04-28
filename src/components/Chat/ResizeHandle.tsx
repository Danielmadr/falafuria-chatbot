import React from "react";

interface ResizeHandleProps {
  onMouseDown: (e: React.MouseEvent<HTMLDivElement>) => void;
  isResizing: boolean;
  faqsOpen?: boolean;
}

const ResizeHandle: React.FC<ResizeHandleProps> = ({
  onMouseDown,
  isResizing,
  faqsOpen = false,
}) => {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      (e.target as HTMLDivElement).click();
    }
  };

  return (
    <div
      className={`resize-handle absolute bottom-0 right-0 w-8 h-8 
        backdrop-blur-sm hover:bg-gray-200 dark:hover:bg-gray-600 
        transition-colors duration-200 ${isResizing ? "bg-gray-200 dark:bg-gray-600" : ""}
        rounded-bl-md cursor-se-resize flex items-center justify-center`}
      onMouseDown={onMouseDown}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="button"
      aria-label="Resize chat window"
      style={{ zIndex: faqsOpen ? 20 : 10 }}
    >
      <svg
        width="20"
        height="20"
        viewBox="0 0 12 12"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        aria-hidden="true"
        className="text-gray-500 dark:text-gray-400"
      >
        <path d="M10 4.5C10 7.5 7.5 10 4.5 10" />
        <path d="M10 8C10 9 9 10 8 10" />
      </svg>
    </div>
  );
};

export default React.memo(ResizeHandle);
