"use client";

import { useRef } from "react";
import { Card } from "../ui/card";
import Header from "./Header";
import Content from "./Content";
import Footer from "./Footer";
import ResizeHandle from "./ResizeHandle";
import ErrorAlert from "./ErrorAlert"; 
import { useDrag } from "../../hooks/useDrag";
import { useResize } from "../../hooks/useResize";
import { useWindowSize } from "../../contexts/WindowSizeContext";
import { useChat } from "../../contexts/ChatContext";
import { useInitialPositionAndResize } from "../../hooks/useInitialPositionAndResize";
import {
  MIN_WIDTH,
  MIN_HEIGHT,
  HEADER_HEIGHT,
  FOOTER_HEIGHT,
} from "../constants/layout";

interface ChatProps {
  // Adding explicit interface for the component
  className?: string;
}

const Chat: React.FC<ChatProps> = ({ className }) => {
  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    isLoading,
    formRef,
    position,
    setPosition,
    size,
    setSize,
    faqsOpen,
    setFaqsOpen,
    error,
    setError,
  } = useChat();

  const { windowSize } = useWindowSize();
  const cardRef = useRef<HTMLDivElement>(null);

  // Initialize position and size
  useInitialPositionAndResize({
    windowWidth: windowSize.width,
    windowHeight: windowSize.height,
    size,
    setSize,
    position,
    setPosition,
  });

  // Calculate drag constraints
  const dragConstraints = {
    minX: 0,
    minY: 0,
    maxX: Math.max(0, windowSize.width - size.width),
    maxY: Math.max(0, windowSize.height - size.height),
  };

  // Handle dragging
  const { isDragging, handleDragStart } = useDrag({
    position,
    setPosition,
    windowSize,
    size,
    constraints: dragConstraints,
  });

  // Handle resizing
  const { isResizing, handleResizeStart } = useResize({
    size,
    setSize,
    minWidth: MIN_WIDTH,
    minHeight: MIN_HEIGHT,
    maxWidth: windowSize.width - position.x,
    maxHeight: windowSize.height - position.y,
  });

  return (
    <div
      className={`absolute max-w-full max-h-full ${className || ""}`}
      style={{
        left: position.x,
        top: position.y,
        width: size.width,
        height: size.height,
        transition: "width 0.1s, height 0.1s",
      }}
      ref={cardRef}
      role="dialog"
      aria-label="Chat interface"
    >
      <Card className="w-full h-full relative flex flex-col overflow-hidden shadow-lg p-0 gap-0">
        <Header onMouseDown={handleDragStart} isDragging={isDragging} />
        <div className="flex-1 flex flex-col overflow-hidden">
          {error && <ErrorAlert error={error} onClose={() => setError(null)} />}
          <Content
            messages={messages}
            size={size}
            headerHeight={HEADER_HEIGHT}
            footerHeight={FOOTER_HEIGHT}
            onFAQsOpenChange={setFaqsOpen}
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
        <ResizeHandle
          onMouseDown={handleResizeStart}
          isResizing={isResizing}
          faqsOpen={faqsOpen}
        />
      </Card>
    </div>
  );
};

export default Chat;