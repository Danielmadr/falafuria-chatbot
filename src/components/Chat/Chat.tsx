"use client";

import { useState, useEffect, useRef } from "react";
import { useChat } from "@ai-sdk/react";
import ResizeHandle from "./ResizeHandle";
import Header from "./Header";
import Content from "./Content";
import Footer from "./Footer";
import { Card } from "@/components/ui/card";
import { useDrag } from "../hooks/useDrag";
import { useResize } from "../hooks/useResize";

/**
 * Position interface represents the x and y coordinates of the chat window
 */
interface Position {
  x: number;
  y: number;
}

/**
 * Size interface represents the width and height of the chat window
 */
interface Size {
  width: number;
  height: number;
}

/**
 * WindowSize interface represents the width and height of the browser window
 */
interface WindowSize {
  width: number;
  height: number;
}

/**
 * Chat component is the main container for the chat interface.
 * It manages:
 * - Chat window position and size
 * - Drag and resize functionality
 * - Chat messages and input
 * - FAQ selection and visibility
 */
const Chat: React.FC = () => {
  // Chat state using AI SDK
  const { messages, input, handleInputChange, handleSubmit, isLoading, setInput } = useChat();
  
  // Window state and positioning
  const [position, setPosition] = useState<Position>({ x: 0, y: 0 });
  const [size, setSize] = useState<Size>({ width: 500, height: 600 });
  const [windowSize, setWindowSize] = useState<WindowSize>({ width: 0, height: 0 });
  const [faqsOpen, setFaqsOpen] = useState<boolean>(false);
  
  // References
  const cardRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  
  // Constants for sizing constraints
  const MIN_WIDTH = 300;
  const MIN_HEIGHT = 350;
  const HEADER_HEIGHT = 100;
  const FOOTER_HEIGHT = 70;
  const DEFAULT_WIDTH_PERCENTAGE = 0.4; // 40% of screen width
  const DEFAULT_HEIGHT_PERCENTAGE = 0.7; // 70% of screen height

  /**
   * Calculate initial position and size based on window dimensions
   * @returns {Object} Object containing position and size values
   */
  const calculateInitialPositionAndSize = () => {
    const width = Math.max(MIN_WIDTH, Math.floor(window.innerWidth * DEFAULT_WIDTH_PERCENTAGE));
    const height = Math.max(MIN_HEIGHT, Math.floor(window.innerHeight * DEFAULT_HEIGHT_PERCENTAGE));
    
    // Center the chat window
    const x = Math.floor((window.innerWidth - width) / 5); // Position slightly to the left of center
    const y = Math.floor((window.innerHeight - height) / 4); // Position slightly above center
    
    return { position: { x, y }, size: { width, height } };
  };

  /**
   * Handles the selection of a predefined question
   * Sets the input value and submits the form programmatically
   * 
   * @param {string} question - The selected question text
   */
  const handleSelectQuestion = (question: string) => {
    setInput(question);
    
    // Submit the form programmatically after state update
    setTimeout(() => {
      if (formRef.current) {
        const event = new Event('submit', { bubbles: true, cancelable: true });
        formRef.current.dispatchEvent(event);
      }
    }, 100);
    
    // Ensure FAQs are closed when a question is selected
    setFaqsOpen(false);
  };
  
  /**
   * Updates window dimensions and ensures the chat window stays within bounds
   */
  const updateWindowDimensions = () => {
    const newWindowSize = { width: window.innerWidth, height: window.innerHeight };
    setWindowSize(newWindowSize);

    // Ensure chat dimensions don't exceed window size
    setSize(prevSize => ({
      width: Math.min(prevSize.width, newWindowSize.width),
      height: Math.min(prevSize.height, newWindowSize.height)
    }));

    // Ensure chat position stays within window boundaries
    setPosition(prevPosition => ({
      x: Math.min(prevPosition.x, Math.max(0, newWindowSize.width - size.width)),
      y: Math.min(prevPosition.y, Math.max(0, newWindowSize.height - size.height))
    }));
  };

  // Initialize window size and chat position/size
  useEffect(() => {
    // Initial setup
    if (windowSize.width === 0 && windowSize.height === 0) {
      const initialValues = calculateInitialPositionAndSize();
      setPosition(initialValues.position);
      setSize(initialValues.size);
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    }

    updateWindowDimensions();
    
    // Add resize listener
    window.addEventListener("resize", updateWindowDimensions);

    return () => {
      window.removeEventListener("resize", updateWindowDimensions);
    };
  }, [windowSize.width, windowSize.height, size.width, size.height]);

  // Handle FAQ section state change
  const handleFAQsOpenChange = (isOpen: boolean) => {
    setFaqsOpen(isOpen);
  };

  // Setup drag and resize hooks with boundary constraints
  const { isDragging, handleDragStart } = useDrag({
    position,
    setPosition,
    windowSize,
    size,
    // Add constraints to prevent dragging outside screen
    constraints: {
      minX: 0,
      minY: 0,
      maxX: Math.max(0, windowSize.width - size.width),
      maxY: Math.max(0, windowSize.height - size.height)
    }
  });
  
  const { isResizing, handleResizeStart } = useResize({
    size,
    setSize,
    minWidth: MIN_WIDTH,
    minHeight: MIN_HEIGHT,
    // Add constraints to prevent resizing beyond screen
    maxWidth: windowSize.width - position.x,
    maxHeight: windowSize.height - position.y
  });

  return (
    <div
      className="absolute max-w-full max-h-full"
      style={{
        left: position.x,
        top: position.y,
        width: size.width,
        height: size.height,
      }}
      ref={cardRef}
      role="dialog"
      aria-label="Chat interface"
    >
      <Card className="w-full h-full relative flex flex-col overflow-hidden shadow-lg pt-0 gap-0">
        <Header onMouseDown={handleDragStart} isDragging={isDragging} />
        <div className="flex-1 flex flex-col overflow-hidden">
          <Content
            messages={messages}
            size={size}
            headerHeight={HEADER_HEIGHT}
            footerHeight={FOOTER_HEIGHT}
            onSelectQuestion={handleSelectQuestion}
            onFAQsOpenChange={handleFAQsOpenChange}
            faqsOpen={faqsOpen}
          />
        </div>
        <Footer
          input={input}
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
          isLoading={isLoading}
          ref={formRef}
        />
        <ResizeHandle onMouseDown={handleResizeStart} isResizing={isResizing} faqsOpen={faqsOpen} />
      </Card>
    </div>
  );
};

export default Chat;