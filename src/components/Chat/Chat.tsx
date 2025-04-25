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
 * - FAQ selection
 */
const Chat: React.FC = () => {
  // Chat state using AI SDK
  const { messages, input, handleInputChange, handleSubmit, isLoading, setInput } = useChat();
  
  // Window state and positioning
  const [position, setPosition] = useState<Position>({ x: 300, y: 100 });
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

  /**
   * Handles the selection of a predefined question
   * Sets the input value and submits the form programmatically
   * 
   * @param {string} question - The selected question text
   */
  const handleSelectQuestion = (question: string) => {
    setInput(question);
    
    // Submit the form programmatically
    setTimeout(() => {
      if (formRef.current) {
        const event = new Event('submit', { bubbles: true, cancelable: true });
        formRef.current.dispatchEvent(event);
      }
    }, 100);
  };
  
  // Update window size when browser window is resized
  useEffect(() => {
    const updateWindowSize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };

    updateWindowSize();
    window.addEventListener("resize", updateWindowSize);

    return () => {
      window.removeEventListener("resize", updateWindowSize);
    };
  }, []);

  // Handle FAQ section state change
  const handleFAQsOpenChange = (isOpen: boolean) => {
    setFaqsOpen(isOpen);
  };

  // Setup drag and resize hooks
  const { isDragging, handleDragStart } = useDrag({
    position,
    setPosition,
    windowSize,
    size
  });
  
  const { isResizing, handleResizeStart } = useResize({
    size,
    setSize,
    minWidth: MIN_WIDTH,
    minHeight: MIN_HEIGHT
  });

  return (
    <div
      className="absolute max-w-full max-h-full"
      style={{
        left: position.x,
        top: position.y,
        width: Math.min(size.width, windowSize.width),
        height: Math.min(size.height, windowSize.height),
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