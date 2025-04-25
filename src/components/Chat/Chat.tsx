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

const Chat: React.FC = () => {
  // Chat state
  const { messages, input, handleInputChange, handleSubmit, isLoading, setInput } = useChat();
  
  
  // Window state
  const [position, setPosition] = useState<Position>({ x: 300, y: 100 });
  const [size, setSize] = useState<Size>({ width: 500, height: 600 });
  const [windowSize, setWindowSize] = useState<WindowSize>({ width: 0, height: 0 });
  
  // Refs
  const cardRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  
  // Constants
  const MIN_WIDTH = 300;
  const MIN_HEIGHT = 350;
  const HEADER_HEIGHT = 100;
  const FOOTER_HEIGHT = 70;

  // Handle FAQ selection
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
  
  // Window size event handler
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
      <Card className="w-full h-full relative flex-grow flex-col overflow-hidden shadow-lg pt-0 gap-0">
        <Header onMouseDown={handleDragStart} isDragging={isDragging} />
        <Content
          messages={messages}
          size={size}
          headerHeight={HEADER_HEIGHT}
          footerHeight={FOOTER_HEIGHT}
          onSelectQuestion={handleSelectQuestion}
          
        />
        <Footer
          input={input}
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
          isLoading={isLoading}
        />
        <ResizeHandle onMouseDown={handleResizeStart} isResizing={isResizing} />
      </Card>
    </div>
  );
};

export default Chat;